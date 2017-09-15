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
            protected $height:number = WRAP_CONTENT;
            
            public get height():number{
                if(this.$height === WRAP_CONTENT){
                    return this.contentHeight;
                }else if(this.$height ===MATCH_PARNET){
                    var parent = this.parent||this.displayer||{height:0};
                    return parent.height;
                }
                return this.$height;
            }
            public set height(height:number){
                this.$height = height;
            }
            
            protected $width:number = WRAP_CONTENT;
            public get width():number{
                if(this.$width === WRAP_CONTENT){
                    return this.contentWidth;
                }else if(this.$width ===MATCH_PARNET){
                    var parent = this.parent||this.displayer||{width:0};
                    return parent.width;
                }
                return this.$width;
            }
            public set width(width:number){
                this.$width = width;
            }

            public contentHeight:number = 0;

            public contentWidth:number = 0;

            
            private $children: Array<View> = [];
            public get children():Array<View>{
                return this.$children;
            }
            private $parent: View = null;
            public get parent():View{
                return this.$parent;
            }
            backgroundColor:string|CanvasGradient;
            private $displayer:displayer.Displayer= null;
            
            public get displayer():displayer.Displayer{
                return this.$displayer;
            }
            touchEnabled: boolean = false;

            public scaleX: number = 1;
            public scaleY: number = 1;

            public rotate: number = 0;
            public originX: number = 0;
            public originY: number = 0;
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

            }
            onMeasure(ow:number,oh:number): void {

            }
            onDraw(canvasContext: CanvasRenderingContext2D): void {
                //背景
                if(this.$width!==WRAP_CONTENT){
                    canvasContext.fillStyle = this.backgroundColor||'transparent';
                    canvasContext.fillRect(0,0,this.width,this.height);
                }
                //border
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
        }
    }
}

