import { PathOption } from '@syncfusion/ej2-svg-base';
import { Axis } from '../axis/axis';
import { Series, Points } from './chart-series';
import { Chart } from '../chart';
import { AnimationModel } from '../../common/model/base-model';
/**
 * Base for line type series.
 */
export declare class LineBase {
    chart: Chart;
    /** @private */
    constructor(chartModule?: Chart);
    /**
     * To improve the chart performance.
     * @return {void}
     * @private
     */
    enableComplexProperty(series: Series): Points[];
    /**
     * To generate the line path direction
     * @param firstPoint
     * @param secondPoint
     * @param series
     * @param isInverted
     * @param getPointLocation
     * @param startPoint
     */
    getLineDirection(firstPoint: Points, secondPoint: Points, series: Series, isInverted: Boolean, getPointLocation: Function, startPoint: string): string;
    /**
     * To append the line path.
     * @return {void}
     * @private
     */
    appendLinePath(options: PathOption, series: Series, clipRect: string): void;
    /**
     * To render the marker for the series.
     * @return {void}
     * @private
     */
    renderMarker(series: Series): void;
    /**
     * To do the progressive animation.
     * @return {void}
     * @private
     */
    doProgressiveAnimation(series: Series, option: AnimationModel): void;
    /**
     * To store the symbol location and region
     * @param point
     * @param series
     * @param isInverted
     * @param getLocation
     */
    storePointLocation(point: Points, series: Series, isInverted: boolean, getLocation: Function): void;
    /**
     * To find point with in the visible range
     * @param point
     * @param yAxis
     * @private
     */
    withinYRange(point: Points, yAxis: Axis): boolean;
    /**
     * To get first and last visible points
     * @private
     */
    getFirstLastVisiblePoint(points: Points[]): {
        first: Points;
        last: Points;
    };
    /**
     * To do the linear animation.
     * @return {void}
     * @private
     */
    doLinearAnimation(series: Series, animation: AnimationModel): void;
}
