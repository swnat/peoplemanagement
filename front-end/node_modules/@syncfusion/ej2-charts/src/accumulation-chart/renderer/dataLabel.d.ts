import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { AccPoints } from '../model/acc-base';
import { AccumulationDataLabelSettingsModel } from '../model/acc-base-model';
import { AccumulationChart } from '../accumulation';
import { AccumulationBase } from './accumulation-base';
/**
 * AccumulationDataLabel module used to render `dataLabel`.
 */
export declare class AccumulationDataLabel extends AccumulationBase {
    /** @private */
    titleRect: Rect;
    /** @private */
    areaRect: Rect;
    /** @private */
    clearTooltip: number;
    private id;
    marginValue: number;
    constructor(accumulation: AccumulationChart);
    /**
     * Method to get datalabel text location.
     * @private
     */
    getDataLabelPosition(point: AccPoints, dataLabel: AccumulationDataLabelSettingsModel, textSize: Size, points: AccPoints[], parent: Element, id: string): void;
    /**
     * Method to get datalabel bound.
     */
    private getLabelRegion;
    /**
     * Method to get datalabel smart position.
     */
    private getSmartLabel;
    /**
     * To find trimmed datalabel tooltip needed.
     * @return {void}
     * @private
     */
    move(e: Event, x: number, y: number, isTouch?: boolean): void;
    /**
     * To find previous valid label point
     */
    private findPreviousPoint;
    /**
     * To find current point datalabel is overlapping with other points
     */
    private isOverlapping;
    /**
     * To get text trimmed while exceeds the accumulation chart area.
     */
    private textTrimming;
    /**
     * To set point label visible and region to disable.
     */
    private setPointVisibileFalse;
    /**
     * To set datalabel angle position for outside labels
     */
    private setOuterSmartLabel;
    /**
     * Sets smart label positions for funnel and pyramid series
     */
    private setSmartLabelForSegments;
    /**
     * To find connector line overlapping.
     */
    private isConnectorLineOverlapping;
    /**
     * To find two rectangle intersect
     */
    private isLineRectangleIntersect;
    /**
     * To find two line intersect
     */
    private isLinesIntersect;
    /**
     * To get two rectangle overlapping angles.
     */
    private getOverlappedAngle;
    /**
     * To get connector line path
     */
    private getConnectorPath;
    /**
     * Finds the curved path for funnel/pyramid data label connectors
     */
    private getPolyLinePath;
    /**
     * Finds the bezier point for funnel/pyramid data label connectors
     */
    private getBezierPoint;
    /**
     * To get label edges based on the center and label rect position.
     */
    private getEdgeOfLabel;
    /**
     * Finds the distance between the label position and the edge/center of the funnel/pyramid
     */
    private getLabelDistance;
    /**
     * Finds the label position / beginning of the connector(ouside funnel labels)
     */
    private getLabelLocation;
    /**
     * Finds the beginning of connector line
     */
    private getConnectorStartPoint;
    /**
     * To find area rect based on margin, available size.
     * @private
     */
    findAreaRect(): void;
    /**
     * To render the data labels from series points.
     */
    renderDataLabel(point: AccPoints, dataLabel: AccumulationDataLabelSettingsModel, parent: Element, points: AccPoints[], series: number, templateElement?: HTMLElement, redraw?: boolean): void;
    /**
     * To find the template element size
     * @param element
     * @param point
     * @param argsData
     */
    private getTemplateSize;
    /**
     * To set the template element style
     * @param childElement
     * @param point
     * @param parent
     * @param labelColor
     * @param fill
     */
    private setTemplateStyle;
    /**
     * To find saturated color for datalabel
     */
    private getSaturatedColor;
    /**
     * Animates the data label template.
     * @return {void}.
     * @private
     */
    doTemplateAnimation(accumulation: AccumulationChart, element: Element): void;
    /**
     * To find background color for the datalabel
     */
    private getLabelBackground;
    /**
     * To correct the padding between datalabel regions.
     */
    private correctLabelRegion;
    /**
     * To get the dataLabel module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the data label.
     * @return {void}
     * @private
     */
    destroy(accumulation: AccumulationChart): void;
}
