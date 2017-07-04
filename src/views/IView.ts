import { IEventDispatcherDelegate } from './../event/IEventDispatcherDelegate';

export interface IView extends IEventDispatcherDelegate{
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
    onDraw(canvasContext:CanvasRenderingContext2D):void;
    rotate(xyz:number,y?:number,z?:number):void;
    scale(xyz:number,y?:number,z?:number):void;
}