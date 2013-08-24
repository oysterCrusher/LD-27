(function() {

    var Gamepad = {
        keyboardEnabled: true,

        // We'll name the buttons based on the Xbox360 pad
        In: {
            isDown: {
                A: 0,
                B: 0,
                X: 0,
                Y: 0,
                LB: 0,
                LT: 0.0,
                RB: 0,
                RT: 0.0,
                Start: 0,
                Back: 0,
                DU: 0,
                DD: 0,
                DL: 0,
                DR: 0
            },
            onDown: {
                A: 0,
                B: 0,
                X: 0,
                Y: 0,
                LB: 0,
                LT: 0.0,
                RB: 0,
                RT: 0.0,
                Start: 0,
                Back: 0,
                DU: 0,
                DD: 0,
                DL: 0,
                DR: 0
            },
            onUp: {
                A: 0,
                B: 0,
                X: 0,
                Y: 0,
                LB: 0,
                LT: 0.0,
                RB: 0,
                RT: 0.0,
                Start: 0,
                Back: 0,
                DU: 0,
                DD: 0,
                DL: 0,
                DR: 0
            },
            lastDown: {
                A: 0,
                B: 0,
                X: 0,
                Y: 0,
                LB: 0,
                LT: 0.0,
                RB: 0,
                RT: 0.0,
                Start: 0,
                Back: 0,
                DU: 0,
                DD: 0,
                DL: 0,
                DR: 0
            },
            leftStick: {
                x: 0.0,
                y: 0.0
            },
            rightStick: {
                x: 0.0,
                y: 0.0
            }
        },

        Pad1: {
            connected: false,
            isDown: {
                A: 0,
                B: 0,
                X: 0,
                Y: 0,
                LB: 0,
                LT: 0.0,
                RB: 0,
                RT: 0.0,
                Start: 0,
                Back: 0,
                DU: 0,
                DD: 0,
                DL: 0,
                DR: 0
            },
            leftStick: {
                x: 0.0,
                y: 0.0
            },
            rightStick: {
                x: 0.0,
                y: 0.0
            }
        },

        Keyboard: {
            isDown: {
                A: 0,
                B: 0,
                X: 0,
                Y: 0,
                LB: 0,
                LT: 0.0,
                RB: 0,
                RT: 0.0,
                Start: 0,
                Back: 0,
                DU: 0,
                DD: 0,
                DL: 0,
                DR: 0
            }
        },

        KeyboardMapping: {
            A: 65,      // 'a' key
            B: 83,      // 's' key
            X: 90,      // 'z' key
            Y: 88,      // 'x' key
            LB: 87,     // 'w' key
            LT: 81,     // 'q' key
            RB: 69,     // 'e' key
            RT: 82,     // 'r' key
            Start: 13,  // enter key
            Back: 8,    // backspace key
            DU: 38,     // Up arrow
            DD: 40,     // Down arrow
            DL: 37,     // Left arrow
            DR: 39      // Right arrow
        },

        ClearKeyboardMapping: function() {
            this.KeyboardMapping.A = null;      // 'a' key
            this.KeyboardMapping.B = null;      // 's' key
            this.KeyboardMapping.X = null;      // 'z' key
            this.KeyboardMapping.Y = null;      // 'x' key
            this.KeyboardMapping.LB = null;     // 'w' key
            this.KeyboardMapping.LT = null;     // 'q' key
            this.KeyboardMapping.RB = null;     // 'e' key
            this.KeyboardMapping.RT = null;     // 'r' key
            this.KeyboardMapping.Start = null;  // enter key
            this.KeyboardMapping.Back = null;    // backspace key
            this.KeyboardMapping.DU = null;     // Up arrow
            this.KeyboardMapping.DD = null;     // Down arrow
            this.KeyboardMapping.DL = null;     // Left arrow
            this.KeyboardMapping.DR = null;     // Right arrow
            this.clearDevice(this.Keyboard);
        },

        start: function() {
            window.addEventListener('keydown', function(evt) { Gamepad.onKeyDown(evt); }, false);
            window.addEventListener('keyup', function(evt) { Gamepad.onKeyUp(evt); }, false);
        },

//        disableKeyboard: function() {
//            this.keyboardEnabled = false;
//        },
//
//        enableKeyboard: function() {
//            this.keyboardEnabled = true;
//        },

        update: function() {
            if (navigator.webkitGetGamepads !== undefined) {
                this.pad1State = navigator.webkitGetGamepads()[0];
            }

            if (this.pad1State) {
                this.Pad1.connected = true;
                this.updateGamepad();
            } else {
                this.Pad1.connected = false;
                this.clearDevice(this.Pad1);   // Make this a disconnect() function that doesnt run each update
            }
            this.updateIn();
        },

        updateGamepad: function () {
            this.Pad1.isDown.A = this.pad1State.buttons[0];
            this.Pad1.isDown.B = this.pad1State.buttons[1];
            this.Pad1.isDown.X = this.pad1State.buttons[2];
            this.Pad1.isDown.Y = this.pad1State.buttons[3];
            this.Pad1.isDown.LB = this.pad1State.buttons[4];
            this.Pad1.isDown.LT = this.pad1State.buttons[6];
            this.Pad1.isDown.RB = this.pad1State.buttons[5];
            this.Pad1.isDown.RT = this.pad1State.buttons[7];
            this.Pad1.isDown.Start = this.pad1State.buttons[9];
            this.Pad1.isDown.Back = this.pad1State.buttons[8];
            this.Pad1.isDown.DU = this.pad1State.buttons[12];
            this.Pad1.isDown.DD = this.pad1State.buttons[13];
            this.Pad1.isDown.DL = this.pad1State.buttons[14];
            this.Pad1.isDown.DR = this.pad1State.buttons[15];
            this.Pad1.leftStick.x = this.pad1State.axes[0];
            this.Pad1.leftStick.y = this.pad1State.axes[1];
            this.Pad1.rightStick.x = this.pad1State.axes[2];
            this.Pad1.rightStick.y = this.pad1State.axes[3];
            // The left stick maps to the d-pad and takes precedent
            if (this.Pad1.leftStick.x >= 0.5) {
                this.Pad1.isDown.DR = 1;
            } else if (this.Pad1.leftStick.x <= -0.5) {
                this.Pad1.isDown.DL = 1;
            }
            if (this.Pad1.leftStick.y >= 0.5) {
                this.Pad1.isDown.DD = 1;
            } else if (this.Pad1.leftStick.y <= -0.5) {
                this.Pad1.isDown.DU = 1;
            }
        },

        clearDevice: function(device) {
            device.isDown.A = 0;
            device.isDown.B = 0;
            device.isDown.X = 0;
            device.isDown.Y = 0;
            device.isDown.LB = 0;
            device.isDown.LT = 0;
            device.isDown.RB = 0;
            device.isDown.RT = 0;
            device.isDown.Start = 0;
            device.isDown.Back = 0;
            device.isDown.DU = 0;
            device.isDown.DD = 0;
            device.isDown.DL = 0;
            device.isDown.DR = 0;
            if (device.leftStick) {
                device.leftStick.x = 0.0;
                device.leftStick.y = 0.0;
                device.rightStick.x = 0.0;
                device.rightStick.y = 0.0;
            }
        },

        onKeyDown: function(evt) {
            if (this.keyboardEnabled) {
                if (evt.keyCode === 38 || evt.keyCode === 40 || evt.keyCode === 32) {
                    evt.preventDefault();
                }
                switch (evt.keyCode) {
                    case this.KeyboardMapping.A:
                        this.Keyboard.isDown.A = 1;
                        break;
                    case this.KeyboardMapping.B:
                        this.Keyboard.isDown.B = 1;
                        break;
                    case this.KeyboardMapping.X:
                        this.Keyboard.isDown.X = 1;
                        break;
                    case this.KeyboardMapping.Y:
                        this.Keyboard.isDown.Y = 1;
                        break;
                    case this.KeyboardMapping.LB:
                        this.Keyboard.isDown.LB = 1;
                        break;
                    case this.KeyboardMapping.LT:
                        this.Keyboard.isDown.LT = 1;
                        break;
                    case this.KeyboardMapping.RB:
                        this.Keyboard.isDown.RB = 1;
                        break;
                    case this.KeyboardMapping.RT:
                        this.Keyboard.isDown.RT = 1;
                        break;
                    case this.KeyboardMapping.Start:
                        this.Keyboard.isDown.Start = 1;
                        break;
                    case this.KeyboardMapping.Back:
                        this.Keyboard.isDown.Back = 1;
                        break;
                    case this.KeyboardMapping.DU:
                        this.Keyboard.isDown.DU = 1;
                        break;
                    case this.KeyboardMapping.DD:
                        this.Keyboard.isDown.DD = 1;
                        break;
                    case this.KeyboardMapping.DL:
                        this.Keyboard.isDown.DL = 1;
                        break;
                    case this.KeyboardMapping.DR:
                        this.Keyboard.isDown.DR = 1;
                        break;
                }
            }
        },

        onKeyUp: function(evt) {
            if (this.keyboardEnabled) {
                switch (evt.keyCode) {
                    case this.KeyboardMapping.A:
                        this.Keyboard.isDown.A = 0;
                        break;
                    case this.KeyboardMapping.B:
                        this.Keyboard.isDown.B = 0;
                        break;
                    case this.KeyboardMapping.X:
                        this.Keyboard.isDown.X = 0;
                        break;
                    case this.KeyboardMapping.Y:
                        this.Keyboard.isDown.Y = 0;
                        break;
                    case this.KeyboardMapping.LB:
                        this.Keyboard.isDown.LB = 0;
                        break;
                    case this.KeyboardMapping.LT:
                        this.Keyboard.isDown.LT = 0;
                        break;
                    case this.KeyboardMapping.RB:
                        this.Keyboard.isDown.RB = 0;
                        break;
                    case this.KeyboardMapping.RT:
                        this.Keyboard.isDown.RT = 0;
                        break;
                    case this.KeyboardMapping.Start:
                        this.Keyboard.isDown.Start = 0;
                        break;
                    case this.KeyboardMapping.Back:
                        this.Keyboard.isDown.Back = 0;
                        break;
                    case this.KeyboardMapping.DU:
                        this.Keyboard.isDown.DU = 0;
                        break;
                    case this.KeyboardMapping.DD:
                        this.Keyboard.isDown.DD = 0;
                        break;
                    case this.KeyboardMapping.DL:
                        this.Keyboard.isDown.DL = 0;
                        break;
                    case this.KeyboardMapping.DR:
                        this.Keyboard.isDown.DR = 0;
                        break;
                }
            }
        },

        updateIn: function(){
            // Pad input takes precedence
            // Only makes a difference for the triggers where a small trigger value is registered
            // rather than the binary keyboard value
            this.In.lastDown.A = this.In.isDown.A;
            this.In.lastDown.B = this.In.isDown.B;
            this.In.lastDown.X = this.In.isDown.X;
            this.In.lastDown.Y = this.In.isDown.Y;
            this.In.lastDown.LB = this.In.isDown.LB;
            this.In.lastDown.LT = this.In.isDown.LT;
            this.In.lastDown.RB = this.In.isDown.RB;
            this.In.lastDown.RT = this.In.isDown.RT;
            this.In.lastDown.Start = this.In.isDown.Start;
            this.In.lastDown.Back = this.In.isDown.Back;
            this.In.lastDown.DU = this.In.isDown.DU;
            this.In.lastDown.DD = this.In.isDown.DD;
            this.In.lastDown.DL = this.In.isDown.DL;
            this.In.lastDown.DR = this.In.isDown.DR;

            this.In.isDown.A = this.Pad1.isDown.A || this.Keyboard.isDown.A;
            this.In.isDown.B = this.Pad1.isDown.B || this.Keyboard.isDown.B;
            this.In.isDown.X = this.Pad1.isDown.X || this.Keyboard.isDown.X;
            this.In.isDown.Y = this.Pad1.isDown.Y || this.Keyboard.isDown.Y;
            this.In.isDown.LB = this.Pad1.isDown.LB || this.Keyboard.isDown.LB;
            this.In.isDown.LT = this.Pad1.isDown.LT || this.Keyboard.isDown.LT;
            this.In.isDown.RB = this.Pad1.isDown.RB || this.Keyboard.isDown.RB;
            this.In.isDown.RT = this.Pad1.isDown.RT || this.Keyboard.isDown.RT;
            this.In.isDown.Start = this.Pad1.isDown.Start || this.Keyboard.isDown.Start;
            this.In.isDown.Back = this.Pad1.isDown.Back || this.Keyboard.isDown.Back;
            this.In.isDown.DU = this.Pad1.isDown.DU || this.Keyboard.isDown.DU;
            this.In.isDown.DD = this.Pad1.isDown.DD || this.Keyboard.isDown.DD;
            this.In.isDown.DL = this.Pad1.isDown.DL || this.Keyboard.isDown.DL;
            this.In.isDown.DR = this.Pad1.isDown.DR || this.Keyboard.isDown.DR;

            this.In.onDown.A = (this.In.lastDown.A === 0 && this.In.isDown.A !== 0) ? 1 : 0;
            this.In.onDown.B = (this.In.lastDown.B === 0 && this.In.isDown.B !== 0) ? 1 : 0;
            this.In.onDown.X = (this.In.lastDown.X === 0 && this.In.isDown.X !== 0) ? 1 : 0;
            this.In.onDown.Y = (this.In.lastDown.Y === 0 && this.In.isDown.Y !== 0) ? 1 : 0;
            this.In.onDown.LB = (this.In.lastDown.LB === 0 && this.In.isDown.LB !== 0) ? 1 : 0;
            this.In.onDown.LT = (this.In.lastDown.LT === 0 && this.In.isDown.LT !== 0) ? 1 : 0;
            this.In.onDown.RB = (this.In.lastDown.RB === 0 && this.In.isDown.RB !== 0) ? 1 : 0;
            this.In.onDown.RT = (this.In.lastDown.RT === 0 && this.In.isDown.RT !== 0) ? 1 : 0;
            this.In.onDown.Start = (this.In.lastDown.Start === 0 && this.In.isDown.Start !== 0) ? 1 : 0;
            this.In.onDown.Back = (this.In.lastDown.Back === 0 && this.In.isDown.Back !== 0) ? 1 : 0;
            this.In.onDown.DU = (this.In.lastDown.DU === 0 && this.In.isDown.DU !== 0) ? 1 : 0;
            this.In.onDown.DD = (this.In.lastDown.DD === 0 && this.In.isDown.DD !== 0) ? 1 : 0;
            this.In.onDown.DL = (this.In.lastDown.DL === 0 && this.In.isDown.DL !== 0) ? 1 : 0;
            this.In.onDown.DR = (this.In.lastDown.DR === 0 && this.In.isDown.DR !== 0) ? 1 : 0;
        }

    };

    Gamepad.start();

    window.Gamepad = Gamepad;

}());