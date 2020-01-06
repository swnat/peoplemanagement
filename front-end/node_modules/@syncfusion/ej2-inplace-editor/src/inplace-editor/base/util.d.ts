import { RichTextEditorModel } from '@syncfusion/ej2-richtexteditor';
import { DatePickerModel } from '@syncfusion/ej2-calendars';
import { DateTimePickerModel, DateRangePickerModel, TimePickerModel } from '@syncfusion/ej2-calendars';
import { NumericTextBoxModel, TextBoxModel } from '@syncfusion/ej2-inputs';
import { ColorPickerModel, MaskedTextBoxModel, SliderModel } from '@syncfusion/ej2-inputs';
import { AutoCompleteModel, ComboBoxModel, DropDownListModel, MultiSelectModel } from '@syncfusion/ej2-dropdowns';
declare type valueType = string | number | Date | string[] | Date[] | number[];
declare type modelType = AutoCompleteModel | ColorPickerModel | ComboBoxModel | DatePickerModel | DateRangePickerModel | DateTimePickerModel | DropDownListModel | MaskedTextBoxModel | MultiSelectModel | NumericTextBoxModel | RichTextEditorModel | SliderModel | TextBoxModel | TimePickerModel;
/**
 * @hidden
 */
export declare function parseValue(type: string, val: valueType, model: modelType): string;
export declare function getCompValue(type: string, val: valueType): valueType;
export {};
