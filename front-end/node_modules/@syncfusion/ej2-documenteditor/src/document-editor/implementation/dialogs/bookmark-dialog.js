import { ListView } from '@syncfusion/ej2-lists';
import { Button } from '@syncfusion/ej2-buttons';
import { createElement, L10n, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The Bookmark dialog is used to add, navigate or delete bookmarks.
 */
var BookmarkDialog = /** @class */ (function () {
    /**
     * @private
     */
    function BookmarkDialog(viewer) {
        var _this = this;
        /**
         * @private
         */
        this.onKeyUpOnTextBox = function (event) {
            _this.enableOrDisableButton();
        };
        this.addBookmark = function () {
            _this.owner.owner.editorModule.insertBookmark(_this.textBoxInput.value);
            _this.owner.dialog.hide();
        };
        /* tslint:disable:no-any */
        this.selectHandler = function (args) {
            _this.focusTextBox(args.text);
        };
        this.gotoBookmark = function () {
            _this.owner.selection.selectBookmark(_this.textBoxInput.value);
        };
        this.deleteBookmark = function () {
            _this.owner.owner.editorModule.deleteBookmark(_this.textBoxInput.value);
            _this.show();
        };
        this.owner = viewer;
    }
    /**
     * @private
     */
    BookmarkDialog.prototype.getModuleName = function () {
        return 'BookmarkDialog';
    };
    /**
     * @private
     */
    BookmarkDialog.prototype.initBookmarkDialog = function (localValue, bookmarks, isRtl) {
        var instance = this;
        var id = this.owner.owner.containerId + '_insert_bookmark';
        this.target = createElement('div', { id: id, className: 'e-de-bookmark' });
        var headerValue = localValue.getConstant('Bookmark name') + ':';
        var dlgFields = createElement('div', { innerHTML: headerValue, className: 'e-bookmark-dlgfields' });
        this.target.appendChild(dlgFields);
        var commonDiv = createElement('div', { className: 'e-bookmark-common' });
        this.target.appendChild(commonDiv);
        var searchDiv = createElement('div', { className: 'e-bookmark-list' });
        commonDiv.appendChild(searchDiv);
        if (isRtl) {
            searchDiv.classList.add('e-de-rtl');
        }
        var textBoxDiv = createElement('div', { className: 'e-bookmark-textboxdiv' });
        searchDiv.appendChild(textBoxDiv);
        // tslint:disable-next-line:max-line-length
        this.textBoxInput = createElement('input', { className: 'e-input e-bookmark-textbox-input', id: 'bookmark_text_box', attrs: { autofocus: 'true' } });
        this.textBoxInput.setAttribute('type', 'text');
        textBoxDiv.appendChild(this.textBoxInput);
        var listviewDiv = createElement('div', { className: 'e-bookmark-listViewDiv', id: 'bookmark_listview' });
        searchDiv.appendChild(listviewDiv);
        var arts = this.owner.bookmarks.keys;
        this.listviewInstance = new ListView({
            dataSource: bookmarks,
            cssClass: 'e-bookmark-listview',
        });
        var hasNoBookmark = (bookmarks === undefined || bookmarks.length === 0);
        this.listviewInstance.appendTo(listviewDiv);
        this.listviewInstance.addEventListener('select', this.selectHandler);
        var buttonDiv = createElement('div', { className: 'e-bookmark-button' });
        commonDiv.appendChild(buttonDiv);
        var addbuttonDiv = createElement('div', { className: 'e-bookmark-addbutton' });
        buttonDiv.appendChild(addbuttonDiv);
        var addButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('Add'), id: 'add',
            attrs: { type: 'button' }
        });
        addbuttonDiv.appendChild(addButtonElement);
        this.addButton = new Button({ cssClass: 'e-button-custom' });
        this.addButton.disabled = true;
        this.addButton.appendTo(addButtonElement);
        this.textBoxInput.addEventListener('input', this.onKeyUpOnTextBox);
        this.textBoxInput.addEventListener('keyup', this.onKeyUpOnTextBox);
        addButtonElement.addEventListener('click', this.addBookmark);
        var deleteButtonDiv = createElement('div', { className: 'e-bookmark-deletebutton' });
        buttonDiv.appendChild(deleteButtonDiv);
        var deleteButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('Delete'), id: 'delete',
            attrs: { type: 'button' }
        });
        deleteButtonDiv.appendChild(deleteButtonElement);
        this.deleteButton = new Button({ cssClass: 'e-button-custom' });
        this.deleteButton.disabled = hasNoBookmark;
        this.deleteButton.appendTo(deleteButtonElement);
        deleteButtonElement.addEventListener('click', this.deleteBookmark);
        var gotoButtonDiv = createElement('div', { className: 'e-bookmark-gotobutton' });
        buttonDiv.appendChild(gotoButtonDiv);
        var gotoButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('Go To'), id: 'goto',
            attrs: { type: 'button' }
        });
        gotoButtonDiv.appendChild(gotoButtonElement);
        this.gotoButton = new Button({ cssClass: 'e-button-custom' });
        this.gotoButton.disabled = hasNoBookmark;
        this.gotoButton.appendTo(gotoButtonElement);
        gotoButtonElement.addEventListener('click', this.gotoBookmark);
    };
    /**
     * @private
     */
    BookmarkDialog.prototype.show = function () {
        var bookmarks = this.owner.getBookmarks();
        var localObj = new L10n('documenteditor', this.owner.owner.defaultLocale);
        localObj.setLocale(this.owner.owner.locale);
        // if (!this.target) {
        this.initBookmarkDialog(localObj, bookmarks, this.owner.owner.enableRtl);
        //}
        this.owner.dialog.header = localObj.getConstant('Bookmark');
        this.owner.dialog.height = 'auto';
        this.owner.dialog.width = 'auto';
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = this.owner.updateFocus;
        this.owner.dialog.close = this.owner.updateFocus;
        this.owner.dialog.buttons = [{
                click: this.removeObjects.bind(this),
                buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
            }];
        this.owner.dialog.dataBind();
        var hasNoBookmark = (bookmarks === undefined || bookmarks.length === 0);
        if (!hasNoBookmark) {
            /* tslint:disable:no-any */
            var firstItem = bookmarks[0];
            this.listviewInstance.selectItem(firstItem);
        }
        this.owner.dialog.show();
    };
    BookmarkDialog.prototype.enableOrDisableButton = function () {
        if (!isNullOrUndefined(this.addButton)) {
            // tslint:disable-next-line:max-line-length
            this.addButton.disabled = (this.textBoxInput.value === '');
        }
    };
    /* tslint:disable:no-any */
    BookmarkDialog.prototype.focusTextBox = function (text) {
        this.textBoxInput.value = text;
        /* tslint:disable:no-any */
        var value = document.getElementById('bookmark_text_box');
        value.setSelectionRange(0, text.length);
        value.focus();
        this.enableOrDisableButton();
    };
    BookmarkDialog.prototype.removeObjects = function () {
        this.owner.dialog.hide();
    };
    /**
     * @private
     */
    BookmarkDialog.prototype.destroy = function () {
        if (this.textBoxInput) {
            this.textBoxInput.remove();
            this.textBoxInput = undefined;
        }
        if (this.listviewInstance) {
            this.listviewInstance.destroy();
            this.listviewInstance = undefined;
        }
    };
    return BookmarkDialog;
}());
export { BookmarkDialog };
