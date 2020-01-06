import { Gantt } from '../base/gantt';
/**
 * Column resize action related code goes here
 */
export declare class Resize {
    parent: Gantt;
    constructor(gantt: Gantt);
    /**
     * Get module name
     */
    private getModuleName;
    /**
     * To bind resize events.
     * @return {void}
     * @private
     */
    private bindEvents;
    /**
     * To destroy the column-resizer.
     * @return {void}
     * @private
     */
    destroy(): void;
}
