import { extend } from '@syncfusion/ej2-base';
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
import { isEditable, getComplexFieldID, getObject } from '../base/util';
/**
 * `MaskedTextBoxCellEdit` is used to handle masked input cell type editing.
 * @hidden
 */
var MaskedTextBoxCellEdit = /** @class */ (function () {
    function MaskedTextBoxCellEdit(parentInstance) {
        //constructor
        this.parent = parentInstance;
    }
    MaskedTextBoxCellEdit.prototype.create = function (args) {
        //create
        var columnField = getComplexFieldID(args.column.field);
        return this.parent.createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + columnField,
                name: columnField, type: 'text', 'e-mappinguid': args.column.uid,
            }
        });
    };
    MaskedTextBoxCellEdit.prototype.write = function (args) {
        this.column = args.column;
        var isInlineEdit = this.parent.editSettings.mode !== 'Dialog';
        this.obj = new MaskedTextBox(extend({
            fields: { value: args.column.field },
            value: getObject(args.column.field, args.rowData),
            floatLabelType: isInlineEdit ? 'Never' : 'Always',
            mask: '000-000-0000',
            enabled: isEditable(args.column, args.requestType, args.element),
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
    };
    MaskedTextBoxCellEdit.prototype.read = function (element) {
        return element.ej2_instances[0].value;
    };
    MaskedTextBoxCellEdit.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return MaskedTextBoxCellEdit;
}());
export { MaskedTextBoxCellEdit };
