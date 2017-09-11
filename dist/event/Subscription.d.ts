import { Event } from './Event';
export declare class Subscription {
    private type;
    private vendor;
    constructor(type: string);
    dispatch(event: Event): void;
    addListener(listener: (event: Event) => any, context: any): void;
    removeListener(listener: (event: Event) => any, context: any): void;
}
