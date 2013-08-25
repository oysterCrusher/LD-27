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
        dir = d0;

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
        dir: dir
    }

};