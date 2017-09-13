import { Event } from './../event/Event';
import { TouchEvent } from './../event/TouchEvent';
export interface IView {
    x: number;
    y: number;
    pageX: number;
    pageY: number;
    parent: IView;
    touchEnabled: boolean;
    _isAttached: boolean;
    _scaleX: number;
    _scaleY: number;
    _rotate: number;
    _rotateX: number;
    _rotateY: number;
    _translateX: number;
    _translateY: number;
    addChild(child: IView): void;
    removeChild(child: IView): void;
    layout(canvasContext: CanvasRenderingContext2D): void;
    onLayout(): void;
    onMeasure(): void;
    draw(canvasContext: CanvasRenderingContext2D): void;
    onDraw(canvasContext: CanvasRenderingContext2D): void;
    rotate(xyz: number, y?: number, z?: number): void;
    scale(xyz: number, y?: number, z?: number): void;
    translate(xyz: number, y?: number, z?: number): void;
    onDispatchTouchEvent(event: TouchEvent): void;
    dispatchTouchEvent(evnet: TouchEvent): void;
    dispatchPropagationEvent(event: Event): void;
    path(canvasContext: CanvasRenderingContext2D): void;
}