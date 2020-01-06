import { extend, isBlazor } from '@syncfusion/ej2-base';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, DataUtil } from '@syncfusion/ej2-data';
import { isEditable, getComplexFieldID, getObject } from '../base/util';
/**
 * `AutoCompleteEditCell` is used to handle autocomplete cell type editing.
 * @hidden
 */
var AutoCompleteEditCell = /** @class */ (function () {
    function AutoCompleteEditCell(parent) {
        //constructor
        this.parentObj = parent;
    }
    AutoCompleteEditCell.prototype.create = function (args) {
        //create 
        var complexFieldName = getComplexFieldID(args.column.field);
        return this.parentObj.createElement('input', {
            className: 'e-field', attrs: {
                id: this.parentObj.element.id + complexFieldName,
                name: complexFieldName, type: 'text', 'e-mappinguid': args.column.uid,
            }
        });
    };
    AutoCompleteEditCell.prototype.write = function (args) {
        this.column = args.column;
        var isInlineEdit = this.parentObj.editSettings.mode !== 'Dialog';
        this.object = new AutoComplete(extend({
            dataSource: this.parentObj.dataSource instanceof DataManager ?
                this.parentObj.dataSource : new DataManager(this.parentObj.dataSource),
            query: new Query().select(args.column.field), enabled: isEditable(args.column, args.requestType, args.element),
            fields: { value: args.column.field },
            value: getObject(args.column.field, args.rowData),
            // enableRtl: this.parentObject.enableRtl,
            actionComplete: this.selectedValues.bind(this),
            placeholder: isInlineEdit ? '' : args.column.headerText,
            floatLabelType: isInlineEdit ? 'Never' : 'Always'
        }, args.column.edit.params));
        if (isBlazor()) {
            this.object.locale = this.parentObj.locale;
        }
        this.object.appendTo(args.element);
        /* tslint:disable-next-line:no-any */
        args.element.setAttribute('name', getComplexFieldID(args.column.field));
    };
    AutoCompleteEditCell.prototype.read = function (element) {
        return element.ej2_instances[0].value;
    };
    AutoCompleteEditCell.prototype.selectedValues = function (valObj) {
        valObj.result = DataUtil.distinct(valObj.result, this.object.fields.value, true);
        if (this.column.dataSource) {
            this.column.dataSource.dataSource.json = valObj.result;
        }
    };
    AutoCompleteEditCell.prototype.destroy = function () {
        if (this.object) {
            this.object.destroy();
        }
    };
    return AutoCompleteEditCell;
}());
export { AutoCompleteEditCell };
