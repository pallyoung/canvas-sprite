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
            public color: string|CanvasGradient;
            private $textAlign: string;
            private $verticalAlign: string;
            public fontFamily: string = '';
            private $size: number = 12;
            private $lineCount:number = 0;
            private $rows:string[] = [];
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
                if(!this.text){
                    this.$lineCount = 0;
                    return;
                }
                var textWidth = this.measureText(this.text).width;
                var textHeight = this.lineHeight;
                if (this.$width === this.WRAP_CONTENT) {
                    this.contentWidth = Math.max(this.contentWidth, textWidth);
                    this.contentHeight = Math.max(this.contentHeight, textHeight);
                    this.$lineCount = 1;
                    this.$rows = [this.text];
                } else {
                    var text = this.text.split('');
                    var code = text.shift();
                    var textWidth = 0,codeWidth = 0;
                    var lineCount = 0;
                    var temp = [];
                    this.$rows = [];
                    while(code){
                        codeWidth = this.measureText(code).width;
                        if(textWidth+codeWidth<this.width){
                            textWidth +=codeWidth;
                            temp.push(code);
                        }else{
                            lineCount++;
                            this.$rows.push(temp.join(''));
                            textWidth = codeWidth;
                            temp = [code];                       
                        }
                        code = text.shift();
                    }
                    lineCount++;
                    this.$rows.push(temp.join(''));
                    if(lineCount>=1){
                        this.contentWidth = Math.max(this.contentWidth, this.width);                        
                    }else{
                        this.contentWidth = Math.max(this.contentWidth, textWidth);                                                
                    }
                    this.$lineCount = lineCount;
                    textHeight = lineCount * textHeight;
                    this.contentHeight = Math.max(this.contentHeight,textHeight);
                }
            }
            onDraw(canvasContext:CanvasRenderingContext2D): void {
                canvasContext.textBaseline = 'middle';
                canvasContext.font = String(this.size) + 'px ' + this.fontFamily;
                canvasContext.fillStyle = this.color;
                for(var i = 0,l = this.$rows.length;i<l;i++){
                    canvasContext.fillText(this.$rows[i],0,this.lineHeight/2+i*this.lineHeight);                     
                }

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
