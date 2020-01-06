import { Gantt } from '../base/gantt';
import { TimelineSettingsModel } from '../models/timeline-settings-model';
import { ITimeSpanEventArgs, IGanttData } from '../base/interface';
/**
 * Configures the `Timeline` of the gantt.
 */
export declare class Timeline {
    private parent;
    timelineStartDate: Date;
    timelineEndDate: Date;
    private topTierCellWidth;
    bottomTierCellWidth: number;
    customTimelineSettings: TimelineSettingsModel;
    chartTimelineContainer: HTMLElement;
    topTier: string;
    bottomTier: string;
    isSingleTier: boolean;
    private previousIsSingleTier;
    timelineRoundOffEndDate: Date;
    totalTimelineWidth: number;
    isZoomIn: boolean;
    isZooming: boolean;
    isZoomToFit: boolean;
    constructor(ganttObj?: Gantt);
    /**
     * To initialize the public property.
     * @return {void}
     * @private
     */
    private initProperties;
    /**
     * To render timeline header series.
     * @return {void}
     * @private
     */
    validateTimelineProp(): void;
    /**
     * Function used to refresh Gantt rows.
     * @return {void}
     * @private
     */
    refreshTimeline(): void;
    /**
     * Function used to refresh Gantt rows.
     * @return {void}
     * @private
     */
    refreshTimelineByTimeSpan(): void;
    /**
     * Function used to refresh Gantt rows.
     * @return {void}
     * @private
     */
    updateChartByNewTimeline(): void;
    /**
     * Function used to perform Zoomin and Zoomout actions in Gantt control.
     * @param isZoomIn
     * @private
     * @return {void}
     */
    processZooming(isZoomIn: boolean): void;
    /**
     * To change the timeline settings property values based upon the Zooming levels.
     * @return {void}
     * @private
     */
    private changeTimelineSettings;
    /**
     * To perform the zoom to fit operation in Gantt.
     * @return {void}
     * @private
     */
    processZoomToFit(): void;
    private roundOffDateToZoom;
    private calculateNumberOfTimelineCells;
    /**
     * To validate time line unit.
     * @return {void}
     * @private
     */
    processTimelineUnit(): void;
    /**
     * To validate timeline properties.
     * @return {void}
     * @private
     */
    private processTimelineProperty;
    /**
     * To find the current zooming level of the Gantt control.
     * @return {void}
     * @private
     */
    calculateZoomingLevelsPerDayWidth(): void;
    /**
     * To find the current zooming level of the Gantt control.
     * @return {void}
     * @private
     */
    private checkCurrentZoomingLevel;
    /**
     * @private
     */
    private getCurrentZoomingLevel;
    /**
     * Getting closest zooimg level.
     * @private
     */
    private getClosestUnit;
    private checkCollectionsWidth;
    /**
     * To create timeline header template.
     * @return {void}
     * @private
     */
    updateTimelineHeaderHeight(): void;
    /**
     * To create timeline header template.
     * @return {void}
     * @private
     */
    createTimelineSeries(): void;
    /**
     * To validate timeline tier count.
     * @return {number}
     * @private
     */
    private validateCount;
    /**
     * To validate bottom tier count.
     * @return {number}
     * @private
     */
    private validateBottomTierCount;
    /**
     * To validate timeline tier format.
     * @return {string}
     * @private
     */
    private validateFormat;
    /**
     * To perform extend operation.
     * @return {object}
     * @private
     */
    extendFunction(cloneObj: Object, propertyCollection: string[], innerProperty?: Object): Object;
    /**
     * To format date.
     * @return {string}
     * @private
     */
    private formatDateHeader;
    /**
     * Custom Formatting.
     * @return {string}
     * @private
     */
    private customFormat;
    /**
     * To create timeline template .
     * @return {string}
     * @private
     */
    private createTimelineTemplate;
    private getTimelineRoundOffEndDate;
    /**
     *
     * @param startDate
     * @param count
     * @param mode
     * @private
     */
    getIncrement(startDate: Date, count: number, mode: String): number;
    /**
     * Method to find header cell was weekend or not
     * @param mode
     * @param tier
     * @param day
     */
    private isWeekendHeaderCell;
    /**
     * To construct template string.
     * @return {string}
     * @private
     */
    private getHeaterTemplateString;
    /**
     * To calculate last 'th' width.
     * @return {number}
     * @private
     */
    private calculateWidthBetweenTwoDate;
    /**
     * To calculate timeline width.
     * @return {void}
     * @private
     */
    private timelineWidthCalculation;
    /**
     * To validate per day width.
     * @return {number}
     * @private
     */
    private getPerDayWidth;
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    private roundOffDays;
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    updateScheduleDatesByToolBar(mode: string, span: string, startDate: Date, endDate: Date): void;
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    updateTimeLineOnEditing(tempArray: IGanttData[], action: string): void;
    /**
     * To validate project start date and end date on editing action
     * @return {void}
     * @private
     */
    performTimeSpanAction(type: string, isFrom: string, startDate: Date, endDate: Date, mode?: string): void;
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    timeSpanActionEvent(eventType: string, requestType?: string, isFrom?: string): ITimeSpanEventArgs;
}
