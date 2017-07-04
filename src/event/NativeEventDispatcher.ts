import {IView} from './../views/IView';
import {TouchEvent} from './TouchEvent';
//是否支持touch事件
var IS_TOUCH_ENABLE = "ontouchend" in document ? true : false;

var TOUCH_START = IS_TOUCH_ENABLE?'touchstart':'mousedown';
var TOUCH_MOVE = IS_TOUCH_ENABLE?'touchmove':'mousemove';
var TOUCH_END= IS_TOUCH_ENABLE?'touchend':'mouseup';
var CLICK = 'click';
export class NativeEventDispatcher {
    private node:HTMLElement;
    private delegate:IView;
    private onTouchStart:(event)=>void;
    private onTouchMove:(event)=>void;
    private onTouchEnd:(event)=>void;
    constructor() {
    }
    init(node:HTMLElement,delegate:IView):void{
        this.node = node;
        this.delegate = delegate;
        this.bindNativeEvent();
        
    }
    private bindNativeEvent(){
        var self = this;
        this.onTouchStart = function(e){
            var event = new TouchEvent(TouchEvent.TOUCH_START);
            if(IS_TOUCH_ENABLE){
                event.touches = e.touches;
                event.changedTouches = e.changedTouches;
                event.targetTouches = e.targetTouches;
            }else{
                var point = {
                    clientX:e.clientX,
                    clientY:e.clientY,
                    screenX:e.screenX,
                    screenY:e.screenY,
                    pageX:e.pageX,
                    pageY:e.pageY
                }
                event.touches = [point];
                event.changedTouches = [point];
                event.targetTouches = [point];
            }
            self.delegate.onDispatchTouchEvent(event);
        }

        this.node.addEventListener(TOUCH_START,this.onTouchStart,false);
        this.node.addEventListener(TOUCH_MOVE,this.onTouchMove,false);
        this.node.addEventListener(TOUCH_END,this.onTouchEnd,false);

    }
    release():void{

    }
}