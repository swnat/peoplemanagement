/**
 * To render holidays and weekends in Gantt
 */
import { Gantt } from '../base/gantt';
export declare class NonWorkingDay {
    private parent;
    nonworkingContainer: HTMLElement;
    private holidayContainer;
    private weekendContainer;
    constructor(gantt: Gantt);
    /**
     * Method append nonworking container
     */
    private createNonworkingContainer;
    /**
     * calculation for holidays rendering.
     * @private
     */
    renderHolidays(): void;
    /**
     * Method to return holidays as html string
     */
    private getHolidaysElement;
    /**
     * @private
     */
    renderWeekends(): void;
    /**
     * Method to get weekend html string
     */
    private getWeekendElements;
    private updateHolidayLabelHeight;
    /**
     * Method to update height for all internal containers
     * @private
     */
    updateContainerHeight(): void;
    /**
     * Method to remove containers of holiday and weekend
     */
    removeContainers(): void;
}
