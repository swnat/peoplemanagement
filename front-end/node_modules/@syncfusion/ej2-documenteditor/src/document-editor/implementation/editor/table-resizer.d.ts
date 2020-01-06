import { TableWidget, TableCellWidget, TableRowWidget } from '../index';
import { DocumentEditor } from '../../document-editor';
import { Point } from './editor-helper';
import { LayoutViewer } from '../index';
import { TableHistoryInfo } from '../index';
/**
 * @private
 */
export declare class TableResizer {
    owner: DocumentEditor;
    resizeNode: number;
    resizerPosition: number;
    currentResizingTable: TableWidget;
    startingPoint: Point;
    /**
     * @private
     */
    readonly viewer: LayoutViewer;
    /**
     * @private
     */
    constructor(node: DocumentEditor);
    /**
     * Gets module name.
     */
    private getModuleName;
    /**
     * @private
     */
    updateResizingHistory(touchPoint: Point): void;
    handleResize(point: Point): void;
    /**
     * @private
     */
    isInRowResizerArea(touchPoint: Point): boolean;
    isInCellResizerArea(touchPoint: Point): boolean;
    /**
     * Gets cell resizer position.
     * @param {Point} point
     * @private
     */
    getCellReSizerPosition(touchPoint: Point): number;
    /**
     * Gets cell resizer position.
     * @param {TableCellWidget} cellWidget
     * @param {Point} touchPoint
     */
    private getCellReSizerPositionInternal;
    private getRowReSizerPosition;
    /**
     * To handle Table Row and cell resize
     * @param touchPoint
     * @private
     */
    handleResizing(touchPoint: Point): void;
    resizeTableRow(dragValue: number): void;
    /**
     * Gets the table widget from given cursor point
     * @param cursorPoint
     */
    private getTableWidget;
    private getTableWidgetFromWidget;
    /**
     * Return the table cell widget from the given cursor point
     * @param cursorPoint
     * @private
     */
    getTableCellWidget(cursorPoint: Point): TableCellWidget;
    updateRowHeight(row: TableRowWidget, dragValue: number): void;
    resizeTableCellColumn(dragValue: number): void;
    /**
     * Resize Selected Cells
     */
    private resizeColumnWithSelection;
    /**
     * Resize selected cells at resizer position 0
     */
    private resizeColumnAtStart;
    private updateWidthForCells;
    /**
     * Resize selected cells at last column
     */
    private resizeColumnAtLastColumnIndex;
    /**
     *  Resize selected cells at middle column
     */
    private resizeCellAtMiddle;
    updateGridValue(table: TableWidget, isUpdate: boolean, dragValue?: number): void;
    private getColumnCells;
    private updateGridBefore;
    private getLeastGridBefore;
    private increaseOrDecreaseWidth;
    private changeWidthOfCells;
    private updateRowsGridAfterWidth;
    private getRowWidth;
    private getMaxRowWidth;
    private isColumnSelected;
    applyProperties(table: TableWidget, tableHistoryInfo: TableHistoryInfo): void;
    /**
     * Return table row width
     */
    private getActualWidth;
    setPreferredWidth(table: TableWidget): void;
    private updateCellPreferredWidths;
    /**
     * Update grid before width value
     */
    private updateGridBeforeWidth;
    /**
     * Update grid after width value
     */
    updateGridAfterWidth(width: number, row: TableRowWidget): void;
}
