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
define(["require", "exports", "./Event"], function (require, exports, Event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        function TouchEvent(type) {
            return _super.call(this, type) || this;
        }
        TouchEvent.TOUCH_START = 'touchstart';
        TouchEvent.TOUCH_MOVE = 'touchmove';
        TouchEvent.TOUCH_END = 'touchend';
        TouchEvent.TOUCH_TAP = 'tap';
        return TouchEvent;
    }(Event_1.Event));
    exports.TouchEvent = TouchEvent;
});
