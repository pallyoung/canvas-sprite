declare namespace cs {
}
declare namespace cs {
    namespace paint {
        namespace Painter {
            function paint(displayer: displayer.Displayer): void;
        }
    }
}
/**
 * https://dom.spec.whatwg.org/#dom-event-composed
 */
declare namespace cs {
    namespace event {
        interface EventListenerOptions {
            capture: boolean;
        }
        interface AddEventListenerOptions extends EventListenerOptions {
            passive: boolean;
            once: boolean;
        }
        class EventTarget {
            private $eventListeners;
            constructor();
            addEventListener(type: string, callback: (event: Event) => void, options: boolean | AddEventListenerOptions): void;
            removeEventListener(type: string, callback: (event: Event) => void, options: boolean | EventListenerOptions): void;
            dispatchEvent(event: Event): boolean;
        }
    }
}
declare namespace cs {
    namespace displayer {
        interface DisplayOpitons {
            height?: number;
            width?: number;
        }
        class Displayer extends event.EventTarget {
            private $container;
            private $canvasContext;
            readonly canvasContext: CanvasRenderingContext2D;
            private $canvas;
            private $children;
            readonly children: Array<view.View>;
            private $height;
            private $width;
            private $running;
            height: number;
            width: number;
            constructor(container: HTMLElement, options?: DisplayOpitons);
            onCreate(): void;
            setContentView(view: view.View): void;
            private piant();
        }
    }
}
declare namespace cs {
    namespace time {
        interface ITime {
            TIME_ORIGIN: number;
            timeStamp: number;
        }
        var Time: ITime;
    }
}
declare namespace cs {
    namespace event {
        type EventInit = {
            bubbles?: boolean;
            cancelable?: boolean;
            composed?: boolean;
        };
        /**
         * @export
         * @class Event
         * @description implement Event interface
         */
        class Event {
            /**
             * 事件类型
             * @private
             * @type {string}
             * @memberof Event
             */
            private $type;
            readonly type: string;
            /**
            * target
            * @readonly
            * @type {EventTarget}
            * @memberof Event
            */
            private $target;
            readonly target: EventTarget;
            /**
             * currentTarget
             *
             * @private
             * @type {EventTarget}
             * @memberof Event
             */
            private $currentTarget;
            readonly currentTarget: EventTarget;
            /**
             * EventParse
             *
             * @private
             * @type {number}
             * @memberof Event
             */
            private $NONE;
            readonly NONE: number;
            private $CAPTURING_PHASE;
            readonly CAPTURING_PHASE: number;
            private $AT_TARGET;
            readonly AT_TARGET: number;
            private $BUBBLING_PHASE;
            readonly BUBBLING_PHASE: number;
            /**
             * eventPhase
             *
             * @private
             * @type {number}
             * @memberof Event
             */
            private $eventPhase;
            readonly eventPhase: number;
            /**
             * 是否取消冒泡
             *
             * @private
             * @type {boolean}
             * @memberof Event
             */
            private $cancelBubble;
            cancelBubble: boolean;
            private $bubbles;
            readonly bubbles: boolean;
            private $cancelable;
            readonly cancelable: boolean;
            private $defaultPrevented;
            readonly defaultPrevented: boolean;
            private $composed;
            readonly composed: boolean;
            private $timeStamp;
            readonly timeStamp: number;
            private $isTrusted;
            readonly isTrusted: boolean;
            private $isStopImmediatePropagation;
            private $path;
            readonly path: EventTarget[];
            /**
             * initialized flag
             *
             * @private
             * @type {boolean}
             * @memberof Event
             */
            private $initialized;
            constructor(type: string, eventInitDict?: EventInit);
            $setTarget(target: EventTarget): void;
            $setCurrentTarget(currentTarget: EventTarget): void;
            stopPropagation(): void;
            stopImmediatePropagation(): void;
            preventDefault(): void;
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
            composedPath(): Array<EventTarget>;
            initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
        }
    }
}
declare namespace cs {
    namespace shape {
        interface rect {
            x: number;
            y: number;
            width: number;
            height: number;
        }
        interface Point {
            x: number;
            y: number;
        }
    }
}
/**
 * 构造View
 * onMeasure
 * onSizeChanged
 * onLayout
 * onDraw
 */
declare namespace cs {
    namespace view {
        class View extends event.EventTarget {
            readonly MATCH_PARNET: number;
            readonly WRAP_CONTENT: number;
            private $x;
            x: number;
            private $y;
            y: number;
            private clientX;
            private clientY;
            protected $height: number;
            height: number;
            protected $width: number;
            width: number;
            contentHeight: number;
            contentWidth: number;
            private $children;
            readonly children: Array<View>;
            private $parent;
            readonly parent: View;
            backgroundColor: string | CanvasGradient;
            private $displayer;
            readonly displayer: displayer.Displayer;
            touchEnabled: boolean;
            scaleX: number;
            scaleY: number;
            rotate: number;
            originX: number;
            originY: number;
            private $visibility;
            visibility: boolean;
            constructor();
            $setParent(parent: View): void;
            onMount(): void;
            onUnmount(): void;
            onLayout(t: number, r: number, b: number, l: number): void;
            onMeasure(ow: number, oh: number): void;
            onDraw(canvasContext: CanvasRenderingContext2D): void;
            onSizeChanged(): void;
            dispatchTouchEvent(event: TouchEvent): boolean;
            addChild(child: View): void;
            removeChild(child: View): void;
        }
    }
}
declare namespace cs {
    namespace view {
        class Text extends View {
            private $text;
            text: string;
            color: string | CanvasGradient;
            private $textAlign;
            private $verticalAlign;
            fontFamily: string;
            private $size;
            private $lineCount;
            private $rows;
            size: number;
            private $lineHeight;
            lineHeight: number;
            constructor();
            onMeasure(ow: number, oh: number): void;
            onDraw(canvasContext: CanvasRenderingContext2D): void;
            measureText(text: string): TextMetrics;
        }
    }
}
