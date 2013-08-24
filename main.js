window.onload = function () {

    // Sort out the canvas
    ten.settings.canvas = document.getElementById("game");
    ten.settings.canvas.width = ten.settings.canvasWidth;
    ten.settings.canvas.height = ten.settings.canvasHeight;
    ten.settings.ctx = ten.settings.canvas.getContext("2d");

    // Load everything here and just wait until its loaded
    function loadSprites() {
        var remaining = ten.settings.nToLoad;
        for (var i = 0; i < ten.settings.nToLoad; i++) {
            ten.settings.sprites[i] = new Image();
            ten.settings.sprites[i].src = ten.settings.toLoad[i];
            ten.settings.sprites[i].onload = function() {
                remaining--;
                if (remaining <= 0) {
                    play();
                }
            }
        }
    }

    function play() {
        ten.State.start();
    }

    loadSprites();

};