import { ControlPoints } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
/**
 * render Line series
 */
export declare class SplineBase extends LineBase {
    private splinePoints;
    /** @private */
    constructor(chartModule?: Chart);
    /**
     * To find the control points for spline.
     * @return {void}
     * @private
     */
    findSplinePoint(series: Series): void;
    protected getPreviousIndex(points: Points[], i: number, series: Series): number;
    getNextIndex(points: Points[], i: number, series: Series): number;
    filterEmptyPoints(series: Series): Points[];
    /**
     * To find points in the range
     * @private
     */
    isPointInRange(points: Points[]): boolean;
    /**
     * To find the natural spline.
     * @return {void}
     * @private
     */
    findSplineCoefficients(points: Points[], series: Series): number[];
    /**
     * To find the control points for spline.
     * @return {void}
     * @private
     */
    getControlPoints(point1: Points, point2: Points, ySpline1: number, ySpline2: number, series: Series): ControlPoints;
    /**
     * calculate datetime interval in hours
     *
     */
    protected dateTimeInterval(series: Series): number;
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    doAnimation(series: Series): void;
}
