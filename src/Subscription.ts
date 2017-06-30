'use strict'
export default class Subscription{
    private type:string;
    private vendor:object;
    constructor(type:string){
        this.type = type;
        this.vendor = {};
    }   
    removeSubscriber(subscriber){
        delete this.vendor[subscriber.id];
    }
}