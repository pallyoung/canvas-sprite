import {Event} from './../event/Event';
import {TouchEvent} from './../event/TouchEvent';
export interface IView{
    height:number;
    width:number;
    x:number;
    y:number;
    pageX:number;
    pageY:number;
    parent:IView;
    addChild(child:IView):void;
    removeChild(child:IView):void;
    draw(canvasContext: CanvasRenderingContext2D):void;
    onLayout():void;
    onMeasure():void;
    touchEnabled:boolean;
    onDraw(canvasContext:CanvasRenderingContext2D):void;
    rotate(xyz:number,y?:number,z?:number):void;
    scale(xyz:number,y?:number,z?:number):void;
    onDispatchTouchEvent(event:TouchEvent):void;
    dispatchTouchEvent(evnet:TouchEvent):void;
    dispatchPropagationEvent(event:Event):void;
}