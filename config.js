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
        nToLoad: 12,
        sprites: [],
        toLoad: [
            "assets/tileset.png",
            "assets/command_bg.png",
            "assets/player.png",
            "assets/command_buttons.png",
            "assets/command_queue.png",
            "assets/command_go.png",
            "assets/menu_numbers.png",
            "assets/menu_bg.png",
            "assets/menu_selection.png",
            "assets/menu_go.png",
            "assets/menu_snapshots.png",
            "assets/info.png"
        ],

//        // Set keyboard controls in gamepad.js
//        setMenuKeyboard: function() {
//            Gamepad.ClearKeyboardMapping();
//            Gamepad.KeyboardMapping.A = 32;     // space to start
//            Gamepad.KeyboardMapping.DU = 38;    // up arrow to go up
//            Gamepad.KeyboardMapping.DD = 40;    // down arrow to go down
//            Gamepad.KeyboardMapping.DL = 37;    // left arrow to go left
//            Gamepad.KeyboardMapping.DR = 39;    // right arrow to go right
//        },

        setGameKeyboard: function() {
            Gamepad.ClearKeyboardMapping();
            Gamepad.KeyboardMapping.DU = 38;    // up arrow to go up
            Gamepad.KeyboardMapping.DD = 40;    // down arrow to go down
            Gamepad.KeyboardMapping.DL = 37;    // left arrow to go left
            Gamepad.KeyboardMapping.DR = 39;    // right arrow to go right
        }

    };



}());