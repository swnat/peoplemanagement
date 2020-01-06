import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Input } from '@syncfusion/ej2-inputs';
import { isEditable, getComplexFieldID } from '../base/util';
/**
 * `DefaultEditCell` is used to handle default cell type editing.
 * @hidden
 */
var DefaultEditCell = /** @class */ (function () {
    function DefaultEditCell(parent) {
        this.parent = parent;
    }
    DefaultEditCell.prototype.create = function (args) {
        var col = args.column;
        var input = this.parent.createElement('input', {
            className: 'e-field e-input e-defaultcell', attrs: {
                type: 'text', value: !isNullOrUndefined(args.value) ? args.value : '', 'e-mappinguid': col.uid,
                id: this.parent.element.id + getComplexFieldID(col.field), name: getComplexFieldID(col.field),
                style: 'text-align:' + col.textAlign,
            }
        });
        return input;
    };
    DefaultEditCell.prototype.read = function (element) {
        return element.value;
    };
    DefaultEditCell.prototype.write = function (args) {
        var col = args.column;
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        var inputargs = {
            element: args.element, floatLabelType: this.parent.editSettings.mode !== 'Dialog' ? 'Never' : 'Always',
            properties: {
                enableRtl: this.parent.enableRtl, enabled: isEditable(args.column, args.requestType, args.element),
                placeholder: isInline ? '' : args.column.headerText
            }
        };
        Input.createInput(inputargs, this.parent.createElement);
    };
    return DefaultEditCell;
}());
export { DefaultEditCell };
