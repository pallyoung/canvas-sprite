'use strict'
import { EventEmitter } from './../event/EventEmitter';
import { IView } from './IView';
import { Event } from './../event/Event';
import { TouchEvent } from './../event/TouchEvent';
export class View extends EventEmitter implements IView {
    height: number;
    width: number;
    x: number;
    y: number;
    pageX: number;
    pageY: number;
    private _children: Array<IView>;
    backgroundColor: string;
    parent: IView;
    private _scaleX:number;
    private _scaleY:number;
    private _scaleZ:number;
    private _rotateX:number;
    private _rotateY:number;
    private _rotateZ:number;
    private _translateX:number;
    private _translateY:number;
    private _translateZ:number;
    constructor() {
        super();
        this._children = [];
        this.backgroundColor = 'transparent'
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;
        this.pageX = 0;
        this.pageY = 0;
    }
    draw(canvasContext: CanvasRenderingContext2D): void {
        this.onMeasure();
        this.onLayout();
        this.layout();
        this.onDraw(canvasContext);
        this.drawChildren(canvasContext);
    }
    private layout(): void {
        if (this.parent != null) {
            this.pageX = this.parent.pageX + this.x;
            this.pageY = this.parent.pageY + this.y;
        }
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
    }
    drawChildren(canvasContext: CanvasRenderingContext2D): void {
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
            child.draw(canvasContext);
            canvasContext.restore();
        });
    }
    dispatchTouchEvent(event: TouchEvent) {
        var { pageX, pageY } = event.touches[0];
        var handle = false;
        for (let i = this._children.length - 1, children = this._children, child: IView; i >= 0; i--) {
            child = children[i];
            if (child.pageX < pageX &&
                (child.pageX + child.width) > pageX &&
                child.pageY < pageY &&
                (child.pageY + child.pageY) > pageY) {
                child.dispatchTouchEvent(event);
                handle = true;
                return false;
            }
        }
        if (handle == false) {
            this.dispatchPropagationEvent(event);
        }
        return false;
    }
    dispatchPropagationEvent(event: Event) {
        event.target = this;
        this.emit(event.type, event);
        if (this.parent != this && event.isPropagation) {
            this.parent.dispatchPropagationEvent(event)
        }
    }
    addChild(child: IView): void {
        child.parent = this;
        child.height = child.height || this.height;
        child.width = child.width || this.width;
        child.x = child.x || 0;
        child.y = child.y || 0;
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
    scale(xyz:number,y?:number,z?:number):void{

    }
    rotate(xyz:number,y?:number,z?:number):void{

    }
}