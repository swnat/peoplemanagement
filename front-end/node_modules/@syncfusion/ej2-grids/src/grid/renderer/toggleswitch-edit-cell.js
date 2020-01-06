import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Switch } from '@syncfusion/ej2-buttons';
import { extend } from '@syncfusion/ej2-base';
import { isEditable, addRemoveActiveClasses, getComplexFieldID, getObject } from '../base/util';
/**
 * `ToggleEditCell` is used to handle boolean cell type editing.
 * @hidden
 */
var ToggleEditCell = /** @class */ (function () {
    function ToggleEditCell(parentObject) {
        this.activeClasses = ['e-selectionbackground', 'e-active'];
        this.parent = parentObject;
    }
    ToggleEditCell.prototype.create = function (args) {
        var col = args.column;
        var classNames = 'e-field e-boolcell';
        if (col.type === 'checkbox') {
            classNames = 'e-field e-boolcell e-edit-checkselect';
        }
        var complexField = getComplexFieldID(args.column.field);
        return this.parent.createElement('input', {
            className: classNames, attrs: {
                type: 'checkbox', value: args.value, 'e-mappinguid': col.uid,
                id: this.parent.element.id + complexField,
                name: complexField
            }
        });
    };
    ToggleEditCell.prototype.read = function (element) {
        return element.checked;
    };
    ToggleEditCell.prototype.write = function (args) {
        var chkBoxElement;
        var checkState;
        // let isAddRow : boolean =  args.requestType === 'add' || args.row.classList.contains('e-addedrow');
        if (!isNullOrUndefined(args.row)) {
            chkBoxElement = args.row.querySelector('.e-edit-checkselect');
        }
        if (getObject(args.column.field, args.rowData)) {
            checkState = JSON.parse(getObject(args.column.field, args.rowData).toString().toLowerCase());
        }
        if (!isNullOrUndefined(chkBoxElement)) {
            this.editType = this.parent.editSettings.mode;
            this.editRow = args.row;
            if (args.requestType !== 'add') {
                var row = this.parent.getRowObjectFromUID(args.row.getAttribute('data-uid'));
                checkState = row ? row.isSelected : false;
            }
            addRemoveActiveClasses.apply(void 0, [[].slice.call(args.row.querySelectorAll('.e-rowcell')), checkState].concat(this.activeClasses));
        }
        this.obj = new Switch(extend({
            label: this.parent.editSettings.mode !== 'Dialog' ? ' ' : args.column.headerText,
            checked: checkState,
            disabled: !isEditable(args.column, args.requestType, args.element), enableRtl: this.parent.enableRtl,
            change: this.switchModeChange.bind(this)
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
    };
    ToggleEditCell.prototype.switchModeChange = function (args) {
        if (this.editRow && this.editType !== 'Dialog') {
            var addClass = false;
            if (!args.checked) {
                this.editRow.removeAttribute('aria-selected');
            }
            else {
                addClass = true;
                this.editRow.setAttribute('aria-selected', addClass.toString());
            }
            addRemoveActiveClasses.apply(void 0, [[].slice.call(this.editRow.querySelectorAll('.e-rowcell')), addClass].concat(this.activeClasses));
        }
    };
    ToggleEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return ToggleEditCell;
}());
export { ToggleEditCell };
