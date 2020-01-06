import { LayoutViewer } from '../index';
import { Dialog } from '@syncfusion/ej2-popups';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { WTableFormat } from '../index';
import { L10n } from '@syncfusion/ej2-base';
/**
 * The Table options dialog is used to modify default cell margins and cell spacing of selected table.
 */
export declare class TableOptionsDialog {
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
    private cellspacingTextBox;
    private allowSpaceCheckBox;
    private cellSpaceTextBox;
    /**
     * @private
     */
    leftMarginBox: NumericTextBox;
    /**
     * @private
     */
    topMarginBox: NumericTextBox;
    /**
     * @private
     */
    rightMarginBox: NumericTextBox;
    /**
     * @private
     */
    bottomMarginBox: NumericTextBox;
    /**
     * @private
     */
    tableFormatIn: WTableFormat;
    /**
     * @private
     */
    constructor(viewer: LayoutViewer);
    /**
     * @private
     */
    readonly tableFormat: WTableFormat;
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * @private
     */
    initTableOptionsDialog(localValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     */
    loadCellMarginsDialog(): void;
    /**
     * @private
     */
    applyTableCellProperties: () => void;
    /**
     * @private
     */
    applySubTableOptions(tableFormat: WTableFormat): void;
    /**
     * @private
     */
    applyTableOptionsHelper(tableFormat: WTableFormat): void;
    /**
     * @private
     */
    applyTableOptionsHistory(tableFormat: WTableFormat): void;
    /**
     * @private
     */
    applySubTableOptionsHelper(tableFormat: WTableFormat): void;
    /**
     * @private
     */
    applyTableOptions(tableFormat: WTableFormat): void;
    /**
     * @private
     */
    closeCellMarginsDialog: () => void;
    /**
     * @private
     */
    show(): void;
    /**
     * @private
     */
    changeAllowSpaceCheckBox: () => void;
    /**
     * @private
     */
    removeEvents: () => void;
    /**
     * @private
     */
    destroy(): void;
}
