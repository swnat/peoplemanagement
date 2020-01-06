import { Chart } from '../chart';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * `WaterfallSeries` module is used to render the waterfall series.
 */
export declare class WaterfallSeries extends ColumnBase {
    /**
     * Render waterfall series.
     * @return {void}
     * @private
     */
    render(series: Series): void;
    /**
     * To check intermediateSumIndex in waterfall series.
     * @return boolean
     * @private
     */
    private isIntermediateSum;
    /**
     * To check sumIndex in waterfall series.
     * @return boolean
     * @private
     */
    private isSumIndex;
    /**
     * To trigger the point rendering event for waterfall series.
     * @return IPointRenderEventArgs
     * @private
     */
    private triggerPointRenderEvent;
    /**
     * Add sumIndex and intermediateSumIndex data.
     * @return {object[]}
     * @private
     */
    processInternalData(json: Object[], series: Series): Object[];
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
     * To destroy the waterfall series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
