import { EventFieldsMapping, TdData } from '../base/interface';
import { Schedule } from '../base/schedule';
import { EventBase } from './event-base';
/**
 * Month view events render
 */
export declare class MonthEvent extends EventBase {
    element: HTMLElement;
    fields: EventFieldsMapping;
    dateRender: Date[];
    renderedEvents: Object[];
    eventHeight: number;
    private monthHeaderHeight;
    workCells: HTMLElement[];
    cellWidth: number;
    cellHeight: number;
    moreIndicatorHeight: number;
    renderType: string;
    /**
     * Constructor for month events
     */
    constructor(parent: Schedule);
    renderAppointments(): void;
    renderEventsHandler(dateRender: Date[], workDays: number[], resData?: TdData): void;
    private processBlockEvents;
    private isSameDate;
    renderBlockEvents(event: {
        [key: string]: Object;
    }, resIndex: number, isIcon: boolean): void;
    renderBlockIndicator(cellTd: HTMLElement, position: number, resIndex: number): void;
    getStartTime(event: {
        [key: string]: Object;
    }, eventData: {
        [key: string]: Object;
    }): Date;
    getEndTime(event: {
        [key: string]: Object;
    }, eventData: {
        [key: string]: Object;
    }): Date;
    getCellTd(day: number): HTMLElement;
    getEventWidth(startDate: Date, endDate: Date, isAllDay: boolean, count: number): number;
    getPosition(startTime: Date, endTime: Date, isAllDay: boolean, day: number): number;
    getRowTop(resIndex: number): number;
    updateIndicatorIcon(event: {
        [key: string]: Object;
    }): void;
    renderResourceEvents(): void;
    getSlotDates(workDays?: number[]): void;
    createAppointmentElement(record: {
        [key: string]: Object;
    }, resIndex: number, isCloneElement?: boolean): HTMLElement;
    private appendEventIcons;
    renderEvents(event: {
        [key: string]: Object;
    }, resIndex: number, eventsList?: {
        [key: string]: Object;
    }[]): void;
    updateCellHeight(cell: HTMLElement, height: number): void;
    updateBlockElements(): void;
    getFilteredEvents(startDate: Date, endDate: Date, groupIndex: string, eventsList?: {
        [key: string]: Object;
    }[]): Object[];
    getOverlapEvents(date: Date, appointments: {
        [key: string]: Object;
    }[]): Object[];
    getIndex(date: Date): number;
    moreIndicatorClick(event: Event): void;
    renderEventElement(event: {
        [key: string]: Object;
    }, appointmentElement: HTMLElement, cellTd: Element): void;
    getEventData(event: {
        [key: string]: Object;
    }): {
        [key: string]: Object;
    };
    renderElement(cellTd: HTMLElement | Element, element: HTMLElement): void;
    private renderWrapperElement;
    getMoreIndicatorElement(count: number, startDate: Date, endDate: Date): HTMLElement;
    removeHeightProperty(selector: string): void;
}
