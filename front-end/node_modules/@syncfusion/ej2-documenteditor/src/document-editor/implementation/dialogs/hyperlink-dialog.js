import { createElement, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
/**
 * The Hyperlink dialog is used to insert or edit hyperlink at selection.
 */
/* tslint:disable:max-line-length */
var HyperlinkDialog = /** @class */ (function () {
    /**
     * @private
     */
    function HyperlinkDialog(viewer) {
        var _this = this;
        this.displayText = '';
        this.navigationUrl = undefined;
        this.bookmarkDropdown = undefined;
        this.bookmarkCheckbox = undefined;
        this.bookmarks = [];
        /**
         * @private
         */
        this.onKeyUpOnUrlBox = function (event) {
            if (event.keyCode === 13) {
                if (_this.displayTextBox.value !== '' && _this.urlTextBox.value !== '') {
                    _this.onInsertHyperlink();
                }
                return;
            }
            var selectedText = _this.owner.selection.text;
            var urlValue = _this.urlTextBox.value;
            if (urlValue.substring(0, 4).toLowerCase() === 'www.') {
                _this.urlTextBox.value = 'http://' + urlValue;
            }
            if (_this.displayText === '') {
                _this.displayTextBox.value = urlValue;
            }
            _this.enableOrDisableInsertButton();
        };
        /**
         * @private
         */
        this.onKeyUpOnDisplayBox = function () {
            _this.displayText = _this.displayTextBox.value;
            _this.enableOrDisableInsertButton();
        };
        /**
         * @private
         */
        this.onInsertButtonClick = function () {
            _this.onInsertHyperlink();
        };
        /**
         * @private
         */
        this.onCancelButtonClick = function () {
            _this.owner.dialog.hide();
            _this.clearValue();
        };
        /**
         * @private
         */
        this.loadHyperlinkDialog = function () {
            _this.owner.updateFocus();
            _this.bookmarks = [];
            for (var i = 0; i < _this.owner.bookmarks.keys.length; i++) {
                var bookmark = _this.owner.bookmarks.keys[i];
                if (bookmark.indexOf('_') !== 0) {
                    _this.bookmarks.push(bookmark);
                }
            }
            var fieldBegin = _this.owner.selection.getHyperlinkField();
            if (!isNullOrUndefined(fieldBegin)) {
                if (!isNullOrUndefined(fieldBegin.fieldSeparator)) {
                    var format = undefined;
                    // tslint:disable-next-line:max-line-length
                    var fieldObj = _this.owner.selection.getHyperlinkDisplayText(fieldBegin.fieldSeparator.line.paragraph, fieldBegin.fieldSeparator, fieldBegin.fieldEnd, false, format);
                    _this.displayText = fieldObj.displayText;
                    _this.displayTextBox.disabled = fieldObj.isNestedField;
                }
                _this.displayTextBox.value = _this.displayText;
                var link = _this.owner.selection.getLinkText(fieldBegin);
                _this.urlTextBox.value = _this.navigationUrl = link;
                _this.owner.dialog.header = _this.localObj.getConstant('Edit Hyperlink');
            }
            else {
                _this.displayText = _this.owner.selection.getText(true);
                if (_this.displayText !== '') {
                    if (_this.displayText.indexOf(String.fromCharCode(65532)) !== -1 ||
                        _this.displayText.indexOf('\r') !== -1 && (_this.displayText.lastIndexOf('\r') !== -1 &&
                            _this.displayText.slice(0, -1).indexOf('\r') !== -1)) {
                        _this.displayTextBox.value = '<<Selection in document>>';
                        _this.displayTextBox.disabled = true;
                    }
                    else {
                        _this.displayTextBox.value = _this.displayText;
                    }
                }
            }
            _this.bookmarkDiv.style.display = 'none';
            _this.addressText.style.display = 'block';
            _this.urlTextBox.style.display = 'block';
            _this.bookmarkCheckbox.checked = false;
            _this.bookmarkDropdown.dataSource = _this.owner.bookmarks.keys;
            _this.insertButton = document.getElementsByClassName('e-hyper-insert')[0];
            _this.enableOrDisableInsertButton();
            _this.urlTextBox.focus();
            if (_this.owner.selection.caret.style.display !== 'none') {
                _this.owner.selection.caret.style.display = 'none';
            }
        };
        /**
         * @private
         */
        this.closeHyperlinkDialog = function () {
            _this.clearValue();
            _this.owner.updateFocus();
        };
        /* tslint:disable:no-any */
        this.onUseBookmarkChange = function (args) {
            if (args.checked) {
                _this.bookmarkDiv.style.display = 'block';
                _this.bookmarkDropdown.dataSource = _this.bookmarks;
                _this.addressText.style.display = 'none';
                _this.urlTextBox.style.display = 'none';
            }
            else {
                _this.bookmarkDiv.style.display = 'none';
                _this.addressText.style.display = 'block';
                _this.urlTextBox.style.display = 'block';
            }
        };
        this.onBookmarkchange = function (args) {
            if (_this.bookmarkDropdown.value !== '') {
                _this.insertButton.disabled = false;
            }
        };
        this.owner = viewer;
    }
    /**
     * @private
     */
    HyperlinkDialog.prototype.getModuleName = function () {
        return 'HyperlinkDialog';
    };
    /**
     * @private
     */
    HyperlinkDialog.prototype.initHyperlinkDialog = function (localValue, isRtl) {
        var instance = this;
        var id = this.owner.owner.containerId + '_insert_hyperlink';
        this.target = createElement('div', { id: id, className: 'e-de-hyperlink' });
        var container = createElement('div');
        var displayText = createElement('div', { className: 'e-de-hyperlink-dlg-title', innerHTML: localValue.getConstant('Text to display') });
        this.displayTextBox = createElement('input', { id: this.owner.owner.containerId + '_display_text', className: 'e-input e-de-hyperlink-dlg-input' });
        this.displayTextBox.addEventListener('keyup', instance.onKeyUpOnDisplayBox);
        container.appendChild(displayText);
        container.appendChild(this.displayTextBox);
        this.addressText = createElement('div', { className: 'e-de-hyperlink-dlg-title', innerHTML: localValue.getConstant('Address') });
        this.urlTextBox = createElement('input', { id: this.owner.owner.containerId + '_url_text', className: 'e-input e-de-hyperlink-dlg-input', attrs: { autofocus: 'true' } });
        this.urlTextBox.addEventListener('input', instance.onKeyUpOnUrlBox);
        this.urlTextBox.addEventListener('keyup', instance.onKeyUpOnUrlBox);
        container.appendChild(this.addressText);
        container.appendChild(this.urlTextBox);
        this.bookmarkDiv = createElement('div', { styles: 'display:none;' });
        var bookmarkText = createElement('div', { className: 'e-de-hyperlink-dlg-title', innerHTML: localValue.getConstant('Bookmark') });
        var bookmarkTextElement = createElement('div', { className: 'e-de-hyperlink-dlg-bookmark' });
        // tslint:disable-next-line:max-line-length
        var bookmarkValue = createElement('input', { id: 'e-de-hyperlink-dlg-bookmark-value' });
        bookmarkTextElement.appendChild(bookmarkValue);
        // tslint:disable-next-line:max-line-length
        this.bookmarkDropdown = new DropDownList({ dataSource: [], change: this.onBookmarkchange, popupHeight: '230px', width: '230px', noRecordsTemplate: localValue.getConstant('No bookmarks found') });
        this.bookmarkDropdown.appendTo(bookmarkValue);
        this.bookmarkDiv.appendChild(bookmarkText);
        this.bookmarkDiv.appendChild(bookmarkTextElement);
        container.appendChild(this.bookmarkDiv);
        // tslint:disable-next-line:max-line-length
        var bookmarkCheckDiv = createElement('div', { className: 'e-de-hyperlink-bookmark-check e-de-hyperlink-dlg-title' });
        var bookmarkCheck = createElement('input', { attrs: { type: 'checkbox' }, id: this.target.id + '_bookmark', className: this.target.id + '_bookmarkcheck' });
        bookmarkCheckDiv.appendChild(bookmarkCheck);
        this.bookmarkCheckbox = new CheckBox({
            label: localValue.getConstant('Use bookmarks'),
            enableRtl: isRtl, change: this.onUseBookmarkChange
        });
        this.bookmarkCheckbox.appendTo(bookmarkCheck);
        container.appendChild(bookmarkCheckDiv);
        this.target.appendChild(container);
    };
    /**
     * @private
     */
    HyperlinkDialog.prototype.show = function () {
        this.localObj = new L10n('documenteditor', this.owner.owner.defaultLocale);
        this.localObj.setLocale(this.owner.owner.locale);
        if (!this.target) {
            this.initHyperlinkDialog(this.localObj, this.owner.owner.enableRtl);
        }
        this.owner.dialog.header = this.localObj.getConstant('Insert Hyperlink');
        this.owner.dialog.height = 'auto';
        this.owner.dialog.width = 'auto';
        this.owner.dialog.content = this.target;
        this.owner.dialog.buttons = [{
                click: this.onInsertButtonClick,
                buttonModel: { content: this.localObj.getConstant('Ok'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: this.localObj.getConstant('Cancel'), cssClass: 'e-flat e-hyper-cancel' }
            }];
        this.owner.dialog.dataBind();
        this.owner.dialog.beforeOpen = this.loadHyperlinkDialog;
        this.owner.dialog.close = this.closeHyperlinkDialog;
        this.owner.dialog.show();
    };
    /**
     * @private
     */
    HyperlinkDialog.prototype.hide = function () {
        this.closeHyperlinkDialog();
    };
    HyperlinkDialog.prototype.enableOrDisableInsertButton = function () {
        if (!isNullOrUndefined(this.insertButton)) {
            // tslint:disable-next-line:max-line-length
            this.insertButton.disabled = (this.urlTextBox.value === '' || this.displayTextBox.value === '');
        }
    };
    /**
     * @private
     */
    HyperlinkDialog.prototype.onInsertHyperlink = function () {
        var displayText = this.displayTextBox.value.trim();
        var address = this.urlTextBox.value.trim();
        var isBookmark = false;
        if (!isNullOrUndefined(this.bookmarkDropdown.value) && this.bookmarkDropdown.value !== '') {
            address = this.bookmarkDropdown.value;
            isBookmark = true;
        }
        if (address === '') {
            this.owner.dialog.hide();
            return;
        }
        if (displayText === '' && address !== '') {
            displayText = address;
        }
        else {
            displayText = this.displayTextBox.value;
        }
        if (!isNullOrUndefined(this.navigationUrl)) {
            this.owner.owner.editorModule.editHyperlink(this.owner.selection, address, displayText, isBookmark);
        }
        else {
            var remove = this.owner.selection.text !== displayText && !this.displayTextBox.disabled;
            this.owner.owner.editorModule.insertHyperlinkInternal(address, displayText, remove, isBookmark);
        }
        this.owner.dialog.hide();
        this.navigationUrl = undefined;
    };
    /* tslint:enable:no-any */
    /**
     * @private
     */
    HyperlinkDialog.prototype.clearValue = function () {
        this.displayTextBox.value = '';
        this.urlTextBox.value = '';
        this.displayText = '';
        this.displayTextBox.disabled = false;
        this.bookmarks = [];
    };
    /**
     * @private
     */
    HyperlinkDialog.prototype.destroy = function () {
        if (this.displayTextBox) {
            this.displayTextBox.innerHTML = '';
            this.displayTextBox = undefined;
        }
        if (this.urlTextBox) {
            this.urlTextBox.parentElement.removeChild(this.urlTextBox);
            this.urlTextBox = undefined;
        }
        this.owner = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            this.target.innerHTML = '';
            this.target = undefined;
        }
    };
    return HyperlinkDialog;
}());
export { HyperlinkDialog };
