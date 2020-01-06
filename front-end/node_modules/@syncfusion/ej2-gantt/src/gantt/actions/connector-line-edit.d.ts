import { Gantt } from '../base/gantt';
import { IGanttData, IPredecessor, ITaskbarEditedEventArgs } from '../base/interface';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * File for handling connector line edit operation in Gantt.
 */
export declare class ConnectorLineEdit {
    private parent;
    private connectorLineElement;
    /**
     * @private
     */
    validationPredecessor: IPredecessor[];
    /** @private */
    confirmPredecessorDialog: Dialog;
    /** @private */
    predecessorIndex: number;
    /** @private */
    childRecord: IGanttData;
    private dateValidateModule;
    constructor(ganttObj?: Gantt);
    /**
     * To update connector line edit element.
     * @return {void}
     * @private
     */
    updateConnectorLineEditElement(e: PointerEvent): void;
    /**
     * To get hovered connector line element.
     * @return {void}
     * @private
     */
    private getConnectorLineHoverElement;
    /**
     * To highlight connector line while hover.
     * @return {void}
     * @private
     */
    private highlightConnectorLineElements;
    /**
     * To add connector line highlight class.
     * @return {void}
     * @private
     */
    private addHighlight;
    /**
     * To remove connector line highlight class.
     * @return {void}
     * @private
     */
    private removeHighlight;
    /**
     * To remove connector line highlight class.
     * @return {void}
     * @private
     */
    getEditedConnectorLineString(records: IGanttData[]): string;
    /**
     * Tp refresh connector lines of edited records
     * @param editedRecord
     * @private
     */
    refreshEditedRecordConnectorLine(editedRecord: IGanttData[]): void;
    /**
     * Method to remove connector line from DOM
     * @param records
     * @private
     */
    removePreviousConnectorLines(records: IGanttData[] | object): void;
    private removeConnectorLineById;
    private idFromPredecessor;
    private predecessorValidation;
    /**
     * To validate predecessor relations
     * @param ganttRecord
     * @param predecessorString
     * @private
     */
    validatePredecessorRelation(ganttRecord: IGanttData, predecessorString: string): boolean;
    /**
     * To add dependency for Task
     * @param ganttRecord
     * @param predecessorString
     * @private
     */
    addPredecessor(ganttRecord: IGanttData, predecessorString: string): void;
    /**
     * To remove dependency from task
     * @param ganttRecord
     * @private
     */
    removePredecessor(ganttRecord: IGanttData): void;
    /**
     * To modify current dependency values of Task
     * @param ganttRecord
     * @param predecessorString
     * @private
     */
    updatePredecessor(ganttRecord: IGanttData, predecessorString: string, editedArgs?: ITaskbarEditedEventArgs): boolean;
    private updatePredecessorHelper;
    private checkParentRelation;
    private initPredecessorValidationDialog;
    /**
     * To render validation dialog
     * @return {void}
     * @private
     */
    renderValidationDialog(): void;
    private validationDialogOkButton;
    private validationDialogCancelButton;
    private validationDialogClose;
    /**
     * Validate and apply the predecessor option from validation dialog
     * @param buttonType
     * @return {void}
     * @private
     */
    applyPredecessorOption(): void;
    private calculateOffset;
    /**
     * Update predecessor value with user selection option in predecessor validation dialog
     * @param args
     * @return {void}
     */
    private removePredecessors;
    /**
     * To open predecessor validation dialog
     * @param args
     * @return {void}
     * @private
     */
    openValidationDialog(args: object): void;
    /**
     * Predecessor link validation dialog template
     * @param args
     * @private
     */
    validationDialogTemplate(args: object): HTMLElement;
    /**
     * To validate the types while editing the taskbar
     * @param args
     * @return {boolean}
     * @private
     */
    validateTypes(ganttRecord: IGanttData): object;
    /**
     * Method to remove and update new predecessor collection in successor record
     * @param data
     * @private
     */
    addRemovePredecessor(data: IGanttData): void;
    /**
     * Method to remove a predecessor from a record.
     * @param childRecord
     * @param index
     * @private
     */
    removePredecessorByIndex(childRecord: IGanttData, index: number): void;
    /**
     * To render predecessor delete confirmation dialog
     * @return {void}
     * @private
     */
    renderPredecessorDeleteConfirmDialog(): void;
    private confirmCloseDialog;
    private confirmOkDeleteButton;
}
