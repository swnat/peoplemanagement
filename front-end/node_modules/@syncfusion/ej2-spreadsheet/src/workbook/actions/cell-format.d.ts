import { Workbook } from '../base/index';
/**
 * Workbook Cell format.
 */
export declare class WorkbookCellFormat {
    private parent;
    constructor(parent: Workbook);
    private format;
    private textDecorationActionUpdate;
    private addEventListener;
    private removeEventListener;
    /**
     * To destroy workbook cell format.
     */
    destroy(): void;
    /**
     * Get the workbook cell format module name.
     */
    getModuleName(): string;
}
