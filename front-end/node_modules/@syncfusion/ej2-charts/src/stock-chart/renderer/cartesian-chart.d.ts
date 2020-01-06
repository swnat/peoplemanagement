import { StockChart } from '../stock-chart';
import { Size } from '@syncfusion/ej2-svg-base';
/** @private */
export declare class CartesianChart {
    private stockChart;
    cartesianChartSize: Size;
    constructor(chart: StockChart);
    initializeChart(chartArgsData?: object[]): void;
    private findMargin;
    private findSeriesCollection;
    calculateChartSize(): Size;
    private calculateUpdatedRange;
    /**
     * Cartesian chart refreshes based on start and end value
     * @param stockChart
     * @param start
     * @param end
     */
    cartesianChartRefresh(stockChart: StockChart, start: number, end: number, data?: Object[]): void;
    private copyObject;
}
