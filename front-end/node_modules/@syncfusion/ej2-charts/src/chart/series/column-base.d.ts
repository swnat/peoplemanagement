import { DoubleRange } from '../utils/double-range';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Series, Points } from './chart-series';
import { BorderModel } from '../../common/model/base-model';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
/**
 * Column Series Base
 */
export declare class ColumnBase {
    /**
     * To get the position of the column series.
     * @return {DoubleRange}
     * @private
     */
    protected getSideBySideInfo(series: Series): DoubleRange;
    /**
     * To get the rect values.
     * @return {Rect}
     * @private
     */
    protected getRectangle(x1: number, y1: number, x2: number, y2: number, series: Series): Rect;
    /**
     * To get the position of each series.
     * @return {void}
     * @private
     */
    private getSideBySidePositions;
    private findRectPosition;
    /**
     * Updates the symbollocation for points
     * @return void
     * @private
     */
    protected updateSymbolLocation(point: Points, rect: Rect, series: Series): void;
    /**
     * Update the region for the point.
     * @return {void}
     * @private
     */
    protected updateXRegion(point: Points, rect: Rect, series: Series): void;
    /**
     * Update the region for the point in bar series.
     * @return {void}
     * @private
     */
    protected updateYRegion(point: Points, rect: Rect, series: Series): void;
    /**
     * To render the marker for the series.
     * @return {void}
     * @private
     */
    renderMarker(series: Series): void;
    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    protected triggerEvent(series: Series, point: Points, fill: string, border: BorderModel): IPointRenderEventArgs;
    /**
     * To draw the rectangle for points.
     * @return {void}
     * @private
     */
    protected drawRectangle(series: Series, point: Points, rect: Rect, argsData: IPointRenderEventArgs): void;
    /**
     * To animate the series.
     * @return {void}
     * @private
     */
    animate(series: Series): void;
    /**
     * To animate the series.
     * @return {void}
     * @private
     */
    private animateRect;
    /**
     * To get rounded rect path direction
     */
    private calculateRoundedRectPath;
}
export interface RectPosition {
    position: number;
    rectCount: number;
}
