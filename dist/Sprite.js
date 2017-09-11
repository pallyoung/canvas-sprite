var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./views/View", "./event/NativeEventDispatcher"], function (require, exports, View_1, NativeEventDispatcher_1) {
    'use script';
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(canvas) {
            var _this = _super.call(this) || this;
            _this.canvas = canvas;
            _this.height = canvas.height;
            _this.width = canvas.width;
            _this.canvasContext = canvas.getContext('2d');
            _this.parent = _this;
            _this.touchEnabled = true;
            _this._isAttached = true;
            var nativeEventDispatcher = new NativeEventDispatcher_1.NativeEventDispatcher();
            nativeEventDispatcher.init(_this.canvas, _this);
            return _this;
        }
        Sprite.prototype.onMeasure = function () {
            var parent = this.canvas;
            var x = parent.offsetLeft;
            var y = parent.offsetTop;
            while (parent.offsetParent) {
                parent = parent.offsetParent;
                x += parent.offsetLeft;
                y += parent.offsetTop;
            }
            this.pageX = x;
            this.pageY = y;
        };
        Sprite.prototype.paint = function () {
            var self = this;
            this.animationFrameHandle = requestAnimationFrame(function () {
                self.canvasContext.clearRect(0, 0, self.width, self.height);
                self.layout(self.canvasContext);
                self.run();
            });
        };
        Sprite.prototype.run = function () {
            this.isRunning = true;
            this.paint();
        };
        Sprite.prototype.stop = function () {
            this.isRunning = false;
            cancelAnimationFrame(this.animationFrameHandle);
        };
        return Sprite;
    }(View_1.View));
    exports.Sprite = Sprite;
});
