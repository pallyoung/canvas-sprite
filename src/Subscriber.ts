'use strict'
var id = 0;
class Subscriber{
    id:number;
    type:string;
    subscription:Subscription;
    listener:(event:SpriteEvent)=>any;
    context:any;
    constructor(type:string,listener:(any)=>any,context:any,subscription:Subscription){
        this.id = id++;
        this.type = type;
        this.listener = listener;
        this.context = context;
    }
}
export default Subscriber;