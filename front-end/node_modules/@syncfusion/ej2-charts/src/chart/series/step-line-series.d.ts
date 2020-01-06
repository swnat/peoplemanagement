import { Chart } from '../chart';
import { Series } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../../chart/axis/axis';
/**
 * `StepLineSeries` module is used to render the step line series.
 */
export declare class StepLineSeries extends LineBase {
    /**
     * Render the Step line series.
     * @return {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    doAnimation(series: Series): void;
    /**
     * To destroy the step line series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
