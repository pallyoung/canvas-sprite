'use strict'
import {Subscription} from './Subscription';
import {Event} from './Event';

export class EventDispatcher {
    private subscriptions: object;
    constructor() {
        this.subscriptions = {};
    }
    dispatchEvent(type: string, event:Event): void {
        console.log(event)
        this.subscriptions[type] && this.subscriptions[type].dispatch(event);
    }
    addEventListener(type: string, listener: () => any, context: any): void {
        var subscription: Subscription = this.subscriptions[type] || new Subscription(type);
        subscription.addListener(listener, context);
        
        this.subscriptions[type] = subscription;
    }
    removeEventListener(type: string, listener: () => any, context: any): void {
        this.subscriptions[type].removeListener(listener);
    }
}