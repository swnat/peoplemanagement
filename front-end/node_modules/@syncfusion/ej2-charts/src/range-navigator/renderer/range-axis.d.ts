import { RangeNavigator } from '../range-navigator';
import { DateTime } from '../../chart/index';
import { RangeIntervalType } from '../../common/utils/enum';
import { VisibleLabels } from '../../chart/index';
/**
 * class for axis
 */
export declare class RangeNavigatorAxis extends DateTime {
    constructor(range: RangeNavigator);
    actualIntervalType: RangeIntervalType;
    rangeNavigator: RangeNavigator;
    firstLevelLabels: VisibleLabels[];
    secondLevelLabels: VisibleLabels[];
    lowerValues: number[];
    gridLines: Element;
    /**
     * To render grid lines of axis
     */
    renderGridLines(): void;
    /**
     * To render of axis labels
     */
    renderAxisLabels(): void;
    /**
     * To find secondary level label type
     * @param type
     */
    private getSecondaryLabelType;
    /**
     * To find labels for date time axis
     * @param axis
     */
    private findAxisLabels;
    /**
     * To find date time formats for Quarter and week interval type
     * @param text
     * @param axis
     * @param index
     */
    private dateFormats;
    /**
     * To find the y co-ordinate for axis labels
     * @param control - rangeNavigator
     * @param isSecondary sets true if the axis is secondary axis
     */
    private findLabelY;
    /**
     * It places the axis labels and returns border for secondary axis labels
     * @param axis axis for the lables placed
     * @param pointY y co-ordinate for axis labels
     * @param id id for the axis elements
     * @param control range navigator
     * @param labelElement parent element in which axis labels appended
     */
    private placeAxisLabels;
    /**
     * To check label is intersected with successive label or not
     */
    private isIntersect;
    /**
     * To find suitable label format for Quarter and week Interval types
     * @param axis
     * @param control
     */
    private findSuitableFormat;
    /**
     * Alignment position for secondary level labels in date time axis
     * @param axis
     * @param index
     */
    private findAlignment;
}
