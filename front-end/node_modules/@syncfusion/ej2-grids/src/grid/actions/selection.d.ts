import { IGrid, IAction, IIndex, ISelectedCell } from '../base/interface';
import { SelectionSettings } from '../base/grid';
import { ServiceLocator } from '../services/service-locator';
/**
 * The `Selection` module is used to handle cell and row selection.
 */
export declare class Selection implements IAction {
    /**
     * @hidden
     */
    selectedRowIndexes: number[];
    /**
     * @hidden
     */
    selectedRowCellIndexes: ISelectedCell[];
    /**
     * @hidden
     */
    selectedRecords: Element[];
    /**
     * @hidden
     */
    isRowSelected: boolean;
    /**
     * @hidden
     */
    isCellSelected: boolean;
    /**
     * @hidden
     */
    preventFocus: boolean;
    /**
     * @hidden
     */
    prevRowIndex: number;
    private selectionSettings;
    private prevCIdxs;
    private prevECIdxs;
    private selectedRowIndex;
    private isMultiShiftRequest;
    private isMultiCtrlRequest;
    private enableSelectMultiTouch;
    private clearRowCheck;
    private selectRowCheck;
    private element;
    private autofill;
    private isAutoFillSel;
    private startCell;
    private endCell;
    private startAFCell;
    private endAFCell;
    private startIndex;
    private startCellIndex;
    private startDIndex;
    private startDCellIndex;
    private currentIndex;
    private isDragged;
    private isCellDrag;
    private x;
    private y;
    private target;
    private actualTarget;
    private preSelectedCellIndex;
    private factory;
    private contentRenderer;
    private checkedTarget;
    private primaryKey;
    private chkField;
    private selectedRowState;
    private totalRecordsCount;
    private chkAllCollec;
    private isCheckedOnAdd;
    private persistSelectedData;
    private onDataBoundFunction;
    private actionBeginFunction;
    private actionCompleteFunction;
    private actionCompleteFunc;
    private resizeEndFn;
    private mUPTarget;
    private bdrLeft;
    private bdrRight;
    private bdrTop;
    private bdrBottom;
    private bdrAFLeft;
    private bdrAFRight;
    private bdrAFTop;
    private bdrAFBottom;
    private isInteracted;
    private checkSelectAllClicked;
    private index;
    private toggle;
    private data;
    private removed;
    private parent;
    private focus;
    private isCancelDeSelect;
    private isPreventCellSelect;
    private disableUI;
    private isPersisted;
    private cmdKeyPressed;
    private isMacOS;
    /**
     * @hidden
     */
    autoFillRLselection: boolean;
    /**
     * Constructor for the Grid selection module
     * @hidden
     */
    constructor(parent?: IGrid, selectionSettings?: SelectionSettings, locator?: ServiceLocator);
    private initializeSelection;
    /**
     * The function used to trigger onActionBegin
     * @return {void}
     * @hidden
     */
    onActionBegin(args: Object, type: string): void;
    private fDataUpdate;
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    onActionComplete(args: Object, type: string): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * To destroy the selection
     * @return {void}
     * @hidden
     */
    destroy(): void;
    private isEditing;
    private getSelectedMovableRow;
    getCurrentBatchRecordChanges(): Object[];
    /**
     * Selects a row by the given index.
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    selectRow(index: number, isToggle?: boolean): void;
    private rowSelectingCallBack;
    private selectRowCallBack;
    private addMovableArgs;
    /**
     * Selects a range of rows from start and end row indexes.
     * @param  {number} startIndex - Specifies the start row index.
     * @param  {number} endIndex - Specifies the end row index.
     * @return {void}
     */
    selectRowsByRange(startIndex: number, endIndex?: number): void;
    /**
     * Selects a collection of rows by index.
     * @param  {number[]} rowIndexes - Specifies an array of row indexes.
     * @return {void}
     */
    selectRows(rowIndexes: number[]): void;
    /**
     * Select rows with existing row selection by passing row indexes.
     * @param  {number} startIndex - Specifies the row indexes.
     * @return {void}
     * @hidden
     */
    addRowsToSelection(rowIndexes: number[]): void;
    private getCollectionFromIndexes;
    private clearRow;
    private clearRowCallBack;
    private clearSelectedRow;
    private updateRowProps;
    private updatePersistCollection;
    private updatePersistDelete;
    private updateCheckBoxes;
    private updateRowSelection;
    /**
     * Deselects the currently selected rows and cells.
     * @return {void}
     */
    clearSelection(): void;
    /**
     * Deselects the currently selected rows.
     * @return {void}
     */
    clearRowSelection(): void;
    private rowDeselect;
    private getRowObj;
    private getSelectedMovableCell;
    /**
     * Selects a cell by the given index.
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    private successCallBack;
    private getCellIndex;
    /**
     * Selects a range of cells from start and end indexes.
     * @param  {IIndex} startIndex - Specifies the row and column's start index.
     * @param  {IIndex} endIndex - Specifies the row and column's end index.
     * @return {void}
     */
    selectCellsByRange(startIndex: IIndex, endIndex?: IIndex): void;
    /**
     * Selects a collection of cells by row and column indexes.
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @return {void}
     */
    selectCells(rowCellIndexes: ISelectedCell[]): void;
    /**
     * Select cells with existing cell selection by passing row and column index.
     * @param  {IIndex} startIndex - Defines the collection of row and column index.
     * @return {void}
     * @hidden
     */
    addCellsToSelection(cellIndexes: IIndex[]): void;
    private getColIndex;
    private getLastColIndex;
    private clearCell;
    private cellDeselect;
    private updateCellSelection;
    private addAttribute;
    private updateCellProps;
    private addRowCellIndex;
    /**
     * Deselects the currently selected cells.
     * @return {void}
     */
    clearCellSelection(): void;
    private getSelectedCellsElement;
    private mouseMoveHandler;
    private selectLikeExcel;
    private drawBorders;
    private isLastCell;
    private isLastRow;
    private positionBorders;
    private createBorders;
    private showBorders;
    private hideBorders;
    private drawAFBorders;
    private positionAFBorders;
    private createAFBorders;
    private showAFBorders;
    private hideAFBorders;
    private updateValue;
    private createBeforeAutoFill;
    private selectLikeAutoFill;
    private mouseUpHandler;
    private hideAutoFill;
    /**
     * @hidden
     */
    updateAutoFillPosition(): void;
    private mouseDownHandler;
    private updateStartEndCells;
    private updateStartCellsIndex;
    private enableDrag;
    private clearSelAfterRefresh;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    private wireEvents;
    private unWireEvents;
    private columnPositionChanged;
    private refreshHeader;
    private rowsRemoved;
    beforeFragAppend(e: {
        requestType: string;
    }): void;
    private getCheckAllBox;
    private enableAfterRender;
    private render;
    private onPropertyChanged;
    private hidePopUp;
    private initialEnd;
    private checkBoxSelectionChanged;
    private initPerisistSelection;
    private ensureCheckboxFieldSelection;
    private dataSuccess;
    private setRowSelection;
    private getData;
    private refreshPersistSelection;
    private actionBegin;
    private actionComplete;
    private onDataBound;
    private updatePersistSelectedData;
    private checkSelectAllAction;
    private checkSelectAll;
    private getCheckAllStatus;
    private checkSelect;
    private moveIntoUncheckCollection;
    private triggerChkChangeEvent;
    private updateSelectedRowIndex;
    private setCheckAllState;
    private keyDownHandler;
    private keyUpHandler;
    private clickHandler;
    private popUpClickHandler;
    private showPopup;
    private rowCellSelectionHandler;
    private onCellFocused;
    /**
     * Apply ctrl + A key selection
     * @return {void}
     * @hidden
     */
    ctrlPlusA(): void;
    private applySpaceSelection;
    private applyDownUpKey;
    private applyUpDown;
    private applyRightLeftKey;
    private applyHomeEndKey;
    /**
     * Apply shift+down key selection
     * @return {void}
     * @hidden
     */
    shiftDownKey(rowIndex?: number, cellIndex?: number): void;
    private applyShiftLeftRightKey;
    private applyCtrlHomeEndKey;
    private addRemoveClassesForRow;
    private isRowType;
    private isCellType;
    private isSingleSel;
    private getRenderer;
    /**
     * Gets the collection of selected records.
     * @return {Object[]}
     */
    getSelectedRecords(): Object[];
    private addEventListener_checkbox;
    removeEventListener_checkbox(): void;
    private setCheckAllForEmptyGrid;
    dataReady(e: {
        requestType: string;
    }): void;
    private actionCompleteHandler;
    private selectRowIndex;
}
