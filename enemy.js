ten.Bouncer = function(x0, y0, d0) {

    this.x = x0;
    this.y = y0;
    this.h = 30;
    this.w = 30;
    this.sprite = [ten.settings.sprites[2], 0, 30, 30, 30];
    this.xCell = x0;
    this.yCell = y0;
    this.lastXCell = x0;
    this.lastYCell = y0;
    this.dir = d0;
    this.hp = 1;

    this.step = function() {

    };

    this.hitWithArrow = function() {
        this.hp--;
        this.takeArrowHit = false;
    };

    this.decideNextMove = function() {
        if (this.dir === 0) { // Stationary
            // Nothing to do here
        } else if (this.dir === 1) { // Moving up
            if (ten.State.game.map.tiles[this.yCell - 1][this.xCell] !== 1) {
                this.yCell--; // Carry on up
            } else if (ten.State.game.map.tiles[this.yCell][this.xCell + 1] !== 1) {
                this.xCell++;
                this.dir = 4; // Go right
            } else if (ten.State.game.map.tiles[this.yCell][this.xCell - 1] !== 1) {
                this.xCell--;
                this.dir = 3; // Go left
            } else if (ten.State.game.map.tiles[this.yCell + 1][this.xCell] !== 1) {
                this.yCell++;
                this.dir = 2; // Go down
            } else {
                this.dir = 0; // Guess we're stuck here!
            }
        } else if (this.dir === 2) { // Moving down
            if (ten.State.game.map.tiles[this.yCell + 1][this.xCell] !== 1) {
                this.yCell++; // Carry on down
            } else if (ten.State.game.map.tiles[this.yCell][this.xCell - 1] !== 1) {
                this.xCell--;
                this.dir = 3; // Go left
            } else if (ten.State.game.map.tiles[this.yCell][this.xCell + 1] !== 1) {
                this.xCell++;
                this.dir = 4; // Go right
            } else if (ten.State.game.map.tiles[this.yCell - 1][this.xCell] !== 1) {
                this.yCell--;
                this.dir = 1; // Go up
            } else {
                this.dir = 0; // Guess we're stuck here!
            }
        } else if (this.dir === 3) { // Moving left
            if (ten.State.game.map.tiles[this.yCell][this.xCell - 1] !== 1) {
                this.xCell--; // Carry on left
            } else if (ten.State.game.map.tiles[this.yCell - 1][this.xCell] !== 1) {
                this.yCell--;
                this.dir = 1; // Go up
            } else if (ten.State.game.map.tiles[this.yCell + 1][this.xCell] !== 1) {
                this.yCell++;
                this.dir = 2; // Go down
            } else if (ten.State.game.map.tiles[this.yCell][this.xCell + 1] !== 1) {
                this.xCell++;
                this.dir = 4; // Go right
            } else {
                this.dir = 0; // Guess we're stuck here!
            }
        } else if (this.dir === 4) { // Moving right
            if (ten.State.game.map.tiles[this.yCell][this.xCell + 1] !== 1) {
                this.xCell++; // Carry on right
            } else if (ten.State.game.map.tiles[this.yCell + 1][this.xCell] !== 1) {
                this.yCell++;
                this.dir = 2; // Go down
            } else if (ten.State.game.map.tiles[this.yCell - 1][this.xCell] !== 1) {
                this.yCell--;
                this.dir = 1; // Go up
            } else if (ten.State.game.map.tiles[this.yCell][this.xCell - 1] !== 1) {
                this.xCell--;
                this.dir = 3; // Go left
            } else {
                this.dir = 0; /// Guess we're stuck here!
            }
        }
    };

};

ten.Seeker = function(x0, y0) {

    this.x = x0;
    this.y = y0;
    this.lastXCell = x0;
    this.lastYCell = y0;
    this.xCell = x0;
    this.yCell = y0;
    this.sprite2 = [ten.settings.sprites[2], 0, 90, 30 , 30];
    this.sprite1 = [ten.settings.sprites[2], 30, 90, 30 , 30];
    this.sprite = this.sprite2;
    this.hp = 2;
    this.timeBetweenMoves = 1;
    this.moveCooldown = 0;
    this.takeArrowHit = false;

    this.hitWithArrow = function() {
        this.takeArrowHit = true;
    };

    this.step = function() {
        if (this.takeArrowHit) {
            this.hp--;
            this.takeArrowHit = false;
            this.sprite = this.sprite1;
        }
    };

    this.decideNextMove = function() {
        if (this.moveCooldown > 0) {
            this.lastXCell = this.xCell;
            this.lastYCell = this.yCell;
            this.moveCooldown--;
        } else {
            var xDistanceToPlayer = Math.abs(this.xCell - ten.State.game.map.player.xCell);
            var yDistanceToPlayer = Math.abs(this.yCell - ten.State.game.map.player.yCell);
            if (xDistanceToPlayer + yDistanceToPlayer < 5) {
                var xMove = 0;
                var yMove = 0;
                if (this.xCell > ten.State.game.map.player.xCell) {
                    xMove = -1;
                } else if (this.xCell < ten.State.game.map.player.xCell) {
                    xMove = 1;
                } else {
                    xMove = 0;
                }
                if (this.yCell > ten.State.game.map.player.yCell) {
                    yMove = -1;
                } else if (this.yCell < ten.State.game.map.player.yCell) {
                    yMove = 1;
                } else {
                    yMove = 0;
                }
                if (xDistanceToPlayer > yDistanceToPlayer) {
                    if (ten.State.game.map.tiles[this.yCell][this.xCell + xMove] !== 1) {
                        this.xCell += xMove;
                    } else if ((yDistanceToPlayer > 0) && (ten.State.game.map.tiles[this.yCell + yMove][this.xCell] !== 1)) {
                        this.yCell += yMove;
                    }
                } else if (yDistanceToPlayer > xDistanceToPlayer) {
                    if (ten.State.game.map.tiles[this.yCell + yMove][this.xCell] !== 1) {
                        this.yCell += yMove;
                    } else if ((xDistanceToPlayer > 0) && (ten.State.game.map.tiles[this.yCell][this.xCell + xMove] !== 1)) {
                        this.xCell += xMove;
                    }
                } else if (xDistanceToPlayer === yDistanceToPlayer && xDistanceToPlayer !== 0) {
                    if ((Math.random() > 0.5) && (ten.State.game.map.tiles[this.yCell][this.xCell + xMove] !== 1)) {
                        this.xCell += xMove;
                    } else if (ten.State.game.map.tiles[this.yCell + yMove][this.xCell] !== 1) {
                        this.yCell += yMove;
                    }
                }
                this.moveCooldown = this.timeBetweenMoves;
            }
        }
    };

};


ten.Arrow = function(x, y, xTarget, yTarget, dir, t) {

    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.xTarget = xTarget;
    this.yTarget = yTarget;
    this.impactTime = t;
    this.dir = dir;

    this.speed = 0.06;
    this.finished = false;
    this.sprite = [ten.settings.sprites[2], (this.dir - 1) * 30, 60, 30, 30];
    this.remainingTime = 0;

    this.update = function(currentTime) {

        this.remainingTime = this.impactTime - currentTime;
        if (this.dir === 1) { // If moving up
            this.y = this.yTarget + 0.5 + this.remainingTime * this.speed;
            if (this.y > this.y0) this.y = this.y0;
        } else if (dir === 2) { // If moving down
            this.y = this.yTarget - 0.5 - this.remainingTime * this.speed;
            if (this.y < this.y0) this.y = this.y0;
        } else if (dir === 3) { // Moving left
            this.x = this.xTarget + 0.5 + this.remainingTime * this.speed;
            if (this.x > this.x0) this.x = this.x0;
        } else if (dir === 4) { // Moving right
            this.x = this.xTarget - 0.5 - this.remainingTime * this.speed;
            if (this.x < this.x0) this.x = this.x0;
        }
        if (currentTime > this.impactTime) {
            this.finished = true;
        }
    }

};