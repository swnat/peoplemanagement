import { Gantt } from '../base/gantt';
/**
 * Gantt Excel Export module
 * @hidden
 */
export declare class ExcelExport {
    private parent;
    /**
     * Constructor for Excel Export module
     */
    constructor(gantt: Gantt);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * To destroy excel export module.
     * @private
     */
    destroy(): void;
    /**
     * To bind excel exporting events.
     * @return {void}
     * @private
     */
    private bindEvents;
}
