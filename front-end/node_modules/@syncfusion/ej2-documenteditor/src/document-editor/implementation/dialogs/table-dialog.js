import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The Table dialog is used to insert table at selection.
 */
var TableDialog = /** @class */ (function () {
    /**
     * @private
     */
    function TableDialog(viewer) {
        var _this = this;
        /**
         * @private
         */
        this.keyUpInsertTable = function (event) {
            if (event.keyCode === 13) {
                if (_this.rowsCountBox.value !== '' && _this.columnsCountBox.value !== '') {
                    _this.onInsertTableClick();
                }
            }
        };
        /**
         * @private
         */
        this.onCancelButtonClick = function () {
            _this.owner.dialog.hide();
        };
        /**
         * @private
         */
        this.onInsertTableClick = function () {
            var rowCount = _this.rowValueTextBox.value;
            var columnCount = _this.columnValueTexBox.value;
            if (!(isNullOrUndefined(rowCount) && isNullOrUndefined(columnCount))) {
                _this.owner.owner.editor.insertTable(rowCount, columnCount);
            }
            _this.owner.dialog.hide();
        };
        this.owner = viewer;
    }
    TableDialog.prototype.getModuleName = function () {
        return 'TableDialog';
    };
    /**
     * @private
     */
    TableDialog.prototype.initTableDialog = function (localValue) {
        var instance = this;
        var id = this.owner.owner.containerId + '_insert_Table';
        this.target = createElement('div', { id: id, className: 'e-de-insert-table' });
        var parentDiv = createElement('div');
        var columnContainer = createElement('div', {
            className: 'e-de-insert-table-dlg-sub-header', innerHTML: localValue.getConstant('Number of columns')
        });
        var columnValue = createElement('div', { className: 'e-de-insert-table-dlg-input' });
        this.columnsCountBox = createElement('input', {
            attrs: { type: 'text' }, id: this.owner.owner.containerId + '_column'
        });
        columnValue.appendChild(this.columnsCountBox);
        var rowContainer = createElement('div', {
            className: 'e-de-insert-table-dlg-sub-header', innerHTML: localValue.getConstant('Number of rows')
        });
        var rowValue = createElement('div');
        this.rowsCountBox = createElement('input', {
            attrs: { type: 'text' }, id: this.owner.owner.containerId + 'row'
        });
        rowValue.appendChild(this.rowsCountBox);
        parentDiv.appendChild(columnContainer);
        parentDiv.appendChild(columnValue);
        parentDiv.appendChild(rowContainer);
        parentDiv.appendChild(rowValue);
        this.target.appendChild(parentDiv);
        this.columnsCountBox.addEventListener('keyup', instance.keyUpInsertTable);
        this.rowsCountBox.addEventListener('keyup', instance.keyUpInsertTable);
        this.rowValueTextBox = new NumericTextBox({
            format: '#',
            value: 2,
            min: 1,
            max: 32767,
            enablePersistence: false
        });
        this.rowValueTextBox.appendTo(this.rowsCountBox);
        this.columnValueTexBox = new NumericTextBox({
            format: '#',
            value: 2,
            min: 1,
            max: 63,
            enablePersistence: false
        });
        this.columnValueTexBox.appendTo(this.columnsCountBox);
    };
    /**
     * @private
     */
    TableDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.owner.owner.defaultLocale);
        localValue.setLocale(this.owner.owner.locale);
        if (!this.target) {
            this.initTableDialog(localValue);
        }
        if (this.owner.selection.caret.style.display !== 'none') {
            this.owner.selection.caret.style.display = 'none';
        }
        this.owner.dialog.header = localValue.getConstant('Insert Table');
        this.owner.dialog.height = 'auto';
        this.owner.dialog.width = 'auto';
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = this.owner.updateFocus;
        this.owner.dialog.buttons = [{
                click: this.onInsertTableClick,
                buttonModel: { content: localValue.getConstant('Ok'), cssClass: 'e-flat e-table-ok', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-table-cancel' }
            }];
        this.rowValueTextBox.value = 2;
        this.columnValueTexBox.value = 2;
        this.owner.dialog.close = this.owner.updateFocus;
        this.owner.dialog.dataBind();
        this.owner.dialog.show();
    };
    /**
     * @private
     */
    TableDialog.prototype.destroy = function () {
        if (this.columnsCountBox) {
            if (this.columnsCountBox.parentElement) {
                this.columnsCountBox.parentElement.removeChild(this.columnsCountBox);
            }
            this.columnsCountBox = undefined;
        }
        if (this.rowsCountBox) {
            if (this.rowsCountBox.parentElement) {
                this.rowsCountBox.parentElement.removeChild(this.rowsCountBox);
            }
            this.rowsCountBox = undefined;
        }
        if (this.columnValueTexBox) {
            this.columnValueTexBox.destroy();
            this.columnValueTexBox = undefined;
        }
        if (this.rowValueTextBox) {
            this.rowValueTextBox.destroy();
            this.rowValueTextBox = undefined;
        }
        this.columnsCountBox = undefined;
        this.rowsCountBox = undefined;
        this.owner = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var i = 0; i < this.target.childNodes.length; i++) {
                this.target.removeChild(this.target.childNodes[i]);
                i--;
            }
            this.target = undefined;
        }
    };
    return TableDialog;
}());
export { TableDialog };
