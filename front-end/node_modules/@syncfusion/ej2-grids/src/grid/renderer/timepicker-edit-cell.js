import { extend } from '@syncfusion/ej2-base';
import { TimePicker } from '@syncfusion/ej2-calendars';
import { isEditable, getComplexFieldID, getObject } from '../base/util';
/**
 * `TimePickerEditCell` is used to handle Timepicker cell type editing.
 * @hidden
 */
var TimePickerEditCell = /** @class */ (function () {
    function TimePickerEditCell(grid) {
        this.parent = grid;
    }
    TimePickerEditCell.prototype.create = function (args) {
        /* tslint:disable-next-line:no-any */
        var complexField = getComplexFieldID(args.column.field);
        return this.parent.createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + complexField,
                name: complexField, type: 'text', 'e-mappinguid': args.column.uid
            }
        });
    };
    TimePickerEditCell.prototype.read = function (element) {
        return element.ej2_instances[0].value;
    };
    TimePickerEditCell.prototype.write = function (args) {
        var isInlineEdit = this.parent.editSettings.mode !== 'Dialog';
        var rowDataValue = getObject(args.column.field, args.rowData);
        rowDataValue = rowDataValue ? new Date(rowDataValue) : null;
        this.obj = new TimePicker(extend({
            floatLabelType: isInlineEdit ? 'Never' : 'Always',
            value: rowDataValue,
            placeholder: isInlineEdit ?
                '' : args.column.headerText, enableRtl: this.parent.enableRtl,
            enabled: isEditable(args.column, args.requestType, args.element),
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
    };
    TimePickerEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return TimePickerEditCell;
}());
export { TimePickerEditCell };
