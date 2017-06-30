'use strict'
var id = 0;
import Subscription from './Subscription';

class Subscriber{
    private id:number;
    private type:string;
    private subscription:Subscription;
    constructor(){
        this.id = id++;
    }
    remove(){

    }
}