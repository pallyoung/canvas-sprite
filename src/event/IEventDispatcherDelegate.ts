import {TouchEvent} from './TouchEvent';
export interface IEventDispatcherDelegate{
    dispatchTouchEvent(evnet:TouchEvent):void;
}