define(["require", "exports", "./TouchEvent"], function (require, exports, TouchEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //是否支持touch事件
    var IS_TOUCH_ENABLE = "ontouchend" in document ? true : false;
    var TOUCH_START = IS_TOUCH_ENABLE ? 'touchstart' : 'mousedown';
    var TOUCH_MOVE = IS_TOUCH_ENABLE ? 'touchmove' : 'mousemove';
    var TOUCH_END = IS_TOUCH_ENABLE ? 'touchend' : 'mouseup';
    var CLICK = 'click';
    var NativeEventDispatcher = (function () {
        function NativeEventDispatcher() {
        }
        NativeEventDispatcher.prototype.init = function (node, delegate) {
            this.node = node;
            this.delegate = delegate;
            this.bindNativeEvent();
        };
        NativeEventDispatcher.prototype.bindNativeEvent = function () {
            var self = this;
            this.onTouchStart = function (e) {
                var event = new TouchEvent_1.TouchEvent(TouchEvent_1.TouchEvent.TOUCH_START);
                if (IS_TOUCH_ENABLE) {
                    event.touches = e.touches;
                    event.changedTouches = e.changedTouches;
                    event.targetTouches = e.targetTouches;
                }
                else {
                    var point = {
                        clientX: e.clientX,
                        clientY: e.clientY,
                        screenX: e.screenX,
                        screenY: e.screenY,
                        pageX: e.pageX,
                        pageY: e.pageY
                    };
                    event.touches = [point];
                    event.changedTouches = [point];
                    event.targetTouches = [point];
                }
                self.delegate.onDispatchTouchEvent(event);
            };
            this.node.addEventListener(TOUCH_START, this.onTouchStart, false);
            this.node.addEventListener(TOUCH_MOVE, this.onTouchMove, false);
            this.node.addEventListener(TOUCH_END, this.onTouchEnd, false);
        };
        NativeEventDispatcher.prototype.release = function () {
        };
        return NativeEventDispatcher;
    }());
    exports.NativeEventDispatcher = NativeEventDispatcher;
});
