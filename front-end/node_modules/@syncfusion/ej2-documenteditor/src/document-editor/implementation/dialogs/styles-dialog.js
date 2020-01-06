import { ListView } from '@syncfusion/ej2-lists';
import { Button } from '@syncfusion/ej2-buttons';
import { createElement, L10n } from '@syncfusion/ej2-base';
/**
 * The Styles dialog is used to create or modify styles.
 */
var StylesDialog = /** @class */ (function () {
    /**
     * @private
     */
    function StylesDialog(viewer) {
        var _this = this;
        this.updateStyleNames = function (localValue) {
            var collection = _this.owner.owner.viewer.styles.getStyleNames('Paragraph');
            var styleNames = ['Normal', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'];
            var defaultStyleNames = _this.defaultStyleName(styleNames, localValue);
            var finalList = collection.concat(defaultStyleNames).filter(function (v, i, a) { return a.indexOf(v) === i; });
            return finalList;
        };
        this.defaultStyleName = function (styleNames, localValue) {
            var styleName = [];
            for (var index = 0; index < styleNames.length; index++) {
                styleName.push(localValue.getConstant(styleNames[index]));
            }
            return styleName;
        };
        this.modifyStyles = function () {
            _this.owner.dialog.hide();
            _this.owner.owner.styleDialogModule.show(_this.styleName, _this.localValue.getConstant('Modify Style'));
        };
        /* tslint:disable:no-any */
        this.selectHandler = function (args) {
            _this.styleName = args.text;
        };
        this.addNewStyles = function () {
            _this.owner.dialog.hide();
            _this.owner.owner.styleDialogModule.show();
        };
        this.owner = viewer;
    }
    /**
     * @private
     */
    StylesDialog.prototype.getModuleName = function () {
        return 'StylesDialog';
    };
    /**
     * @private
     */
    StylesDialog.prototype.initStylesDialog = function (localValue, styles, isRtl) {
        var instance = this;
        var id = this.owner.owner.containerId + '_insert_styles';
        this.target = createElement('div', { id: id, className: 'e-de-styles' });
        var headerValue = localValue.getConstant('Styles');
        var dlgFields = createElement('div', { innerHTML: headerValue, className: 'e-styles-dlgfields' });
        this.target.appendChild(dlgFields);
        var commonDiv = createElement('div', { className: 'e-styles-common' });
        this.target.appendChild(commonDiv);
        var searchDiv = createElement('div', { className: 'e-styles-list' });
        commonDiv.appendChild(searchDiv);
        if (isRtl) {
            searchDiv.classList.add('e-de-rtl');
        }
        var listviewDiv = createElement('div', { className: 'e-styles-listViewDiv', id: 'styles_listview' });
        searchDiv.appendChild(listviewDiv);
        this.listviewInstance = new ListView({
            dataSource: styles,
            cssClass: 'e-styles-listview',
        });
        this.listviewInstance.appendTo(listviewDiv);
        this.listviewInstance.addEventListener('select', this.selectHandler);
        var buttonDiv = createElement('div', { className: 'e-styles-button' });
        commonDiv.appendChild(buttonDiv);
        var newButtonDiv = createElement('div', { className: 'e-styles-addbutton' });
        buttonDiv.appendChild(newButtonDiv);
        var newButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('New'), id: 'new',
            attrs: { type: 'button' }
        });
        newButtonDiv.appendChild(newButtonElement);
        var newbutton = new Button({ cssClass: 'e-button-custom' });
        newbutton.appendTo(newButtonElement);
        newButtonElement.addEventListener('click', this.addNewStyles);
        var modifybuttonDiv = createElement('div', { className: 'e-styles-addbutton' });
        buttonDiv.appendChild(modifybuttonDiv);
        var modifyButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('Modify'), id: 'modify',
            attrs: { type: 'button' }
        });
        modifybuttonDiv.appendChild(modifyButtonElement);
        var addbutton = new Button({ cssClass: 'e-button-custom' });
        addbutton.appendTo(modifyButtonElement);
        modifyButtonElement.addEventListener('click', this.modifyStyles);
    };
    /**
     * @private
     */
    StylesDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.owner.owner.defaultLocale);
        localValue.setLocale(this.owner.owner.locale);
        var styles = this.updateStyleNames(localValue);
        this.localValue = localValue;
        this.initStylesDialog(localValue, styles, this.owner.owner.enableRtl);
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = this.owner.updateFocus;
        this.owner.dialog.close = this.owner.updateFocus;
        this.owner.dialog.header = localValue.getConstant('Styles');
        this.owner.dialog.height = 'auto';
        this.owner.dialog.width = 'auto';
        this.owner.dialog.buttons = [{
                click: this.hideObjects.bind(this),
                buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
            }];
        this.owner.dialog.dataBind();
        this.owner.dialog.show();
    };
    StylesDialog.prototype.hideObjects = function () {
        this.owner.dialog.hide();
    };
    /**
     * @private
     */
    StylesDialog.prototype.destroy = function () {
        if (this.listviewInstance) {
            this.listviewInstance.destroy();
            this.listviewInstance = undefined;
        }
    };
    return StylesDialog;
}());
export { StylesDialog };
