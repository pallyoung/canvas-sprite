import { Event } from './Event';
export declare type TouchPoint = {
    clientX: number;
    clientY: number;
    screenX: number;
    screenY: number;
    pageX: number;
    pageY: number;
};
export declare class TouchEvent extends Event {
    static TOUCH_START: string;
    static TOUCH_MOVE: string;
    static TOUCH_END: string;
    static TOUCH_TAP: string;
    touches: Array<TouchPoint>;
    changedTouches: Array<TouchPoint>;
    targetTouches: Array<TouchPoint>;
    constructor(type: string);
}
