import { Gantt } from '../base/gantt';
import { Tooltip as TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { IGanttData, PredecessorTooltip } from '../base/interface';
import { EventMarkerModel } from '../models/models';
/**
 * File for handling tooltip in Gantt.
 */
export declare class Tooltip {
    parent: Gantt;
    toolTipObj: TooltipComponent;
    private predecessorTooltipData;
    private currentTarget;
    private tooltipMouseEvent;
    constructor(gantt: Gantt);
    /**
     * To create tooltip.
     * @return {void}
     * @private
     */
    createTooltip(): void;
    private tooltipBeforeRender;
    private tooltipCloseHandler;
    private mouseMoveHandler;
    /**
     * Method to update tooltip position
     * @param args
     */
    private updateTooltipPosition;
    /**
     * Method to get mouse pointor position
     * @param e
     */
    private getPointorPosition;
    /**
     *  Getting tooltip content for different elements
     */
    private getTooltipContent;
    /**
     * To get the details of an event marker.
     * @private
     */
    getMarkerTooltipData(args: TooltipEventArgs): EventMarkerModel;
    /**
     * To get the details of a connector line.
     * @private
     */
    getPredecessorTooltipData(args: TooltipEventArgs): PredecessorTooltip;
    /**
     * @private
     * To compile template string.
     */
    templateCompiler(template: string, parent: Gantt, data: IGanttData | PredecessorTooltip, propName: string): NodeList;
    private destroy;
}
