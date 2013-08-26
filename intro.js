(function() {

    ten.introState = {

        c: 0,

        init: function() {
            this.c = 0;
            this.bg1 = [ten.settings.sprites[11], 0, 0, 800, 600];
            this.bg2 = [ten.settings.sprites[11], 0, 600, 800, 600];
        },

        clickHandler: function(evt) {
            if (ten.State.intro.c === 0) {
                ten.State.intro.screen = ten.State.intro.bg2;
                ten.State.intro.c = 1;
            } else {
                ten.State.returnToMenu();
            }
        },

        enter: function() {
            this.screen = this.bg1;
            this.c = 0;
            ten.settings.canvas.addEventListener("click", this.clickHandler, false);
        },

        exit: function() {
            ten.settings.canvas.removeEventListener("click", this.clickHandler, false);
        },

        update: function() {

        },

        render: function() {
            ten.settings.ctx.drawImage(this.screen[0],
                                       this.screen[1],
                                       this.screen[2],
                                       this.screen[3],
                                       this.screen[4],
                                       0,
                                       0,
                                       800,
                                       600
            );
        }

    }

}());