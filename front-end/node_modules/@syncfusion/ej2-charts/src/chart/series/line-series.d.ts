import { Chart } from '../chart';
import { Series } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../../chart/axis/axis';
/**
 * `LineSeries` module used to render the line series.
 */
export declare class LineSeries extends LineBase {
    /**
     * Render Line Series.
     * @return {void}.
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
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the line series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
