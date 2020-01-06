import { Chart } from '../chart';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * `HiloSeries` module is used to render the hilo series.
 */
export declare class HiloSeries extends ColumnBase {
    /**
     * Render Hiloseries.
     * @return {void}
     * @private
     */
    render(series: Series): void;
    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    private triggerPointRenderEvent;
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
     * To destroy the Hilo series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
