import { Chart } from '../chart';
import { Series } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../axis/axis';
/**
 * `StackingLineSeries` module used to render the Stacking Line series.
 */
export declare class StackingLineSeries extends LineBase {
    /**
     * Render the Stacking line series.
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
     * To destroy the stacking line.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
