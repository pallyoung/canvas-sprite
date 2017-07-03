import { IEventDispatcherDelegate } from './../event/IEventDispatcherDelegate';

export interface IView extends IEventDispatcherDelegate{
    height:number;
    width:number;
    x:number;
    y:number;
    pageX:number;
    pageY:number;
    _children:Array<IView>;
    parent:IView;
    addChild(child:IView):void;
    removeChild(child:IView):void;
    draw(canvasContext: CanvasRenderingContext2D):void;
    onLayout():void;
    onMeasure():void;
    onDraw(canvasContext:CanvasRenderingContext2D):void;
}