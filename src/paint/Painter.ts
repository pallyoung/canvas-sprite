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
                context.clearRect(0,0,displayer.width,displayer.height);
                draw(child,context);
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
                var contentHeight = 0,contentWidth = 0;
                while (i<l) {
                    child = children[i];
                    measure(child,contentHeight,contentWidth);
                    contentHeight = Math.max(child.height+child.y,contentHeight);
                    contentWidth = Math.max(child.width+child.x,contentWidth);
                    i++;
                }
                view.contentHeight = contentHeight;
                view.contentWidth = contentWidth;
                view.onMeasure(view.width,view.height);
                layout(view,preWidth,preHeight);                    
                
            }
            function layout(view:view.View,preWidth:number,preHeight:number){
                var top = view.y||0;
                var left = view.x||0;
                // if(top === undefined){
                //     top = preHeight;
                // }
                var right = left + view.width;
                var bottom = top + view.height;
                view.y = top;
                view.x = left;
                view.onLayout(top,left,right,bottom);
            }
            function draw(view:view.View,canvasContext:CanvasRenderingContext2D){
                //判断是否可见
                if(!view.visibility){
                    return;
                }
                canvasContext.save();
                canvasContext.strokeStyle = 'transparent';
                canvasContext.beginPath();
                canvasContext.translate(view.x, view.y);
                //缩放
                canvasContext.scale(view.scaleX,view.scaleY);

                //旋转
                canvasContext.translate(view.originX,view.originY);
                canvasContext.rotate(view.rotate);
                canvasContext.translate(-view.originX,-view.originY);

                //设置绘制上下文
                canvasContext.rect(0,0,view.width,view.height);
                canvasContext.stroke();
                canvasContext.closePath();
                canvasContext.clip();
                canvasContext.save();
                view.onDraw(canvasContext); 
                canvasContext.restore();
                view.children.forEach(function(child){
                    draw(child,canvasContext);
                });               
                canvasContext.restore();
                
            }
        }
    }
}