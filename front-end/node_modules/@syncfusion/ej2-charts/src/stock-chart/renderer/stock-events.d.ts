/**
 * Used for stock event calculations.
 */
import { StockChart } from '../stock-chart';
import { ChartLocation } from '../../chart/index';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
import { Tooltip } from '@syncfusion/ej2-svg-base';
/**
 * @private
 */
export declare class StockEvents extends BaseTooltip {
    constructor(stockChart: StockChart);
    private stockChart;
    private chartId;
    /** @private */
    stockEventTooltip: Tooltip;
    /** @private */
    symbolLocations: ChartLocation[][];
    private pointIndex;
    private seriesIndex;
    /**
     * @private
     * To render stock events in chart
     */
    renderStockEvents(): Element;
    private findClosePoint;
    private createStockElements;
    renderStockEventTooltip(targetId: string): void;
    /**
     * Remove the stock event tooltip
     * @param duration
     */
    removeStockEventTooltip(duration: number): void;
    private findArrowpaths;
    private applyHighLights;
    private removeHighLights;
    private setOpacity;
    /**
     * @param value
     * To convert the c# or javascript date formats into js format
     * refer chart control's dateTime processing.
     */
    private dateParse;
}
