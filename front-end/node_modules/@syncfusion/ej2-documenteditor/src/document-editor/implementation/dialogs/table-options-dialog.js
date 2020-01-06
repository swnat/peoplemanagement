import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { WTableFormat } from '../index';
import { isNullOrUndefined, L10n, createElement } from '@syncfusion/ej2-base';
import { CellOptionsDialog } from './index';
/**
 * The Table options dialog is used to modify default cell margins and cell spacing of selected table.
 */
var TableOptionsDialog = /** @class */ (function () {
    /**
     * @private
     */
    function TableOptionsDialog(viewer) {
        var _this = this;
        /**
         * @private
         */
        this.applyTableCellProperties = function () {
            var tableFormat = _this.owner.selection.tableFormat;
            if (!isNullOrUndefined(_this.bottomMarginBox.value || _this.leftMarginBox.value
                || _this.rightMarginBox.value || _this.topMarginBox.value || _this.cellSpaceTextBox.value)
                && (tableFormat.bottomMargin !== _this.bottomMarginBox.value
                    || tableFormat.leftMargin !== _this.leftMarginBox.value
                    || tableFormat.rightMargin !== _this.rightMarginBox.value
                    || tableFormat.topMargin !== _this.topMarginBox.value
                    || tableFormat.cellSpacing !== _this.cellSpaceTextBox.value)) {
                _this.owner.owner.tablePropertiesDialogModule.isTableOptionsUpdated = true;
                _this.applyTableOptions(_this.tableFormat);
                _this.owner.owner.tablePropertiesDialogModule.applyTableSubProperties();
            }
            _this.closeCellMarginsDialog();
        };
        /**
         * @private
         */
        this.closeCellMarginsDialog = function () {
            _this.owner.dialog.hide();
            _this.owner.dialog.element.style.pointerEvents = '';
            _this.owner.updateFocus();
        };
        /**
         * @private
         */
        this.changeAllowSpaceCheckBox = function () {
            if (_this.allowSpaceCheckBox.checked) {
                _this.cellSpaceTextBox.enabled = true;
            }
            else {
                _this.cellSpaceTextBox.enabled = false;
            }
        };
        /**
         * @private
         */
        this.removeEvents = function () {
            _this.owner.dialog2.element.style.pointerEvents = '';
            _this.owner.updateFocus();
        };
        this.owner = viewer;
    }
    Object.defineProperty(TableOptionsDialog.prototype, "tableFormat", {
        /**
         * @private
         */
        get: function () {
            if (isNullOrUndefined(this.tableFormatIn)) {
                return this.tableFormatIn = new WTableFormat();
            }
            return this.tableFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    TableOptionsDialog.prototype.getModuleName = function () {
        return 'TableOptionsDialog';
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.initTableOptionsDialog = function (localValue, isRtl) {
        var instance = this.owner;
        this.target = createElement('div', {
            id: this.owner.owner.containerId + '_insertCellMarginsDialog', className: 'e-de-table-options-dlg'
        });
        var innerDiv = createElement('div', {
            styles: 'width: 504px;position: relative;height: auto;margin-bottom: 14px'
        });
        var innerDivLabel = createElement('Label', {
            id: this.target.id + '_innerDivLabel', className: 'e-de-cell-dia-options-label',
            innerHTML: localValue.getConstant('Default cell margins')
        });
        innerDiv.appendChild(innerDivLabel);
        CellOptionsDialog.getCellMarginDialogElements(this, innerDiv, localValue);
        var div = createElement('div', { styles: 'width: 475px; position: relative;' });
        var cellSpaceLabel = createElement('Label', {
            className: 'e-de-cell-dia-options-label',
            id: this.target.id + '_cellSpaceLabel'
        });
        cellSpaceLabel.innerHTML = localValue.getConstant('Default cell spacing');
        div.appendChild(cellSpaceLabel);
        var table2 = createElement('TABLE', {
            styles: 'height: 30px;'
        });
        var tr3 = createElement('tr');
        var td5 = createElement('td');
        var allowSpaceCheckBox = createElement('input', {
            attrs: { 'type': 'checkbox' }, id: this.target.id + '_cellcheck'
        });
        var td6Padding;
        if (isRtl) {
            td6Padding = 'padding-right:15px;';
        }
        else {
            td6Padding = 'padding-left:14px;';
        }
        var td6 = createElement('td', { styles: td6Padding, });
        this.cellspacingTextBox = createElement('input', {
            attrs: { 'type': 'text' }, id: this.target.id + '_cellspacing'
        });
        td5.appendChild(allowSpaceCheckBox);
        td6.appendChild(this.cellspacingTextBox);
        tr3.appendChild(td5);
        tr3.appendChild(td6);
        table2.appendChild(tr3);
        div.appendChild(table2);
        var divBtn = document.createElement('div');
        this.target.appendChild(div);
        this.target.appendChild(divBtn);
        this.cellSpaceTextBox = new NumericTextBox({
            value: 0, min: 0, max: 264.5, width: 163,
            decimals: 2, enablePersistence: false
        });
        this.cellSpaceTextBox.appendTo(this.cellspacingTextBox);
        this.allowSpaceCheckBox = new CheckBox({
            label: localValue.getConstant('Allow spacing between cells'),
            change: this.changeAllowSpaceCheckBox,
            enableRtl: isRtl,
            cssClass: 'e-de-tbl-margin-sub-header',
        });
        this.allowSpaceCheckBox.appendTo(allowSpaceCheckBox);
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.loadCellMarginsDialog = function () {
        var tableFormat = this.owner.selection.tableFormat;
        this.cellSpaceTextBox.value = tableFormat.cellSpacing;
        this.bottomMarginBox.value = tableFormat.bottomMargin;
        this.topMarginBox.value = tableFormat.topMargin;
        this.rightMarginBox.value = tableFormat.rightMargin;
        this.leftMarginBox.value = tableFormat.leftMargin;
        if (tableFormat.cellSpacing > 0) {
            this.allowSpaceCheckBox.checked = true;
            this.cellSpaceTextBox.enabled = true;
        }
        else {
            this.allowSpaceCheckBox.checked = false;
            this.cellSpaceTextBox.enabled = false;
        }
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.applySubTableOptions = function (tableFormat) {
        this.owner.owner.editorHistory.initComplexHistory(this.owner.selection, 'TableMarginsSelection');
        this.applyTableOptionsHistory(tableFormat);
        if (!isNullOrUndefined(this.owner.owner.editorHistory.currentHistoryInfo)) {
            this.owner.owner.editorHistory.updateComplexHistory();
        }
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.applyTableOptionsHelper = function (tableFormat) {
        this.applySubTableOptionsHelper(tableFormat);
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.applyTableOptionsHistory = function (tableFormat) {
        this.owner.owner.editorModule.initHistory('TableOptions');
        this.applySubTableOptionsHelper(tableFormat);
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.applySubTableOptionsHelper = function (tableFormat) {
        var ownerTable = this.owner.selection.start.currentWidget.paragraph.associatedCell.ownerTable;
        ownerTable = ownerTable.combineWidget(this.owner);
        var currentTableFormat = ownerTable.tableFormat;
        if (!isNullOrUndefined(this.owner.owner.editorHistory.currentBaseHistoryInfo)) {
            this.owner.owner.editorHistory.currentBaseHistoryInfo.addModifiedTableOptions(currentTableFormat);
        }
        currentTableFormat.cellSpacing = tableFormat.cellSpacing;
        currentTableFormat.leftMargin = tableFormat.leftMargin;
        currentTableFormat.topMargin = tableFormat.topMargin;
        currentTableFormat.rightMargin = tableFormat.rightMargin;
        currentTableFormat.bottomMargin = tableFormat.bottomMargin;
        this.owner.owner.tablePropertiesDialogModule.calculateGridValue(ownerTable);
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.applyTableOptions = function (tableFormat) {
        tableFormat.leftMargin = this.leftMarginBox.value;
        tableFormat.topMargin = this.topMarginBox.value;
        tableFormat.bottomMargin = this.bottomMarginBox.value;
        tableFormat.rightMargin = this.rightMarginBox.value;
        if (this.allowSpaceCheckBox.checked) {
            tableFormat.cellSpacing = this.cellSpaceTextBox.value;
        }
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.show = function () {
        var documentLocale = new L10n('documenteditor', this.owner.owner.defaultLocale);
        documentLocale.setLocale(this.owner.owner.locale);
        if (!this.target) {
            this.initTableOptionsDialog(documentLocale, this.owner.owner.enableRtl);
        }
        this.loadCellMarginsDialog();
        this.owner.dialog.header = documentLocale.getConstant('Table Options');
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = undefined;
        this.owner.dialog.position = { X: 'center', Y: 'center' };
        //  this.owner.dialog.cssClass = 'e-de-table-margin-size';
        this.owner.dialog.height = 'auto';
        this.owner.dialog.width = 'auto';
        this.owner.dialog.open = undefined;
        this.owner.dialog.beforeOpen = this.owner.updateFocus;
        this.owner.dialog.close = this.removeEvents;
        this.owner.dialog.buttons = [{
                click: this.applyTableCellProperties,
                buttonModel: { content: documentLocale.getConstant('Ok'), cssClass: 'e-flat e-table-cell-okay', isPrimary: true }
            },
            {
                click: this.closeCellMarginsDialog,
                buttonModel: { content: documentLocale.getConstant('Cancel'), cssClass: 'e-flat e-table-cell-cancel' }
            }];
        this.owner.dialog.dataBind();
        this.owner.dialog.show();
    };
    /**
     * @private
     */
    TableOptionsDialog.prototype.destroy = function () {
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var p = 0; p < this.target.childNodes.length; p++) {
                this.target.removeChild(this.target.childNodes[p]);
                p--;
            }
            this.target = undefined;
        }
        this.dialog = undefined;
        this.target = undefined;
        this.owner = undefined;
        this.cellspacingTextBox = undefined;
        this.allowSpaceCheckBox = undefined;
    };
    return TableOptionsDialog;
}());
export { TableOptionsDialog };
