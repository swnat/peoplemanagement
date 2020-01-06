import { createElement, L10n, classList } from '@syncfusion/ej2-base';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * TOC Properties pane
 * @private
 */
var TocProperties = /** @class */ (function () {
    function TocProperties(container, isRtl) {
        var _this = this;
        this.initializeTocPane = function () {
            _this.localObj = new L10n('documenteditorcontainer', _this.container.defaultLocale, _this.container.locale);
            // tslint:disable-next-line:max-line-length
            _this.element = createElement('div', { id: _this.elementId + '_tocProperties', className: 'e-de-prop-pane' });
            var container = createElement('div', { className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
            _this.tocHeaderDiv(container);
            _this.initTemplates(container);
            container = createElement('div', { className: 'e-de-cntr-pane-padding' });
            _this.tocOptionsDiv(container);
            _this.contentStylesDropdown(container);
            _this.checkboxContent(container);
            _this.buttonDiv(container);
            _this.wireEvents();
            _this.updateTocProperties();
            _this.container.propertiesPaneContainer.appendChild(_this.element);
        };
        this.updateTocProperties = function () {
            _this.rightalignPageNumber.checked = true;
            _this.showPageNumber.checked = true;
            _this.hyperlink.checked = true;
        };
        this.wireEvents = function () {
            _this.cancelBtn.element.addEventListener('click', function () { _this.onClose(); });
            _this.updateBtn.element.addEventListener('click', _this.onInsertToc);
            _this.closeButton.addEventListener('click', function () { _this.onClose(); });
        };
        this.onClose = function () {
            if (_this.container.showPropertiesPane
                && _this.container.previousContext !== 'TableOfContents') {
                _this.container.showPropertiesPaneOnSelection();
            }
            else {
                _this.showTocPane(false);
                if (_this.toolbar) {
                    _this.toolbar.enableDisablePropertyPaneButton(false);
                }
                _this.container.showPropertiesPane = false;
            }
        };
        this.tocHeaderDiv = function (container) {
            var closeButtonFloat;
            var headerDivMargin;
            var closeButtonMargin;
            if (!_this.isRtl) {
                closeButtonFloat = 'float:right;';
                headerDivMargin = 'margin-left:5.5px;';
                closeButtonMargin = 'margin-right:7px;';
            }
            else {
                closeButtonFloat = 'float:left;';
                headerDivMargin = 'margin-right:5.5px;';
                closeButtonMargin = 'margin-left:7px;';
            }
            var headerDiv = createElement('div', {
                id: _this.elementId + 'toc_id',
                styles: 'display: block;'
            });
            container.appendChild(headerDiv);
            _this.element.appendChild(container);
            var title = createElement('label', {
                className: 'e-de-ctnr-prop-label'
            });
            title.textContent = _this.localObj.getConstant('Table of Contents');
            headerDiv.appendChild(title);
            _this.closeButton = createElement('span', {
                className: 'e-de-ctnr-close e-icons',
                styles: 'cursor: pointer;display:inline-block;color: #4A4A4A;' + closeButtonFloat + closeButtonMargin
            });
            headerDiv.appendChild(_this.closeButton);
        };
        this.initTemplates = function (container) {
            _this.template1(container);
            // tslint:disable-next-line:max-line-length
            // let div: HTMLElement = createElement('div', { styles: 'display:block;border-top: 1px solid #E0E0E0;' }); this.element.appendChild(div);
        };
        this.template1 = function (container) {
            _this.template1Div = createElement('div', {
                className: 'e-de-toc-template1'
            });
            if (_this.isRtl) {
                _this.template1Div.classList.add('e-de-rtl');
            }
            container.appendChild(_this.template1Div);
            var templateContent1 = createElement('div', {
                className: 'e-de-toc-template1-content1'
            });
            templateContent1.textContent = _this.localObj.getConstant('HEADING - - - - 1');
            _this.template1Div.appendChild(templateContent1);
            var templateContent2 = createElement('div', {
                className: 'e-de-toc-template1-content2'
            });
            templateContent2.textContent = _this.localObj.getConstant('HEADING - - - - 2');
            _this.template1Div.appendChild(templateContent2);
            var templateContent3 = createElement('div', {
                className: 'e-de-toc-template1-content3'
            });
            templateContent3.textContent = _this.localObj.getConstant('HEADING - - - - 3');
            _this.template1Div.appendChild(templateContent3);
        };
        this.tocOptionsDiv = function (container) {
            var optionsDiv = createElement('div');
            container.appendChild(optionsDiv);
            _this.element.appendChild(container);
            if (_this.isRtl) {
                optionsDiv.classList.add('e-de-rtl');
            }
            var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.textContent = _this.localObj.getConstant('Options');
            optionsDiv.appendChild(label);
        };
        /* tslint:disable */
        this.contentStylesDropdown = function (container) {
            var contentStyleElementMargin;
            if (!_this.isRtl) {
                contentStyleElementMargin = 'margin-left:5.5px;';
            }
            else {
                contentStyleElementMargin = 'margin-right:5.5px;';
            }
            var contentStyleElement = createElement('div', { id: 'contentstyle_div' });
            // tslint:disable-next-line:max-line-length
            contentStyleElement.setAttribute('title', _this.localObj.getConstant('Number of heading or outline levels to be shown in table of contents'));
            container.appendChild(contentStyleElement);
            // let items: ItemModel[] = [{ text: '___________', id: 'solid' }];
            // this.borderStyle = this.createDropDownButton(
            //     this.elementId + '_borderStyleDiv',
            //     'width:120px;height:28px;margin-top:8px', contentStyleElement, 'e-de-icon-stroke-size', 'Solid', items
            // );
            var labelMargin;
            if (!_this.isRtl) {
                labelMargin = 'margin-right:8px;';
            }
            else {
                labelMargin = 'margin-left:8px';
            }
            var label = createElement('label', { className: 'e-de-prop-sub-label', styles: 'display:block' });
            label.textContent = _this.localObj.getConstant('Levels');
            contentStyleElement.appendChild(label);
            container.appendChild(contentStyleElement);
            var dataSource = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            _this.borderLevelStyle = _this.createDropDownButton(_this.elementId + '_borderLevelDiv', contentStyleElement, '', dataSource, 2);
            _this.borderLevelStyle.change = function (args) {
                _this.borderLevelStyle.value = args.item.value;
            };
            container.appendChild(contentStyleElement);
        };
        this.checkboxContent = function (container) {
            var checkboxElementMargin;
            if (!_this.isRtl) {
                checkboxElementMargin = 'margin-left:5.5px;';
            }
            else {
                checkboxElementMargin = 'margin-right:5.5px;';
            }
            // tslint:disable-next-line:max-line-length
            var checkboxElement = createElement('div', { id: 'toc_checkboxDiv', styles: 'margin-bottom:36px;' });
            container.appendChild(checkboxElement);
            var showPageNumberDiv = createElement('div', { className: 'e-de-toc-checkbox1' });
            showPageNumberDiv.setAttribute('title', _this.localObj.getConstant('Show page numbers in table of contents'));
            checkboxElement.appendChild(showPageNumberDiv);
            // tslint:disable-next-line:max-line-length
            var showpagenumberCheckboxElement = createElement('input', { id: 'showpagenumber', styles: 'width:12px;height:12px;margin-bottom:8px', className: 'e-de-prop-sub-label' });
            showPageNumberDiv.appendChild(showpagenumberCheckboxElement);
            _this.showPageNumber = new CheckBox({
                label: _this.localObj.getConstant('Show page numbers'),
                enableRtl: _this.isRtl
            });
            _this.showPageNumber.appendTo(showpagenumberCheckboxElement);
            var rightAlignDiv = createElement('div', { className: 'e-de-toc-checkbox2' });
            rightAlignDiv.setAttribute('title', _this.localObj.getConstant('Right align page numbers in table of contents'));
            checkboxElement.appendChild(rightAlignDiv);
            // tslint:disable-next-line:max-line-length
            var rightalignpagenumberCheckboxElement = createElement('input', { id: 'rightalignpagenumber', styles: 'width:12px;height:12px', className: 'e-de-prop-sub-label' });
            rightAlignDiv.appendChild(rightalignpagenumberCheckboxElement);
            _this.rightalignPageNumber = new CheckBox({
                label: _this.localObj.getConstant('Right align page numbers'),
                enableRtl: _this.isRtl
            });
            _this.rightalignPageNumber.appendTo(rightalignpagenumberCheckboxElement);
            var hyperlinkDiv = createElement('div', { className: 'e-de-toc-checkbox3' });
            hyperlinkDiv.setAttribute('title', _this.localObj.getConstant('Use hyperlinks instead of page numbers'));
            checkboxElement.appendChild(hyperlinkDiv);
            // tslint:disable-next-line:max-line-length
            var hyperlinkCheckboxElement = createElement('input', { id: 'hyperlinkdiv', styles: 'width:12px;height:12px', className: 'e-de-prop-sub-label' });
            hyperlinkDiv.appendChild(hyperlinkCheckboxElement);
            _this.hyperlink = new CheckBox({
                label: _this.localObj.getConstant('Use hyperlinks'),
                enableRtl: _this.isRtl
            });
            _this.hyperlink.appendTo(hyperlinkCheckboxElement);
        };
        this.buttonDiv = function (container) {
            var footerElementFloat;
            if (!_this.isRtl) {
                footerElementFloat = 'float:right';
            }
            else {
                footerElementFloat = 'float:left';
            }
            var footerElement = createElement('div', { id: 'footerDiv', styles: footerElementFloat });
            container.appendChild(footerElement);
            var updatebuttoncontentStyleElement = createElement('button', {
                id: 'footerupdatebuttonDiv',
                attrs: { type: 'button' }
            });
            footerElement.appendChild(updatebuttoncontentStyleElement);
            _this.updateBtn = new Button({
                content: _this.localObj.getConstant('Update'), cssClass: 'btn-update', isPrimary: true
            });
            _this.updateBtn.appendTo(updatebuttoncontentStyleElement);
            var cancelbuttoncontentStyleElement = createElement('button', {
                id: 'footercancelbuttonDiv',
                attrs: { type: 'button' }
            });
            footerElement.appendChild(cancelbuttoncontentStyleElement);
            _this.cancelBtn = new Button({
                content: _this.localObj.getConstant('Cancel'), cssClass: _this.isRtl ? 'e-de-btn-cancel-rtl' : 'e-de-btn-cancel'
            });
            _this.cancelBtn.appendTo(cancelbuttoncontentStyleElement);
        };
        this.showTocPane = function (isShow, previousContextType) {
            if (!isShow && _this.element.style.display === 'none' || (isShow && _this.element.style.display === 'block')) {
                return;
            }
            _this.element.style.display = isShow ? 'block' : 'none';
            // tslint:disable-next-line:max-line-length
            _this.updateBtn.content = _this.documentEditor.selection.contextType === 'TableOfContents' ? _this.localObj.getConstant('Update') : _this.localObj.getConstant('Insert');
            _this.prevContext = _this.documentEditor.selection.contextType;
            _this.documentEditor.resize();
            if (isShow) {
                _this.updateBtn.element.focus();
            }
        };
        this.onInsertToc = function () {
            var tocSettings = {
                startLevel: 1,
                endLevel: parseInt(_this.borderLevelStyle.value, 0),
                includeHyperlink: _this.hyperlink.checked,
                includePageNumber: _this.showPageNumber.checked,
                rightAlign: _this.rightalignPageNumber.checked
            };
            if (tocSettings.rightAlign) {
                tocSettings.tabLeader = 'Dot';
            }
            _this.documentEditor.editor.insertTableOfContents(tocSettings);
        };
        this.container = container;
        this.elementId = this.documentEditor.element.id;
        this.isRtl = isRtl;
        this.initializeTocPane();
    }
    Object.defineProperty(TocProperties.prototype, "documentEditor", {
        /**
         * @private
         */
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TocProperties.prototype, "toolbar", {
        /**
         * @private
         */
        get: function () {
            return this.container.toolbarModule;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    TocProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    /* tslint:disable */
    TocProperties.prototype.createDropdownOption = function (ulTag, text) {
        var liTag = createElement('li', {
            styles: 'display:block',
            className: 'e-de-floating-menuitem e-de-floating-menuitem-md de-list-items  de-list-item-size'
        });
        ulTag.appendChild(liTag);
        var innerHTML;
        if (text === 'None') {
            innerHTML = '<div>' + text + '</div>';
        }
        else if (text === '1.5px') {
            // tslint:disable-next-line:max-line-length
            innerHTML = '<div>' + text + '<span class="e-de-list-line" style="margin-left:10px;border-bottom-width:' + text + '"></span></div>';
        }
        else {
            // tslint:disable-next-line:max-line-length
            innerHTML = '<div>' + text + '<span class="e-de-list-line" style="margin-left:20px;border-bottom-width:' + text + '"></span></div>';
        }
        var liInnerDiv = createElement('div', {
            className: 'e-de-list-header-presetmenu',
            innerHTML: innerHTML
        });
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    // tslint:disable-next-line:max-line-length
    TocProperties.prototype.createDropDownButton = function (id, parentDiv, iconCss, content, selectedIndex) {
        var buttonElement = createElement('input', { id: id });
        parentDiv.appendChild(buttonElement);
        // tslint:disable-next-line:max-line-length  
        var dropDownBtn = new DropDownList({ index: selectedIndex, dataSource: content, popupHeight: '150px', cssClass: 'e-de-prop-font-button' }, buttonElement);
        return dropDownBtn;
    };
    TocProperties.prototype.destroy = function () {
        this.container = undefined;
        if (this.showPageNumber) {
            this.showPageNumber.destroy();
            this.showPageNumber = undefined;
        }
        if (this.rightalignPageNumber) {
            this.rightalignPageNumber.destroy();
            this.rightalignPageNumber = undefined;
        }
        if (this.borderBtn) {
            this.borderBtn.destroy();
            this.borderBtn = undefined;
        }
        if (this.borderLevelStyle) {
            this.borderLevelStyle.destroy();
            this.borderLevelStyle = undefined;
        }
    };
    return TocProperties;
}());
export { TocProperties };
