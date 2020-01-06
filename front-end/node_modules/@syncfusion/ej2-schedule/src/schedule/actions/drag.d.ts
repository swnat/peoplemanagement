import { ActionBase } from '../actions/action-base';
/**
 * Schedule events drag actions
 */
export declare class DragAndDrop extends ActionBase {
    private widthUptoCursorPoint;
    private heightUptoCursorPoint;
    private timelineEventModule;
    private cursorPointIndex;
    private isHeaderRows;
    private isTimelineDayProcess;
    private widthPerMinute;
    private heightPerMinute;
    private minDiff;
    private isStepDragging;
    private isMorePopupOpened;
    private isAllDayDrag;
    wireDragEvent(element: HTMLElement): void;
    private dragHelper;
    private dragPosition;
    private setDragActionDefaultValues;
    private dragStart;
    private drag;
    private calculateMinutesDiff;
    private dragStop;
    updateNavigatingPosition(e: MouseEvent & TouchEvent): void;
    updateDraggingDateTime(e: MouseEvent & TouchEvent): void;
    navigationWrapper(): void;
    private viewNavigation;
    private morePopupEventDragging;
    private calculateVerticalTime;
    private updateEventHeight;
    private updateAllDayEvents;
    private swapDragging;
    private calculateVerticalDate;
    private calculateTimelineTime;
    private getOffsetValue;
    private getHeightDiff;
    private getWidthDiff;
    private getColumnIndex;
    private getCursorCurrentIndex;
    private cursorIndex;
    private calculateResourceGroupingPosition;
    private appendCloneElement;
    private getEventWrapper;
    private getAllDayEventHeight;
    private isAllowDrop;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
