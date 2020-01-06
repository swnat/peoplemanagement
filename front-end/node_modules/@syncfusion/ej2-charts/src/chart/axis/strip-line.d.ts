import { Chart } from '../chart';
import { Axis } from '../axis/axis';
import { ZIndex } from '../utils/enum';
/**
 * `StripLine` module is used to render the stripLine in chart.
 */
export declare class StripLine {
    /**
     * Finding x, y, width and height of the strip line
     * @param axis
     * @param strip line
     * @param seriesClipRect
     * @param startValue
     * @param segmentAxis
     */
    private measureStripLine;
    /**
     * To get from to value from start, end, size, start from axis
     * @param start
     * @param end
     * @param size
     * @param startFromAxis
     * @param axis
     * @param strip line
     */
    private getFromTovalue;
    /**
     * Finding end value of the strip line
     * @param to
     * @param from
     * @param size
     * @param axis
     * @param end
     * @param strip line
     */
    private getToValue;
    /**
     * To check the strip line values within range
     * @param value
     * @param axis
     */
    private findValue;
    /**
     * To render strip lines based start and end.
     * @private
     * @param chart
     * @param position
     * @param axes
     */
    renderStripLine(chart: Chart, position: ZIndex, axes: Axis[]): void;
    /**
     * To draw the single line strip line
     * @param strip line
     * @param rect
     * @param id
     * @param parent
     * @param chart
     * @param axis
     */
    private renderPath;
    /**
     * To draw the rectangle
     * @param strip line
     * @param rect
     * @param id
     * @param parent
     * @param chart
     */
    private renderRectangle;
    /**
     * To create the text on strip line
     * @param strip line
     * @param rect
     * @param id
     * @param parent
     * @param chart
     * @param axis
     */
    private renderText;
    private invertAlignment;
    /**
     * To find the next value of the recurrence strip line
     * @param axis
     * @param stripline
     * @param startValue
     */
    private getStartValue;
    /**
     * Finding segment axis for segmented strip line
     * @param axes
     * @param axis
     * @param strip line
     */
    private getSegmentAxis;
    /**
     * To render strip line on chart
     * @param axis
     * @param stripline
     * @param seriesClipRect
     * @param id
     * @param striplineGroup
     * @param chart
     * @param startValue
     * @param segmentAxis
     * @param count
     */
    private renderStripLineElement;
    /**
     * To find the factor of the text
     * @param anchor
     */
    private factor;
    /**
     * To find the start value of the text
     * @param xy
     * @param size
     * @param textAlignment
     */
    private getTextStart;
    /**
     * To get the module name for `StripLine`.
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the `StripLine` module.
     * @private
     */
    destroy(): void;
}
