export declare class Event {
    type: string;
    target: any;
    currentTarget: any;
    timeStamp: number;
    isPropagation: boolean;
    isStopImmediate: boolean;
    constructor(type: string);
    stopPropagation(): void;
    stopImmediatePropagation(): void;
}
