(function () {

    ten.menuState = {

        init: function() {
            this.currentSelection = 0;
            this.sY = 70 + 30 * this.currentSelection;
            this.selectionSprite = [ten.settings.sprites[8], 0, 0, 25, 30];
            this.bgSprite = [ten.settings.sprites[7], 0, 0, 800, 600];
            this.levels = {};
            this.levels.buttons = new SimpleButtons.Buttons();
            for (var i = 0; i < 3; i++) {
                var completed = 0;
                if (typeof(Storage) !== "undefined") {
                    if (localStorage.getItem("ten_" + i.toString()) === "1") {
                        completed = 1;
                    }
                }
                this.levels.buttons.addButton(40,
                                              90 + 40 * i,
                                              [ten.settings.sprites[6], 0 + completed * 100, 30 * i, 100, 30],
                                              this.selectLevel(i)
                );
            }
            this.levels.buttons.addButton(590,
                                          480,
                                          [ten.settings.sprites[9], 0, 0, 160, 80],
                                          this.startLevel()
            );
            this.snapshots = [ten.settings.sprites[10], 0, 0, 375, 210];
        },

        selectLevel: function(i) {
            return function() {
                ten.State.menu.currentSelection = i;
            }
        },

        startLevel: function() {
            return function() {
                ten.State.startLevel(ten.State.menu.currentSelection);
            }
        },

        enter: function() {
            this.init();
            ten.settings.canvas.addEventListener("click", this.clickHandler, false);
        },

        clickHandler: function(evt) {
            var mX, mY;
            mX = evt.clientX - evt.target.getBoundingClientRect().left;
            mY = evt.clientY - evt.target.getBoundingClientRect().top;
            ten.State.menu.levels.buttons.mouseClick(mX, mY);
        },

        update: function() {
            this.sY += Math.round(((this.currentSelection * 40 + 90) - this.sY) / 6);
        },

        render: function() {
            ten.settings.ctx.drawImage(this.bgSprite[0],
                                       this.bgSprite[1],
                                       this.bgSprite[2],
                                       this.bgSprite[3],
                                       this.bgSprite[4],
                                       0,
                                       0,
                                       800,
                                       600
            );
            this.levels.buttons.render(ten.settings.ctx);
            ten.settings.ctx.drawImage(this.selectionSprite[0],
                                       this.selectionSprite[1],
                                       this.selectionSprite[2],
                                       this.selectionSprite[3],
                                       this.selectionSprite[4],
                                       140,
                                       this.sY,
                                       this.selectionSprite[3],
                                       this.selectionSprite[4]
            );
            ten.settings.ctx.drawImage(this.selectionSprite[0],
                                       this.selectionSprite[1],
                                       this.selectionSprite[2],
                                       this.selectionSprite[3],
                                       this.selectionSprite[4],
                                       0,
                                       this.sY,
                                       this.selectionSprite[3],
                                       this.selectionSprite[4]
            );
            ten.settings.ctx.drawImage(this.snapshots[0],
                                       this.snapshots[1],
                                       this.snapshots[4] * this.currentSelection,
                                       this.snapshots[3],
                                       this.snapshots[4],
                                       300,
                                       160,
                                       this.snapshots[3],
                                       this.snapshots[4]
            );
        },

        exit: function() {
            ten.settings.canvas.removeEventListener("click", this.clickHandler, false);
        }

    }
}());