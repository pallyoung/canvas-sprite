'use strict'
/**
 * https://dom.spec.whatwg.org/#dom-event-composed
 */

namespace cs{
    export namespace event{

        export interface EventListenerOptions  {
            capture:boolean;
        };
          
        export interface AddEventListenerOptions extends EventListenerOptions   {
             passive:boolean ;
             once:boolean ;
        };

        function flattenEventListenerOptions(options:boolean|EventListenerOptions):boolean{
            if(typeof options === 'boolean'){
                return options;
            }else{
                return options.capture;
            }
        }
        function flattenAddEventListenerOptions(options:boolean|AddEventListenerOptions):AddEventListenerOptions{
            var capture = flattenEventListenerOptions(options);
            var once = false,passive = false;
            if(typeof options === 'object'){
                once = !!options.once;
                passive = !!options.passive;
            }
            return {
                capture:capture,
                once:once,
                passive:passive
            }
                

        }

        /**
         * @export
         * @class EventTarget
         * @description implement EventTarget interface
         */

        class EventListener{
            private $type:string;
            public get type():string{
                return this.$type;
            }
            private $callback:Function;

            public get callback():Function{
                return this.$callback;
            }
            private $capture:boolean = false;

            public get capture():boolean{
                return this.$capture;
            }
            private $passive:boolean = false;
            public get passive():boolean{
                return this.$passive;
            }
            private $once :boolean = false;
            public get once():boolean{
                return this.$once;
            }
            private $removed :boolean = false;
            public get removed():boolean{
                return this.$removed;
            }
            public set removed(removed:boolean){
                this.$removed = removed;
            }
            constructor(type:string,callback:(event:Event)=>void,options?:AddEventListenerOptions){
                this.$type = type;
                this.$callback = callback;
                options = options||{
                    passive:false,
                    once:false,
                    capture:false
                };
                this.$passive = !!options.passive;
                this.$once = !!options.once;
                this.$capture = !!options.capture;
                
            }
            public handleEvent(event:Event):void{
                if(event.type==this.$type&&!this.$removed){
                    this.$callback.call(null,event);
                }
            }
        }
        export class EventTarget{
            private $eventListeners:Array<EventListener> = [];
            constructor(){

            }
            public addEventListener(type:string, callback:(event:Event)=>void,options:boolean|AddEventListenerOptions):void{
                if(callback==null){
                    return;
                }
                var eventListeners = this.$eventListeners;
                var eventListener:EventListener;
                var i = 0,l = eventListeners.length;
                options = flattenAddEventListenerOptions(options);
                while(i<l){
                    eventListener = eventListeners[i];
                    if(eventListener.type === type && eventListener.callback === callback && eventListener.capture===options.capture){
                        return;
                    }
                    i++;
                }
                eventListeners.push(new EventListener(type,callback,options));
            }
            public removeEventListener(type:string, callback:(event:Event)=>void, options:boolean|EventListenerOptions):void{
                if(callback==null){
                    return;
                }
                var eventListeners = this.$eventListeners;
                var eventListener:EventListener;
                var i = 0,l = eventListeners.length;
                options = flattenEventListenerOptions(options);
                while(i<l){
                    eventListener = eventListeners[i];
                    if(eventListener.type === type && eventListener.callback === callback && eventListener.capture === options){
                        eventListeners.splice(i,1);
                        eventListener.removed = true;
                        l--;
                    }else{
                        i++;
                    }
                    
                }

            }
            public dispatchEvent(event:Event):boolean{
                this.$eventListeners.forEach(function(eventListener:EventListener){
                    eventListener.handleEvent(event);
                });
                return event.cancelable&&event.defaultPrevented
            }
        }
    }
}