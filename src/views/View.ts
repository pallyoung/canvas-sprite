/// <reference path="./../event/EventTarget.ts" />
'use strict'

/**
 * 构造View
 * onMeasure
 * onSizeChanged
 * onLayout
 * onDraw
 */
namespace cs {
    export namespace view {

        const MATCH_PARNET = Infinity;
        const WRAP_CONTENT = -Infinity;
        export class View extends event.EventTarget {
            public get MATCH_PARNET():number{
                return MATCH_PARNET
            };
            public get WRAP_CONTENT():number{
                return WRAP_CONTENT;
            };
            private $x: number;
            public set x(x:number){
                this.$x = x;
            }
            public get x():number{
                return this.$x||0;
            }
            private $y: number;
            public set y(y:number){
                this.$y = y;
            }
            public get y():number{
                return this.$y;
            }
            private get clientX(){
                return this.$x;
            }
            private set clientX(clientX:number){
                this.$x = clientX;
            }
            private get clientY(){
                return this.$y;
            }
            private set clientY(clientY:number){
                this.$y = clientY;
            }
            private $height:number = WRAP_CONTENT;

            public get height():number{
                return this.$height;
            }
            public set height(height:number){
                this.$height = height;
            }
            private $width:number = WRAP_CONTENT;
            public get width():number{
                return this.$width
            }
            public set width(width:number){
                this.$width = width;
            }
            private $children: Array<View> = [];
            public get children():Array<View>{
                return this.$children;
            }
            private $parent: View = null;
            public get parent():View{
                return this.$parent;
            }
            backgroundColor:string;
            private $displayer:displayer.Displayer= null;
            
            public get displayer():displayer.Displayer{
                return this.$displayer;
            }
            touchEnabled: boolean = false;

            private $scaleX: number = 0;
            private $scaleY: number = 0;

            private $rotate: number = 0;

            private $visibility:boolean = true;
            public get visibility():boolean{
                return this.$visibility;
            }
            public set visibility(visibility:boolean){
                this.$visibility = visibility;
            }

            constructor() {
                super();
            }
            $setParent(parent:View){
                this.$parent = parent;
            }

            onMount():void{

            }
            onUnmount():void{

            }
            onLayout(t:number,r:number,b:number,l:number): void {
                this.x = t;
                this.y = b;
                console.log('onlayout')
            }
            onMeasure(ow:number,oh:number): void {
                this.height = oh;
                this.width = ow;
                console.log('measure')
            }
            onDraw(canvasContext: CanvasRenderingContext2D): void {
                canvasContext.fillStyle = this.backgroundColor;
                canvasContext.fillRect(0,0,this.width,this.height);
                console.log('draw')
            }
            onSizeChanged(){

            }
           
            dispatchTouchEvent(event: TouchEvent): boolean {
                // var { pageX, pageY } = event.touches[0];
                // for (let i = this._children.length - 1, children = this._children, child: IView; i >= 0; i--) {
                //     child = children[i];
                //     if (child.pageX < pageX &&
                //         (child.pageX + child.width) > pageX &&
                //         child.pageY < pageY &&
                //         (child.pageY + child.pageY) > pageY) {
                //         child.onDispatchTouchEvent(event);
                //         return true;
                //     }
                // }
                return false;
            }
            addChild(child:View): void {
                if(child.parent){
                    throw new Error();
                }
                child.$setParent(this);
                this.$children.push(child);

            }
            removeChild(child: View): void {
                for (let i = 0, children = this.$children, l = children.length; i < l; i++) {
                    if (child == children[i]) {
                        this.$children.splice(i, 1);
                        return;
                    }
                }
            }
            scale(xy: number, y?: number): void {
                this.$scaleX = xy;
                this.$scaleY = y || xy;
            }
            rotate(rotate: number, x?: number, y?: number): void {
                // this.$rotate = rotate;
                // this._rotateX = x || 0;
                // this._rotateY = y || 0;
            }
        }
    }
}

