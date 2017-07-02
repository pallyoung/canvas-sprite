define(["require", "exports"], function (require, exports) {
    'use script';
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = (function () {
        function Sprite(canvas, view) {
            this.canvasContext = canvas.getContext('2d');
        }
        Sprite.prototype.run = function () {
        };
        return Sprite;
    }());
    exports.Sprite = Sprite;
});
