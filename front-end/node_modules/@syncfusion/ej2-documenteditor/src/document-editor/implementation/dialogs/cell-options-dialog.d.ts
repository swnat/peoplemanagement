import { LayoutViewer } from '../index';
import { TableOptionsDialog } from './index';
import { Dialog } from '@syncfusion/ej2-popups';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { WCellFormat } from '../index';
import { L10n } from '@syncfusion/ej2-base';
import { TableRowWidget, TableCellWidget } from '../viewer/page';
import { TextPosition } from '../selection/selection-helper';
/**
 * The Cell options dialog is used to modify margins of selected cells.
 */
export declare class CellOptionsDialog {
    /**
     * @private
     */
    owner: LayoutViewer;
    /**
     * @private
     */
    dialog: Dialog;
    /**
     * @private
     */
    target: HTMLElement;
    private sameAsTableCheckBox;
    /**
     * @private
     */
    sameAsTable: boolean;
    /**
     * @private
     */
    topMarginBox: NumericTextBox;
    /**
     * @private
     */
    leftMarginBox: NumericTextBox;
    /**
     * @private
     */
    bottomMarginBox: NumericTextBox;
    /**
     * @private
     */
    rightMarginBox: NumericTextBox;
    /**
     * @private
     */
    cellFormatIn: WCellFormat;
    /**
     * @private
     */
    constructor(viewer: LayoutViewer);
    /**
     * @private
     */
    readonly cellFormat: WCellFormat;
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * @private
     */
    initCellMarginsDialog(localValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     */
    show(): void;
    /**
     * @private
     */
    removeEvents: () => void;
    /**
     * @private
     */
    changeSameAsTable: () => void;
    /**
     * @private
     */
    loadCellMarginsDialog(): void;
    private loadCellProperties;
    /**
     * @private
     */
    applyTableCellProperties: () => void;
    /**
     * @private
     */
    applySubCellOptions(cellFormat: WCellFormat): void;
    /**
     * @private
     */
    applyCellmarginsValue(row: TableRowWidget, start: TextPosition, end: TextPosition, cellFormat: WCellFormat): void;
    private applyCellMarginsInternal;
    /**
     * @private
     */
    applyCellMarginsForCells(row: TableRowWidget, cellFormat: WCellFormat): void;
    /**
     * @private
     */
    iterateCells(cells: TableCellWidget[], cellFormat: WCellFormat): void;
    /**
     * @private
     */
    applySubCellMargins(sourceFormat: WCellFormat, cellFormat: WCellFormat): void;
    /**
     * @private
     */
    applyTableOptions(cellFormat: WCellFormat): void;
    /**
     * @private
     */
    closeCellMarginsDialog: () => void;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    static getCellMarginDialogElements(dialog: CellOptionsDialog | TableOptionsDialog, div: HTMLDivElement, locale: L10n): void;
}
