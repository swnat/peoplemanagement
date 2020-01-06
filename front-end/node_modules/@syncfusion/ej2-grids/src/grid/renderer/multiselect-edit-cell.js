import { extend, getValue } from '@syncfusion/ej2-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { getComplexFieldID, } from '../base/util';
/**
 * `MultiSelectEditCell` is used to handle multiselect dropdown cell type editing.
 * @hidden
 */
var MultiSelectEditCell = /** @class */ (function () {
    function MultiSelectEditCell(parentObj) {
        //constructor
        this.parent = parentObj;
    }
    MultiSelectEditCell.prototype.create = function (args) {
        //create
        var colName = getComplexFieldID(args.column.field);
        return this.parent.createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + colName,
                name: colName, type: 'text', 'e-mappinguid': args.column.uid,
            }
        });
    };
    MultiSelectEditCell.prototype.read = function (element) {
        return element.ej2_instances[0].value;
    };
    MultiSelectEditCell.prototype.write = function (args) {
        this.column = args.column;
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        this.obj = new MultiSelect(extend({
            fields: { text: args.column.field, value: args.column.field },
            value: getValue(args.column.field, args.rowData),
            enableRtl: this.parent.enableRtl,
            placeholder: isInline ? '' : args.column.headerText, popupHeight: '200px',
            floatLabelType: isInline ? 'Never' : 'Always'
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
        args.element.setAttribute('name', getComplexFieldID(args.column.field));
    };
    MultiSelectEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return MultiSelectEditCell;
}());
export { MultiSelectEditCell };
