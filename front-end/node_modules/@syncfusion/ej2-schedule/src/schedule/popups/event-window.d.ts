import { Dialog } from '@syncfusion/ej2-popups';
import { Schedule } from '../base/schedule';
import { CurrentAction } from '../base/type';
import { RecurrenceEditor } from '../../recurrence-editor/recurrence-editor';
/**
 * Event editor window
 */
export declare class EventWindow {
    private parent;
    dialogObject: Dialog;
    private element;
    private fields;
    private l10n;
    private eventData;
    private eventCrudData;
    private fieldValidator;
    private recurrenceEditor;
    private repeatDialogObject;
    private repeatTempRule;
    private repeatRule;
    private repeatStatus;
    private buttonObj;
    private repeatStartDate;
    private cellClickAction;
    private duration;
    private isCrudAction;
    private eventWindowTime;
    /**
     * Constructor for event window
     */
    constructor(parent: Schedule);
    private renderEventWindow;
    private updateEditorTemplate;
    private resetEditorTemplate;
    refresh(): void;
    refreshRecurrenceEditor(): void;
    setRecurrenceEditor(recurrenceEditor: RecurrenceEditor): void;
    openEditor(data: Object, type: CurrentAction, isEventData?: boolean, repeatType?: number): void;
    setDialogContent(): void;
    private onBeforeOpen;
    private onBeforeClose;
    private getEventWindowContent;
    private renderFormElements;
    private getDefaultEventWindowContent;
    private createRecurrenceEditor;
    private createDivElement;
    private createInputElement;
    private getSlotDuration;
    private renderDateTimePicker;
    refreshDateTimePicker(duration?: number): void;
    private onTimeChange;
    private renderResourceDetails;
    private renderDropDown;
    private onMultiselectResourceChange;
    private createInstance;
    private onDropdownResourceChange;
    private filterDatasource;
    private onTimezoneChange;
    private renderCheckBox;
    private renderTextBox;
    private getFieldName;
    private getFieldLabel;
    private onChange;
    private renderRepeatDialog;
    private loadRecurrenceEditor;
    private onRepeatChange;
    private repeatSaveDialog;
    private closeRepeatDialog;
    private repeatCancelDialog;
    private repeatOpenDialog;
    private onCellDetailsUpdate;
    convertToEventData(cellsData: {
        [key: string]: Object;
    }, eventObj: {
        [key: string]: Object;
    }): void;
    private applyFormValidation;
    private showDetails;
    private getColumnName;
    private onAllDayChange;
    private updateDateTime;
    private getFormat;
    private onEventDetailsUpdate;
    private disableButton;
    private renderRecurrenceEditor;
    private updateRepeatLabel;
    dialogClose(): void;
    private resetForm;
    private timezoneChangeStyle;
    private resetFormFields;
    eventSave(alert?: string): void;
    getEventDataFromEditor(): {
        [key: string]: {
            [key: string]: Object;
        };
    };
    private processEventValidation;
    private processCrudActions;
    private getResourceData;
    getObjectFromFormData(className: string): {
        [key: string]: Object;
    };
    setDefaultValueToObject(eventObj: {
        [key: string]: Object;
    }): void;
    private recurrenceValidation;
    private getRecurrenceIndex;
    private trimAllDay;
    editOccurrenceValidation(eventId: string | number, currentData: {
        [key: string]: Object;
    }, editData?: {
        [key: string]: Object;
    }): boolean;
    private resourceSaveEvent;
    private getEventIdFromForm;
    private getFormElements;
    private getValueFromElement;
    private setValueToElement;
    private setDefaultValueToElement;
    private getInstance;
    private eventDelete;
    getRecurrenceEditorInstance(): RecurrenceEditor;
    private destroyComponents;
    /**
     * To destroy the event window.
     * @return {void}
     * @private
     */
    destroy(): void;
}
