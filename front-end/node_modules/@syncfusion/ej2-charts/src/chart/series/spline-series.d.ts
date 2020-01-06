import { Chart } from '../chart';
import { Series } from './chart-series';
import { SplineBase } from './spline-base';
import { Axis } from '../../chart/axis/axis';
/**
 * `SplineSeries` module is used to render the spline series.
 */
export declare class SplineSeries extends SplineBase {
    /**
     * Render the spline series.
     * @return {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    /**
     *
     * @param data To find the direct of spline using points.
     * @param firstPoint
     * @param point
     * @param xAxis
     * @param yAxis
     * @param isInverted
     * @param series
     * @param startPoint
     * @param getCoordinate
     * @param direction
     */
    private getSplineDirection;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the spline.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
