import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { WCellFormat } from '../index';
import { isNullOrUndefined, L10n, createElement } from '@syncfusion/ej2-base';
/**
 * The Cell options dialog is used to modify margins of selected cells.
 */
var CellOptionsDialog = /** @class */ (function () {
    /**
     * @private
     */
    function CellOptionsDialog(viewer) {
        var _this = this;
        /**
         * @private
         */
        this.removeEvents = function () {
            _this.owner.dialog2.element.style.pointerEvents = '';
            _this.owner.updateFocus();
        };
        /**
         * @private
         */
        this.changeSameAsTable = function () {
            if (_this.sameAsTableCheckBox.checked) {
                _this.leftMarginBox.enabled = false;
                _this.rightMarginBox.enabled = false;
                _this.bottomMarginBox.enabled = false;
                _this.topMarginBox.enabled = false;
            }
            else {
                _this.leftMarginBox.enabled = true;
                _this.rightMarginBox.enabled = true;
                _this.bottomMarginBox.enabled = true;
                _this.topMarginBox.enabled = true;
            }
        };
        /**
         * @private
         */
        this.applyTableCellProperties = function () {
            var cellFormat = _this.owner.selection.cellFormat;
            if (!isNullOrUndefined(_this.bottomMarginBox.value || _this.leftMarginBox.value
                || _this.rightMarginBox.value || _this.topMarginBox.value) &&
                (cellFormat.bottomMargin !== _this.bottomMarginBox.value || cellFormat.leftMargin !== _this.leftMarginBox.value
                    || cellFormat.rightMargin !== _this.rightMarginBox.value || cellFormat.topMargin !== _this.topMarginBox.value)) {
                _this.owner.owner.tablePropertiesDialogModule.isCellOptionsUpdated = true;
                _this.applyTableOptions(_this.cellFormat);
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
        };
        this.owner = viewer;
    }
    Object.defineProperty(CellOptionsDialog.prototype, "cellFormat", {
        /**
         * @private
         */
        get: function () {
            if (isNullOrUndefined(this.cellFormatIn)) {
                return this.cellFormatIn = new WCellFormat();
            }
            return this.cellFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    CellOptionsDialog.prototype.getModuleName = function () {
        return 'CellOptionsDialog';
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.initCellMarginsDialog = function (localValue, isRtl) {
        var instance = this.owner;
        this.target = createElement('div', {
            id: this.owner.owner.containerId + '_tableCellMarginsDialog', className: 'e-de-table-cell-margin-dlg'
        });
        var innerDiv = createElement('div', { styles: 'width: 504px;position: relative;height: auto;' });
        var innerDivLabel = createElement('Label', {
            className: 'e-de-cell-dia-options-label', id: this.target.id + '_innerDivLabel'
        });
        innerDivLabel.innerHTML = localValue.getConstant('Cell margins');
        innerDiv.appendChild(innerDivLabel);
        var table = createElement('TABLE', {
            styles: 'padding-bottom: 8px;padding-top: 8px;', className: 'e-de-cell-margin-top'
        });
        var tr = createElement('tr');
        var td = createElement('td', { className: 'e-de-tbl-btn-seperator' });
        var sameAsTableCheckBox = createElement('input', {
            attrs: { 'type': 'checkbox' }, id: this.target.id + '_sameAsCheckBox'
        });
        td.appendChild(sameAsTableCheckBox);
        tr.appendChild(td);
        table.appendChild(tr);
        innerDiv.appendChild(table);
        CellOptionsDialog.getCellMarginDialogElements(this, innerDiv, localValue);
        var divBtn = document.createElement('div');
        this.target.appendChild(divBtn);
        this.sameAsTableCheckBox = new CheckBox({
            label: localValue.getConstant('Same as the whole table'),
            change: this.changeSameAsTable,
            enableRtl: isRtl
        });
        this.sameAsTableCheckBox.appendTo(sameAsTableCheckBox);
        this.sameAsTableCheckBox.addEventListener('change', this.changeSameAsTable);
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.show = function () {
        var localizeValue = new L10n('documenteditor', this.owner.owner.defaultLocale);
        localizeValue.setLocale(this.owner.owner.locale);
        if (!this.target) {
            this.initCellMarginsDialog(localizeValue, this.owner.owner.enableRtl);
        }
        this.loadCellMarginsDialog();
        this.owner.dialog.header = localizeValue.getConstant('Cell Options');
        this.owner.dialog.position = { X: 'center', Y: 'top' };
        this.owner.dialog.height = 'auto';
        this.owner.dialog.width = 'auto';
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = undefined;
        this.owner.dialog.open = undefined;
        this.owner.dialog.close = this.removeEvents;
        this.owner.dialog.buttons = [{
                click: this.applyTableCellProperties,
                buttonModel: { content: localizeValue.getConstant('Ok'), cssClass: 'e-flat e-table-cell-margin-okay', isPrimary: true }
            },
            {
                click: this.closeCellMarginsDialog,
                buttonModel: { content: localizeValue.getConstant('Cancel'), cssClass: 'e-flat e-table-cell-margin-cancel' }
            }];
        this.owner.dialog.show();
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.loadCellMarginsDialog = function () {
        var cellFormat = this.owner.selection.cellFormat;
        this.sameAsTable = isNullOrUndefined(cellFormat.leftMargin || cellFormat.topMargin
            || cellFormat.rightMargin || cellFormat.bottomMargin);
        if (this.sameAsTable) {
            var tableFormat = this.owner.selection.tableFormat;
            this.loadCellProperties(tableFormat, false, true);
        }
        else {
            this.loadCellProperties(cellFormat, true, false);
        }
    };
    CellOptionsDialog.prototype.loadCellProperties = function (format, enableTextBox, enableCheckBox) {
        this.leftMarginBox.value = format.leftMargin;
        this.rightMarginBox.value = format.rightMargin;
        this.topMarginBox.value = format.topMargin;
        this.bottomMarginBox.value = format.bottomMargin;
        this.leftMarginBox.enabled = enableTextBox;
        this.rightMarginBox.enabled = enableTextBox;
        this.topMarginBox.enabled = enableTextBox;
        this.bottomMarginBox.enabled = enableTextBox;
        this.sameAsTableCheckBox.checked = enableCheckBox;
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.applySubCellOptions = function (cellFormat) {
        this.owner.owner.editorHistory.initComplexHistory(this.owner.selection, 'CellMarginsSelection');
        this.owner.owner.editorModule.initHistory('CellOptions');
        /* tslint:disable:max-line-length */
        var startTable = this.owner.selection.start.paragraph.associatedCell.ownerTable;
        startTable = startTable.combineWidget(this.owner);
        this.applyCellmarginsValue(this.owner.selection.start.paragraph.associatedCell.ownerRow.combineWidget(this.owner), this.owner.selection.start, this.owner.selection.end, cellFormat);
        this.owner.owner.editorModule.reLayout(this.owner.selection, false);
        if (!isNullOrUndefined(this.owner.owner.editorHistory.currentHistoryInfo)) {
            this.owner.owner.editorHistory.updateComplexHistory();
        }
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.applyCellmarginsValue = function (row, start, end, cellFormat) {
        this.applyCellMarginsInternal(row, cellFormat);
        if (end.paragraph.associatedCell.ownerRow === row) {
            return;
        }
        var newRow = row.nextWidget;
        if (!isNullOrUndefined(newRow)) {
            this.applyCellmarginsValue(newRow, start, end, cellFormat);
        }
    };
    CellOptionsDialog.prototype.applyCellMarginsInternal = function (row, cellFormat) {
        if (!isNullOrUndefined(this.owner.owner.editorHistory.currentBaseHistoryInfo)) {
            var currentFormat = row.childWidgets[0].cellFormat;
            /* tslint:disable:max-line-length */
            cellFormat = this.owner.owner.editorHistory.currentBaseHistoryInfo.addModifiedCellOptions(currentFormat, cellFormat, row.ownerTable);
        }
        if (!isNullOrUndefined(cellFormat)) {
            this.applyCellMarginsForCells(row, cellFormat);
        }
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.applyCellMarginsForCells = function (row, cellFormat) {
        var rowCells = row.childWidgets;
        this.iterateCells(rowCells, cellFormat);
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.iterateCells = function (cells, cellFormat) {
        for (var i = 0; i < cells.length; i++) {
            this.applySubCellMargins(cells[i].cellFormat, cellFormat);
        }
        this.owner.owner.tablePropertiesDialogModule.calculateGridValue(cells[0].ownerTable);
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.applySubCellMargins = function (sourceFormat, cellFormat) {
        sourceFormat.leftMargin = cellFormat.leftMargin;
        sourceFormat.topMargin = cellFormat.topMargin;
        sourceFormat.rightMargin = cellFormat.rightMargin;
        sourceFormat.bottomMargin = cellFormat.bottomMargin;
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.applyTableOptions = function (cellFormat) {
        if (!this.sameAsTableCheckBox.checked) {
            cellFormat.leftMargin = this.leftMarginBox.value;
            cellFormat.topMargin = this.topMarginBox.value;
            cellFormat.bottomMargin = this.bottomMarginBox.value;
            cellFormat.rightMargin = this.rightMarginBox.value;
        }
    };
    /**
     * @private
     */
    CellOptionsDialog.prototype.destroy = function () {
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var y = 0; y < this.target.childNodes.length; y++) {
                this.target.removeChild(this.target.childNodes[y]);
                y--;
            }
            this.target = undefined;
        }
        this.dialog = undefined;
        this.target = undefined;
        this.owner = undefined;
        this.sameAsTableCheckBox = undefined;
    };
    /**
     * @private
     */
    CellOptionsDialog.getCellMarginDialogElements = function (dialog, div, locale) {
        if (!isNullOrUndefined(dialog)) {
            var table = createElement('TABLE', { className: 'e-de-cell-margin-top' });
            var tr1 = createElement('tr', { styles: 'height: 50px;' });
            var td1 = createElement('td');
            var topLabel = createElement('label', {
                innerHTML: locale.getConstant('Top'), className: 'e-de-cell-dia-label-common',
                id: dialog.target.id + '_TopLabel'
            });
            var topTextBox = createElement('input', {
                attrs: { 'type': 'text' }, styles: 'width:100%', id: dialog.target.id + '_Top'
            });
            td1.appendChild(topLabel);
            td1.appendChild(topTextBox);
            var td2 = createElement('td', { className: 'e-de-tbl-btn-seperator' });
            var leftLabel = createElement('label', {
                innerHTML: locale.getConstant('Left'), className: 'e-de-cell-dia-label-common',
                id: dialog.target.id + '_leftLabel'
            });
            var leftTextBox = createElement('input', {
                attrs: { 'type': 'text' },
                styles: 'width:100%', id: dialog.target.id + '_left'
            });
            td2.appendChild(leftLabel);
            td2.appendChild(leftTextBox);
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            var tr2 = createElement('tr', { styles: 'height: 50px;' });
            var td3 = createElement('td', { styles: 'width:40%;' });
            var bottomLabel = createElement('label', {
                innerHTML: locale.getConstant('Bottom'),
                className: 'e-de-cell-dia-label-common', id: dialog.target.id + '_bottomLabel'
            });
            var bottomTextBox = createElement('input', {
                attrs: { 'type': 'text' },
                styles: 'width:100%', id: dialog.target.id + '_bottom'
            });
            td3.appendChild(bottomLabel);
            td3.appendChild(bottomTextBox);
            var td4 = createElement('td', { styles: 'width:40%;' });
            var rightLabel = createElement('label', {
                innerHTML: locale.getConstant('Right'), id: dialog.target.id + '_rightLabel',
                className: 'e-de-cell-dia-label-common'
            });
            var rightTextBox = createElement('input', {
                attrs: { 'type': 'text' },
                styles: 'width:100%', id: dialog.target.id + '_right'
            });
            td4.appendChild(rightLabel);
            td4.appendChild(rightTextBox);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            table.appendChild(tr1);
            table.appendChild(tr2);
            div.appendChild(table);
            dialog.target.appendChild(div);
            dialog.topMarginBox = new NumericTextBox({
                value: 0, min: 0, max: 1584, width: 175, decimals: 2,
                enablePersistence: false
            });
            dialog.topMarginBox.appendTo(topTextBox);
            dialog.leftMarginBox = new NumericTextBox({
                value: 0, min: 0, max: 1584, width: 175,
                decimals: 2, enablePersistence: false
            });
            dialog.leftMarginBox.appendTo(leftTextBox);
            dialog.bottomMarginBox = new NumericTextBox({
                value: 0, min: 0, max: 1584, width: 175, decimals: 2,
                enablePersistence: false
            });
            dialog.bottomMarginBox.appendTo(bottomTextBox);
            dialog.rightMarginBox = new NumericTextBox({
                value: 0, min: 0, max: 1584, width: 175,
                decimals: 2, enablePersistence: false
            });
            dialog.rightMarginBox.appendTo(rightTextBox);
        }
    };
    return CellOptionsDialog;
}());
export { CellOptionsDialog };
