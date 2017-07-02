'use strict'
import { EventEmitter } from './../event/EventEmitter';
import { IView } from './IView';
export class View extends EventEmitter implements IView {
    height: number;
    width: number;
    x: number;
    y: number;
    _children: Array<IView>;
    backgroundColor: string;
    parent: IView;
    constructor() {
        super();
        this._children = [];
        this.backgroundColor = 'transparent'
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;
    }
    layout(): void {
        var self = this;

    }
    onLayout(): void {

    }
    onMeasure(): void {

    }
    onDraw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillStyle = this.backgroundColor;
        canvasContext.fillRect(0, 0, this.width, this.height);
        var self = this;
        this._children.forEach(function(child){
            canvasContext.save();
            canvasContext.rect(child.x,child.y,child.width,child.height);
            canvasContext.clip();
            child.onDraw(canvasContext);
            canvasContext.restore();
        });
    }
    addChild(child: IView): void {
        child.parent = this;
        child.height = child.height || this.height;
        child.width = child.width || this.width;
        child.x = child.x || 0;
        child.y = child.y || 0;
        child.onMeasure();
        child.onLayout();
        this._children.push(child);
    }
    removeChild(child: IView): void {
        for (let i = 0, children = this._children, l = children.length; i < l; i++) {
            if (child == children[i]) {
                this._children.splice(i, 1);
                return;
            }
        }
    }
}