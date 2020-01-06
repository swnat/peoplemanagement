import { Gantt } from '../base/gantt';
import { ISelectedCell } from '@syncfusion/ej2-grids';
import { IIndex } from '@syncfusion/ej2-grids';
import { IGanttData } from '../base/interface';
/**
 * The Selection module is used to handle cell and row selection.
 */
export declare class Selection {
    parent: Gantt;
    selectedRowIndex: number;
    isMultiCtrlRequest: boolean;
    isMultiShiftRequest: boolean;
    isSelectionFromChart: Boolean;
    private actualTarget;
    private isInteracted;
    private prevRowIndex;
    selectedRowIndexes: number[];
    enableSelectMultiTouch: boolean;
    startIndex: number;
    endIndex: number;
    private openPopup;
    constructor(gantt: Gantt);
    /**
     * Get module name
     */
    private getModuleName;
    private wireEvents;
    /**
     * To update selected index.
     * @return {void}
     * @private
     */
    selectRowByIndex(): void;
    /**
     * To bind selection events.
     * @return {void}
     * @private
     */
    private bindEvents;
    private rowSelecting;
    private rowSelected;
    private rowDeselecting;
    private rowDeselected;
    private cellSelecting;
    private cellSelected;
    private cellDeselecting;
    private cellDeselected;
    /**
     * Selects a cell by given index.
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    /**
     * Selects a collection of cells by row and column indexes.
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @return {void}
     */
    selectCells(rowCellIndexes: ISelectedCell[]): void;
    /**
     * Selects a row by given index.
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    selectRow(index: number, isToggle?: boolean): void;
    /**
     * Selects a collection of rows by indexes.
     * @param  {number[]} records - Defines the collection of row indexes.
     * @return {void}
     */
    selectRows(records: number[]): void;
    /**
     * Gets the collection of selected row indexes.
     * @return {number[]}
     */
    getSelectedRowIndexes(): number[];
    /**
     * Gets the collection of selected row and cell indexes.
     * @return {number[]}
     */
    getSelectedRowCellIndexes(): ISelectedCell[];
    /**
     * Gets the collection of selected records.
     * @return {Object[]}
     */
    getSelectedRecords(): Object[];
    /**
     * Get the selected records for cell selection.
     * @return {IGanttData[]}
     */
    getCellSelectedRecords(): IGanttData[];
    /**
     * Gets the collection of selected rows.
     * @return {Element[]}
     */
    getSelectedRows(): Element[];
    /**
     * Deselects the current selected rows and cells.
     * @return {void}
     */
    clearSelection(): void;
    private highlightSelectedRows;
    private getselectedrowsIndex;
    /**
     * Selects a range of rows from start and end row indexes.
     * @param  {number} startIndex - Defines the start row index.
     * @param  {number} endIndex - Defines the end row index.
     * @return {void}
     */
    selectRowsByRange(startIndex: number, endIndex?: number): void;
    private addClass;
    private removeClass;
    private showPopup;
    /** @private */
    hidePopUp(): void;
    private popUpClickHandler;
    /**
     * @return {void}
     * @private
     */
    private mouseUpHandler;
    /**
     * To destroy the selection module.
     * @return {void}
     * @private
     */
    destroy(): void;
}
