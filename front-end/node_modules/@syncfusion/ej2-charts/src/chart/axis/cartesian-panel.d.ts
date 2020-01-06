import { Chart } from '../chart';
import { Axis, Row, Column } from '../axis/axis';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
export declare class CartesianAxisLayoutPanel {
    private chart;
    private initialClipRect;
    private htmlObject;
    private element;
    private padding;
    /** @private */
    leftSize: number;
    /** @private */
    rightSize: number;
    /** @private */
    topSize: number;
    /** @private */
    bottomSize: number;
    /** @private */
    seriesClipRect: Rect;
    /** @private */
    constructor(chartModule?: Chart);
    /**
     * Measure the axis size.
     * @return {void}
     * @private
     */
    measureAxis(rect: Rect): void;
    private measureRowAxis;
    private measureColumnAxis;
    /**
     * Measure the column and row in chart.
     * @return {void}
     * @private
     */
    measureDefinition(definition: Row | Column, chart: Chart, size: Size, clipRect: Rect): void;
    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
    private calculateAxisSize;
    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
    measure(): void;
    private getAxisOffsetValue;
    private crossAt;
    private updateCrossAt;
    private pushAxis;
    private arrangeAxis;
    private getActualColumn;
    private getActualRow;
    /**
     * Measure the row size.
     * @return {void}
     */
    private calculateRowSize;
    /**
     * Measure the row size.
     * @param rect
     */
    private calculateColumnSize;
    /**
     * To render the axis element.
     * @return {void}
     * @private
     */
    renderAxes(): Element;
    /**
     * To render the axis scrollbar
     * @param chart
     * @param axis
     */
    private renderScrollbar;
    /**
     * To find the axis position
     * @param axis
     */
    private findAxisPosition;
    /**
     * To render the bootom line of the columns and rows
     * @param definition
     * @param index
     * @param isRow
     */
    private drawBottomLine;
    /**
     * To render the axis line
     * @param axis
     * @param index
     * @param plotX
     * @param plotY
     * @param parent
     * @param rect
     */
    private drawAxisLine;
    /**
     * To render the yAxis grid line
     * @param axis
     * @param index
     * @param parent
     * @param rect
     */
    private drawYAxisGridLine;
    /**
     * To check the border of the axis
     * @param axis
     * @param index
     * @param value
     */
    private isBorder;
    /**
     * To render the yAxis label
     * @param axis
     * @param index
     * @param parent
     * @param rect
     * @private
     */
    drawYAxisLabels(axis: Axis, index: number, parent: Element, rect: Rect): void;
    /**
     * To render the yAxis label border.
     * @param axis
     * @param index
     * @param parent
     * @param rect
     */
    private drawYAxisBorder;
    /**
     * To render the yAxis title
     * @param axis
     * @param index
     * @param parent
     * @param rect
     */
    private drawYAxisTitle;
    /**
     * xAxis grid line calculation performed here
     * @param axis
     * @param index
     * @param parent
     * @param rect
     */
    private drawXAxisGridLine;
    /**
     * To calcualte the axis minor line
     * @param axis
     * @param tempInterval
     * @param rect
     * @param labelIndex
     */
    private drawAxisMinorLine;
    /**
     * To find the numeric value of the log
     * @param axis
     * @param logPosition
     * @param logInterval
     * @param value
     * @param labelIndex
     */
    private findLogNumeric;
    /**
     * To render the xAxis Labels
     * @param axis
     * @param index
     * @param parent
     * @param rect
     * @private
     */
    drawXAxisLabels(axis: Axis, index: number, parent: Element, rect: Rect): void;
    /**
     * To get axis label text
     * @param breakLabels
     * @param label
     * @param axis
     * @param intervalLength
     */
    private getLabelText;
    /**
     * To render the x-axis label border.
     * @param axis
     * @param index
     * @param parent
     * @param axisRect
     */
    private drawXAxisBorder;
    /**
     * To create border element of the axis
     * @param axis
     * @param index
     * @param labelBorder
     * @param parent
     */
    private createAxisBorderElement;
    /**
     * To find the axis label of the intersect action
     * @param axis
     * @param label
     * @param width
     */
    private findAxisLabel;
    /**
     * X-Axis Title function performed
     * @param axis
     * @param index
     * @param parent
     * @param rect
     */
    private drawXAxisTitle;
    /**
     * To render the axis grid and tick lines(Both Major and Minor)
     * @param axis
     * @param index
     * @param gridDirection
     * @param gridModel
     * @param gridId
     * @param gridIndex
     * @param parent
     * @param themeColor
     * @param dashArray
     */
    private renderGridLine;
    /**
     * To Find the parent node of the axis
     * @param chart
     * @param label
     * @param axis
     * @param index
     */
    private findParentNode;
    /**
     * Create Zooming Labels Function Called here
     * @param chart
     * @param labelElement
     * @param axis
     * @param index
     * @param rect
     */
    private createZoomingLabel;
    /**
     * To get Rotate text size
     * @param isBreakLabel
     * @param axis
     * @param label
     * @param angle
     * @param chart
     */
    private getRotateText;
}
