import { Schedule } from '../base/schedule';
/**
 * ICalendar Export Module
 */
export declare class ICalendarExport {
    private parent;
    constructor(parent: Schedule);
    initializeCalendarExport(fileName: string, customData: Object[]): void;
    private customFieldFilter;
    private convertDateToString;
    private download;
    private filterEvents;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the ICalendarExport.
     * @return {void}
     * @private
     */
    destroy(): void;
}
