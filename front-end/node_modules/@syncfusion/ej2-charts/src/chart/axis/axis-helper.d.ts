import { Double } from '../axis/double-axis';
import { Axis } from '../../chart/index';
import { Size } from '@syncfusion/ej2-svg-base';
/**
 * Common axis classes
 * @private
 */
export declare class NiceInterval extends Double {
    /**
     * Method to calculate numeric datetime interval
     */
    calculateDateTimeNiceInterval(axis: Axis, size: Size, start: number, end: number, isChart?: boolean): number;
    /**
     * To get the skeleton for the DateTime axis.
     * @return {string}
     * @private
     */
    getSkeleton(axis: Axis, currentValue: number, previousValue: number): string;
    /**
     * Get intervalType month format
     * @param currentValue
     * @param previousValue
     */
    private getMonthFormat;
    /**
     * Get intervalType day label format for the axis
     * @param axis
     * @param currentValue
     * @param previousValue
     */
    private getDayFormat;
    /**
     * Find label format for axis
     * @param axis
     * @param currentValue
     * @param previousValue
     * @private
     */
    findCustomFormats(axis: Axis, currentValue: number, previousValue: number): string;
}
