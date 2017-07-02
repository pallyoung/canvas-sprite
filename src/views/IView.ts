export interface IView{
    height:number;
    width:number;
    x:number;
    y:number;
    _children:Array<IView>;
    addChild(child:IView):void;
    removeChild(child:IView):void;
    onLayout():void;
    onMeasure():void;
    onDraw(canvas:CanvasRenderingContext2D):void;
}