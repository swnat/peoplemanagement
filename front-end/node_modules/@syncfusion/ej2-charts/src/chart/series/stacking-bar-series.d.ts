import { Chart } from '../chart';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * `StackingBarSeries` module is used to render the stacking bar series.
 */
export declare class StackingBarSeries extends ColumnBase {
    /**
     * Render the Stacking bar series.
     * @return {void}
     * @private
     */
    render(series: Series): void;
    /**
     * To destroy the stacking bar.
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
