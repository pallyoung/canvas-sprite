/// <reference path="./Event.ts" />
define(["require", "exports", "./Subscription"], function (require, exports, Subscription_1) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventEmitter = (function () {
        function EventEmitter() {
            this.subscriptions = {};
        }
        EventEmitter.prototype.emit = function (type, event) {
            this.subscriptions[type].emit(event);
        };
        EventEmitter.prototype.addEventListener = function (type, listener, context) {
            var subscription = this.subscriptions[type] || new Subscription_1.Subscription(type);
            subscription.addListener(listener, context);
            this.subscriptions[type] = subscription;
        };
        EventEmitter.prototype.removeEventListener = function (type, listener, context) {
            this.subscriptions[type].removeListener(listener);
        };
        return EventEmitter;
    }());
    exports.EventEmitter = EventEmitter;
});
