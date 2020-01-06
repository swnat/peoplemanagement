import { L10n, createElement } from '@syncfusion/ej2-base';
import { ListView } from '@syncfusion/ej2-lists';
import { Button } from '@syncfusion/ej2-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';
/**
 * @private
 */
var AddUserDialog = /** @class */ (function () {
    function AddUserDialog(viewer, owner) {
        var _this = this;
        /**
         * @private
         */
        this.show = function () {
            var localObj = new L10n('documenteditor', _this.viewer.owner.defaultLocale);
            localObj.setLocale(_this.viewer.owner.locale);
            if (!_this.target) {
                _this.initUserDialog(localObj, _this.viewer.owner.enableRtl);
            }
            _this.viewer.dialog.header = localObj.getConstant('Add Users');
            _this.viewer.dialog.height = 'auto';
            _this.viewer.dialog.width = 'auto';
            _this.viewer.dialog.content = _this.target;
            _this.viewer.dialog.beforeOpen = _this.loadUserDetails;
            _this.viewer.dialog.close = _this.viewer.updateFocus;
            _this.viewer.dialog.buttons = [
                {
                    click: _this.okButtonClick,
                    buttonModel: {
                        content: localObj.getConstant('Ok'), cssClass: 'e-flat', isPrimary: true
                    }
                },
                {
                    click: _this.hideDialog,
                    buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat' }
                }, {
                    click: _this.deleteButtonClick,
                    buttonModel: { content: localObj.getConstant('Delete'), cssClass: 'e-flat e-user-delete' }
                }
            ];
            _this.viewer.dialog.dataBind();
            _this.viewer.dialog.show();
        };
        this.loadUserDetails = function () {
            _this.viewer.restrictEditingPane.addedUser.dataSource = _this.viewer.userCollection;
            _this.viewer.restrictEditingPane.addedUser.refresh();
        };
        /**
         * @private
         */
        this.okButtonClick = function () {
            _this.viewer.restrictEditingPane.showStopProtectionPane(false);
            _this.viewer.restrictEditingPane.loadPaneValue();
            _this.viewer.dialog.hide();
        };
        /**
         * @private
         */
        this.hideDialog = function () {
            _this.textBoxInput.value = '';
            _this.viewer.dialog.hide();
        };
        /**
         * @private
         */
        this.onKeyUpOnDisplayBox = function () {
            _this.addButton.disabled = _this.textBoxInput.value === '';
        };
        this.addButtonClick = function () {
            if (_this.validateUserName(_this.textBoxInput.value)) {
                if (_this.viewer.userCollection.indexOf(_this.textBoxInput.value) === -1) {
                    _this.viewer.userCollection.push(_this.textBoxInput.value);
                }
                _this.userList.dataSource = _this.viewer.userCollection;
                _this.userList.refresh();
                _this.textBoxInput.value = '';
            }
            else {
                DialogUtility.alert('Invalid user name');
            }
        };
        this.deleteButtonClick = function () {
            var index = _this.viewer.userCollection.indexOf(_this.userList.getSelectedItems().text);
            if (index > -1) {
                _this.viewer.userCollection.splice(index, 1);
                _this.userList.dataSource = _this.viewer.userCollection;
                _this.userList.refresh();
            }
        };
        this.viewer = viewer;
        this.owner = owner;
    }
    /**
     * @private
     */
    AddUserDialog.prototype.initUserDialog = function (localValue, isRtl) {
        var instance = this;
        var id = this.viewer.owner.containerId + '_addUser';
        this.target = createElement('div', { id: id, className: 'e-de-user-dlg' });
        var headerValue = localValue.getConstant('Enter User');
        var dlgFields = createElement('div', { innerHTML: headerValue, className: 'e-bookmark-dlgfields' });
        this.target.appendChild(dlgFields);
        var commonDiv = createElement('div', { className: 'e-de-user-dlg-common' });
        this.target.appendChild(commonDiv);
        var adduserDiv = createElement('div', { className: 'e-de-user-dlg-list', styles: 'display:inline-flex' });
        commonDiv.appendChild(adduserDiv);
        if (isRtl) {
            adduserDiv.classList.add('e-de-rtl');
        }
        var textBoxDiv = createElement('div', { className: 'e-de-user-dlg-textboxdiv' });
        adduserDiv.appendChild(textBoxDiv);
        // tslint:disable-next-line:max-line-length
        this.textBoxInput = createElement('input', { className: 'e-input e-de-user-dlg-textbox-input', id: 'bookmark_text_box', attrs: { autofocus: 'true' } });
        this.textBoxInput.setAttribute('type', 'text');
        textBoxDiv.appendChild(this.textBoxInput);
        this.textBoxInput.addEventListener('keyup', instance.onKeyUpOnDisplayBox);
        var addButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('Add'), id: 'add',
            attrs: { type: 'button' }
        });
        adduserDiv.appendChild(addButtonElement);
        addButtonElement.addEventListener('click', this.addButtonClick);
        this.addButton = new Button({ cssClass: 'e-de-user-add-btn' });
        this.addButton.disabled = true;
        this.addButton.appendTo(addButtonElement);
        this.addButton.addEventListener('click', this.addButtonClick);
        var userCollectionDiv = createElement('div');
        commonDiv.appendChild(userCollectionDiv);
        var userDiv = createElement('div', { innerHTML: localValue.getConstant('Users'), className: 'e-de-user-dlg-user' });
        userCollectionDiv.appendChild(userDiv);
        var listviewDiv = createElement('div', { id: 'user_listView' });
        userCollectionDiv.appendChild(listviewDiv);
        this.userList = new ListView({
            cssClass: 'e-de-user-listview'
        });
        this.userList.appendTo(listviewDiv);
    };
    AddUserDialog.prototype.validateUserName = function (value) {
        if (value.indexOf('@') === -1) {
            return false;
        }
        else {
            var parts = value.split('@');
            var domain = parts[1];
            if (domain.indexOf('.') === -1) {
                return false;
            }
            else {
                var domainParts = domain.split('.');
                var ext = domainParts[1];
                if (domainParts.length > 2) {
                    return false;
                }
                if (ext.length > 4 || ext.length < 2) {
                    return false;
                }
            }
        }
        return true;
    };
    return AddUserDialog;
}());
export { AddUserDialog };
