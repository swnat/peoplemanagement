import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { WTableFormat, WRowFormat, WCellFormat } from '../format/index';
import { WidthType } from '../../base/types';
import { TableWidget } from '../viewer/page';
/**
 * The Table properties dialog is used to modify properties of selected table.
 */
export declare class TablePropertiesDialog {
    private dialog;
    private target;
    private cellAlignment;
    private tableAlignment;
    private owner;
    private preferCheckBox;
    private tableWidthType;
    private preferredWidth;
    private rowHeightType;
    private rowHeightCheckBox;
    private rowHeight;
    private cellWidthType;
    private preferredCellWidthCheckBox;
    private preferredCellWidth;
    private tableTab;
    private rowTab;
    private cellTab;
    private left;
    private center;
    private right;
    private leftIndent;
    private allowRowBreak;
    private repeatHeader;
    private cellTopAlign;
    private cellCenterAlign;
    private cellBottomAlign;
    private indentingLabel;
    private hasTableWidth;
    private hasCellWidth;
    private bidi;
    /**
     * @private
     */
    isTableBordersAndShadingUpdated: boolean;
    /**
     * @private
     */
    isCellBordersAndShadingUpdated: boolean;
    private tableFormatIn;
    private rowFormatInternal;
    private cellFormatIn;
    private tableWidthBox;
    private rowHeightBox;
    private cellWidthBox;
    private leftIndentBox;
    private bordersAndShadingButton;
    private tableOptionButton;
    private cellOptionButton;
    private rowHeightValue;
    private tabObj;
    private rtlButton;
    private ltrButton;
    private localValue;
    /**
     * @private
     */
    isCellOptionsUpdated: Boolean;
    /**
     * @private
     */
    isTableOptionsUpdated: Boolean;
    /**
     * @private
     */
    /**
    * @private
    */
    cellFormat: WCellFormat;
    /**
     * @private
     */
    /**
    * @private
    */
    tableFormat: WTableFormat;
    /**
     * @private
     */
    readonly rowFormat: WRowFormat;
    /**
     * @private
     */
    constructor(viewer: LayoutViewer);
    private getModuleName;
    /**
     * @private
     */
    initTablePropertyDialog(localValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     */
    show(): void;
    private onBeforeOpen;
    /**
     * @private
     */
    onCloseTablePropertyDialog: () => void;
    /**
     * @private
     */
    applyTableProperties: () => void;
    /**
     * @private
     */
    calculateGridValue(table: TableWidget): void;
    /**
     * @private
     */
    applyTableSubProperties: () => void;
    /**
     * @private
     */
    loadTableProperties(): void;
    /**
     * @private
     */
    unWireEvent: () => void;
    /**
     * @private
     */
    wireEvent(): void;
    /**
     * @private
     */
    closeTablePropertiesDialog: () => void;
    /**
     * @private
     */
    initTableProperties(element: HTMLDivElement, localValue: L10n, isRtl?: boolean): void;
    private changeBidirectional;
    /**
     * @private
     */
    onTableWidthChange(): void;
    /**
     * @private
     */
    onTableWidthTypeChange(): void;
    /**
     * @private
     */
    onLeftIndentChange(): void;
    private setTableProperties;
    private activeTableAlignment;
    /**
     * @private
     */
    changeTableCheckBox: () => void;
    /**
     * @private
     */
    changeTableAlignment: (event: Event) => void;
    /**
     * @private
     */
    getTableAlignment(): string;
    /**
     * @private
     */
    updateClassForAlignmentProperties(element: HTMLElement): void;
    /**
     * @private
     */
    initTableRowProperties(element: HTMLDivElement, localValue: L10n, isRtl?: boolean): void;
    private setTableRowProperties;
    /**
     * @private
     */
    onRowHeightChange(): void;
    /**
     * @private
     */
    onRowHeightTypeChange(): void;
    /**
     * @private
     */
    changeTableRowCheckBox: () => void;
    /**
     * @private
     */
    onAllowBreakAcrossPage(): void;
    /**
     * @private
     */
    onRepeatHeader(): void;
    /**
     * @private
     */
    enableRepeatHeader(): boolean;
    /**
     * @private
     */
    initTableCellProperties(element: HTMLDivElement, localValue: L10n, isRtl?: boolean): void;
    private setTableCellProperties;
    /**
     * @private
     */
    updateClassForCellAlignment(element: HTMLElement): void;
    /**
     * @private
     */
    formatNumericTextBox(textBox: NumericTextBox, format: WidthType, value: number): void;
    /**
     * @private
     */
    getCellAlignment(): string;
    /**
     * @private
     */
    changeTableCellCheckBox: () => void;
    /**
     * @private
     */
    onCellWidthChange(): void;
    /**
     * @private
     */
    onCellWidthTypeChange(): void;
    /**
     * @private
     */
    changeCellAlignment: (event: Event) => void;
    /**
     * @private
     */
    showTableOptionsDialog: () => void;
    /**
     * @private
     */
    showBordersShadingsPropertiesDialog: () => void;
    /**
     * @private
     */
    showCellOptionsDialog: () => void;
    /**
     * @private
     */
    destroy(): void;
}
