import { Spreadsheet } from '../index';
/**
 * Specifies number format.
 */
export declare class NumberFormat {
    private parent;
    constructor(parent: Spreadsheet);
    private refreshCellElement;
    /**
     * Adding event listener for number format.
     * @hidden
     */
    addEventListener(): void;
    /**
     * Removing event listener for number format.
     * @hidden
     */
    removeEventListener(): void;
    /**
     * To Remove the event listeners.
     */
    destroy(): void;
    /**
     * Get the workbook import module name.
     */
    getModuleName(): string;
}
/**
 * @hidden
 */
export interface RefreshValueArgs {
    rowIndex?: number;
    colIndex?: number;
    result?: string;
    sheetIndex?: number;
    isRightAlign?: boolean;
    type?: string;
    curSymbol?: string;
    value?: string;
}
