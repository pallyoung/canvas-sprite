'use strict'
import { EventDispatcher } from './../event/EventDispatcher';
import { Event } from './../event/Event';
import { TouchEvent } from './../event/TouchEvent';
export class View extends EventDispatcher {
    x: number;
    y: number;
    pageX: number;
    pageY: number;
    private _children: Array<IView>;
    parent: IView;
    touchEnabled:boolean;
    _scaleX:number;
    _scaleY:number;
    _rotate:number;
    _rotateX:number;
    _rotateY:number;
    _translateX:number;
    _translateY:number;
    _isAttached:boolean;
    constructor() {
        super();
        this._children = [];
        this.x = 0;
        this.y = 0;
        this.pageX = 0;
        this.pageY = 0;
        this.touchEnabled = false;
        this.rotate(0);
        this.translate(0);
        this.scale(1);
        this._isAttached = false;
    }
    path(canvasContext: CanvasRenderingContext2D):void{
        
    }
    layout(canvasContext: CanvasRenderingContext2D): void {
        this.onMeasure();
        this.onLayout();
        if (this.parent != null) {
            this.pageX = this.parent.pageX + this.x;
            this.pageY = this.parent.pageY + this.y;
        }
       this.draw(canvasContext);
    }
    onLayout(): void {

    }
    onMeasure(): void {

    }
    draw(canvasContext: CanvasRenderingContext2D):void{
        this.onDraw(canvasContext);
        this.dispatchDraw(canvasContext);
    }
    onDraw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.beginPath();
        canvasContext.closePath();
    }
    dispatchDraw(canvasContext: CanvasRenderingContext2D):void{
        var self = this;
        this._children.forEach(function (child) {
            canvasContext.save();
            canvasContext.strokeStyle = 'transparent'
            canvasContext.beginPath();
            canvasContext.translate(child.x+child._translateX, child.y+child._translateY);
            canvasContext.translate(child._rotateX, child._rotateY);
            canvasContext.rotate(child._rotate);
            canvasContext.translate(child._rotateX, child._rotateY);
            canvasContext.scale(child._scaleX,child._scaleY);
            child.path(canvasContext);
            canvasContext.stroke();
            canvasContext.closePath();
            canvasContext.clip();
            child.layout(canvasContext);
            canvasContext.restore();
           
        });
    }
    onDispatchTouchEvent(event: TouchEvent){
        if(!this.touchEnabled){
            if (this.parent != this && event.isPropagation) {
                this.parent.dispatchPropagationEvent(event)
            }
            return;
        }
        if(!this.dispatchTouchEvent(event)){
            this.dispatchPropagationEvent(event);
        }
    }
    dispatchTouchEvent(event: TouchEvent) :boolean{
        var { pageX, pageY } = event.touches[0];
        for (let i = this._children.length - 1, children = this._children, child: IView; i >= 0; i--) {
            child = children[i];
            if (child.pageX < pageX &&
                (child.pageX + child.width) > pageX &&
                child.pageY < pageY &&
                (child.pageY + child.pageY) > pageY) {
                child.onDispatchTouchEvent(event);
                return true;
            }
        }
        return false;
    }
    dispatchPropagationEvent(event: Event) {
        event.target = this;
        this.dispatchEvent(event.type, event);
        if (this.parent != this && event.isPropagation) {
            this.parent.dispatchPropagationEvent(event)
        }
    }
    addChild(child: IView): void {
        if(child._isAttached){
            throw new Error();
        }
        child.parent = this;
        child._isAttached = true;
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
    scale(xy:number,y?:number):void{
        this._scaleX = xy;
        this._scaleY = y||xy;
    }
    rotate(rotate:number,x?:number,y?:number):void{
        this._rotate = rotate;
        this._rotateX = x||0;
        this._rotateY = y||0;
    }
    translate(xy:number,y?:number):void{
        this._translateX = xy;
        this._translateY = y||xy;
    }
}