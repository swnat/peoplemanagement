import { ChartLocation } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { Axis } from '../../chart/axis/axis';
import { LineBase } from './line-base';
import { ChartSegmentModel } from './chart-series-model';
/**
 * Base class for multi colored series
 */
export declare class MultiColoredSeries extends LineBase {
    /**
     * To Generate the area path direction
     * @param xValue
     * @param yValue
     * @param series
     * @param isInverted
     * @param getPointLocation
     * @param startPoint
     * @param startPath
     */
    getAreaPathDirection(xValue: number, yValue: number, series: Series, isInverted: boolean, getPointLocation: Function, startPoint: ChartLocation, startPath: string): string;
    /**
     * To Generate the empty point direction
     * @param firstPoint
     * @param secondPoint
     * @param series
     * @param isInverted
     * @param getPointLocation
     */
    getAreaEmptyDirection(firstPoint: ChartLocation, secondPoint: ChartLocation, series: Series, isInverted: boolean, getPointLocation: Function): string;
    /**
     * To set point color
     * @param points
     */
    setPointColor(currentPoint: Points, previous: Points, series: Series, isXSegment: boolean, segments: ChartSegmentModel[]): boolean;
    sortSegments(series: Series, chartSegments: ChartSegmentModel[]): ChartSegmentModel[];
    /**
     * Segment calculation performed here
     * @param series
     * @param options
     * @param chartSegments
     */
    applySegmentAxis(series: Series, options: PathOption[], segments: ChartSegmentModel[]): void;
    private includeSegment;
    /**
     * To create clip rect for segment axis
     * @param startValue
     * @param endValue
     * @param series
     * @param index
     * @param isX
     * @param chart
     */
    createClipRect(startValue: number, endValue: number, series: Series, index: number, isX: boolean): string;
    /**
     * To get exact value from segment value
     * @param segmentValue
     * @param axis
     * @param chart
     */
    getAxisValue(segmentValue: Object, axis: Axis, chart: Chart): number;
}
