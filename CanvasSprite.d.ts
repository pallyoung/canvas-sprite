
declare interface Subscription{
     emit(event:SpriteEvent):void;
    addListener(listener:(eventSpriteEvent)=>any,context:any):void;
    removeListener(listener:(event:SpriteEvent)=>any,context:any):void
}
declare interface Subscriber {
    id:number;
    type:string;
    subscription:Subscription;
    listener:(event:SpriteEvent)=>any;
}


declare interface SpriteEvent {
    type:string;
    target:any;
    timeStamp:number;
    isPropagation:boolean;
    isStopImmediate:boolean;
    stopPropagation():void;
    stopImmediatePropagation():void;
}