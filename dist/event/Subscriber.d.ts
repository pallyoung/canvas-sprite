import { Event } from './Event';
export declare class Subscriber {
    id: number;
    type: string;
    listener: (event: Event) => any;
    context: any;
    constructor(type: string, listener: (event: Event) => any, context: any);
}
