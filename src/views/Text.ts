/// <reference path="View.ts" />
'use strict'

namespace cs{
    export namespace view{
        export class Text extends View{

            private $text:string;
            private $color:string;
            private $textAlign:string;
            private $verticalAlign:string;
            private $font:string;
            private $size:number;

            constructor(){
                super();
            }
            onMeasure(ow:number,oh:number):void{
                
            }
            onDraw():void{
        
            }
        }
    }
}
