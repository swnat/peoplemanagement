import { Spreadsheet } from '../../spreadsheet/index';
/**
 * CellFormat module allows to format the cell styles.
 */
export declare class CellFormat {
    private parent;
    private checkHeight;
    private row;
    constructor(parent: Spreadsheet);
    private applyCellFormat;
    private updateRowHeight;
    private isHeightCheckNeeded;
    private getRowHeightOnInit;
    private addEventListener;
    private removeEventListener;
    /**
     * Destroy cell format module.
     */
    destroy(): void;
    /**
     * Get the cell format module name.
     */
    getModuleName(): string;
}
