import { Gantt } from '../base/gantt';
/**
 * To handle column reorder action from TreeGrid
 */
export declare class Reorder {
    parent: Gantt;
    constructor(gantt: Gantt);
    /**
     * Get module name
     */
    private getModuleName;
    /**
     * To bind reorder events.
     * @return {void}
     * @private
     */
    private bindEvents;
    /**
     * To destroy the column-reorder.
     * @return {void}
     * @private
     */
    destroy(): void;
}
