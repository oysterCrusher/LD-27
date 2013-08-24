var ten = ten || {};

(function () {

    ten.settings = {};

    ten.settings = {

        // Canvas settings
        canvas: null,
        ctx: null,
        canvasHeight: 600,
        canvasWidth: 800,

        // Update interval
        interval: 20,

        // Sprite settings
        tileSize: 30,
        nToLoad: 1,
        sprites: [],
        toLoad: [
            "assets/tileset.png"
        ]//,

//        // Set keyboard controls in gamepad.js
//        setMenuKeyboard: function() {
//            Gamepad.ClearKeyboardMapping();
//            Gamepad.KeyboardMapping.A = 32;     // space to start
//            Gamepad.KeyboardMapping.DU = 38;    // up arrow to go up
//            Gamepad.KeyboardMapping.DD = 40;    // down arrow to go down
//            Gamepad.KeyboardMapping.DL = 37;    // left arrow to go left
//            Gamepad.KeyboardMapping.DR = 39;    // right arrow to go right
//        },
//
//        setGameKeyboard: function() {
//            Gamepad.ClearKeyboardMapping();
//            Gamepad.KeyboardMapping.A = 38;     // up arrow to Jump
//            Gamepad.KeyboardMapping.Back = 82;  // 'r' to reset level
//            Gamepad.KeyboardMapping.B = 40;     // down arrow to swap color
//            Gamepad.KeyboardMapping.Y = 32;     // space to change player
//            Gamepad.KeyboardMapping.DL = 37;    // left arrow to go left
//            Gamepad.KeyboardMapping.DR = 39;    // right arrow to go right
//            Gamepad.KeyboardMapping.Start = 77; // 'm' key to return to menu
//        }

    };



}());