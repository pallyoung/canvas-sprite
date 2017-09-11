import { View } from './views/View';
export declare class Sprite extends View {
    canvasContext: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    private animationFrameHandle;
    isRunning: boolean;
    constructor(canvas: HTMLCanvasElement);
    onMeasure(): void;
    private paint();
    run(): void;
    stop(): void;
}
