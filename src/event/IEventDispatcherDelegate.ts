import {Event} from './Event';
export interface IEventDispatcherDelegate{
    dispatchEvent(evnet:Event):void;
    dispatchPropagationEvent(event:Event):void;
}