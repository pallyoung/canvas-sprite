import {Event} from './Event';
import {TouchEvent} from './TouchEvent';

export interface IEventDispatcherDelegate{
    dispatchTouchEvent(evnet:Event):void;
    dispatchPropagationEvent(event:Event):void;
}