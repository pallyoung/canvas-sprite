import EventEmitter from './../EventEmitter/EventEmitter';
declare class View extends EventEmitter {
    height: number;
    width: number;
    x: number;
    y: number;
    _children: Array<View>;
    constructor();
    addChild(child: View): void;
    removeChild(child: View): void;
    onLayout(): void;
    onMeasure(): void;
    onDraw(canvas: HTMLCanvasElement): void;
}
export default View;
