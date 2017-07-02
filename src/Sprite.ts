'use script'
import { IView } from './view/IView';
import { ISprite } from './ISprite';
import {EventEmitter} from './eventEmitter/EventEmitter';
export class Sprite implements ISprite {
    canvasContext: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    view: IView;
    height:number;
    width:number;
    constructor(canvas: HTMLCanvasElement, view) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d')
    }
    run() {

    }
}