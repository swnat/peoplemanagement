import { Schedule } from '../base/schedule';
import { ViewBase } from './view-base';
import { IRenderer, TdData, NotifyEventArgs } from '../base/interface';
/**
 * year view
 */
export declare class Year extends ViewBase implements IRenderer {
    viewClass: string;
    isInverseTableSelect: boolean;
    colLevels: TdData[][];
    rowCount: number;
    columnCount: number;
    private workCellAction;
    /**
     * Constructor for year view
     */
    constructor(parent: Schedule);
    renderLayout(className: string): void;
    renderHeader(headerWrapper: HTMLElement): void;
    renderContent(content: HTMLElement): void;
    renderCalendarHeader(currentDate: Date): HTMLElement;
    renderCalendarContent(currentDate: Date): HTMLElement;
    createTableColGroup(count: number): HTMLElement;
    getMonthName(date: Date): string;
    generateColumnLevels(): TdData[][];
    getDateSlots(renderDates: Date[], workDays: number[], startHour?: string, endHour?: string): TdData[];
    getMonthDates(date: Date): Date[];
    getRowColumnCount(type: string): number;
    isCurrentDate(date: Date): boolean;
    private onCellClick;
    onContentScroll(e: Event): void;
    onScrollUiUpdate(args: NotifyEventArgs): void;
    startDate(): Date;
    endDate(): Date;
    getEndDateFromStartDate(start: Date): Date;
    getNextPreviousDate(type: string): Date;
    getDateRangeText(): string;
    addEventListener(): void;
    removeEventListener(): void;
    onDataReady(args: NotifyEventArgs): void;
    wireEvents(element: HTMLElement, type: string): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the year.
     * @return {void}
     * @private
     */
    destroy(): void;
}
