define(["require", "exports", "./Subscriber"], function (require, exports, Subscriber_1) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscription = (function () {
        function Subscription(type) {
            this.type = type;
            this.vendor = [];
        }
        Subscription.prototype.emit = function (event) {
            this.vendor.forEach(function (subscriber) {
                subscriber.listener.call(subscriber.context, event);
            });
        };
        Subscription.prototype.addListener = function (listener, context) {
            var subscriber = new Subscriber_1.Subscriber(this.type, listener, context, this);
            this.vendor.push(subscriber);
        };
        Subscription.prototype.removeListener = function (listener, context) {
            for (var i = 0, l = this.vendor.length, vendor = this.vendor, subscriber; i < l; i++) {
                subscriber = vendor[i];
                if (subscriber.listener === listener && subscriber.context === context) {
                    vendor.splice(i, 1);
                    return;
                }
            }
        };
        return Subscription;
    }());
    exports.Subscription = Subscription;
});
