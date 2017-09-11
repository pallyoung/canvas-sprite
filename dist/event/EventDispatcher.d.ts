import { Event } from './Event';
export declare class EventDispatcher {
    private subscriptions;
    constructor();
    dispatchEvent(type: string, event: Event): void;
    addEventListener(type: string, listener: () => any, context: any): void;
    removeEventListener(type: string, listener: () => any, context: any): void;
}
