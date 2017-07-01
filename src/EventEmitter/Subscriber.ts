'use strict'

import Subscription from './Subscription';
import Event from './Event';
var id = 0;
class Subscriber {
    id: number;
    type: string;
    subscription:Subscription;
    listener: (event: Event) => any;
    context: any;
    constructor(type: string, listener: (any) => any, context: any, subscription:any) {
        this.id = id++;
        this.type = type;
        this.listener = listener;
        this.context = context;

    }
}
export default Subscriber;