'use strict'
namespace cs{
    export namespace paint{
        export namespace Painter{
            function childrenForEach(children:Array<view.View>){

            }
            export function paint(displayer:displayer.Displayer){
                var children = displayer.children;
                var i = 0,l = children.length,child:view.View;
                var context = displayer.canvasContext;
                child = children[0];
                measure(child,0,0);
                draw(child,displayer.canvasContext);
            }
            function setHeight(view:view.View,childrenHeight:number){
                if(view.height === view.WRAP_CONTENT){
                    view.height = childrenHeight;
                }else if(view.height === view.MATCH_PARNET){
                    var parent = view.parent||view.displayer;
                    if(parent){
                        view.height = parent.height;
                    }
                }
            }
            function setWidth(view:view.View,childrenWidth:number){
                if(view.width === view.WRAP_CONTENT){
                    view.width = childrenWidth;
                }else if(view.width === view.MATCH_PARNET){
                    var parent = view.parent||view.displayer;
                    if(parent){
                        view.width = parent.width;
                    }
                }
            }
            function measure(view:view.View,preWidth:number,preHeight:number){
                var children = view.children;
                var i = 0,l = children.length,child:view.View;
                var childrenHeight = 0,childrenWidth = 0;
                while (i<l) {
                    child = children[i];
                    measure(child,childrenWidth,childrenHeight);
                    childrenHeight = Math.max(child.height+child.y,childrenHeight);
                    childrenWidth = Math.max(child.width+child.x,childrenWidth);
                    i++;
                }
                setHeight(view,childrenHeight);
                setWidth(view,childrenWidth);   
                view.onMeasure(view.width,view.height);
                layout(view,preWidth,preHeight);                    
                
            }
            function layout(view:view.View,preWidth:number,preHeight:number){
                var top = view.y;
                var left = view.x;
                if(top === undefined){
                    top = preHeight;
                }
                if(left === undefined){
                    left = preWidth;
                }
                var right = left + view.width;
                var bottom = top + view.height;
                view.onLayout(top,left,right,bottom);
            }
            function draw(view:view.View,canvasContext:CanvasRenderingContext2D){
                canvasContext.save();
                canvasContext.strokeStyle = 'transparent';
                canvasContext.fillStyle = 'transparent';
                canvasContext.beginPath();
                canvasContext.translate(view.x, view.y);
                canvasContext.stroke();
                canvasContext.closePath();
                canvasContext.clip();
                view.onDraw(canvasContext); 
                view.children.forEach(function(child){
                    draw(child,canvasContext);
                });               
                canvasContext.restore();
                
            }
        }
    }
}