import Event from './Event';
declare class Subscription {
    private type;
    private vendor;
    constructor(type: string);
    emit(event: Event): void;
    addListener(listener: (event: Event) => any, context: any): void;
    removeListener(listener: (event: Event) => any, context: any): void;
}
export default Subscription;
