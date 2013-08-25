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


ten.Arrow = function(x0, y0, x1, y1, d) {

    var x = x0,
        y = y0,
        xTarget = x1,
        yTarget = y1,
        dir = d.
        sprite = [ten.settings.sprites[2], 0, 60, 30, 30];

};