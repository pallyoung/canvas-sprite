import { IView } from './../views/IView';
export declare class NativeEventDispatcher {
    private node;
    private delegate;
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
    constructor();
    init(node: HTMLElement, delegate: IView): void;
    private bindNativeEvent();
    release(): void;
}
