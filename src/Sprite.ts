'use script'
import { View } from './views/View';
import { ISprite } from './ISprite';
import { EventEmitter } from './event/EventEmitter';
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
    }
    private draw(): void {
        var self = this;
        this.animationFrameHandle = requestAnimationFrame(function () {
            self.canvasContext.clearRect(0, 0, self.width, self.height);
            self.onDraw(self.canvasContext);
            self.run();
        });
    }
    run(): void {
        this.isRunning = true;
        this.draw();
    }
    stop(): void {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrameHandle);
    }
}