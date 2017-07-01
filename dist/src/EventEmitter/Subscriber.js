'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var id = 0;
var Subscriber = (function () {
    function Subscriber(type, listener, context, subscription) {
        this.id = id++;
        this.type = type;
        this.listener = listener;
        this.context = context;
    }
    return Subscriber;
}());
exports.default = Subscriber;
