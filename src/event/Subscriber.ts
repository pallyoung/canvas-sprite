'use strict'
import {Event} from './Event';
var id = 0;
export class Subscriber {
    id: number;
    type: string;
    listener: (event: Event) => any;
    context: any;
    constructor(type: string, listener: (event: Event) => any, context: any) {
        this.id = id++;
        this.type = type;
        this.listener = listener;
        this.context = context;
    }
}