import { L10n } from '@syncfusion/ej2-base';
import { IGrid, IAction, NotifyArgs } from '../base/interface';
import { EditRender } from '../renderer/edit-renderer';
import { ServiceLocator } from '../services/service-locator';
import { Column } from '../models/column';
import { FormValidator } from '@syncfusion/ej2-inputs';
/**
 * The `Edit` module is used to handle editing actions.
 */
export declare class Edit implements IAction {
    private edit;
    protected renderer: EditRender;
    private editModule;
    /** @hidden */
    formObj: FormValidator;
    mFormObj: FormValidator;
    private static editCellType;
    private editType;
    protected parent: IGrid;
    protected serviceLocator: ServiceLocator;
    protected l10n: L10n;
    private dialogObj;
    private alertDObj;
    private actionBeginFunction;
    private actionCompleteFunction;
    private preventObj;
    isLastRow?: boolean;
    deleteRowUid: string;
    /**
     * Constructor for the Grid editing module
     * @hidden
     */
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    private updateColTypeObj;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * @hidden
     */
    onPropertyChanged(e: NotifyArgs): void;
    private updateEditObj;
    private initialEnd;
    /**
     * Edits any bound record in the Grid by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row to be edited.
     */
    startEdit(tr?: HTMLTableRowElement): void;
    /**
     * @hidden
     */
    checkLastRow(tr: Element, args?: {
        row?: Element;
        requestType?: string;
    }): void;
    /**
     * Cancels edited state.
     */
    closeEdit(): void;
    protected refreshToolbar(): void;
    /**
     * To adds a new row at the top with the given data. When data is not passed, it will add empty rows.
     * > `editSettings.allowEditing` should be true.
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added
     */
    addRecord(data?: Object, index?: number): void;
    /**
     * Deletes a record with the given options. If fieldname and data are not given, the Grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     * @param {string} fieldname - Defines the primary key field name of the column.
     * @param {Object} data - Defines the JSON data record to be deleted.
     */
    deleteRecord(fieldname?: string, data?: Object): void;
    /**
     * Deletes a visible row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     */
    deleteRow(tr: HTMLTableRowElement): void;
    /**
     * If Grid is in editable state, you can save a record by invoking endEdit.
     */
    endEdit(): void;
    /**
     * To update the specified cell by given value without changing into edited state.
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     */
    updateCell(rowIndex: number, field: string, value: string | number | boolean | Date): void;
    /**
     * To update the specified row by given values without changing into edited state.
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     */
    updateRow(index: number, data: Object): void;
    /**
     * Resets added, edited, and deleted records in the batch mode.
     */
    batchCancel(): void;
    /**
     * Bulk saves added, edited, and deleted records in the batch mode.
     */
    batchSave(): void;
    /**
     * Changes a particular cell into edited state based on the row index and field name provided in the `batch` mode.
     * @param {number} index - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     */
    editCell(index: number, field: string): void;
    /**
     * Checks the status of validation at the time of editing. If validation is passed, it returns true.
     * @return {boolean}
     */
    editFormValidate(): boolean;
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     * @return {Object}
     */
    getBatchChanges(): Object;
    /**
     * Gets the current value of the edited component.
     */
    getCurrentEditCellData(): Object;
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     */
    saveCell(): void;
    private endEditing;
    private showDialog;
    getValueFromType(col: Column, value: string | Date | boolean): number | string | Date | boolean;
    private destroyToolTip;
    private createConfirmDlg;
    private createAlertDlg;
    private alertClick;
    private dlgWidget;
    private dlgCancel;
    private dlgOk;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    private actionComplete;
    /**
     * @hidden
     */
    getCurrentEditedData(form: Element, editedData: Object): Object;
    private getValue;
    /**
     * @hidden
     */
    onActionBegin(e: NotifyArgs): void;
    /**
     * @hidden
     */
    destroyWidgets(cols?: Column[]): void;
    /**
     * @hidden
     */
    destroyForm(): void;
    /**
     * To destroy the editing.
     * @return {void}
     * @hidden
     */
    destroy(): void;
    private keyPressHandler;
    private preventBatch;
    private executeAction;
    /**
     * @hidden
     */
    applyFormValidation(cols?: Column[]): void;
    private createFormObj;
    private valErrorPlacement;
    private getElemTable;
    private validationComplete;
    private createTooltip;
    /**
     * @hidden
     */
    checkColumnIsGrouped(col: Column): boolean;
    /**
     * @hidden
     */
    static AddEditors(editors: object): void;
}
