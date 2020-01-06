import { ChartLocation } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
import { BoxPlotMode } from '../utils/enum';
import { Axis } from '../../chart/axis/axis';
/**
 * `BoxAndWhiskerSeries` module is used to render the box and whisker series.
 */
export declare class BoxAndWhiskerSeries extends ColumnBase {
    /**
     * Render BoxAndWhisker series.
     * @return {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    /**
     * update the tip region fo box plot
     * @param series
     * @param point
     * @param sideBySideInfo
     */
    private updateTipRegion;
    /**
     * Update tip size to tip regions
     * @param series
     * @param point
     * @param region
     * @param isInverted
     */
    private updateTipSize;
    /**
     * Calculation for path direction performed here
     * @param point
     * @param series
     * @param median
     * @param average
     */
    getPathString(point: Points, series: Series, median: ChartLocation, average: ChartLocation): string;
    /**
     * Rendering for box and whisker append here.
     * @param series
     * @param point
     * @param rect
     * @param argsData
     * @param direction
     */
    renderBoxAndWhisker(series: Series, point: Points, rect: Rect, argsData: IPointRenderEventArgs, direction: string, median: number): void;
    /**
     * To find the box plot values
     * @param yValues
     * @param point
     * @param mode
     */
    findBoxPlotValues(yValues: number[], point: Points, mode: BoxPlotMode): void;
    /**
     * to find the exclusive quartile values
     * @param yValues
     * @param count
     * @param percentile
     */
    private getExclusiveQuartileValue;
    /**
     * to find the inclusive quartile values
     * @param yValues
     * @param count
     * @param percentile
     */
    private getInclusiveQuartileValue;
    /**
     * To find the quartile values
     * @param yValues
     * @param count
     * @param lowerQuartile
     * @param upperQuartile
     */
    private getQuartileValues;
    /**
     * To find the min, max and outlier values
     * @param yValues
     * @param lowerQuartile
     * @param upperQuartile
     * @param minimum
     * @param maximum
     * @param outliers
     */
    private getMinMaxOutlier;
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
