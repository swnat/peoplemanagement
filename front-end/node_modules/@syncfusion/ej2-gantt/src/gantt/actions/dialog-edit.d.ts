import { Dialog } from '@syncfusion/ej2-popups';
import { Gantt } from '../base/gantt';
import { EditDialogFieldSettingsModel } from '../models/models';
import { TextBox, NumericTextBox, MaskedTextBox } from '@syncfusion/ej2-inputs';
import { IGanttData } from '../base/interface';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 *
 * @hidden
 */
export declare class DialogEdit {
    private isEdit;
    /**
     * @private
     */
    dialog: HTMLElement;
    /**
     * @private
     */
    dialogObj: Dialog;
    private preTableCollection;
    private preTaskIds;
    private localeObj;
    private parent;
    private rowIndex;
    private types;
    private editedRecord;
    private rowData;
    private beforeOpenArgs;
    private inputs;
    /**
     * @private
     */
    updatedEditFields: EditDialogFieldSettingsModel[];
    private updatedAddFields;
    private addedRecord;
    private dialogEditValidationFlag;
    private tabObj;
    private ganttResources;
    /**
     * Constructor for render module
     */
    constructor(parent: Gantt);
    private wireEvents;
    private dblClickHandler;
    /**
     * Method to validate add and edit dialog fields property.
     * @private
     */
    processDialogFields(): void;
    private validateDialogFields;
    /**
     * Method to get general column fields
     */
    private getGeneralColumnFields;
    /**
     * Method to get custom column fields
     */
    private getCustomColumnFields;
    /**
     * Get default dialog fields when fields are not defined for add and edit dialogs
     */
    private getDefaultDialogFields;
    /**
     * @private
     */
    openAddDialog(): void;
    /**
     *
     * @return {Date}
     * @private
     */
    getMinimumStartDate(): Date;
    /**
     * @private
     */
    composeAddRecord(): IGanttData;
    /**
     * @private
     */
    openToolbarEditDialog(): void;
    /**
     * @param taskId
     * @private
     */
    openEditDialog(taskId: number | string | Object): void;
    private createDialog;
    private buttonClick;
    /**
     * @private
     */
    dialogClose(): void;
    private resetValues;
    private destroyDialogInnerElements;
    private destroyCustomField;
    /**
     * @private
     */
    destroy(): void;
    /**
     * Method to get current edit dialog fields value
     */
    private getEditFields;
    private createTab;
    private tabSelectedEvent;
    private responsiveTabContent;
    private getFieldsModel;
    private createInputModel;
    private validateScheduleFields;
    private updateScheduleFields;
    private validateDuration;
    private validateStartDate;
    private validateEndDate;
    /**
     *
     * @param columnName
     * @param value
     * @param currentData
     * @private
     */
    validateScheduleValuesByCurrentField(columnName: string, value: string, currentData: IGanttData): boolean;
    private getPredecessorModel;
    private getResourcesModel;
    private getNotesModel;
    private createDivElement;
    private createInputElement;
    private renderTabItems;
    private renderGeneralTab;
    private isCheckIsDisabled;
    private renderPredecessorTab;
    private updateResourceCollection;
    private renderResourceTab;
    private renderCustomTab;
    private renderNotesTab;
    private renderInputElements;
    private taskNameCollection;
    private predecessorEditCollection;
    private updatePredecessorDropDownData;
    private validSuccessorTasks;
    private getPredecessorType;
    private initiateDialogSave;
    private updateGeneralTab;
    private updateScheduleProperties;
    private updatePredecessorTab;
    private updateResourceTab;
    private updateNotesTab;
    private updateCustomTab;
}
/**
 * @hidden
 */
export declare type Inputs = CheckBox | DropDownList | TextBox | NumericTextBox | DatePicker | DateTimePicker | MaskedTextBox;
/**
 * @hidden
 */
export interface IPreData {
    id?: string;
    name?: string;
    type?: string;
    offset?: string;
}
