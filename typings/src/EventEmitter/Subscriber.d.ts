import Subscription from './Subscription';
import Event from './Event';
declare class Subscriber {
    id: number;
    type: string;
    subscription: Subscription;
    listener: (event: Event) => any;
    context: any;
    constructor(type: string, listener: (any) => any, context: any, subscription: any);
}
export default Subscriber;
