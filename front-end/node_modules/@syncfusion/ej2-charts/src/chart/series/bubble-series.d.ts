import { Chart } from '../chart';
import { Series } from './chart-series';
import { Axis } from '../../chart/axis/axis';
/**
 * `BubbleSeries` module is used to render the bubble series.
 */
export declare class BubbleSeries {
    /**
     * Render the Bubble series.
     * @return {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    /**
     * To destroy the Bubble.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    doAnimation(series: Series): void;
}
