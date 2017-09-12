'use strict'
namespace cs{
    const TIME_ORIGIN = Date.now();
    export namespace time{

        export interface ITime {
            TIME_ORIGIN:number;
            timeStamp:number;
        }
        class TimeImpl implements ITime{
            public get TIME_ORIGIN():number{
                return TIME_ORIGIN;
            }
            public get timeStamp():number{
                return Date.now() - TIME_ORIGIN;
            }
            constructor(){

            }
        }
       
       export var Time:ITime = new TimeImpl();
    }
}