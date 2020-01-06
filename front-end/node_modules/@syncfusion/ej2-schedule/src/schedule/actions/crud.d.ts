import { CurrentAction } from '../base/type';
import { Schedule } from '../base/schedule';
/**
 * Schedule CRUD operations
 */
export declare class Crud {
    private parent;
    constructor(parent: Schedule);
    private getQuery;
    private getTable;
    private refreshData;
    addEvent(eventData: Object | Object[]): void;
    saveEvent(eventData: {
        [key: string]: Object;
    } | {
        [key: string]: Object;
    }[], action: CurrentAction): void;
    deleteEvent(eventData: string | number | Object | Object[], action: CurrentAction): void;
    private processOccurrences;
    private processFollowSeries;
    private processEntireSeries;
    private processEventDelete;
    serializeData(eventData: Object[]): void;
    private getParentEvent;
    private excludeDateCheck;
    private processRecurrenceRule;
    private getUpdatedRecurrenceRule;
}
