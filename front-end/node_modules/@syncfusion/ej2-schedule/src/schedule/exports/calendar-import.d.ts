import { Schedule } from '../base/schedule';
/**
 * ICalendar Import Module
 */
export declare class ICalendarImport {
    private parent;
    private allDay;
    constructor(parent: Schedule);
    initializeCalendarImport(fileContent: Blob): void;
    private iCalendarParser;
    private processOccurrence;
    private getDateString;
    private dateParsing;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the ICalendarImport.
     * @return {void}
     * @private
     */
    destroy(): void;
}
