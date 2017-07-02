import {Event} from './Event';
type TouchPoint  = {
    clientX:number;
    clientY:number;
    screenX:number;
    screenY:number;
    pageX:number;
    pageY:number;
}

export class TouchEvent extends Event{
    static TOUCH_START:string = 'touchstart';
    static TOUCH_MOVE:string = 'touchmove';
    static TOUCH_END:string = 'touchend';
    static TOUCH_TAP:string = 'tap';
    touches:Array<TouchPoint>;
    changedTouches:Array<TouchPoint>;
    targetTouches:Array<TouchPoint>
    constructor(type:string){
        super(type);
    }
}