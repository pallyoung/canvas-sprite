import { IView } from './view/IView';
export declare class Sprite {
    canvasContext: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    view: IView;
    height:number;
    width:number;
    constructor(canvas: HTMLCanvasElement, view: any);
    run(): void;
}
