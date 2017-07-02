/// <reference path="./Subscription.ts" />
'use strict'
var id = 0;
export class Subscriber {
    id: number;
    type: string;
    subscription:any;
    listener: (event: Event) => any;
    context: any;
    constructor(type: string, listener: (any) => any, context: any, subscription:any) {
        this.id = id++;
        this.type = type;
        this.listener = listener;
        this.context = context;

    }
}