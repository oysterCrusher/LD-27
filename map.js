ten.map = function() {

    var tiles = [],
        tileSpriteMap,
        floorTileSprite,
        wallTileSprite,
        exitTileSprite,
        tileSprites,
        queue = [],
        endStep = 0,
        isPlaying = false,
        stepLength = 500,
        currentStep,
        currentTime,
        nextActionTime,
        nextEnemyActionTime,
        enemies = [],
        arrows = [],
        e = 0;

    var player = {
        x: 2,
        y: 14,
        h: 30,
        w: 30,
        hp: 3,
        xCell: 2,
        yCell: 14,
        lastXCell: 2,
        lastYCell: 14
    };

    function init() {
        tileSpriteMap = ten.settings.sprites[0];
        floorTileSprite = [tileSpriteMap, 0, 0, 30, 30];
        wallTileSprite = [tileSpriteMap, 30, 0, 30, 30];
        exitTileSprite = [tileSpriteMap, 60, 0, 30, 30];
        tileSprites = [floorTileSprite, wallTileSprite, exitTileSprite];
        loadMap(0);
        var enemy = new ten.Enemy(2, 11, 3);
        enemies.push(enemy);
        enemy = new ten.Enemy(13,10,1);
        enemies.push(enemy);
        enemy = new ten.Enemy(7,6,3);
        enemies.push(enemy);
        player.sprite = [ten.settings.sprites[2], 0, 0, 30, 30];
    }

    function render() {
        // Tilemap
        for (var y = 0; y < tiles.length; y++) {
            for (var x = 0; x < tiles[y].length; x++) {
                var i = tiles[y][x];
                drawTile(tileSprites[i], x, y);
            }
        }

        // Player
        drawObject(player);

        // Enemies
        for (var e = 0; e < enemies.length; e++) {
            drawObject(enemies[e]);
        }
    }

    function drawTile(tileSprite, x, y) {
        ten.settings.ctx.drawImage(tileSprite[0],
                                   tileSprite[1],
                                   tileSprite[2],
                                   tileSprite[3],
                                   tileSprite[4],
                                   x * ten.settings.tileSize - 5,
                                   y * ten.settings.tileSize - 5,
                                   ten.settings.tileSize,
                                   ten.settings.tileSize
        );
    }

    function drawObject(obj) {
        ten.settings.ctx.drawImage(obj.sprite[0],
                                   obj.sprite[1],
                                   obj.sprite[2],
                                   obj.sprite[3],
                                   obj.sprite[4],
                                   obj.x * ten.settings.tileSize - 5,
                                   obj.y * ten.settings.tileSize - 5,
                                   obj.w,
                                   obj.h
        );
    }

    function loadMap(n) {
        tiles = [];
        for (var y = 0; y < ten.maps[n].nHeight; y++) {
            tiles.push([]);
            for (var x = 0; x < ten.maps[n].nWidth; x++) {
                tiles[y].push(ten.maps[n].tiles[y][x]);
            }
        }
    }

    function giveQueue(q, t) {
        queue = q;
        endStep = t;
        playQueue();
    }

    function playQueue() {
        currentStep = 0;
        currentTime = (new Date).getTime();
        nextActionTime = currentTime;
        isPlaying = true;
    }

    function playerStep() {
        var i,
            e,
            xTarget,
            yTarget;
        if (currentStep < endStep) {
            player.lastXCell = player.xCell;
            player.lastYCell = player.yCell;
            if (queue[currentStep] === 1) { // Try to move up
                if (tiles[player.yCell-1][player.xCell] !== 1) {
                    player.yCell--;
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === player.xCell && enemies[e].yCell === player.yCell) {
                            enemies.splice(e, 1);
                            player.hp--;
                            player.yCell++;
                        }
                    }
                }
            }
            if (queue[currentStep] === 2) { // Try to move down
                if (tiles[player.yCell+1][player.xCell] !== 1) {
                    player.yCell++;
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === player.xCell && enemies[e].yCell === player.yCell) {
                            enemies.splice(e, 1);
                            player.hp--;
                            player.yCell--;
                        }
                    }
                }
            }
            if (queue[currentStep] === 3) { // Try to move left
                if (tiles[player.yCell][player.xCell-1] !== 1) {
                    player.xCell--;
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === player.xCell && enemies[e].yCell === player.yCell) {
                            enemies.splice(e, 1);
                            player.hp--;
                            player.xCell++;
                        }
                    }
                }
            }
            if (queue[currentStep] === 4) { // Try to move right
                if (tiles[player.yCell][player.xCell+1] !== 1) {
                    player.xCell++;
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === player.xCell && enemies[e].yCell === player.yCell) {
                            enemies.splice(e, 1);
                            player.hp--;
                            player.xCell--;
                        }
                    }
                }
            }
            if (queue[currentStep] === 5) { // Shoot up
                for (i = player.yCell - 1; i >= 0; i--) {
                    // Hit a wall?
                    if (tiles[i][player.xCell] === 1) {
                        xTarget = player.xCell;
                        yTarget = i;
                    }
                    // Hit and enemy?
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === player.xCell && enemies[e].yCell === i) {
                            xTarget = player.xCell;
                            yTarget = i;
                            enemies[e].hitWithArrow();
                        }
                    }
                }
                // Fire the arrow!
//                var arrow = new ten.Arrow(player.xCell, player.yCell, player.xCell, 1, 1);
//                arrows.push(arrow);
            }
            if (queue[currentStep] === 6) { // Shoot down
                for (i = player.yCell + 1; i < 16; i++) {
                    // Hit a wall?
                    if (tiles[i][player.xCell] === 1) {
                        xTarget = player.xCell;
                        yTarget = i;
                    }
                    // Hit an enemy?
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === player.xCell && enemies[e].yCell === i) {
                            xTarget = player.xCell;
                            yTarget = i;
                            enemies[e].hitWithArrow();
                        }
                    }
                }
                // Fire the arrow!
//                var arrow = new ten.Arrow(player.xCell, player.yCell, player.xCell, 1, 1);
//                arrows.push(arrow);
            }
            if (queue[currentStep] === 7) { // Shoot left
                for (i = player.xCell - 1; i >= 0; i--) {
                    // Hit a wall?
                    if (tiles[player.yCell][i] === 1) {
                        xTarget = i;
                        yTarget = player.yCell;
                    }
                    // Hit an enemy?
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === i && enemies[e].yCell === player.yCell) {
                            xTarget = i;
                            yTarget = player.yCell;
                            enemies[e].hitWithArrow();
                        }
                    }
                }
                // Fire the arrow!
//                var arrow = new ten.Arrow(player.xCell, player.yCell, player.xCell, 1, 1);
//                arrows.push(arrow);
            }
            if (queue[currentStep] === 8) { // Shoot right
                for (i = player.xCell + 1; i < 26; i++) {
                    // Hit a wall?
                    if (tiles[player.yCell][i] === 1) {
                        xTarget = i;
                        yTarget = player.yCell;
                    }
                    // Hit an enemy?
                    for (e = 0; e < enemies.length; e++) {
                        if (enemies[e].xCell === i && enemies[e].yCell === player.yCell) {
                            xTarget = i;
                            yTarget = player.yCell;
                            enemies[e].hitWithArrow();
                        }
                    }
                }
                // Fire the arrow!
//                var arrow = new ten.Arrow(player.xCell, player.yCell, player.xCell, 1, 1);
//                arrows.push(arrow);
            }
            currentStep++;
            if (tiles[player.yCell][player.xCell] === 2) {
                console.log("success");
            }
        } else {
            player.lastXCell = player.xCell;
            player.lastYCell = player.yCell;
            isPlaying = false;
            ten.State.game.resetQueue();
        }
    }

    function enemyStep() {
        for (var e = 0; e < enemies.length; e++) {
            enemies[e].lastXCell = enemies[e].xCell;
            enemies[e].lastYCell = enemies[e].yCell;
            // Check health
            console.log(enemies[e].hp);
            if (enemies[e].hp <= 0) {
                enemies.splice(e,1);
                e--;
                continue;
            }
            if (enemies[e].dir === 0) { // Stationary
                // Nothing to do here
            } else if (enemies[e].dir === 1) { // Moving up
                if (tiles[enemies[e].yCell - 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell--; // Carry on up
                } else if (tiles[enemies[e].yCell][enemies[e].xCell + 1] !== 1) {
                    enemies[e].xCell++;
                    enemies[e].dir = 4; // Go right
                } else if (tiles[enemies[e].yCell][enemies[e].xCell - 1] !== 1) {
                    enemies[e].xCell--;
                    enemies[e].dir = 3; // Go left
                } else if (tiles[enemies[e].yCell + 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell++;
                    enemies[e].dir = 2; // Go down
                } else {
                    enemies[e].dir = 0; // Guess we're stuck here!
                }
            } else if (enemies[e].dir === 2) { // Moving down
                if (tiles[enemies[e].yCell + 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell++; // Carry on down
                } else if (tiles[enemies[e].yCell][enemies[e].xCell - 1] !== 1) {
                    enemies[e].xCell--;
                    enemies[e].dir = 3; // Go left
                } else if (tiles[enemies[e].yCell][enemies[e].xCell + 1] !== 1) {
                    enemies[e].xCell++;
                    enemies[e].dir = 4; // Go right
                } else if (tiles[enemies[e].yCell - 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell--;
                    enemies[e].dir = 1; // Go up
                } else {
                    enemies[e].dir = 0; // Guess we're stuck here!
                }
            } else if (enemies[e].dir === 3) { // Moving left
                if (tiles[enemies[e].yCell][enemies[e].xCell - 1] !== 1) {
                    enemies[e].xCell--; // Carry on left
                } else if (tiles[enemies[e].yCell - 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell--;
                    enemies[e].dir = 1; // Go up
                } else if (tiles[enemies[e].yCell + 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell++;
                    enemies[e].dir = 2; // Go down
                } else if (tiles[enemies[e].yCell][enemies[e].xCell + 1] !== 1) {
                    enemies[e].xCell++;
                    enemies[e].dir = 4; // Go right
                } else {
                    enemies[e].dir = 0; // Guess we're stuck here!
                }
            } else if (enemies[e].dir === 4) { // Moving right
                if (tiles[enemies[e].yCell][enemies[e].xCell + 1] !== 1) {
                    enemies[e].xCell++; // Carry on right
                } else if (tiles[enemies[e].yCell + 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell++;
                    enemies[e].dir = 2; // Go down
                } else if (tiles[enemies[e].yCell - 1][enemies[e].xCell] !== 1) {
                    enemies[e].yCell--;
                    enemies[e].dir = 1; // Go up
                } else if (tiles[enemies[e].yCell][enemies[e].xCell - 1] !== 1) {
                    enemies[e].xCell--;
                    enemies[e].dir = 3; // Go left
                } else {
                    enemies[e].dir = 0; /// Guess we're stuck here!
                }
            }
        }
        nextEnemyActionTime += stepLength;
    }

    function update() {
        if (isPlaying) {
            currentTime = (new Date).getTime();
            if (currentTime >= nextActionTime) {
                playerStep();
                nextEnemyActionTime = currentTime + (stepLength / 2);
                nextActionTime = currentTime + stepLength;
            } else if (currentTime >= nextEnemyActionTime) {
                enemyStep();
            }
            player.x = player.xCell
                + (player.xCell - player.lastXCell) * (currentTime - nextActionTime) / stepLength;
            player.y = player.yCell
                + (player.yCell - player.lastYCell) * (currentTime - nextActionTime) / stepLength;
            ten.State.game.commandPanel.timerOverlay.w = (currentStep) * 30
                + (currentTime - nextActionTime) / stepLength * 30;

            for (var e = 0; e < enemies.length; e++) {
                enemies[e].x = enemies[e].xCell
                    + (enemies[e].xCell - enemies[e].lastXCell)
                    * (currentTime - nextEnemyActionTime) / stepLength;

                enemies[e].y = enemies[e].yCell
                    + (enemies[e].yCell - enemies[e].lastYCell)
                    * (currentTime - nextEnemyActionTime) / stepLength;
            }
        }
    }

    return {
        init: init,
        render: render,
        loadMap: loadMap,
        giveQueue: giveQueue,
        update: update,
        player: player
    }

};