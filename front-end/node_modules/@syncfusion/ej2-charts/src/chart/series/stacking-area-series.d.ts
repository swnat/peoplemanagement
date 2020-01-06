import { Chart } from '../chart';
import { Series } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../../chart/axis/axis';
/**
 * `StackingAreaSeries` module used to render the Stacking Area series.
 */
export declare class StackingAreaSeries extends LineBase {
    /**
     * Render the Stacking area series.
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
     * To destroy the stacking area.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To find previous visible series
     */
    private getPreviousSeries;
    /**
     * To find the first visible series index
     * @param seriesCollection
     */
    private getFirstSeriesIndex;
}
