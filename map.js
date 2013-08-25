ten.Map = function() {

    this.tiles = [];
//    this.tileSpriteMap;
//    this.floorTileSprite;
//    this.wallTileSprite;
//    this.exitTileSprite;
//    this.tileSprites;
    this.queue = [];
    this.endStep = 0;
    this.isPlaying = false;
    this.stepLength = 1000;
//    this.currentStep;
//    this.currentTime;
    this.nextActionTime = 0;
//    this.nextEnemyActionTime;
    this.enemies = [];
    this.arrows = [];

    this.init = function() {

        // Set up the sprites
        this.tileSpriteMap = ten.settings.sprites[0];
        this.floorTileSprite = [this.tileSpriteMap, 0, 0, 30, 30];
        this.wallTileSprite = [this.tileSpriteMap, 30, 0, 30, 30];
        this.exitTileSprite = [this.tileSpriteMap, 60, 0, 30, 30];
        this.tileSprites = [this.floorTileSprite, this.wallTileSprite, this.exitTileSprite];

        // Spawn the player
        this.player = new ten.Player(2, 14, 1);

        // Sort out the map
        this.loadMap(2);

    };

    this.render = function() {
        // Tilemap
        for (var y = 0; y < this.tiles.length; y++) {
            for (var x = 0; x < this.tiles[y].length; x++) {
                var i = this.tiles[y][x];
                drawTile(this.tileSprites[i], x, y);
            }
        }

        // Player
        drawObject(this.player);

        // Enemies
        for (var e = 0; e < this.enemies.length; e++) {
            drawObject(this.enemies[e]);
        }

        // Arrows
        for (e = 0; e < this.arrows.length; e++) {
            drawObject(this.arrows[e]);
        }
    };

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
                                   obj.sprite[3],
                                   obj.sprite[4]
        );
    }

    this.loadMap = function(n) {
        this.tiles = [];
        for (var y = 0; y < ten.maps[n].nHeight; y++) {
            this.tiles.push([]);
            for (var x = 0; x < ten.maps[n].nWidth; x++) {
                this.tiles[y].push(ten.maps[n].tiles[y][x]);
            }
        }
        this.player.reset(ten.maps[n].spawnX, ten.maps[n].spawnY, ten.maps[n].spawnD);

        // Spawn some enemies
        for (var i = 0; i < ten.maps[n].bouncers.length; i++) {
            var enemy = new ten.Bouncer(ten.maps[n].bouncers[i][0], ten.maps[n].bouncers[i][1], ten.maps[n].bouncers[i][2]);
            this.enemies.push(enemy);
        }
        for (i = 0; i < ten.maps[n].seekers.length; i++) {
            enemy = new ten.Seeker(ten.maps[n].seekers[i][0], ten.maps[n].seekers[i][1]);
            this.enemies.push(enemy);
        }
//        var enemy = new ten.Bouncer(2, 6, 3);
//        this.enemies.push(enemy);
//        enemy = new ten.Bouncer(13,10,1);
//        this.enemies.push(enemy);
//        enemy = new ten.Bouncer(7,6,3);
//        this.enemies.push(enemy);
//        enemy = new ten.Seeker(1, 1);
//        this.enemies.push(enemy);
    };

    this.giveQueue = function(q, t) {
        this.queue = q;
        this.endStep = t;
        this.playQueue();
    };

    this.playQueue = function() {
        this.currentStep = 0;
        this.currentTime = (new Date).getTime();
        this.nextActionTime = this.currentTime;
        this.isPlaying = true;
    };

    this.playerStep = function() {
        var i,
            e,
            xTarget,
            yTarget,
            hit,
            arrow;

        if (this.currentStep < this.endStep) {
            this.player.lastXCell = this.player.xCell;
            this.player.lastYCell = this.player.yCell;
            if (this.queue[this.currentStep] === 1) { // Try to move up
                this.player.sprite = this.player.spriteUp;
                if (this.tiles[this.player.yCell-1][this.player.xCell] !== 1) {
                    this.player.yCell--;
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === this.player.xCell && this.enemies[e].yCell === this.player.yCell) {
                            this.enemies.splice(e, 1);
                            this.player.hp--;
                            this.player.yCell++;
                        }
                    }
                }
            }
            if (this.queue[this.currentStep] === 2) { // Try to move down
                this.player.sprite = this.player.spriteDown;
                if (this.tiles[this.player.yCell+1][this.player.xCell] !== 1) {
                    this.player.yCell++;
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === this.player.xCell && this.enemies[e].yCell === this.player.yCell) {
                            this.enemies.splice(e, 1);
                            this.player.hp--;
                            this.player.yCell--;
                        }
                    }
                }
            }
            if (this.queue[this.currentStep] === 3) { // Try to move left
                this.player.sprite = this.player.spriteLeft;
                if (this.tiles[this.player.yCell][this.player.xCell-1] !== 1) {
                    this.player.xCell--;
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === this.player.xCell && this.enemies[e].yCell === this.player.yCell) {
                            this.enemies.splice(e, 1);
                            this.player.hp--;
                            this.player.xCell++;
                        }
                    }
                }
            }
            if (this.queue[this.currentStep] === 4) { // Try to move right
                this.player.sprite = this.player.spriteRight;
                if (this.tiles[this.player.yCell][this.player.xCell+1] !== 1) {
                    this.player.xCell++;
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === this.player.xCell && this.enemies[e].yCell === this.player.yCell) {
                            this.enemies.splice(e, 1);
                            this.player.hp--;
                            this.player.xCell--;
                        }
                    }
                }
            }
            hit = false;
            if (this.queue[this.currentStep] === 5) { // Shoot up
                this.player.sprite = this.player.spriteUp;
                for (i = this.player.yCell - 1; i >= 0; i--) {
                    // Hit a wall?
                    if (this.tiles[i][this.player.xCell] === 1) {
                        xTarget = this.player.xCell;
                        yTarget = i;
                        break;
                    }
                    // Hit and enemy?
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === this.player.xCell && this.enemies[e].yCell === i) {
                            xTarget = this.player.xCell;
                            yTarget = i;
                            this.enemies[e].hitWithArrow();
                            hit = true;
                            break;
                        }
                    }
                    if (hit) {
                        break;
                    }
                }
                // Fire the arrow!
                arrow = new ten.Arrow(this.player.xCell,
                                      this.player.yCell,
                                      xTarget,
                                      yTarget,
                                      1,
                                      this.nextEnemyActionTime);
                this.arrows.push(arrow);
            }
            if (this.queue[this.currentStep] === 6) { // Shoot down
                this.player.sprite = this.player.spriteDown;
                for (i = this.player.yCell + 1; i < 16; i++) {
                    // Hit a wall?
                    if (this.tiles[i][this.player.xCell] === 1) {
                        xTarget = this.player.xCell;
                        yTarget = i;
                        break;
                    }
                    // Hit an enemy?
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === this.player.xCell && this.enemies[e].yCell === i) {
                            xTarget = this.player.xCell;
                            yTarget = i;
                            this.enemies[e].hitWithArrow();
                            hit = true;
                            break;
                        }
                    }
                    if (hit) {
                        break;
                    }
                }
                // Fire the arrow!
                arrow = new ten.Arrow(this.player.xCell,
                                      this.player.yCell,
                                      xTarget,
                                      yTarget,
                                      2,
                                      this.nextEnemyActionTime);
                this.arrows.push(arrow);
            }
            if (this.queue[this.currentStep] === 7) { // Shoot left
                this.player.sprite = this.player.spriteLeft;
                for (i = this.player.xCell - 1; i >= 0; i--) {
                    // Hit a wall?
                    if (this.tiles[this.player.yCell][i] === 1) {
                        xTarget = i;
                        yTarget = this.player.yCell;
                        break;
                    }
                    // Hit an enemy?
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === i && this.enemies[e].yCell === this.player.yCell) {
                            xTarget = i;
                            yTarget = this.player.yCell;
                            this.enemies[e].hitWithArrow();
                            hit = true;
                            break;
                        }
                    }
                    if (hit) {
                        break;
                    }
                }
                // Fire the arrow!
                arrow = new ten.Arrow(this.player.xCell,
                                      this.player.yCell,
                                      xTarget,
                                      yTarget,
                                      3,
                                      this.nextEnemyActionTime);
                this.arrows.push(arrow);
            }
            if (this.queue[this.currentStep] === 8) { // Shoot right
                this.player.sprite = this.player.spriteRight;
                for (i = this.player.xCell + 1; i < 26; i++) {
                    // Hit a wall?
                    if (this.tiles[this.player.yCell][i] === 1) {
                        xTarget = i;
                        yTarget = this.player.yCell;
                        break;
                    }
                    // Hit an enemy?
                    for (e = 0; e < this.enemies.length; e++) {
                        if (this.enemies[e].xCell === i && this.enemies[e].yCell === this.player.yCell) {
                            xTarget = i;
                            yTarget = this.player.yCell;
                            this.enemies[e].hitWithArrow();
                            hit = true;
                            break;
                        }
                    }
                    if (hit) {
                        break;
                    }
                }
                // Fire the arrow!
                arrow = new ten.Arrow(this.player.xCell,
                                      this.player.yCell,
                                      xTarget,
                                      yTarget,
                                      4,
                                      this.nextEnemyActionTime);
                this.arrows.push(arrow);
            }
            this.currentStep++;
            if (this.tiles[this.player.yCell][this.player.xCell] === 2) {
                console.log("success");
            }
        } else {
            this.player.lastXCell = this.player.xCell;
            this.player.lastYCell = this.player.yCell;
            this.isPlaying = false;
            ten.State.game.resetQueue();
        }
    };

    this.enemyStep = function() {
        for (var e = 0; e < this.enemies.length; e++) {
            this.enemies[e].lastXCell = this.enemies[e].xCell;
            this.enemies[e].lastYCell = this.enemies[e].yCell;
            this.enemies[e].decideNextMove();
            this.enemies[e].step();
            // Check health
            if (this.enemies[e].hp <= 0) {
                this.enemies.splice(e,1);
                e--;
            }
        }
        this.nextEnemyActionTime += this.stepLength;
    };

    this.update = function() {
        if (this.isPlaying) {
            this.currentTime = (new Date).getTime();
            if (this.currentTime >= this.nextActionTime) {
                this.nextEnemyActionTime = this.currentTime + (this.stepLength / 2);
                this.nextActionTime = this.currentTime + this.stepLength;
                this.playerStep();
            } else if (this.currentTime >= this.nextEnemyActionTime) {
                this.enemyStep();
            }

            // Update player position
            this.player.x = this.player.xCell
                + (this.player.xCell - this.player.lastXCell) * (this.currentTime - this.nextActionTime) / this.stepLength;
            this.player.y = this.player.yCell
                + (this.player.yCell - this.player.lastYCell) * (this.currentTime - this.nextActionTime) / this.stepLength;
            ten.State.game.commandPanel.timerOverlay.w = (this.currentStep) * 30
                + (this.currentTime - this.nextActionTime) / this.stepLength * 30;

            // Update enemy positions
            for (var e = 0; e < this.enemies.length; e++) {
                this.enemies[e].x = this.enemies[e].xCell
                    + (this.enemies[e].xCell - this.enemies[e].lastXCell)
                    * (this.currentTime - this.nextEnemyActionTime) / this.stepLength;
                this.enemies[e].y = this.enemies[e].yCell
                    + (this.enemies[e].yCell - this.enemies[e].lastYCell)
                    * (this.currentTime - this.nextEnemyActionTime) / this.stepLength;
            }

            // Update arrows
            for (var i = 0; i < this.arrows.length; i++) {
                this.arrows[i].update(this.currentTime);
                if (this.arrows[i].finished) {
                    this.arrows.splice(i,1);
                    i--;
                }
            }
        }
    };

};