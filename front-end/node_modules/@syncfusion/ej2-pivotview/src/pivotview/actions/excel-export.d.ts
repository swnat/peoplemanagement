import { PivotView } from '../base/pivotview';
/**
 * @hidden
 * `ExcelExport` module is used to handle the Excel export action.
 */
export declare class ExcelExport {
    private parent;
    private engine;
    /**
     * Constructor for the PivotGrid Excel Export module.
     * @hidden
     */
    constructor(parent?: PivotView);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * Method to perform excel export.
     * @hidden
     */
    exportToExcel(type: string): void;
    /**
     * To destroy the excel export module
     * @returns void
     * @hidden
     */
    destroy(): void;
}
