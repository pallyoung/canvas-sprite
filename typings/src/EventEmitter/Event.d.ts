declare class Event {
    type: string;
    target: any;
    timeStamp: number;
    isPropagation: boolean;
    isStopImmediate: boolean;
    constructor(type: string);
    stopPropagation(): void;
    stopImmediatePropagation(): void;
}
export default Event;
