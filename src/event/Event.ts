'use strict'
export class Event{
    type: string;
    target: any;
    currentTarget:any;
    timeStamp: number;
    isPropagation: boolean;
    isStopImmediate: boolean;
    constructor(type: string) {
        this.type = type;
        this.isPropagation = true;
        this.isStopImmediate = false;
    }
    stopPropagation(): void {
        this.isPropagation = false;
    }
    stopImmediatePropagation(): void {
        this.isStopImmediate = false;
        this.isPropagation = false;
    }

}