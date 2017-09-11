define(["require", "exports", "./Subscriber"], function (require, exports, Subscriber_1) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscription = (function () {
        function Subscription(type) {
            this.type = type;
            this.vendor = [];
        }
        Subscription.prototype.dispatch = function (event) {
            for (var i = 0, l = this.vendor.length, vendor = this.vendor, subscriber = void 0; i < l; i++) {
                subscriber = vendor[i];
                subscriber.listener.call(subscriber.context, event);
                if (event.isStopImmediate) {
                    return;
                }
            }
        };
        Subscription.prototype.addListener = function (listener, context) {
            var subscriber = new Subscriber_1.Subscriber(this.type, listener, context);
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
