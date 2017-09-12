'use strict'
/**
 * https://dom.spec.whatwg.org/#dom-event-composed
 */
/// <reference path="../time/Time" />

namespace cs {
    export namespace event {

        export type EventInit = {
            bubbles?: boolean;
            cancelable?: boolean;
            composed?: boolean;
        };
        /**
         * @export
         * @class Event
         * @description implement Event interface
         */
        export class Event {
            /**
             * 事件类型
             * @private
             * @type {string}
             * @memberof Event
             */
            private $type: string;

            public get type(): string {
                return this.$type;
            }

             /**
             * target
             * @readonly
             * @type {EventTarget}
             * @memberof Event
             */
            private $target: EventTarget; 
            public get target(): EventTarget {
                return this.$target;
            }
            /**
             * currentTarget
             * 
             * @private
             * @type {EventTarget}
             * @memberof Event
             */
            private $currentTarget: EventTarget;

            public get currentTarget(): EventTarget {
                return this.$currentTarget;
            }
            /**
             * EventParse 
             * 
             * @private
             * @type {number}
             * @memberof Event
             */
            private $NONE: number = 0;
            public get NONE(): number {
                return this.$NONE;
            }

            private $CAPTURING_PHASE: number = 1;
            public get CAPTURING_PHASE(): number {
                return this.$CAPTURING_PHASE;
            }

            private $AT_TARGET: number = 2;
            public get AT_TARGET(): number {
                return this.$AT_TARGET;
            }

            private $BUBBLING_PHASE: number = 3;
            public get BUBBLING_PHASE(): number {
                return this.$BUBBLING_PHASE;
            }
            /**
             * eventPhase
             * 
             * @private
             * @type {number}
             * @memberof Event
             */
            private $eventPhase: number = 2;
            public get eventPhase(): number {
                return this.$eventPhase;
            }
            /**
             * 是否取消冒泡
             * 
             * @private
             * @type {boolean}
             * @memberof Event
             */
            private $cancelBubble:boolean = false;
            public get cancelBubble():boolean{
                return this.$cancelBubble;
            }
            public set cancelBubble(cancelBubble:boolean){
                this.$cancelBubble = cancelBubble;
            }

            private $bubbles: boolean;
            public get bubbles(): boolean {
                return this.$bubbles;
            }
            private $cancelable: boolean;
            public get cancelable(): boolean {
                return this.$cancelable;
            }
            private $defaultPrevented: boolean;
            public get defaultPrevented(): boolean {
                return this.$defaultPrevented;
            }
            private $composed: boolean;
            public get composed(): boolean {
                return this.$composed;
            }

            private $timeStamp: number;
            public get timeStamp(): number {
                return this.$timeStamp;
            }
            private $isTrusted: boolean = false;
            public get isTrusted(): boolean {
                return this.$isTrusted;
            }
            private $isStopImmediatePropagation:boolean = false;

            private $path:Array<EventTarget> = [];
            public get path(){
                return this.$path;
            }

            /**
             * initialized flag
             * 
             * @private
             * @type {boolean}
             * @memberof Event
             */
            private $initialized:boolean = false;

            constructor(type: string, eventInitDict?: EventInit) {

                this.$initialized = true;                
                this.$timeStamp = time.Time.timeStamp;
                this.$composed = !!eventInitDict.composed;
                this.$isTrusted = false;
                this.$target = null;
                this.$currentTarget = null;
                this.initEvent(type,eventInitDict.bubbles,eventInitDict.cancelable);
                
            }

            $setTarget(target: EventTarget): void {
                this.$target = target;
            }

            $setCurrentTarget(currentTarget: EventTarget) {
                this.$currentTarget = currentTarget;
            }

            public stopPropagation(): void {
                this.$cancelBubble = true;
            }
            public stopImmediatePropagation(): void {
                this.$cancelBubble = true;
                this.$isStopImmediatePropagation = true;
            }
            public preventDefault(): void {
                if(this.$cancelable){
                    this.$defaultPrevented = true;                    
                }
            }

            /**
             * https://dom.spec.whatwg.org/#dom-event-cancelbubble
             * 
             * The composedPath() method, when invoked, must run these steps:
             *
             *  Let composedPath be a new empty list.
             *
             *  Let currentTarget be context object’s currentTarget attribute value.
             *
             *  For each tuple in context object’s path:
             *
             *    If currentTarget is a Window object, then:
             *
             *    If tuple’s item is not a node, or tuple’s item is not closed-shadow-hidden from tuple’s item’s shadow-including root, then append tuple’s item to composedPath.
             *
             *    Otherwise, if currentTarget is a node and tuple’s item is not closed-shadow-hidden from currentTarget, or currentTarget is not a node, then append tuple’s item to composedPath.
             *
             *   Return composedPath.
             * 
             * @returns {Array<EventTarget>} 
             * @memberof Event
             * @todo
             */
            public composedPath():Array<EventTarget>{
                var composedPath = [];
                var path = this.path;
                var currentTarget = this.currentTarget;
                composedPath = path;
                return composedPath;
            }

            public initEvent(type:string, bubbles?:boolean, cancelable?:boolean):void{
                if(this.$isTrusted){
                    return;
                }
                this.$type = type;
                this.$bubbles = !!bubbles;
                this.$cancelable = !!cancelable;
            }
        }
    }
}