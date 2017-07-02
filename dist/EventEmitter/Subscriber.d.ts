/// <reference path="Subscription.d.ts" />
export declare class Subscriber {
    id: number;
    type: string;
    subscription: any;
    listener: (event: Event) => any;
    context: any;
    constructor(type: string, listener: (any) => any, context: any, subscription: any);
}
