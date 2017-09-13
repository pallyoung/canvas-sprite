'use script'
/// <reference path="../paint/Pianter.ts" />
/// <reference path="../event/EventTarget.ts" />


namespace cs {
    export namespace displayer{

        function createCanvas(width:number,height:number):HTMLCanvasElement{
            var canvas = document.createElement('canvas');
            canvas.height = height;
            canvas.width = width;
            return canvas;
        }
        export interface DisplayOpitons {
            height?:number;
            width?:number;
        }
        export class Displayer extends event.EventTarget{
            private $container:HTMLElement;
            private $canvasContext: CanvasRenderingContext2D;
            public get canvasContext():CanvasRenderingContext2D{
                return this.$canvasContext;
            }
            private $canvas: HTMLCanvasElement;
            private $children:Array<view.View>;
            public get children():Array<view.View>{
                return this.$children;
            }
            private $height:number;
            private $width:number;
            private $running:boolean = false;
            public get height():number{
                return this.$height;
            }
            public set height(height:number){
                this.$canvas.height = height;
                this.$height = height;
            }
            public get width():number{
                return this.$width;
            }
            public set width(width:number){
                this.$canvas.width = width;
                this.$width = width;
            }
            constructor(container: HTMLElement,options?:DisplayOpitons) {
                super();
                this.$container = container;
                options = options || {

                }
                var height = options.height||container.clientHeight;
                var width = options.width || container.clientWidth;
                this.$canvas = createCanvas(width,height);
                this.$height = height;
                this.$width = width;
                this.$canvasContext = this.$canvas.getContext('2d');
                this.onCreate();

            }
            onCreate(){

            }
            public setContentView(view:view.View):void{
                this.$children = [view];
                this.piant();
            }
            private piant(){
                if(this.$children.length<1){
                    return;
                }else{
                    requestAnimationFrame(()=>paint.Painter.paint(this))
                }
            }
            // public removeContentView(view:view.View):void{
            //     var children = this.$children,child;
            //     var i = 0,l = this.$children.length;
            //     while(i<l){
            //         child = children[i];
            //         if(view == child){
            //             children.splice(i,1);
            //             return;
            //         }
            //         i++;
            //     }
            // }

        }
    }
}