'use script'
import { View } from './views/View';
import { ISprite } from './ISprite';
import { EventEmitter } from './event/EventEmitter';
import {NativeEventDispatcher} from './event/NativeEventDispatcher';
export class Sprite extends View {
    canvasContext: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    private animationFrameHandle: number;
    isRunning: boolean;
    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.height = canvas.height;
        this.width = canvas.width;
        this.canvasContext = canvas.getContext('2d');
        this.parent = this;
        var nativeEventDispatcher =  new  NativeEventDispatcher();
        nativeEventDispatcher.init(this.canvas,this);
    }
    onMeasure() {
        var parent: any = this.canvas;
        var x = parent.offsetLeft;
        var y = parent.offsetTop;
        while (parent.offsetParent) {
            parent = parent.offsetParent;
            x += parent.offsetLeft;
            y += parent.offsetTop;
        }
        this.pageX = x;
        this.pageY = y;
    }
    private paint(): void {
        var self = this;
        this.animationFrameHandle = requestAnimationFrame(function () {
            self.canvasContext.clearRect(0, 0, self.width, self.height);
            self.draw(self.canvasContext);
            self.run();
        });
    }
    run(): void {
        this.isRunning = true;
        this.paint();
    }
    stop(): void {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrameHandle);
    }
}