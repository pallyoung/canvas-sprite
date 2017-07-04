'use strict'
import { EventDispatcher } from './../event/EventDispatcher';
import { IView } from './IView';
import { Event } from './../event/Event';
import { TouchEvent } from './../event/TouchEvent';
export class View extends EventDispatcher implements IView {
    height: number;
    width: number;
    x: number;
    y: number;
    pageX: number;
    pageY: number;
    private _children: Array<IView>;
    backgroundColor: string;
    parent: IView;
    touchEnabled:boolean;
    _scaleX:number;
    _scaleY:number;
    _scaleZ:number;
    _rotateX:number;
    _rotateY:number;
    _rotateZ:number;
    _translateX:number;
    _translateY:number;
    _translateZ:number;
    _isAttached:boolean;
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
        this.onDraw(canvasContext);
        this.dispatchDraw(canvasContext);
    }
    onLayout(): void {

    }
    onMeasure(): void {

    }
    draw(canvasContext: CanvasRenderingContext2D):void{

    }
    onDraw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.beginPath();
        canvasContext.fillStyle = this.backgroundColor;
        canvasContext.fillRect(0, 0, this.width, this.height);
        canvasContext.closePath();
    }
    dispatchDraw(canvasContext: CanvasRenderingContext2D):void{
        var self = this;
        this._children.forEach(function (child) {
            canvasContext.save();
            canvasContext.strokeStyle = 'transparent'
            canvasContext.beginPath();
            canvasContext.translate(child.x+child._translateX, child.y+child._translateY);
            canvasContext.translate(child.width/2, child.height/2);
            canvasContext.rotate(child._rotateX);
            canvasContext.translate(-child.width/2, -child.height/2);
            canvasContext.scale(child._scaleX,child._scaleY);
            canvasContext.rect(0, 0, child.width, child.height);
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
        this._scaleX = xyz;
        this._scaleY = y||xyz;
        this._scaleZ = z ||xyz;
    }
    rotate(xyz:number,y?:number,z?:number):void{
        this._rotateX = xyz;
        this._rotateY = y||xyz;
        this._rotateZ = z ||xyz;
    }
    translate(xyz:number,y?:number,z?:number):void{
        this._translateX = xyz;
        this._translateY = y||xyz;
        this._translateZ = z ||xyz;
    }
}