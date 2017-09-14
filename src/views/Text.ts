/// <reference path="View.ts" />
'use strict'

namespace cs {
    export namespace view {
        export class Text extends View {

            private $text: string = '';
            public get text(): string {
                return this.$text;
            }
            public set text(text: string) {
                this.$text = text;
            }
            public color: string;
            private $textAlign: string;
            private $verticalAlign: string;
            public fontFamily: string = '';
            private $size: number = 12;
            public get size(): number {
                return this.$size;
            }
            public set size(size: number) {
                this.$size = size;
            }
            private $lineHeight: number;
            public get lineHeight(): number {
                return this.$lineHeight || this.size * 1.5;
            }
            public set lineHeight(lineHeight: number) {
                this.$lineHeight = lineHeight;
            }

            constructor() {
                super();
            }
            onMeasure(ow: number, oh: number): void {
                var textWidth = this.measureText(this.text).width;
                var textHeight = this.lineHeight;
                if (this.$width === this.WRAP_CONTENT) {
                    this.contentWidth = Math.max(this.contentWidth, textWidth);
                    this.contentHeight = Math.max(this.contentHeight, textHeight);
                } else if (this.$height === this.WRAP_CONTENT) {
                    var lineCount = textWidth / this.width;
                    if(lineCount>=1){
                        this.contentWidth = Math.max(this.contentWidth, this.width);                        
                    }else{
                        this.contentWidth = Math.max(this.contentWidth, textWidth);                                                
                    }
                    textHeight = lineCount * textHeight;
                }
            }
            onDraw(canvasContext:CanvasRenderingContext2D): void {
                canvasContext.textBaseline = 'top';
                canvasContext.font = String(this.size) + 'px ' + this.fontFamily;
                canvasContext.fillStyle = this.color;
                canvasContext.fillText(this.text,0,0,this.contentWidth);

            }
            public measureText(text: string): TextMetrics {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                context.font = String(this.size) + 'px ' + this.fontFamily;
                return context.measureText(text);
            }
        }
    }
}
