'use strict'
import {Subscriber} from './Subscriber';
import {Event} from './Event';
export class Subscription {
    private type: string;
    private vendor: Array<Subscriber>;
    constructor(type: string) {
        this.type = type;
        this.vendor = [];
    }
    dispatch(event:Event): void {
        for(let i = 0,l = this.vendor.length,vendor = this.vendor,subscriber;i<l;i++){
            subscriber = vendor[i];
            subscriber.listener.call(subscriber.context, event);
            if(event.isStopImmediate){
                return;
            }
        }
    }
    addListener(listener: (event:Event) => any, context: any): void {
        var subscriber:Subscriber = new Subscriber(this.type, listener, context);
        this.vendor.push(subscriber);
    }
    removeListener(listener: (event:Event) => any, context: any): void {
        for (var i = 0, l = this.vendor.length, vendor = this.vendor, subscriber: Subscriber; i < l; i++) {
            subscriber = vendor[i];
            if (subscriber.listener === listener && subscriber.context === context) {
                vendor.splice(i, 1);
                return;
            }
        }
    }
}