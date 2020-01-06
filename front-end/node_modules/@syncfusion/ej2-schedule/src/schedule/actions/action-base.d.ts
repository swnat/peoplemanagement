import { ActionBaseArgs, ResizeEdges, DragEventArgs, ResizeEventArgs } from '../base/interface';
import { Schedule } from '../base/schedule';
import { MonthEvent } from '../event-renderer/month';
import { VerticalEvent } from '../event-renderer/vertical-view';
/**
 * Base class for the common drag and resize related actions
 */
export declare class ActionBase {
    parent: Schedule;
    actionObj: ActionBaseArgs;
    resizeEdges: ResizeEdges;
    scrollArgs: ActionBaseArgs;
    scrollEdges: ResizeEdges;
    monthEvent: MonthEvent;
    verticalEvent: VerticalEvent;
    daysVariation: number;
    constructor(parent: Schedule);
    getChangedData(): {
        [key: string]: Object;
    };
    saveChangedData(eventArgs: DragEventArgs | ResizeEventArgs): void;
    calculateIntervalTime(date: Date): Date;
    getContentAreaDimension(): {
        [key: string]: Object;
    };
    getPageCoordinates(e: MouseEvent & TouchEvent): (MouseEvent & TouchEvent) | Touch;
    getIndex(index: number): number;
    updateTimePosition(date: Date): void;
    getResourceElements(table: HTMLTableCellElement[]): HTMLTableCellElement[];
    getOriginalElement(element: HTMLElement): HTMLElement[];
    createCloneElement(element: HTMLElement): HTMLElement;
    removeCloneElementClasses(): void;
    removeCloneElement(): void;
    getCursorElement(e: MouseEvent & TouchEvent): HTMLElement;
    autoScroll(): void;
    autoScrollValidation(e: MouseEvent & TouchEvent): boolean;
    actionClass(type: string): void;
    updateScrollPosition(e: MouseEvent & TouchEvent): void;
    updateOriginalElement(cloneElement: HTMLElement): void;
    getUpdatedEvent(startTime: Date, endTime: Date, eventObj: {
        [key: string]: Object;
    }): {
        [key: string]: Object;
    };
    dynamicEventsRendering(event: {
        [key: string]: Object;
    }): void;
    /**
     * To destroy the action base module.
     * @return {void}
     * @private
     */
    destroy(): void;
}
