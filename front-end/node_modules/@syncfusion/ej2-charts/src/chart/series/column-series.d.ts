import { Chart } from '../chart';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * `ColumnSeries` Module used to render the column series.
 */
export declare class ColumnSeries extends ColumnBase {
    /**
     * Render Column series.
     * @return {void}
     * @private
     */
    render(series: Series): void;
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
     * To destroy the column series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
