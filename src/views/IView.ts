export interface IView{
    height:number;
    width:number;
    x:number;
    y:number;
    _children:Array<IView>;
    parent:IView;
    addChild(child:IView):void;
    removeChild(child:IView):void;
    onLayout():void;
    onMeasure():void;
    onDraw(canvasContext:CanvasRenderingContext2D):void;
}