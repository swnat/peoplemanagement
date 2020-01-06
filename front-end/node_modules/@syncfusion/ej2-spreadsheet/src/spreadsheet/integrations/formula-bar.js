import { formulaBar, locale, selectionComplete } from '../common/index';
import { mouseUpAfterSelection, click } from '../common/index';
import { getRangeIndexes, getRangeFromAddress } from './../../workbook/common/address';
import { getSheetName, getTypeFromFormat, getSheet } from '../../workbook/index';
import { updateSelectedRange, getSheetNameFromAddress, getSheetIndex } from '../../workbook/index';
import { ComboBox, DropDownList } from '@syncfusion/ej2-dropdowns';
import { rippleEffect, EventHandler, detach, Internationalization, isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { editOperation, formulaBarOperation, keyDown, keyUp, formulaOperation } from '../common/event';
import { intToDate } from '../../workbook/common/math';
import { ListView } from '@syncfusion/ej2-lists';
import { workbookFormulaOperation } from '../../workbook/common/event';
/**
 * Represents Formula bar for Spreadsheet.
 */
var FormulaBar = /** @class */ (function () {
    function FormulaBar(parent) {
        this.categoryCollection = [];
        this.formulaCollection = [];
        this.parent = parent;
        this.addEventListener();
    }
    FormulaBar.prototype.getModuleName = function () {
        return 'formulaBar';
    };
    FormulaBar.prototype.createFormulaBar = function (args) {
        if (!this.parent.showFormulaBar && this.insertFnRipple) {
            this.destroy();
            return;
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        var id = this.parent.element.id;
        var fBarWrapper = this.parent.createElement('div', { className: 'e-formula-bar-panel' });
        if (!this.parent.isMobileView()) {
            var nameBox = this.parent.createElement('input', { id: id + '_name_box', attrs: { type: 'text' } });
            fBarWrapper.appendChild(nameBox);
            this.comboBoxInstance = new ComboBox({
                value: 'A1',
                cssClass: 'e-name-box',
                width: '',
                noRecordsTemplate: '',
                fields: { text: 'name', value: 'refersTo' },
                beforeOpen: this.nameBoxBeforeOpen.bind(this),
                blur: this.nameBoxBlur.bind(this),
                select: this.nameBoxSelect.bind(this),
                change: function (args) {
                    /** */
                }
            });
            this.comboBoxInstance.createElement = this.parent.createElement;
            this.comboBoxInstance.appendTo(nameBox);
            this.comboBoxInstance.element.parentElement.title = l10n.getConstant('NameBox');
        }
        var insertFnBtn = fBarWrapper.appendChild(this.parent.createElement('button', {
            className: 'e-btn e-css e-flat e-icon-btn e-insert-function', attrs: { 'title': l10n.getConstant('InsertFunction') }
        }));
        insertFnBtn.appendChild(this.parent.createElement('span', { className: 'e-btn-icon e-icons' }));
        this.insertFnRipple = rippleEffect(fBarWrapper, { selector: '.e-insert-function' });
        fBarWrapper.appendChild(this.parent.createElement('div', { className: 'e-separator' }));
        var textarea = fBarWrapper.appendChild(this.parent.createElement('textarea', {
            className: 'e-formula-bar e-css', id: id + '_formula_input',
            attrs: { 'title': l10n.getConstant('FormulaBar'), 'spellcheck': 'false' }
        }));
        textarea.rows = 1;
        if (this.parent.isMobileView()) {
            textarea.placeholder = l10n.getConstant('MobileFormulaBarPlaceHolder');
            EventHandler.add(textarea, 'focus', this.textAreaFocusIn, this);
            EventHandler.add(textarea, 'blur', this.textAreaFocusOut, this);
        }
        else {
            fBarWrapper.appendChild(this.parent.createElement('span', {
                className: 'e-drop-icon e-icons', attrs: { 'title': l10n.getConstant('ExpandFormulaBar') }
            }));
        }
        if (args && args.uiUpdate) {
            this.parent.element.insertBefore(fBarWrapper, document.getElementById(id + '_sheet_panel'));
        }
        else {
            this.parent.element.appendChild(fBarWrapper);
        }
    };
    FormulaBar.prototype.textAreaFocusIn = function (e) {
        var formulaPanel = this.parent.element.querySelector('.e-formula-bar-panel');
        var tickBtn = this.parent.createElement('button', { className: 'e-btn e-css e-flat e-icon-btn e-formula-submit' });
        tickBtn.appendChild(this.parent.createElement('span', { className: 'e-btn-icon e-icons e-tick-icon' }));
        formulaPanel.classList.add('e-focused');
        formulaPanel.appendChild(tickBtn);
    };
    FormulaBar.prototype.textAreaFocusOut = function (e) {
        var formulaPanel = this.parent.element.querySelector('.e-formula-bar-panel');
        formulaPanel.classList.remove('e-focused');
        detach(formulaPanel.querySelector('.e-formula-submit'));
    };
    FormulaBar.prototype.keyDownHandler = function (e) {
        var trgtElem = e.target;
        if (this.parent.isEdit) {
            if (trgtElem.classList.contains('e-formula-bar')) {
                this.parent.notify(editOperation, { action: 'refreshEditor', value: trgtElem.value, refreshEditorElem: true });
            }
        }
    };
    FormulaBar.prototype.keyUpHandler = function (e) {
        if (this.parent.isEdit) {
            var trgtElem = e.target;
            if (trgtElem.classList.contains('e-formula-bar')) {
                var eventArg = { action: 'getCurrentEditValue', editedValue: '' };
                this.parent.notify(editOperation, eventArg);
                if (eventArg.editedValue !== trgtElem.value) {
                    this.parent.notify(editOperation, { action: 'refreshEditor', value: trgtElem.value, refreshEditorElem: true });
                }
            }
        }
    };
    FormulaBar.prototype.nameBoxBeforeOpen = function (args) {
        if (this.comboBoxInstance.element.classList.contains('e-name-editing')) {
            args.cancel = true;
        }
        else {
            this.comboBoxInstance.element.select();
        }
    };
    FormulaBar.prototype.nameBoxBlur = function (args) {
        if (this.comboBoxInstance.element.classList.contains('e-name-editing')) {
            this.comboBoxInstance.element.classList.remove('e-name-editing');
            this.UpdateValueAfterMouseUp();
        }
    };
    FormulaBar.prototype.nameBoxSelect = function (args) {
        if (args.isInteracted) {
            var refersTo = args.itemData.refersTo.substr(1);
            var sheetIdx = getSheetIndex(this.parent, getSheetNameFromAddress(refersTo));
            var range = getRangeFromAddress(refersTo);
            var sheet = getSheet(this.parent, sheetIdx);
            if ((sheetIdx + 1) === this.parent.activeSheetTab) {
                this.parent.selectRange(range);
                this.parent.element.focus();
            }
            else {
                updateSelectedRange(this.parent, range, sheet);
                this.parent.activeSheetTab = sheetIdx + 1;
            }
        }
    };
    FormulaBar.prototype.formulaBarUpdateHandler = function (e) {
        var _this = this;
        var range = this.parent.getActiveSheet().selectedRange.split(':');
        var address;
        var intl = new Internationalization();
        if (e.type === 'mousemove' || e.type === 'pointermove') {
            var indexes1 = getRangeIndexes(range[0]);
            var indexes2 = getRangeIndexes(range[1]);
            address = Math.abs(indexes1[0] - indexes2[0]) + 1 + "R x " + (Math.abs(indexes1[1] - indexes2[1]) + 1) + "C";
        }
        else {
            address = range[0];
            var data = this.parent.getData(getSheetName(this.parent) + "!" + address);
            data.then(function (values) {
                var value = '';
                var intDate;
                values.forEach(function (cell, key) {
                    var type = cell && cell.format ? getTypeFromFormat(cell.format) : 'General';
                    if (cell) {
                        if (!isNullOrUndefined(cell.value)) {
                            intDate = intToDate(Number(cell.value));
                            if (intDate.toString() !== 'Invalid Date' && (type === 'ShortDate' || type === 'LongDate')) {
                                value = intl.formatDate(intDate, {
                                    type: 'date',
                                    skeleton: 'yMd'
                                });
                            }
                            else if (intDate.toString() !== 'Invalid Date' && type === 'Time') {
                                value = intl.formatDate(intDate, {
                                    type: 'dateTime',
                                    skeleton: 'yMd'
                                }) + ' ' + intl.formatDate(intDate, {
                                    type: 'dateTime',
                                    skeleton: 'hms'
                                });
                            }
                            else {
                                value = cell.value;
                            }
                        }
                        if (cell.formula) {
                            value = cell.formula;
                        }
                    }
                    document.getElementById(_this.parent.element.id + '_formula_input').value = value;
                });
            });
        }
        this.updateComboBoxValue(address);
    };
    FormulaBar.prototype.UpdateValueAfterMouseUp = function () {
        this.updateComboBoxValue(this.parent.getActiveSheet().selectedRange.split(':')[0]);
    };
    FormulaBar.prototype.updateComboBoxValue = function (value) {
        var sheet = this.parent.getActiveSheet();
        var range = getSheetName(this.parent) + '!' + sheet.selectedRange;
        var eventArgs = {
            action: 'getNameFromRange', range: range, definedName: null
        };
        this.parent.notify(formulaOperation, eventArgs);
        if (eventArgs.definedName) {
            value = eventArgs.definedName.name;
        }
        if (!this.parent.isMobileView()) {
            if (this.comboBoxInstance.text === value) {
                return;
            }
            this.comboBoxInstance.text = value;
            this.comboBoxInstance.dataBind();
        }
    };
    FormulaBar.prototype.clickHandler = function (e) {
        var _this = this;
        var target = e.target;
        if (target.classList.contains('e-drop-icon') && closest(target, '.e-formula-bar-panel')) {
            this.toggleFormulaBar(target);
        }
        else if (target.classList.contains('e-formula-bar')) {
            if (!this.parent.isEdit) {
                this.parent.notify(editOperation, { action: 'startEdit', refreshCurPos: false });
            }
        }
        else if (target.parentElement.classList.contains('e-name-box')) {
            if (target.classList.contains('e-ddl-icon')) {
                var eventArgs = { action: 'getNames', names: [] };
                this.parent.notify(formulaOperation, eventArgs);
                this.comboBoxInstance.dataSource = eventArgs.names;
            }
            else {
                this.comboBoxInstance.element.classList.add('e-name-editing');
                this.comboBoxInstance.element.select();
            }
        }
        if (!isNullOrUndefined(target.offsetParent) && ((target.offsetParent.classList.contains('e-insert-function')) ||
            (target.classList.contains('e-insert-function')) || (this.parent.element.id + '_insert_function' === target.offsetParent.id) ||
            (this.parent.element.id + '_insert_function' === target.id) || target.parentElement.classList.contains('e-insert-function') ||
            (this.parent.element.id + '_insert_function' === target.parentElement.id))) {
            var isOpen = !this.parent.isEdit;
            var args = { action: 'getCurrentEditValue', editedValue: '' };
            if (!isOpen) {
                var eventArgs = { action: 'isFormulaEditing', isFormulaEdit: false };
                this.parent.notify(formulaOperation, eventArgs);
                isOpen = eventArgs.isFormulaEdit;
                this.parent.notify(editOperation, args);
            }
            if (isOpen || args.editedValue === '') {
                if (args.editedValue === '') {
                    this.parent.notify(editOperation, { action: 'refreshEditor', value: '=' });
                }
                var l10n = this.parent.serviceLocator.getService(locale);
                var formulaDescription = this.parent.createElement('div', { className: 'e-formula-description', id: this.parent.element.id + '_description_content' });
                var categoryContent = this.parent.createElement('div', {
                    className: 'e-category-content', id: this.parent.element.id + '_category_content',
                    innerHTML: l10n.getConstant('PickACategory')
                });
                var dropDownElement = this.parent.createElement('input', { className: 'e-formula-category', id: this.parent.element.id + '_formula_category' });
                var listViewElement = this.parent.createElement('div', { className: 'e-formula-list', id: this.parent.element.id + '_formula_list' });
                var descriptionContent = this.parent.createElement('div', { className: 'e-description-content', innerHTML: l10n.getConstant('Description') });
                var headerContent = this.parent.createElement('div', { className: 'e-header-content', innerHTML: l10n.getConstant('InsertFunction') });
                var categoryArgs = {
                    action: 'getFormulaCategory', categoryCollection: []
                };
                this.parent.notify(workbookFormulaOperation, categoryArgs);
                this.categoryCollection = categoryArgs.categoryCollection;
                this.categoryList = new DropDownList({
                    dataSource: this.categoryCollection, index: 0, width: '285px', popupHeight: '210px',
                    select: this.dropDownSelect.bind(this)
                });
                var listArgs = {
                    action: 'getLibraryFormulas', formulaCollection: []
                };
                this.parent.notify(workbookFormulaOperation, listArgs);
                this.formulaCollection = listArgs.formulaCollection;
                this.formulaList = new ListView({
                    dataSource: this.formulaCollection.sort(),
                    actionComplete: this.updateFormulaList.bind(this),
                    select: this.listSelected.bind(this), width: '285px', height: '200px'
                });
                this.dialog = this.parent.serviceLocator.getService('dialog');
                this.dialog.show({
                    header: headerContent.outerHTML,
                    content: categoryContent.outerHTML + dropDownElement.outerHTML + listViewElement.outerHTML +
                        descriptionContent.outerHTML + formulaDescription.outerHTML,
                    width: '320px', height: '485px', cssClass: 'e-spreadsheet-function-dlg',
                    showCloseIcon: true, isModal: true,
                    beforeOpen: function () { return _this.parent.element.focus(); },
                    open: this.dialogOpen.bind(this),
                    beforeClose: this.dialogBeforeClose.bind(this),
                    close: this.dialogClose.bind(this),
                    buttons: [
                        {
                            click: (this.selectFormula.bind(this, this.dialog, this)), buttonModel: { content: 'OK', isPrimary: true }
                        }
                    ]
                });
                this.categoryList.appendTo('#' + this.parent.element.id + '_formula_category');
                this.formulaList.appendTo('#' + this.parent.element.id + '_formula_list');
                EventHandler.add(this.formulaList.element, 'dblclick', this.formulaClickHandler, this);
            }
        }
    };
    FormulaBar.prototype.toggleFormulaBar = function (target) {
        var parent = target.parentElement;
        var l10n = this.parent.serviceLocator.getService(locale);
        if (parent.classList.contains('e-expanded')) {
            parent.classList.remove('e-expanded');
            document.getElementById(this.parent.element.id + '_formula_input').rows = 1;
            target.title = l10n.getConstant('ExpandFormulaBar');
        }
        else {
            parent.classList.add('e-expanded');
            document.getElementById(this.parent.element.id + '_formula_input').rows = 3;
            target.title = l10n.getConstant('CollapseFormulaBar');
        }
        this.parent.setPanelSize();
    };
    FormulaBar.prototype.dialogOpen = function () {
        this.focusOkButton();
    };
    FormulaBar.prototype.dialogClose = function () {
        var args = { action: 'getCurrentEditValue', editedValue: '' };
        this.parent.notify(editOperation, args);
        if (args.editedValue.toString().trim() === '=') {
            this.parent.notify(editOperation, { action: 'refreshEditor', value: '' });
        }
    };
    FormulaBar.prototype.dialogBeforeClose = function () {
        EventHandler.remove(this.formulaList.element, 'dblclick', this.formulaClickHandler);
        var dialogContentEle = document.getElementById('_dialog-content');
        dialogContentEle.parentNode.removeChild(dialogContentEle);
        /* tslint:disable-next-line:no-any */
        this.dialog.dialogInstance.storeActiveElement = document.getElementById(this.parent.element.id + '_edit');
    };
    FormulaBar.prototype.selectFormula = function (dialog, formulaBarObj) {
        var formulaText = formulaBarObj.formulaList.getSelectedItems().text;
        var sheet = getSheet(this.parent, this.parent.activeSheetTab - 1);
        if (this.parent.isEdit) {
            this.parent.notify(editOperation, {
                action: 'refreshEditor', value: formulaText + '(', refreshFormulaBar: true,
                refreshEditorElem: true, isAppend: true
            });
        }
        else {
            this.parent.notify(editOperation, { action: 'startEdit', value: '=' + formulaText + '(', address: sheet.activeCell });
            this.parent.notify(formulaBarOperation, { action: 'refreshFormulabar', value: '=' + formulaText + '(' });
        }
        dialog.hide();
    };
    FormulaBar.prototype.listSelected = function () {
        this.updateFormulaDescription();
    };
    FormulaBar.prototype.updateFormulaList = function () {
        this.activeListFormula();
        this.updateFormulaDescription();
    };
    FormulaBar.prototype.dropDownSelect = function (args) {
        this.formulaCollection = [];
        var listArgs = {
            action: 'getLibraryFormulas',
            formulaCollection: []
        };
        if (args.item.textContent === 'All') {
            this.parent.notify(workbookFormulaOperation, listArgs);
            this.formulaCollection = listArgs.formulaCollection;
        }
        else {
            var category = args.item.textContent;
            var selectArgs = {
                action: 'dropDownSelectFormulas',
                formulaCollection: [],
                selectCategory: category,
            };
            this.parent.notify(workbookFormulaOperation, selectArgs);
            this.formulaCollection = selectArgs.formulaCollection;
        }
        this.formulaList.dataSource = this.formulaCollection.sort();
    };
    FormulaBar.prototype.focusOkButton = function () {
        var focusEle = document.getElementById('_dialog-content');
        (focusEle.nextElementSibling.firstElementChild).focus();
    };
    FormulaBar.prototype.activeListFormula = function () {
        var acListEle = document.getElementById(this.parent.element.id + '_formula_list');
        var firstElement = acListEle.children[0].children[0].firstElementChild;
        this.formulaList.selectItem(firstElement);
    };
    FormulaBar.prototype.updateFormulaDescription = function () {
        var descriptionArea;
        var selectedFormula = this.formulaList.getSelectedItems().text;
        var descriptionArgs = {
            action: 'getFormulaDescription',
            description: '',
            selectedList: selectedFormula,
        };
        this.parent.notify(workbookFormulaOperation, descriptionArgs);
        this.focusOkButton();
        descriptionArea = document.getElementById(this.parent.element.id + '_description_content');
        descriptionArea.innerHTML = this.parent.serviceLocator.getService(locale).getConstant(selectedFormula);
    };
    FormulaBar.prototype.formulaClickHandler = function (args) {
        var trgtElem = args.target;
        var sheet = getSheet(this.parent, this.parent.activeSheetTab - 1);
        if (trgtElem.offsetParent.classList.contains('e-text-content') || trgtElem.classList.contains('e-list-item')) {
            if (this.parent.isEdit) {
                this.parent.notify(editOperation, {
                    action: 'refreshEditor', value: trgtElem.innerText + '(', refreshFormulaBar: true,
                    refreshEditorElem: true, isAppend: true
                });
            }
            else {
                this.parent.notify(editOperation, { action: 'startEdit', value: '=' + trgtElem.innerText + '(', address: sheet.activeCell });
                this.parent.notify(formulaBarOperation, { action: 'refreshFormulabar', value: '=' + trgtElem.innerText + '(' });
            }
            this.dialog.hide();
        }
    };
    FormulaBar.prototype.addEventListener = function () {
        this.parent.on(formulaBar, this.createFormulaBar, this);
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(keyDown, this.keyDownHandler, this);
        this.parent.on(keyUp, this.keyUpHandler, this);
        this.parent.on(selectionComplete, this.formulaBarUpdateHandler, this);
        this.parent.on(mouseUpAfterSelection, this.UpdateValueAfterMouseUp, this);
        this.parent.on(formulaBarOperation, this.editOperationHandler, this);
    };
    FormulaBar.prototype.destroy = function () {
        this.removeEventListener();
        this.comboBoxInstance.destroy();
        this.comboBoxInstance = null;
        this.insertFnRipple();
        this.insertFnRipple = null;
        var formulaPanel = this.parent.element.querySelector('.e-formula-bar-panel');
        if (formulaPanel) {
            detach(formulaPanel);
        }
    };
    FormulaBar.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(formulaBar, this.createFormulaBar);
            this.parent.off(click, this.clickHandler);
            this.parent.off(keyDown, this.keyDownHandler);
            this.parent.off(keyUp, this.keyUpHandler);
            this.parent.off(selectionComplete, this.formulaBarUpdateHandler);
            this.parent.off(mouseUpAfterSelection, this.UpdateValueAfterMouseUp);
            this.parent.off(formulaBarOperation, this.editOperationHandler);
        }
    };
    FormulaBar.prototype.editOperationHandler = function (args) {
        var action = args.action;
        switch (action) {
            case 'refreshFormulabar':
                this.getFormulaBar().value = args.value;
                break;
            case 'getPosition':
                args.position = this.getFormulaBar().getBoundingClientRect();
                break;
        }
    };
    FormulaBar.prototype.getFormulaBar = function () {
        return this.parent.element.querySelector('#' + this.parent.element.id + '_formula_input');
    };
    return FormulaBar;
}());
export { FormulaBar };
