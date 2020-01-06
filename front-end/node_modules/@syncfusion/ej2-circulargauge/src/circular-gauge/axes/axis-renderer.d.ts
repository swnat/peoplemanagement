import { CircularGauge } from '../circular-gauge';
import { Axis, Tick } from './axis';
/**
 * Specifies the Axis rendering for circular gauge
 */
export declare class AxisRenderer {
    private majorValues;
    private gauge;
    /**
     * Constructor for axis renderer.
     * @private.
     */
    constructor(gauge: CircularGauge);
    /**
     * Method to render the axis element of the circular gauge.
     * @return {void}
     * @private
     */
    drawAxisOuterLine(axis: Axis, index: number, element: Element, gauge: CircularGauge): void;
    /**
     * Method to render the axis line of the circular gauge.
     * @return {void}
     * @private
     */
    drawAxisLine(axis: Axis, index: number, element: Element, gauge: CircularGauge): void;
    /**
     * Method to render the axis labels of the circular gauge.
     * @return {void}
     * @private
     */
    drawAxisLabels(axis: Axis, index: number, element: Element, gauge: CircularGauge): void;
    /**
     * Method to find the anchor of the axis label.
     * @private
     */
    private findAnchor;
    /**
     * Methode to check whether the labels are intersecting or not.
     * @private
     */
    private FindAxisLabelCollision;
    /**
     * Methode to get anchor position of label as start.
     * @private
     */
    private getAxisLabelStartPosition;
    /**
     * Methode to offset label height and width based on angle.
     * @private
     */
    private offsetAxisLabelsize;
    /**
     * Method to render the axis minor tick lines of the circular gauge.
     * @return {void}
     * @private
     */
    drawMinorTickLines(axis: Axis, index: number, element: Element, gauge: CircularGauge): void;
    /**
     * Method to render the axis major tick lines of the circular gauge.
     * @return {void}
     * @private
     */
    drawMajorTickLines(axis: Axis, index: number, element: Element, gauge: CircularGauge): void;
    /**
     * Method to calcualte the tick elements for the circular gauge.
     * @return {void}
     * @private
     */
    calculateTicks(value: number, options: Tick, axis: Axis): string;
    /**
     * Method to render the axis range of the circular gauge.
     * @return {void}
     * @private
     */
    drawAxisRange(axis: Axis, index: number, element: Element, gauge: CircularGauge): void;
    /**
     * Method to calculate the radius of the axis range.
     * @return {void}
     */
    private calculateRangeRadius;
    /**
     * Method to get the range color of the circular gauge.
     * @return {void}
     * @private
     */
    setRangeColor(axis: Axis): void;
}
