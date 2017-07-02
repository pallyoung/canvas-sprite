'use strict'
import { EventEmitter } from './../event/EventEmitter';
import { IView } from './IView';
import { IEventDispatcherDelegate } from './../event/IEventDispatcherDelegate';
export class View extends EventEmitter implements IView, IEventDispatcherDelegate {
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
        canvasContext.beginPath();
        canvasContext.fillStyle = this.backgroundColor;
        canvasContext.fillRect(0, 0, this.width, this.height);
        canvasContext.closePath();
        var self = this;
        this._children.forEach(function (child) {
            canvasContext.save();
            canvasContext.strokeStyle = 'transparent'
            canvasContext.beginPath();
            canvasContext.rect(child.x, child.y, child.width, child.height);
            canvasContext.stroke();
            canvasContext.closePath();
            canvasContext.clip();
            canvasContext.translate(child.x, child.y);
            child.onDraw(canvasContext);
            canvasContext.restore();
        });
    }
    dispatchTouchEvent(event) {
        if (this._children.length > 0) {
            this._children.forEach(function (child: View) {
                child.dispatchTouchEvent(event);
            })
        }else{
            this.emit(event.type,event);
        }

        return false;
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