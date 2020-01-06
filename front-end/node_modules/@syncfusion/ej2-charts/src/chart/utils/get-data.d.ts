import { Chart } from '../chart';
import { PointData, AccPointData } from '../../common/utils/helper';
import { Series } from '../series/chart-series';
/**
 * To get the data on mouse move.
 * @private
 */
export declare class ChartData {
    /** @private */
    chart: Chart;
    lierIndex: number;
    /** @private */
    currentPoints: PointData[] | AccPointData[];
    /** @private */
    previousPoints: PointData[] | AccPointData[];
    insideRegion: boolean;
    /**
     * Constructor for the data.
     * @private
     */
    constructor(chart: Chart);
    /**
     * Method to get the Data.
     * @private
     */
    getData(): PointData;
    isSelected(chart: Chart): boolean;
    private getRectPoint;
    /**
     * Checks whether the region contains a point
     */
    private checkRegionContainsPoint;
    /**
     * To find drag region for column and bar series
     * @param x
     * @param y
     * @param point
     * @param rect
     * @param series
     */
    private rectRegion;
    /**
     * @private
     */
    getClosest(series: Series, value: number): number;
    getClosestX(chart: Chart, series: Series): PointData;
}
