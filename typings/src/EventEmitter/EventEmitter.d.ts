declare class EventEmitter {
    private subscriptions;
    constructor();
    emit(type: string, event: Event): void;
    addEventListener(type: string, listener: () => any, context: any): void;
    removeEventListener(type: string, listener: () => any, context: any): void;
}
export default EventEmitter;
