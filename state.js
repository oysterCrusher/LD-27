(function() {

    ten.State = {

        game: ten.gameState,

        currentState: null,

        start: function() {
            this.game.init();
            this.currentState = this.game;
            this.currentState.enter();
            this.startUpdating();
            this.startRendering();
        },

        startRendering: function() {
            window.requestAnimFrame(ten.State.startRendering);
            ten.State.currentState.render();
        },

        startUpdating: function() {
            ten.State.intervalID = setInterval(ten.State.update, ten.settings.interval);
        },

        update: function() {
            Gamepad.update();
            ten.State.currentState.update();
        }

//        returnToMenu: function() {
//            this.currentState.exit();
//            this.currentState = this.menu;
//            this.currentState.enter();
//        },
//
//        startLevel: function(n) {
//            this.game.loadLevel(n);
//            this.currentState.exit();
//            this.currentState = this.game;
//            this.currentState.enter();
//        }

    }

}());