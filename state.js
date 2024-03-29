(function() {

    ten.State = {

        intro: ten.introState,
        menu: ten.menuState,
        game: ten.gameState,

        currentState: null,

        start: function() {
            this.intro.init();
            this.game.init();
            this.menu.init();
            this.currentState = this.intro;
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
            Gamepad.update(this.currentTime);
            ten.State.currentState.update(this.currentTime);
        },

        returnToMenu: function() {
            this.currentState.exit();
            this.currentState = this.menu;
            this.currentState.enter();
        },

        startLevel: function(n) {
            this.game.loadLevel(n);
            this.currentState.exit();
            this.currentState = this.game;
            this.currentState.enter();
        },

        showIntro: function() {
            this.currentState.exit();
            this.currentState = this.intro;
            this.currentState.enter();
        }

    }

}());