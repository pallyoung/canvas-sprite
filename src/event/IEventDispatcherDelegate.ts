import {Event} from './Event';
import {TouchEvent} from './TouchEvent';

export interface IEventDispatcherDelegate{
    dispatchTouchEvent(evnet:TouchEvent):void;
    dispatchPropagationEvent(event:Event):void;
}