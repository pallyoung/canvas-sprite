import {IView} from './views/IView';
export interface ISprite{
    canvasContext: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    contentView: IView;
    height:number;
    width:number;
    run():void;
}