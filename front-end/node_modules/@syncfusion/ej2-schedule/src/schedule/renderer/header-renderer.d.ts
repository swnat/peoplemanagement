import { CalendarView } from '@syncfusion/ej2-calendars';
import { Schedule } from '../base/schedule';
/**
 * Header module
 */
export declare class HeaderRenderer {
    element: HTMLElement;
    private parent;
    private l10n;
    private toolbarObj;
    private headerPopup;
    private headerCalendar;
    /**
     * Constructor for render module
     */
    constructor(parent: Schedule);
    addEventListener(): void;
    removeEventListener(): void;
    private closeHeaderPopup;
    /** @hidden */
    hideHeaderPopup(): void;
    renderHeader(): void;
    private renderToolbar;
    updateItems(): void;
    getPopUpRelativeElement(): HTMLElement;
    setDayOfWeek(index: number): void;
    setCalendarDate(date: Date): void;
    setCalendarMinMaxDate(): void;
    getCalendarView(): CalendarView;
    setCalendarView(): void;
    updateActiveView(): void;
    updateDateRange(text: string): void;
    private getDateRangeText;
    private getItems;
    private getItemObject;
    private renderHeaderPopup;
    private calendarChange;
    private calculateViewIndex;
    private toolbarClickHandler;
    getHeaderElement(): HTMLElement;
    updateHeaderItems(classType: string): void;
    previousNextIconHandler(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the headerbar.
     * @return {void}
     * @private
     */
    destroy(): void;
}
