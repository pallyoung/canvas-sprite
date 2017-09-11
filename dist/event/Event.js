define(["require", "exports"], function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var Event = (function () {
        function Event(type) {
            this.type = type;
            this.isPropagation = true;
            this.isStopImmediate = false;
        }
        Event.prototype.stopPropagation = function () {
            this.isPropagation = false;
        };
        Event.prototype.stopImmediatePropagation = function () {
            this.isStopImmediate = false;
            this.isPropagation = false;
        };
        return Event;
    }());
    exports.Event = Event;
});
