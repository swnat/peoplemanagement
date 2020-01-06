import { LayoutViewer } from './viewer';
/**
 * @private
 */
export declare class Zoom {
    private viewer;
    setZoomFactor(value: number): void;
    constructor(viewer: LayoutViewer);
    private onZoomFactorChanged;
    private zoom;
    onMouseWheelInternal: (event: WheelEvent) => void;
}
