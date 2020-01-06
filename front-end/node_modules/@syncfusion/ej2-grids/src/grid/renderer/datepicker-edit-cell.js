import { extend, isBlazor } from '@syncfusion/ej2-base';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { isEditable, getComplexFieldID, getObject, getCustomDateFormat } from '../base/util';
/**
 * `DatePickerEditCell` is used to handle datepicker cell type editing.
 * @hidden
 */
var DatePickerEditCell = /** @class */ (function () {
    function DatePickerEditCell(parent) {
        this.parent = parent;
    }
    DatePickerEditCell.prototype.create = function (args) {
        /* tslint:disable-next-line:no-any */
        var complexFieldName = getComplexFieldID(args.column.field);
        return this.parent.createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + complexFieldName,
                name: complexFieldName, type: 'text', 'e-mappinguid': args.column.uid
            }
        });
    };
    DatePickerEditCell.prototype.read = function (element) {
        return element.ej2_instances[0].value;
    };
    DatePickerEditCell.prototype.write = function (args) {
        if (args.column.editType === 'datepickeredit') {
            this.obj = new DatePicker(extend(dateanddatetimerender(args, this.parent.editSettings.mode, this.parent.enableRtl), args.column.edit.params));
        }
        else if (args.column.editType === 'datetimepickeredit') {
            this.obj = new DateTimePicker(extend(dateanddatetimerender(args, this.parent.editSettings.mode, this.parent.enableRtl), args.column.edit.params));
        }
        if (isBlazor()) {
            this.obj.locale = this.parent.locale;
        }
        this.obj.appendTo(args.element);
    };
    DatePickerEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return DatePickerEditCell;
}());
export { DatePickerEditCell };
function dateanddatetimerender(args, mode, rtl) {
    var isInline = mode !== 'Dialog';
    var format = getCustomDateFormat(args.column.format, args.column.type);
    var value = getObject(args.column.field, args.rowData);
    value = value ? new Date(value) : null;
    return {
        floatLabelType: isInline ? 'Never' : 'Always',
        value: value,
        format: format,
        placeholder: isInline ?
            '' : args.column.headerText, enableRtl: rtl,
        enabled: isEditable(args.column, args.requestType, args.element),
    };
}
