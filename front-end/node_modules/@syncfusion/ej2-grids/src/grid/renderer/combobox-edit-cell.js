import { extend } from '@syncfusion/ej2-base';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, DataUtil } from '@syncfusion/ej2-data';
import { isEditable, getComplexFieldID, getObject } from '../base/util';
/**
 * `ComboBoxEditCell` is used to handle ComboBoxEdit cell type editing.
 * @hidden
 */
var ComboboxEditCell = /** @class */ (function () {
    function ComboboxEditCell(parentObject) {
        //constructor
        this.parent = parentObject;
    }
    ComboboxEditCell.prototype.create = function (args) {
        //create
        var fieldName = getComplexFieldID(args.column.field);
        return this.parent.createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + fieldName,
                name: fieldName, type: 'text', 'e-mappinguid': args.column.uid,
            }
        });
    };
    ComboboxEditCell.prototype.write = function (args) {
        this.column = args.column;
        var isInlineMode = this.parent.editSettings.mode !== 'Dialog';
        this.obj = new ComboBox(extend({
            dataSource: this.parent.dataSource instanceof DataManager ?
                this.parent.dataSource : new DataManager(this.parent.dataSource),
            query: new Query().select(args.column.field),
            fields: { value: args.column.field },
            value: getObject(args.column.field, args.rowData),
            enableRtl: this.parent.enableRtl, actionComplete: this.finalValue.bind(this),
            placeholder: isInlineMode ? '' : args.column.headerText,
            floatLabelType: isInlineMode ? 'Never' : 'Always',
            enabled: isEditable(args.column, args.requestType, args.element),
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
    };
    ComboboxEditCell.prototype.read = function (inputEle) {
        return inputEle.ej2_instances[0].value;
    };
    ComboboxEditCell.prototype.finalValue = function (val) {
        val.result = DataUtil.distinct(val.result, this.obj.fields.value, true);
        if (this.column.dataSource) {
            this.column.dataSource.dataSource.json = val.result;
        }
    };
    ComboboxEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return ComboboxEditCell;
}());
export { ComboboxEditCell };
