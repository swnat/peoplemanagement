import { CircularGauge } from '../circular-gauge';
import { Axis, Pointer } from './axis';
/**
 * Specifies the Axis rendering for circular gauge
 */
export declare class PointerRenderer {
    private gauge;
    /**
     * Constructor for pointer renderer.
     * @private.
     */
    constructor(gauge: CircularGauge);
    /**
     * Method to render the axis pointers of the circular gauge.
     * @return {void}
     * @private
     */
    drawPointers(axis: Axis, axisIndex: number, element: Element, gauge: CircularGauge, animate?: boolean): void;
    /**
     * Measure the pointer length of the circular gauge.
     * @return {void}
     */
    private calculatePointerRadius;
    /**
     * Method to render the needle pointer of the ciruclar gauge.
     * @return {void}
     */
    private drawNeedlePointer;
    /**
     * Method to set the pointer value of the circular gauge.
     * @return {void}
     * @private
     */
    setPointerValue(axis: Axis, pointer: Pointer, value: number): void;
    /**
     * Method to render the marker pointer of the ciruclar gauge.
     * @return {void}
     */
    private drawMarkerPointer;
    /**
     * Method to render the range bar pointer of the ciruclar gauge.
     * @return {void}
     */
    private drawRangeBarPointer;
    /**
     * Method to perform the animation of the pointer in circular gauge.
     * @return {void}
     */
    private doPointerAnimation;
    /**
     * Perform the needle and marker pointer animation for circular gauge.
     * @return {void}
     * @private
     */
    performNeedleAnimation(element: HTMLElement, start: number, end: number, axis: Axis, pointer: Pointer, radius?: number, innerRadius?: number): void;
    /**
     * Perform the range bar pointer animation for circular gauge.
     * @return {void}
     * @private
     */
    performRangeBarAnimation(element: HTMLElement, start: number, end: number, axis: Axis, pointer: Pointer, radius: number, innerRadius?: number): void;
}
