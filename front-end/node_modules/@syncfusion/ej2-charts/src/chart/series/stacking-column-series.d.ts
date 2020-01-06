import { Chart } from '../chart';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * `StackingColumnSeries` module used to render the stacking column series.
 */
export declare class StackingColumnSeries extends ColumnBase {
    /**
     * Render the Stacking column series.
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
     * To destroy the stacking column.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
