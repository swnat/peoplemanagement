import { createElement, classList, L10n } from '@syncfusion/ej2-base';
import { Tab } from '@syncfusion/ej2-navigations';
import { TextProperties } from './text-properties-pane';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { NumericTextBox, ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * Represents table properties
 * @private
 */
var TableProperties = /** @class */ (function () {
    function TableProperties(container, imageProperty, textProperties, isRtl) {
        var _this = this;
        this.isTopMarginApply = false;
        this.isRightMarginApply = false;
        this.isBottomMarginApply = false;
        this.isLeftMarginApply = false;
        this.borderColor = '#000000';
        this.groupButtonClass = 'e-de-ctnr-group-btn e-btn-group';
        this.initializeTablePropPane = function () {
            _this.localObj = new L10n('documenteditorcontainer', _this.container.defaultLocale, _this.container.locale);
            _this.tableProperties = createElement('div', { id: _this.elementId + '_tableProperties' });
            _this.initFillColorDiv();
            _this.initBorderStylesDiv();
            _this.initCellDiv();
            _this.initInsertOrDelCell();
            _this.initCellMargin();
            _this.initAlignText();
            _this.addTablePropertyTab();
            // wire fnt property
            _this.wireEvent();
        };
        this.addTablePropertyTab = function () {
            var tableHeader = createElement('div', { innerHTML: _this.localObj.getConstant('Table') });
            var textHeader = createElement('div', { innerHTML: _this.localObj.getConstant('Text') });
            // tslint:disable-next-line:max-line-length
            _this.parentElement = createElement('div', { styles: 'height:100%;overflow:auto;display:none', className: 'e-de-prop-pane' });
            _this.element = createElement('div', { id: _this.elementId + '_propertyTabDiv', className: 'e-de-property-tab' });
            // tslint:disable-next-line:max-line-length
            var items = [{ header: { text: tableHeader }, content: _this.tableProperties }, { header: { text: textHeader }, content: _this.tableTextProperties.element }];
            _this.propertiesTab = new Tab({ items: items, animation: { previous: { effect: 'None' }, next: { effect: 'None' } }, selected: _this.onTabSelection });
            _this.propertiesTab.isStringTemplate = true;
            _this.propertiesTab.appendTo(_this.element);
            _this.parentElement.appendChild(_this.element);
            _this.container.propertiesPaneContainer.appendChild(_this.parentElement);
        };
        this.onTabSelection = function () {
            _this.documentEditor.resize();
        };
        this.wireEvent = function () {
            _this.shadingBtn.addEventListener('change', _this.changeBackgroundColor);
            // tslint:disable-next-line:max-line-length
            _this.borderBtn.addEventListener('change', function (args) { setTimeout(function () { _this.borderColor = args.currentValue.hex; _this.tableOutlineBorder.element.focus(); }, 10); });
            _this.tableOutlineBorder.element.addEventListener('click', _this.onOutlineBorder);
            _this.tableAllBorder.element.addEventListener('click', _this.onAllBorder);
            _this.tableCenterBorder.element.addEventListener('click', _this.onInsideBorder);
            _this.tableLeftBorder.element.addEventListener('click', _this.onLeftBorder);
            _this.tableCenterVerticalBorder.element.addEventListener('click', _this.onVerticalBorder);
            _this.tableRightBorder.element.addEventListener('click', _this.onRightBorder);
            _this.tableTopBorder.element.addEventListener('click', _this.onTopBorder);
            _this.tableCenterHorizontalBorder.element.addEventListener('click', _this.onHorizontalBorder);
            _this.tableBottomBorder.element.addEventListener('click', _this.onBottomBorder);
            _this.insertRowAbove.element.addEventListener('click', _this.onInsertRowAbove);
            _this.insertRowBelow.element.addEventListener('click', _this.onInsertRowBelow);
            _this.insertColumnLeft.element.addEventListener('click', _this.onInsertColumnLeft);
            _this.insertColumnRight.element.addEventListener('click', _this.onInsertColumnRight);
            _this.deleteRow.element.addEventListener('click', _this.onDeleteRow);
            _this.deleteColumn.element.addEventListener('click', _this.onDeleteColumn);
            _this.horizontalMerge.element.addEventListener('click', _this.onMergeCell);
            _this.alignTop.element.addEventListener('click', _this.applyAlignTop);
            _this.alignBottom.element.addEventListener('click', _this.applyAlignBottom);
            _this.alignCenterHorizontal.element.addEventListener('click', _this.applyAlignCenterHorizontal);
            _this.topMargin.element.addEventListener('click', function () { _this.isTopMarginApply = true; });
            _this.rightMargin.element.addEventListener('click', function () { _this.isRightMarginApply = true; });
            _this.leftMargin.element.addEventListener('click', function () { _this.isLeftMarginApply = true; });
            _this.bottomMargin.element.addEventListener('click', function () { _this.isBottomMarginApply = true; });
            _this.topMargin.element.addEventListener('keydown', _this.onTopMargin);
            _this.rightMargin.element.addEventListener('keydown', _this.onRightMargin);
            _this.leftMargin.element.addEventListener('keydown', _this.onLeftMargin);
            _this.bottomMargin.element.addEventListener('keydown', _this.onBottomMargin);
            _this.topMargin.element.addEventListener('blur', function () { _this.applyTopMargin(); _this.isTopMarginApply = false; });
            _this.rightMargin.element.addEventListener('blur', function () { _this.applyRightMargin(); _this.isRightMarginApply = false; });
            _this.leftMargin.element.addEventListener('blur', function () { _this.applyLeftMargin(); _this.isLeftMarginApply = false; });
            _this.bottomMargin.element.addEventListener('blur', function () { _this.applyBottomMargin(); _this.isBottomMarginApply = false; });
        };
        this.getBorder = function (border) {
            var lineWidth = (_this.borderSize.content.indexOf('No Border') >= 0) ? 0 : parseInt(_this.borderSize.content, 0);
            var linestyle = (lineWidth === 0) ? 'Cleared' : 'Single';
            var borderSettings = {
                type: border,
                borderColor: _this.borderColor,
                lineWidth: lineWidth,
                borderStyle: linestyle
            };
            return borderSettings;
        };
        this.onOutlineBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('OutsideBorders'));
        };
        this.onAllBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('AllBorders'));
        };
        this.onInsideBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('InsideBorders'));
        };
        this.onLeftBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('LeftBorder'));
        };
        this.onVerticalBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('InsideVerticalBorder'));
        };
        this.onRightBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('RightBorder'));
        };
        this.onTopBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('TopBorder'));
        };
        this.onHorizontalBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('InsideHorizontalBorder'));
        };
        this.onBottomBorder = function () {
            _this.documentEditor.editor.applyBorders(_this.getBorder('BottomBorder'));
        };
        this.onTopMargin = function (e) {
            if (e.keyCode === 13) {
                setTimeout(function () { _this.applyTopMargin(); _this.isTopMarginApply = false; }, 30);
            }
        };
        this.onBottomMargin = function (e) {
            if (e.keyCode === 13) {
                setTimeout(function () { _this.applyBottomMargin(); _this.isBottomMarginApply = false; }, 30);
            }
        };
        this.onLeftMargin = function (e) {
            if (e.keyCode === 13) {
                setTimeout(function () { _this.applyLeftMargin(); _this.isLeftMarginApply = false; }, 30);
            }
        };
        this.onRightMargin = function (e) {
            if (e.keyCode === 13) {
                setTimeout(function () { _this.applyRightMargin(); _this.isRightMarginApply = false; }, 30);
            }
        };
        this.applyTopMargin = function () {
            if (!_this.isTopMarginApply) {
                return;
            }
            _this.documentEditor.selection.cellFormat.topMargin = (_this.topMargin.value > _this.topMargin.max)
                ? _this.topMargin.max : _this.topMargin.value;
        };
        this.applyBottomMargin = function () {
            if (!_this.isBottomMarginApply) {
                return;
            }
            _this.documentEditor.selection.cellFormat.bottomMargin = (_this.bottomMargin.value > _this.bottomMargin.max)
                ? _this.bottomMargin.max : _this.bottomMargin.value;
        };
        this.applyLeftMargin = function () {
            if (!_this.isLeftMarginApply) {
                return;
            }
            _this.documentEditor.selection.cellFormat.leftMargin = (_this.leftMargin.value > _this.leftMargin.max)
                ? _this.leftMargin.max : _this.leftMargin.value;
        };
        this.applyRightMargin = function () {
            if (!_this.isRightMarginApply) {
                return;
            }
            _this.documentEditor.selection.cellFormat.rightMargin = (_this.rightMargin.value > _this.rightMargin.max)
                ? _this.rightMargin.max : _this.rightMargin.value;
        };
        this.applyAlignTop = function () {
            _this.documentEditor.selection.cellFormat.verticalAlignment = 'Top';
        };
        this.applyAlignBottom = function () {
            _this.documentEditor.selection.cellFormat.verticalAlignment = 'Bottom';
        };
        this.applyAlignCenterHorizontal = function () {
            _this.documentEditor.selection.cellFormat.verticalAlignment = 'Center';
        };
        this.onMergeCell = function () {
            _this.documentEditor.editor.mergeCells();
        };
        this.onInsertRowAbove = function () {
            _this.documentEditor.editor.insertRow(true);
        };
        this.onInsertRowBelow = function () {
            _this.documentEditor.editor.insertRow(false);
        };
        this.onInsertColumnLeft = function () {
            _this.documentEditor.editor.insertColumn(true);
        };
        this.onInsertColumnRight = function () {
            _this.documentEditor.editor.insertColumn(false);
        };
        this.onDeleteRow = function () {
            _this.documentEditor.editor.deleteRow();
        };
        this.onDeleteColumn = function () {
            _this.documentEditor.editor.deleteColumn();
        };
        this.onSelectionChange = function () {
            if (_this.documentEditor.selection) {
                if (_this.documentEditor.editor && _this.documentEditor.editor.canMergeCells()) {
                    _this.horizontalMerge.disabled = false;
                }
                else {
                    _this.horizontalMerge.disabled = true;
                }
                if (_this.documentEditor.selection.contextType === 'TableText' || _this.documentEditor.selection.contextType === 'TableImage') {
                    _this.shadingBtn.value = _this.documentEditor.selection.cellFormat.background;
                }
                // tslint:disable-next-line:max-line-length
                _this.topMargin.value = _this.documentEditor.selection.cellFormat.topMargin ? _this.documentEditor.selection.cellFormat.topMargin : 0;
                // tslint:disable-next-line:max-line-length
                _this.bottomMargin.value = _this.documentEditor.selection.cellFormat.bottomMargin ? _this.documentEditor.selection.cellFormat.bottomMargin : 0;
                // tslint:disable-next-line:max-line-length
                _this.rightMargin.value = _this.documentEditor.selection.cellFormat.rightMargin ? _this.documentEditor.selection.cellFormat.rightMargin : 0;
                // tslint:disable-next-line:max-line-length
                _this.leftMargin.value = _this.documentEditor.selection.cellFormat.leftMargin ? _this.documentEditor.selection.cellFormat.leftMargin : 0;
            }
        };
        this.changeBackgroundColor = function (args) {
            if (!_this.documentEditor.isReadOnly) {
                //Handle API for shading.
                _this.documentEditor.selection.cellFormat.background = args.currentValue.hex;
                setTimeout(function () { _this.documentEditor.focusIn(); }, 10);
            }
        };
        this.initFillColorDiv = function () {
            // tslint:disable-next-line:max-line-length
            var fillDiv = createElement('div', { id: _this.elementId + '_fillColorDiv', className: 'e-de-property-div-padding de-tbl-fill-clr' });
            _this.tableProperties.appendChild(fillDiv);
            var label = createElement('label', { className: 'e-de-prop-sub-label' });
            label.classList.add('e-de-prop-fill-label');
            if (_this.isRtl) {
                label.classList.add('e-de-rtl');
            }
            label.textContent = _this.localObj.getConstant('Fill');
            fillDiv.appendChild(label);
            var buttonStyle = 'width:92px;display:inline-flex;padding:3px';
            // tslint:disable-next-line:max-line-length
            _this.shadingBtn = _this.createColorPickerTemplate(_this.elementId + '_tableShading', fillDiv, _this.localObj.getConstant('Fill color'), false);
            // tslint:disable-next-line:max-line-length
            classList(fillDiv.lastElementChild.lastElementChild.lastElementChild.firstChild, ['e-de-ctnr-cellbg-clr-picker'], ['e-caret']);
        };
        this.initBorderStylesDiv = function () {
            var borderStyleDiv = createElement('div', { className: 'e-de-property-div-padding' });
            _this.tableProperties.appendChild(borderStyleDiv);
            var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.classList.add('e-de-table-prop-label');
            label.textContent = _this.localObj.getConstant('Border Style');
            borderStyleDiv.appendChild(label);
            // tslint:disable-next-line:max-line-length
            var parentDiv = createElement('div', { id: _this.elementId + '_borderStyleDiv', className: 'e-de-border-style-div', styles: 'display:inline-flex;' });
            var styleDiv = createElement('div', { styles: 'width:126px;height:126px', className: 'e-de-grp-btn-ctnr' });
            var div1 = createElement('div', { className: _this.groupButtonClass + ' e-de-ctnr-group-btn-top' });
            styleDiv.appendChild(div1);
            var div2 = createElement('div', { className: _this.groupButtonClass + ' e-de-ctnr-group-btn-middle' });
            styleDiv.appendChild(div2);
            var div3 = createElement('div', { className: _this.groupButtonClass + ' e-de-ctnr-group-btn-bottom' });
            styleDiv.appendChild(div3);
            if (_this.isRtl) {
                div1.classList.add('e-de-rtl');
                div3.classList.add('e-de-rtl');
                parentDiv.classList.add('e-de-rtl');
                label.classList.add('e-de-rtl');
            }
            var btnStyle = '';
            // tslint:disable-next-line:max-line-length
            _this.tableOutlineBorder = _this.createButtonTemplate(_this.elementId + '_tableOutlineBorder', 'e-de-ctnr-outsideborder e-icons', div1, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Outside borders'));
            _this.tableAllBorder = _this.createButtonTemplate(_this.elementId + '_tableAllBorder', 'e-de-ctnr-allborders e-icons', div1, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('All borders'));
            // tslint:disable-next-line:max-line-length
            _this.tableCenterBorder = _this.createButtonTemplate(_this.elementId + '_tableCenterBorder', 'e-de-ctnr-insideborders e-icons', div1, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Inside borders'));
            _this.tableLeftBorder = _this.createButtonTemplate(_this.elementId + '_tableLeftBorder', 'e-de-ctnr-leftborders e-icons', div2, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Left border'));
            // tslint:disable-next-line:max-line-length
            _this.tableCenterVerticalBorder = _this.createButtonTemplate(_this.elementId + '_tableCenterVBorder', 'e-de-ctnr-insideverticalborder e-icons', div2, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Inside vertical border'));
            _this.tableRightBorder = _this.createButtonTemplate(_this.elementId + '_tableRightBorder', 'e-de-ctnr-rightborder e-icons', div2, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Right border'));
            // tslint:disable-next-line:max-line-length
            _this.tableTopBorder = _this.createButtonTemplate(_this.elementId + '_tableTopBorder', 'e-de-ctnr-topborder e-icons', div3, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Top border'));
            _this.tableCenterHorizontalBorder = _this.createButtonTemplate(_this.elementId + '_tableCenterHBorder', 'e-de-ctnr-insidehorizondalborder e-icons', div3, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Inside horizontal border'));
            // tslint:disable-next-line:max-line-length
            _this.tableBottomBorder = _this.createButtonTemplate(_this.elementId + '_tableBottomBorder', 'e-de-ctnr-bottomborder e-icons', div3, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Bottom border'));
            parentDiv.appendChild(styleDiv);
            // tslint:disable-next-line:max-line-length
            var styleTypeDiv = createElement('div', { className: 'de-tbl-fill-clr' });
            if (!_this.isRtl) {
                styleTypeDiv.classList.add('e-de-stylediv');
            }
            else {
                styleTypeDiv.classList.add('e-de-stylediv-rtl');
            }
            // tslint:disable-next-line:max-line-length
            _this.borderBtn = _this.createColorPickerTemplate(_this.elementId + '_tableBorderColor', styleTypeDiv, _this.localObj.getConstant('Border color'), true);
            _this.borderBtn.value = '#000000';
            styleTypeDiv.firstElementChild.lastElementChild.lastElementChild.style.width = '30px';
            styleTypeDiv.firstElementChild.lastElementChild.firstElementChild.firstElementChild.style.width = '100%';
            // tslint:disable-next-line:max-line-length
            classList(styleTypeDiv.lastElementChild.lastElementChild.lastElementChild.firstChild, ['e-de-ctnr-highlightcolor'], ['e-caret']);
            var borderSizeButton = createElement('button', { id: _this.elementId + '_tableBorderSize', className: 'e-de-border-size-button', styles: 'font-size:10px;padding:0px;', attrs: { type: 'button' } });
            styleTypeDiv.appendChild(borderSizeButton);
            _this.borderSize = _this.createBorderSizeDropDown('e-de-ctnr-strokesize e-icons', borderSizeButton);
            parentDiv.appendChild(styleTypeDiv);
            _this.borderSizeColorElement = document.getElementsByClassName('e-de-border-width');
            borderStyleDiv.appendChild(parentDiv);
        };
        this.initCellDiv = function () {
            var cellDiv = createElement('div', { className: 'e-de-property-div-padding' });
            _this.tableProperties.appendChild(cellDiv);
            var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.classList.add('e-de-table-prop-label');
            label.textContent = _this.localObj.getConstant('Cell');
            cellDiv.appendChild(label);
            var parentDiv = createElement('div', { className: 'e-de-ctnr-group-btn' });
            parentDiv.classList.add('e-de-cell-div');
            if (_this.isRtl) {
                parentDiv.classList.add('e-de-rtl');
                label.classList.add('e-de-rtl');
            }
            var btnStyle = 'width:' + 38 + 'px;';
            // tslint:disable-next-line:max-line-length
            _this.horizontalMerge = _this.createButtonTemplate(_this.elementId + '_tableOutlineBorder', 'e-de-ctnr-mergecell e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Merge cells');
            //this.verticalMerge = this.createButtonTemplate(this.elementId + '_tableAllBorder', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Vertical Merge');
            cellDiv.appendChild(parentDiv);
        };
        this.initInsertOrDelCell = function () {
            var tableOperationDiv = createElement('div', { className: 'e-de-property-div-padding' });
            _this.tableProperties.appendChild(tableOperationDiv);
            var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.classList.add('e-de-table-prop-label');
            label.textContent = _this.localObj.getConstant('Insert Or Delete');
            tableOperationDiv.appendChild(label);
            var parentDiv = createElement('div', { className: 'e-de-insert-del-cell', styles: 'display:inline-flex' });
            var div1 = createElement('div', { className: _this.groupButtonClass });
            parentDiv.appendChild(div1);
            var div2 = createElement('div', { className: _this.groupButtonClass });
            if (!_this.isRtl) {
                div2.style.marginLeft = '12px';
            }
            else {
                div2.style.marginRight = '12px';
                parentDiv.classList.add('e-de-rtl');
                label.classList.add('e-de-rtl');
            }
            parentDiv.appendChild(div2);
            var btnStyle = 'width:' + 38 + 'px;';
            // tslint:disable-next-line:max-line-length
            _this.insertColumnLeft = _this.createButtonTemplate(_this.elementId + '_insertColumnLeft', 'e-de-ctnr-insertleft e-icons', div1, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Insert columns to the left'));
            _this.insertColumnRight = _this.createButtonTemplate(_this.elementId + '_insertColumnRight', 'e-de-ctnr-insertright e-icons', div1, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Insert columns to the right'));
            // tslint:disable-next-line:max-line-length
            _this.insertRowAbove = _this.createButtonTemplate(_this.elementId + '_insertRowAbove', 'e-de-ctnr-insertabove e-icons', div1, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Insert rows above'));
            _this.insertRowBelow = _this.createButtonTemplate(_this.elementId + '_insertRowBelow', 'e-de-ctnr-insertbelow e-icons', div1, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Insert rows below'));
            // tslint:disable-next-line:max-line-length
            _this.deleteRow = _this.createButtonTemplate(_this.elementId + '_deleteRow', 'e-de-ctnr-deleterows e-icons', div2, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Delete rows'));
            _this.deleteColumn = _this.createButtonTemplate(_this.elementId + '_deleteColumn', 'e-de-ctnr-deletecolumns e-icons', div2, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Delete columns'));
            tableOperationDiv.appendChild(parentDiv);
        };
        this.initCellMargin = function () {
            var cellMarginDiv = createElement('div', { className: 'e-de-property-div-padding e-de-cellmargin-text' });
            _this.tableProperties.appendChild(cellMarginDiv);
            var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.classList.add('e-de-table-prop-label');
            label.textContent = _this.localObj.getConstant('Cell Margin');
            cellMarginDiv.appendChild(label);
            var parentDiv = createElement('div', { className: 'e-de-cell-margin', styles: 'height: 60px;display:inline-flex' });
            if (_this.isRtl) {
                label.classList.add('e-de-rtl');
            }
            var textboxDivStyle = 'width:' + 48 + 'px';
            var textboxParentDivStyle = 'width:' + 50 + 'px;float:left;';
            // tslint:disable-next-line:max-line-length
            _this.topMargin = _this.createCellMarginTextBox(_this.localObj.getConstant('Top'), _this.elementId + '_topMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, 'Top margin');
            // tslint:disable-next-line:max-line-length
            _this.bottomMargin = _this.createCellMarginTextBox(_this.localObj.getConstant('Bottom'), _this.elementId + '_bottomMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, 'Bottom margin');
            // tslint:disable-next-line:max-line-length
            _this.leftMargin = _this.createCellMarginTextBox(_this.localObj.getConstant('Left'), _this.elementId + '_leftMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, 'Left margin');
            // tslint:disable-next-line:max-line-length
            _this.rightMargin = _this.createCellMarginTextBox(_this.localObj.getConstant('Right'), _this.elementId + '_rightMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, 'Right margin');
            cellMarginDiv.appendChild(parentDiv);
        };
        this.initAlignText = function () {
            var alignmentDiv = createElement('div', { className: 'e-de-property-div-padding', styles: 'border-bottom-width:0px' });
            _this.tableProperties.appendChild(alignmentDiv);
            var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.classList.add('e-de-table-prop-label');
            label.textContent = _this.localObj.getConstant('Align Text');
            alignmentDiv.appendChild(label);
            var parentDiv = createElement('div', { className: 'e-de-align-text', styles: 'margin-bottom: 10px;' });
            if (_this.isRtl) {
                parentDiv.classList.add('e-de-rtl');
                label.classList.add('e-de-rtl');
            }
            var div = createElement('div', { className: _this.groupButtonClass });
            parentDiv.appendChild(div);
            var btnStyle = 'width:' + 38 + 'px;';
            // tslint:disable-next-line:max-line-length
            _this.alignTop = _this.createButtonTemplate(_this.elementId + '_alignTop', 'e-de-ctnr-aligntop e-icons', div, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Align top'));
            // tslint:disable-next-line:max-line-length
            // this.alignCenterVertical = this.createButtonTemplate(this.elementId + '_alignCenterVertical', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Align Center Vertical');
            // tslint:disable-next-line:max-line-length
            // this.alignRight = this.createButtonTemplate(this.elementId + '_alignRight', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Align Right');
            _this.alignBottom = _this.createButtonTemplate(_this.elementId + '_alignBottom', 'e-de-ctnr-alignbottom e-icons', div, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Align bottom'));
            // tslint:disable-next-line:max-line-length
            // this.alignCenterHorizontal = this.createButtonTemplate(this.elementId + '_alignCenterHorizontal', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Align Center Horizontal');
            _this.alignCenterHorizontal = _this.createButtonTemplate(_this.elementId + '_alignCenterHorizontal', 'e-de-ctnr-aligncenter-table e-icons', div, 'e-de-prop-font-button', btnStyle, _this.localObj.getConstant('Align center'));
            _this.alignCenterHorizontal.addEventListener('click', _this.applyAlignCenterHorizontal);
            alignmentDiv.appendChild(parentDiv);
        };
        // tslint:disable-next-line:max-line-length
        this.createCellMarginTextBox = function (textboxLabel, textboxId, parentDiv, styles, parentStyle, maxValue, toolTipText) {
            var cellMarginParentDiv = createElement('div', { styles: parentStyle });
            cellMarginParentDiv.classList.add('e-de-cell-text-box');
            var cellMarginLabel = createElement('label', { className: 'e-de-prop-sub-label' });
            cellMarginLabel.textContent = textboxLabel;
            cellMarginParentDiv.appendChild(cellMarginLabel);
            // tslint:disable-next-line:max-line-length
            var cellMarginTextbox = createElement('input', { className: 'e-textbox', id: textboxId, styles: styles });
            cellMarginParentDiv.appendChild(cellMarginTextbox);
            // tslint:disable-next-line:max-line-length
            var cellMarginNumericText = new NumericTextBox({ showSpinButton: false, min: 0, format: 'n0', max: maxValue, enableRtl: _this.isRtl }, cellMarginTextbox);
            parentDiv.appendChild(cellMarginParentDiv);
            cellMarginTextbox.setAttribute('title', toolTipText);
            return cellMarginNumericText;
        };
        this.createBorderSizeDropDown = function (iconcss, button) {
            var div = createElement('div', { id: 'borderSizeTarget', styles: 'display:none' });
            var ulTag = createElement('ul', {
                styles: 'display: block; outline: 0px; width: 126px; height: auto;',
                id: 'borderSizeListMenu'
            });
            div.appendChild(ulTag);
            var noneOption = _this.createDropdownOption(ulTag, _this.localObj.getConstant('No Border'));
            noneOption.addEventListener('click', function () { _this.onBorderSizeChange('No Border'); });
            var oneOption = _this.createDropdownOption(ulTag, '1px');
            oneOption.addEventListener('click', function () { _this.onBorderSizeChange('1px'); });
            var oneHalfOption = _this.createDropdownOption(ulTag, '1.5px');
            oneHalfOption.addEventListener('click', function () { _this.onBorderSizeChange('1.5px'); });
            var twoOption = _this.createDropdownOption(ulTag, '2px');
            twoOption.addEventListener('click', function () { _this.onBorderSizeChange('2px'); });
            var threeOption = _this.createDropdownOption(ulTag, '3px');
            threeOption.addEventListener('click', function () { _this.onBorderSizeChange('3px'); });
            var fourOption = _this.createDropdownOption(ulTag, '4px');
            fourOption.addEventListener('click', function () { _this.onBorderSizeChange('4px'); });
            var fiveOption = _this.createDropdownOption(ulTag, '5px');
            fiveOption.addEventListener('click', function () { _this.onBorderSizeChange('5px'); });
            var menuOptions = {
                target: div,
                iconCss: iconcss,
                cssClass: 'e-de-prop-bordersize',
                enableRtl: _this.isRtl,
                content: '1.5px',
            };
            var dropdown = new DropDownButton(menuOptions);
            dropdown.beforeOpen = function () {
                div.style.display = 'block';
                for (var i = 0; i < _this.borderSizeColorElement.length; i++) {
                    // tslint:disable-next-line:max-line-length
                    _this.borderSizeColorElement[i].style.borderBottomColor = _this.borderColor;
                }
            };
            dropdown.beforeClose = function () { div.style.display = 'none'; };
            dropdown.appendTo(button);
            dropdown.element.setAttribute('title', _this.localObj.getConstant('Border width'));
            return dropdown;
        };
        this.onBorderSizeChange = function (value) {
            _this.borderSize.content = value;
            setTimeout(function () { _this.tableOutlineBorder.element.focus(); }, 10);
        };
        this.createDropdownOption = function (ulTag, text) {
            var liTag = createElement('li', {
                styles: 'display:block',
                className: 'e-de-floating-menuitem e-de-floating-menuitem-md e-de-list-items  e-de-list-item-size'
            });
            ulTag.appendChild(liTag);
            var innerHTML;
            if (text === 'No Border') {
                innerHTML = '<div>' + text + '</div>';
            }
            else if (text === '1.5px') {
                // tslint:disable-next-line:max-line-length
                innerHTML = '<div>' + text + '<span class="e-de-list-line e-de-border-width"  style="margin-left:10px;border-bottom-width:' + text + ';' + '"' + '></span></div>';
            }
            else {
                // tslint:disable-next-line:max-line-length
                innerHTML = '<div>' + text + '<span class="e-de-list-line e-de-border-width" style="margin-left:20px;border-bottom-width:' + text + ';' + '"' + '></span></div>';
            }
            var liInnerDiv = createElement('div', {
                className: 'e-de-list-header-presetmenu',
                innerHTML: innerHTML
            });
            liTag.appendChild(liInnerDiv);
            return liTag;
        };
        //tslint:disable-next-line:max-line-length
        this.createDropDownButton = function (id, styles, parentDiv, iconCss, content, items, target) {
            var buttonElement = createElement('button', { id: id, styles: styles, attrs: { type: 'button' } });
            parentDiv.appendChild(buttonElement);
            var splitButtonClass = 'e-de-prop-splitbutton';
            if (_this.isRtl) {
                splitButtonClass = 'e-rtl ' + splitButtonClass;
            }
            // tslint:disable-next-line:max-line-length
            var dropDownBtn = new DropDownButton({ iconCss: iconCss, content: content, enableRtl: _this.isRtl, cssClass: splitButtonClass }, buttonElement);
            if (items) {
                dropDownBtn.items = items;
            }
            if (target) {
                dropDownBtn.target = target;
            }
            return dropDownBtn;
        };
        this.createColorPickerTemplate = function (id, divElement, toolTipText, isBorderWidth) {
            var inputElement = createElement('input', { id: id });
            divElement.appendChild(inputElement);
            var cssClass = 'e-de-prop-font-button e-de-prop-font-colorpicker';
            if (isBorderWidth) {
                cssClass = cssClass + ' e-de-border-clr-picker';
            }
            // tslint:disable-next-line:max-line-length
            var colorPicker = new ColorPicker({ showButtons: true, cssClass: cssClass, enableRtl: _this.isRtl, locale: _this.container.locale }, inputElement);
            inputElement.parentElement.setAttribute('title', toolTipText);
            return colorPicker;
        };
        this.showTableProperties = function (isShow) {
            if (isShow) {
                if (_this.prevContext !== _this.documentEditor.selection.contextType) {
                    _this.propertiesTab.selectedItem = 0;
                    _this.tableTextProperties.appliedHighlightColor = _this.textProperties.appliedHighlightColor;
                    _this.tableTextProperties.appliedBulletStyle = _this.textProperties.appliedBulletStyle;
                    _this.tableTextProperties.appliedNumberingStyle = _this.textProperties.appliedNumberingStyle;
                }
                _this.onSelectionChange();
                _this.tableTextProperties.onSelectionChange();
                _this.textProperties.appliedHighlightColor = _this.tableTextProperties.appliedHighlightColor;
                _this.textProperties.appliedBulletStyle = _this.tableTextProperties.appliedBulletStyle;
                _this.textProperties.appliedNumberingStyle = _this.tableTextProperties.appliedNumberingStyle;
            }
            if (!isShow && _this.parentElement.style.display === 'none' || (isShow && _this.parentElement.style.display === 'block')) {
                return;
            }
            _this.parentElement.style.display = isShow ? 'block' : 'none';
            _this.documentEditor.resize();
            _this.prevContext = _this.documentEditor.selection.contextType;
        };
        this.container = container;
        this.isRtl = isRtl;
        if (this.isRtl) {
            this.groupButtonClass = 'e-rtl ' + this.groupButtonClass;
        }
        this.tableTextProperties = new TextProperties(container, 'textProperties', true, this.isRtl);
        this.imageProperty = imageProperty;
        this.elementId = this.documentEditor.element.id;
        this.initializeTablePropPane();
        this.prevContext = this.documentEditor.selection.contextType;
        this.textProperties = textProperties;
    }
    Object.defineProperty(TableProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    TableProperties.prototype.enableDisableElements = function (enable) {
        this.textProperties.enableDisableElements(enable);
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    // tslint:disable-next-line:max-line-length
    TableProperties.prototype.createButtonTemplate = function (id, iconcss, div, buttonClass, styles, toolTipText, content, iconPos) {
        var buttonElement = createElement('Button', { id: id, styles: styles, attrs: { type: 'button' } });
        div.appendChild(buttonElement);
        var btn = new Button({
            cssClass: buttonClass, iconCss: iconcss, enableRtl: this.isRtl, iconPosition: (iconPos ? iconPos : 'Left'),
            content: content ? content : ''
        });
        btn.appendTo(buttonElement);
        buttonElement.setAttribute('title', toolTipText);
        return btn;
    };
    TableProperties.prototype.destroy = function () {
        this.container = undefined;
        if (this.shadingBtn) {
            this.shadingBtn.destroy();
            this.shadingBtn = undefined;
        }
        if (this.borderBtn) {
            this.borderBtn.destroy();
            this.borderBtn = undefined;
        }
        if (this.borderSize) {
            this.borderSize.destroy();
            this.borderSize = undefined;
        }
        if (this.topMargin) {
            this.topMargin.destroy();
            this.topMargin = undefined;
        }
        if (this.bottomMargin) {
            this.bottomMargin.destroy();
            this.bottomMargin = undefined;
        }
        if (this.leftMargin) {
            this.leftMargin.destroy();
            this.leftMargin = undefined;
        }
        if (this.rightMargin) {
            this.rightMargin.destroy();
            this.rightMargin = undefined;
        }
        if (this.tableTextProperties) {
            this.tableTextProperties.destroy();
            this.tableTextProperties = undefined;
        }
        if (this.propertiesTab) {
            this.propertiesTab.destroy();
            this.propertiesTab = undefined;
        }
    };
    return TableProperties;
}());
export { TableProperties };
