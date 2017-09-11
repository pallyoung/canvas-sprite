define(["require", "exports", "./Subscription"], function (require, exports, Subscription_1) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.subscriptions = {};
        }
        EventDispatcher.prototype.dispatchEvent = function (type, event) {
            console.log(event);
            this.subscriptions[type] && this.subscriptions[type].dispatch(event);
        };
        EventDispatcher.prototype.addEventListener = function (type, listener, context) {
            var subscription = this.subscriptions[type] || new Subscription_1.Subscription(type);
            subscription.addListener(listener, context);
            this.subscriptions[type] = subscription;
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener, context) {
            this.subscriptions[type].removeListener(listener);
        };
        return EventDispatcher;
    }());
    exports.EventDispatcher = EventDispatcher;
});
