import { Chart } from '../chart';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * `RangeColumnSeries` module is used to render the range column series.
 */
export declare class RangeColumnSeries extends ColumnBase {
    /**
     * Render Range Column series.
     * @return {void}
     * @private
     */
    render(series: Series): void;
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
    /**
     * To destroy the range column series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
