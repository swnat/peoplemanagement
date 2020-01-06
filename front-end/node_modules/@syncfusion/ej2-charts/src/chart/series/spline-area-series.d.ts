import { Chart } from '../chart';
import { Series } from './chart-series';
import { SplineBase } from './spline-base';
import { Axis } from '../../chart/axis/axis';
/**
 * `SplineAreaSeries` module used to render the spline area series.
 */
export declare class SplineAreaSeries extends SplineBase {
    /**
     * Render the splineArea series.
     * @return {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
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
