declare namespace eventEmitter{
    export interface Subscription {
        emit(event: Event): void;
        addListener(listener: (eventSpriteEvent) => any, context: any): void;
        removeListener(listener: (event: Event) => any, context: any): void
    }
    export interface Subscriber {
        id: number;
        type: string;
        subscription: Subscription;
        listener: (event: Event) => any;
    }
    export interface Event {
        type: string;
        target: any;
        currentTarget:any;
        timeStamp: number;
        isPropagation: boolean;
        isStopImmediate: boolean;
        stopPropagation(): void;
        stopImmediatePropagation(): void;
    }
    export interface EventEmitter {
        dispatchEvent(type: string, event: Event): void;
        addEventListener(type: string, listener: () => any, context: any): void;
        removeEventListener(type: string, listener: () => any, context: any): void;
    }
}
declare namespace canvassprite {
    export interface View extends eventEmitter.EventEmitter {
        height: number;
        width: number;
        x: number;
        y: number;
        addChild(child: View): void;
        removeChild(child: View): void;
        onDraw(canvas: HTMLCanvasElement): void;
    }
    export interface Text extends View {

    }
}
