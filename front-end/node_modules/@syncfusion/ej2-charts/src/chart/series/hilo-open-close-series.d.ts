import { ChartLocation } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
/**
 * `HiloOpenCloseSeries` module is used to render the hiloOpenClose series.
 */
export declare class HiloOpenCloseSeries extends ColumnBase {
    /**
     * Render HiloOpenCloseSeries series.
     * @return {void}
     * @private
     */
    render(series: Series): void;
    /**
     * Updates the tick region
     */
    private updateTickRegion;
    /**
     * Trigger point rendering event
     */
    private triggerPointRenderEvent;
    /**
     * To draw the rectangle for points.
     * @return {void}
     * @private
     */
    protected drawHiloOpenClosePath(series: Series, point: Points, open: ChartLocation, close: ChartLocation, rect: Rect, argsData: IPointRenderEventArgs): void;
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
     * To destroy the column series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
