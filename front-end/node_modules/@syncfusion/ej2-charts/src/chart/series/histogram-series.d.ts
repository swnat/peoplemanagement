import { Chart } from '../chart';
import { Series } from './chart-series';
import { ColumnSeries } from './column-series';
/**
 * `HistogramSeries` Module used to render the histogram series.
 */
export declare class HistogramSeries extends ColumnSeries {
    /**
     * Render Histogram series.
     * @return {void}
     * @private
     */
    render(series: Series): void;
    /**
     * To calculate bin interval for Histogram series.
     * @return number
     * @private
     */
    private calculateBinInterval;
    /**
     * Add data points for Histogram series.
     * @return {object[]}
     * @private
     */
    processInternalData(data: Object[], series: Series): Object[];
    /**
     * Render Normal Distribution for Histogram series.
     * @return {void}
     * @private
     */
    private renderNormalDistribution;
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
     * To destroy the histogram series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
