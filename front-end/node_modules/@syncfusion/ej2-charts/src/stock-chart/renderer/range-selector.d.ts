import { StockChart } from '../stock-chart';
/** @private */
export declare class RangeSelector {
    private stockChart;
    constructor(stockChart: StockChart);
    initializeRangeNavigator(): void;
    private findMargin;
    private findSeriesCollection;
    private calculateChartSize;
    /**
     * Performs slider change
     * @param start
     * @param end
     */
    sliderChange(start: number, end: number): void;
}
