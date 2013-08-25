ten.Enemy = function(x0, y0, d0) {

    var x = x0,
        y = y0,
        h = 30,
        w = 30,
        sprite = [ten.settings.sprites[2], 0, 30, 30, 30],
        xCell = x0,
        yCell = y0,
        lastXCell = x0,
        lastYCell = y0,
        dir = d0,
        hp = 1;

    function hitWithArrow() {
        this.hp--;
    }

    return {
        sprite: sprite,
        x: x,
        y:y,
        xCell: xCell,
        yCell: yCell,
        lastXCell: lastXCell,
        lastYCell: lastYCell,
        h: h,
        w: w,
        dir: dir,
        hp: hp,
        hitWithArrow: hitWithArrow
    }

};


ten.Arrow = function(x, y, xTarget, yTarget, dir, t) {

    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.xTarget = xTarget;
    this.yTarget = yTarget;
    console.log(this.yTarget);
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