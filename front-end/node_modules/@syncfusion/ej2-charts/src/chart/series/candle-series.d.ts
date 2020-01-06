import { Rect } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
/**
 * `CandleSeries` module is used to render the candle series.
 */
export declare class CandleSeries extends ColumnBase {
    /**
     * Render Candle series.
     * @return {void}
     * @private
     */
    render(series: Series): void;
    /**
     * Trigger point rendering event
     */
    protected triggerPointRenderEvent(series: Series, point: Points): IPointRenderEventArgs;
    /**
     * Find the color of the candle
     * @param series
     * @private
     */
    private getCandleColor;
    /**
     * Finds the path of the candle shape
     * @param Series
     * @private
     */
    getPathString(topRect: Rect, midRect: Rect, series: Series): string;
    /**
     * Draws the candle shape
     * @param series
     * @private
     */
    drawCandle(series: Series, point: Points, rect: Rect, argsData: IPointRenderEventArgs, direction: string): void;
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
     * To destroy the candle series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
