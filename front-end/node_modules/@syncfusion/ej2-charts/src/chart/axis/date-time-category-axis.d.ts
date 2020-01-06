import { Axis } from '../axis/axis';
import { Category } from '../axis/category-axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
/**
 * Category module is used to render category axis.
 */
export declare class DateTimeCategory extends Category {
    private axisSize;
    /**
     * Constructor for the category module.
     * @private
     */
    constructor(chart: Chart);
    /**
     * The function to calculate the range and labels for the axis.
     * @return {void}
     * @private
     */
    calculateRangeAndInterval(size: Size, axis: Axis): void;
    /**
     * Calculate label for the axis.
     * @private
     */
    calculateVisibleLabels(axis: Axis): void;
    /**
     * To get the Indexed axis label text with axis format for DateTimeCategory axis
     * @param value
     * @param format
     */
    getIndexedAxisLabel(value: string, format: Function): string;
    /**
     * get same interval
     */
    private sameInterval;
    /**
     * Get module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the category axis.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
