(function () {

    ten.gameState = {

        map: new ten.Map(),
        commandPanel: {},
        healthBar: {},
        queue: {
            actions: [0,0,0,0,0,0,0,0,0,0],
            nextAction: 0
        },
        playing: false,

        init: function() {

            this.map.init();

            this.commandPanel = {
                bgSprite: [ten.settings.sprites[1], 0, 0, 800, 130],
                buttonSprites: {
                    walk: {
                        sprite: [ten.settings.sprites[3], 120, 0, 30, 30],
                        x: 65,
                        y: 520
                    },
                    walkUp: {
                        sprite: [ten.settings.sprites[3], 0, 0, 30, 30],
                        x: 65,
                        y: 485
                    },
                    walkDown: {
                        sprite: [ten.settings.sprites[3], 30, 0, 30, 30],
                        x: 65,
                        y: 555
                    },
                    walkLeft: {
                        sprite: [ten.settings.sprites[3], 60, 0, 30, 30],
                        x: 30,
                        y: 520
                    },
                    walkRight: {
                        sprite: [ten.settings.sprites[3], 90, 0, 30, 30],
                        x: 100,
                        y: 520
                    },
                    shoot: {
                        sprite: [ten.settings.sprites[3], 150, 0, 30, 30],
                        x: 180,
                        y: 520
                    },
                    shootUp: {
                        sprite: [ten.settings.sprites[3], 0, 0, 30, 30],
                        x: 180,
                        y: 485
                    },
                    shootDown: {
                        sprite: [ten.settings.sprites[3], 30, 0, 30, 30],
                        x: 180,
                        y: 555
                    },
                    shootLeft: {
                        sprite: [ten.settings.sprites[3], 60, 0, 30, 30],
                        x: 145,
                        y: 520
                    },
                    shootRight: {
                        sprite: [ten.settings.sprites[3], 90, 0, 30, 30],
                        x: 215,
                        y: 520
                    },
                    rest: {
                        sprite: [ten.settings.sprites[3], 240, 0, 30, 30],
                        x: 255,
                        y: 520
                    },
                    cancelLastAction: {
                        sprite: [ten.settings.sprites[3], 270, 0, 30, 30],
                        x: 360,
                        y: 520
                    },
                    go: {
                        sprite: [ten.settings.sprites[5], 0, 0, 50, 50],
                        x: 720,
                        y: 510
                    }
                },
                queueSprites: {
                    walkUp: {
                    sprite: [ten.settings.sprites[3], 0, 30, 30, 30]
                },
                    walkDown: {
                        sprite: [ten.settings.sprites[3], 30, 30, 30, 30]
                    },
                    walkLeft: {
                        sprite: [ten.settings.sprites[3], 60, 30, 30, 30]
                    },
                    walkRight: {
                        sprite: [ten.settings.sprites[3], 90, 30, 30, 30]
                    },
                    shootUp: {
                        sprite: [ten.settings.sprites[3], 120, 30, 30, 30]
                    },
                    shootDown: {
                        sprite: [ten.settings.sprites[3], 150, 30, 30, 30]
                    },
                    shootLeft: {
                        sprite: [ten.settings.sprites[3], 180, 30, 30, 30]
                    },
                    shootRight: {
                        sprite: [ten.settings.sprites[3], 210, 30, 30, 30]
                    }
                },
                queueSprite: [ten.settings.sprites[4], 0, 0, 300, 30]
            };

//            this.healthBar = {
//                emptyHeartSprite: [ten.settings.sprites[3], 180, 0, 30, 30],
//                fullHeartSprite: [ten.settings.sprites[3], 210, 0, 30, 30],
//                x: 430,
//                y: 480
//            };

            this.commandPanel.buttons = new SimpleButtons.Buttons();
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.walkUp.x,
                                                this.commandPanel.buttonSprites.walkUp.y,
                                                this.commandPanel.buttonSprites.walkUp.sprite,
                                                this.buttonPress(1)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.walkDown.x,
                                                this.commandPanel.buttonSprites.walkDown.y,
                                                this.commandPanel.buttonSprites.walkDown.sprite,
                                                this.buttonPress(2)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.walkLeft.x,
                                                this.commandPanel.buttonSprites.walkLeft.y,
                                                this.commandPanel.buttonSprites.walkLeft.sprite,
                                                this.buttonPress(3)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.walkRight.x,
                                                this.commandPanel.buttonSprites.walkRight.y,
                                                this.commandPanel.buttonSprites.walkRight.sprite,
                                                this.buttonPress(4)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.shootUp.x,
                                                this.commandPanel.buttonSprites.shootUp.y,
                                                this.commandPanel.buttonSprites.shootUp.sprite,
                                                this.buttonPress(5)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.shootDown.x,
                                                this.commandPanel.buttonSprites.shootDown.y,
                                                this.commandPanel.buttonSprites.shootDown.sprite,
                                                this.buttonPress(6)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.shootLeft.x,
                                                this.commandPanel.buttonSprites.shootLeft.y,
                                                this.commandPanel.buttonSprites.shootLeft.sprite,
                                                this.buttonPress(7)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.shootRight.x,
                                                this.commandPanel.buttonSprites.shootRight.y,
                                                this.commandPanel.buttonSprites.shootRight.sprite,
                                                this.buttonPress(8)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.rest.x,
                                                this.commandPanel.buttonSprites.rest.y,
                                                this.commandPanel.buttonSprites.rest.sprite,
                                                this.buttonPress(9)
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.cancelLastAction.x,
                                                this.commandPanel.buttonSprites.cancelLastAction.y,
                                                this.commandPanel.buttonSprites.cancelLastAction.sprite,
                                                this.removeLastFromQueue()
            );
            this.commandPanel.buttons.addButton(this.commandPanel.buttonSprites.go.x,
                                                this.commandPanel.buttonSprites.go.y,
                                                this.commandPanel.buttonSprites.go.sprite,
                                                this.go()
            );
            this.commandPanel.timerOverlay = {
                x: 400,
                y: 520,
                w: 0,
                h: 30,
                alpha: 0.2,
                color: "gray"
            }
        },

        buttonPress: function(i) {
            return function() {
                ten.State.game.addToQueue(i);
            }
        },

        go: function() {
            return function() {
                console.log("go!");
                ten.State.game.playing = true;
                ten.State.game.map.giveQueue(ten.State.game.queue.actions,
                                             ten.State.game.queue.nextAction);
            }
        },

        removeLastFromQueue: function() {
            return function() {
                if (ten.State.game.queue.nextAction > 0) {
                    ten.State.game.queue.actions[ten.State.game.queue.nextAction-1] = 0;
                    ten.State.game.queue.nextAction--;
                }
            }
        },

        addToQueue: function(action) {
            if (this.queue.nextAction < 10) {
                this.queue.actions[this.queue.nextAction] = action;
                this.queue.nextAction++;
            }
        },

        resetQueue: function() {
            this.queue.actions = [0,0,0,0,0,0,0,0,0,0];
            this.queue.nextAction = 0;
            this.playing = false;
        },

        clickHandler: function(evt) {
            var mX, mY;
            mX = evt.clientX - evt.target.getBoundingClientRect().left;
            mY = evt.clientY - evt.target.getBoundingClientRect().top;
            ten.State.game.commandPanel.buttons.mouseClick(mX, mY);
        },

        enter: function() {
//            ten.settings.setGameKeyboard();
            ten.settings.canvas.addEventListener("click", this.clickHandler, false);
        },

//        exit: function() {
//
//        },

        render: function() {
            this.map.render();
            ten.settings.ctx.drawImage(this.commandPanel.bgSprite[0],
                                       this.commandPanel.bgSprite[1],
                                       this.commandPanel.bgSprite[2],
                                       this.commandPanel.bgSprite[3],
                                       this.commandPanel.bgSprite[4],
                                       0,
                                       470,
                                       800,
                                       130
            );
            ten.settings.ctx.drawImage(this.commandPanel.buttonSprites.walk.sprite[0],
                                       this.commandPanel.buttonSprites.walk.sprite[1],
                                       this.commandPanel.buttonSprites.walk.sprite[2],
                                       this.commandPanel.buttonSprites.walk.sprite[3],
                                       this.commandPanel.buttonSprites.walk.sprite[4],
                                       this.commandPanel.buttonSprites.walk.x,
                                       this.commandPanel.buttonSprites.walk.y,
                                       this.commandPanel.buttonSprites.walk.sprite[3],
                                       this.commandPanel.buttonSprites.walk.sprite[4]
            );
            ten.settings.ctx.drawImage(this.commandPanel.buttonSprites.shoot.sprite[0],
                                       this.commandPanel.buttonSprites.shoot.sprite[1],
                                       this.commandPanel.buttonSprites.shoot.sprite[2],
                                       this.commandPanel.buttonSprites.shoot.sprite[3],
                                       this.commandPanel.buttonSprites.shoot.sprite[4],
                                       this.commandPanel.buttonSprites.shoot.x,
                                       this.commandPanel.buttonSprites.shoot.y,
                                       this.commandPanel.buttonSprites.shoot.sprite[3],
                                       this.commandPanel.buttonSprites.shoot.sprite[4]
            );
            this.commandPanel.buttons.render(ten.settings.ctx);
            ten.settings.ctx.drawImage(this.commandPanel.queueSprite[0],
                                       this.commandPanel.queueSprite[1],
                                       this.commandPanel.queueSprite[2],
                                       this.commandPanel.queueSprite[3],
                                       this.commandPanel.queueSprite[4],
                                       400,
                                       520,
                                       300,
                                       30
            );
            for (var i = 0; i < this.queue.nextAction; i++) {
                var xPos = 400 + i * 30;
                var yPos = 520;
                var sprite = null;
                switch (this.queue.actions[i]) {
                    case 0:
                        sprite = null;
                        break;
                    case 1:
                        sprite = this.commandPanel.queueSprites.walkUp.sprite;
                        break;
                    case 2:
                        sprite = this.commandPanel.queueSprites.walkDown.sprite;
                        break;
                    case 3:
                        sprite = this.commandPanel.queueSprites.walkLeft.sprite;
                        break;
                    case 4:
                        sprite = this.commandPanel.queueSprites.walkRight.sprite;
                        break;
                    case 5:
                        sprite = this.commandPanel.queueSprites.shootUp.sprite;
                        break;
                    case 6:
                        sprite = this.commandPanel.queueSprites.shootDown.sprite;
                        break;
                    case 7:
                        sprite = this.commandPanel.queueSprites.shootLeft.sprite;
                        break;
                    case 8:
                        sprite = this.commandPanel.queueSprites.shootRight.sprite;
                        break;
                    case 9:
                        sprite = this.commandPanel.buttonSprites.rest.sprite;
                        break;
                }
                ten.settings.ctx.drawImage(sprite[0],
                                           sprite[1],
                                           sprite[2],
                                           sprite[3],
                                           sprite[4],
                                           xPos,
                                           yPos,
                                           sprite[3],
                                           sprite[4]
                )
            }
            if (this.playing) {
                ten.settings.ctx.fillStyle = "rgba(20,20,20,0.3)";
                ten.settings.ctx.fillRect(this.commandPanel.timerOverlay.x,
                                          this.commandPanel.timerOverlay.y,
                                          this.commandPanel.timerOverlay.w,
                                          this.commandPanel.timerOverlay.h);
            }
//            for (i = 0; i < 8; i++) {
//                if (i <= this.map.player.hp) {
//                    ten.settings.ctx.drawImage(this.healthBar.fullHeartSprite[0],
//                                               this.healthBar.fullHeartSprite[1],
//                                               this.healthBar.fullHeartSprite[2],
//                                               this.healthBar.fullHeartSprite[3],
//                                               this.healthBar.fullHeartSprite[4],
//                                               this.healthBar.x + i * 30,
//                                               this.healthBar.y,
//                                               this.healthBar.fullHeartSprite[3],
//                                               this.healthBar.fullHeartSprite[4]
//                    )
//                } else {
//                    ten.settings.ctx.drawImage(this.healthBar.emptyHeartSprite[0],
//                                               this.healthBar.emptyHeartSprite[1],
//                                               this.healthBar.emptyHeartSprite[2],
//                                               this.healthBar.emptyHeartSprite[3],
//                                               this.healthBar.emptyHeartSprite[4],
//                                               this.healthBar.x + i * 30,
//                                               this.healthBar.y,
//                                               this.healthBar.emptyHeartSprite[3],
//                                               this.healthBar.emptyHeartSprite[4]
//                    )
//                }
//            }
        },

        update: function() {
            this.map.update(this.currentTime);
        }

    }

}());