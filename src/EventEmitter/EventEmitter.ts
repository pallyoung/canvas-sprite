/// <reference path="./Event.ts" />

'use strict'
import {Subscription} from './Subscription';
export class EventEmitter {
    private subscriptions: object;
    constructor() {
        this.subscriptions = {};
    }
    emit(type: string, event:Event): void {
        this.subscriptions[type].emit(event);
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