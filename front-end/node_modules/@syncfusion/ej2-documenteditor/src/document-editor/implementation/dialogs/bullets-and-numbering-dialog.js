import { createElement, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { Tab } from '@syncfusion/ej2-navigations';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WListLevel } from '../list/list-level';
import { WListFormat } from '../../implementation/format/list-format';
/**
 * The Bullets and Numbering dialog is used to apply list format for a paragraph style.
 */
/* tslint:disable:no-any */
var BulletsAndNumberingDialog = /** @class */ (function () {
    /**
     * @private
     */
    function BulletsAndNumberingDialog(layoutViewer) {
        var _this = this;
        this.isBullet = false;
        /**
         * @private
         */
        this.numberListClick = function (args) {
            _this.isBullet = false;
            _this.setActiveElement(args);
            if (args.currentTarget.classList.contains('e-de-list-numbered-none')) {
                _this.numberFormat = undefined;
                _this.listLevelPattern = undefined;
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-number-dot')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'Arabic';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-number-brace')) {
                _this.numberFormat = '%1)';
                _this.listLevelPattern = 'Arabic';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-up-roman')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'UpRoman';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-up-letter')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'UpLetter';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-low-letter-brace')) {
                _this.numberFormat = '%1)';
                _this.listLevelPattern = 'LowLetter';
            }
            else if (args.currentTarget.classList.contains('e-de-numbered-low-letter-dot')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'LowLetter';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-low-roman')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'LowRoman';
            }
        };
        /**
         * @private
         */
        this.bulletListClick = function (args) {
            _this.isBullet = true;
            _this.setActiveElement(args);
            if (args.currentTarget.classList.contains('e-bullet-none')) {
                _this.symbol = undefined;
                _this.fontFamily = undefined;
            }
            else if (args.currentTarget.classList.contains('e-bullet-dot')) {
                _this.symbol = '\uf0b7';
                _this.fontFamily = 'Symbol';
            }
            else if (args.currentTarget.classList.contains('e-bullet-circle')) {
                _this.symbol = '\uf06f' + '\u0020';
                _this.fontFamily = 'Symbol';
            }
            else if (args.currentTarget.classList.contains('e-bullet-square')) {
                _this.symbol = '\uf0a7';
                _this.fontFamily = 'Wingdings';
            }
            else if (args.currentTarget.classList.contains('e-bullet-flower')) {
                _this.symbol = '\uf076';
                _this.fontFamily = 'Wingdings';
            }
            else if (args.currentTarget.classList.contains('e-bullet-arrow')) {
                _this.symbol = '\uf0d8';
                _this.fontFamily = 'Wingdings';
            }
            else if (args.currentTarget.classList.contains('e-bullet-tick')) {
                _this.symbol = '\uf0fc';
                _this.fontFamily = 'Wingdings';
            }
        };
        /**
         * @private
         */
        this.loadNumberingBulletDialog = function () {
            //Load 
            _this.owner.updateFocus();
        };
        /**
         * @private
         */
        this.closeNumberingBulletDialog = function () {
            _this.unWireEventsAndBindings();
            _this.owner.updateFocus();
        };
        /**
         * @private
         */
        this.onCancelButtonClick = function () {
            _this.isBullet = false;
            _this.listLevelPattern = undefined;
            _this.numberFormat = undefined;
            _this.symbol = undefined;
            _this.fontFamily = undefined;
            _this.owner.dialog.hide();
            _this.unWireEventsAndBindings();
        };
        /**
         * @private
         */
        this.onOkButtonClick = function () {
            if (_this.owner.owner.viewer.lists.length > 0) {
                _this.listFormat.list.listId = _this.owner.owner.viewer.lists[_this.owner.owner.viewer.lists.length - 1].listId + 1;
                _this.listFormat.listId = _this.listFormat.list.listId;
            }
            else {
                _this.listFormat.list.listId = 0;
                _this.listFormat.listId = 0;
            }
            if (_this.owner.owner.viewer.abstractLists.length > 0) {
                /* tslint:disable-next-line:max-line-length */
                _this.abstractList.abstractListId = _this.owner.owner.viewer.abstractLists[_this.owner.owner.viewer.abstractLists.length - 1].abstractListId + 1;
            }
            else {
                _this.abstractList.abstractListId = 0;
            }
            _this.listFormat.list.abstractListId = _this.abstractList.abstractListId;
            var listLevel = new WListLevel(_this.abstractList);
            listLevel.listLevelPattern = !isNullOrUndefined(_this.listLevelPattern) ? _this.listLevelPattern : 'Bullet';
            listLevel.numberFormat = _this.isBullet ? _this.symbol : _this.numberFormat;
            if (listLevel.listLevelPattern !== 'Bullet') {
                listLevel.startAt = 1;
            }
            listLevel.characterFormat.fontFamily = !isNullOrUndefined(_this.fontFamily) ? _this.fontFamily : 'Verdana';
            listLevel.paragraphFormat.leftIndent = 36;
            listLevel.paragraphFormat.firstLineIndent = -18;
            _this.abstractList.levels.push(listLevel);
            _this.listFormat.listLevelNumber = 0;
            _this.listFormat.list.abstractList = _this.abstractList;
            _this.owner.dialog.hide();
        };
        this.owner = layoutViewer;
    }
    /**
     * @private
     */
    BulletsAndNumberingDialog.prototype.getModuleName = function () {
        return 'BulletsAndNumberingDialog';
    };
    /**
     * @private
     */
    BulletsAndNumberingDialog.prototype.initNumberingBulletDialog = function (locale) {
        var instance = this;
        var id = this.owner.owner.containerId;
        this.target = createElement('div', { id: id + '_insertNumberBulletDialog', className: 'e-de-number-bullet-dlg' });
        var tabTarget = createElement('div', { id: id + '_tabNumberBulletDialog', className: 'e-de-tab-number-bullet-dlg' });
        this.target.appendChild(tabTarget);
        this.createNumberList(id);
        this.createBulletList(id);
        //Initialize Tab component
        this.tabObj = new Tab({
            items: [
                {
                    header: { 'text': createElement('div', { innerHTML: locale.getConstant('Numbering') }) },
                    content: this.numberListDiv,
                },
                {
                    header: { 'text': createElement('div', { innerHTML: locale.getConstant('Bullets') }) },
                    content: this.bulletListDiv,
                }
            ],
            heightAdjustMode: 'None',
            width: 272,
            selecting: this.onTabSelect.bind(this)
        });
        //Render initialized Tab component
        this.tabObj.appendTo(tabTarget);
    };
    BulletsAndNumberingDialog.prototype.onTabSelect = function (args) {
        if (args.selectingIndex === 1) {
            this.bulletListDiv.style.display = 'block';
        }
    };
    BulletsAndNumberingDialog.prototype.createNumberList = function (id) {
        this.numberListDiv = createElement('div', { className: 'e-de-style-numbered-list', id: id + '_Number' });
        var numberListDiv = this.numberListDiv;
        numberListDiv.style.height = '270px';
        var ulTag = createElement('ul', {
            styles: 'display: block; outline: 0px;',
            id: 'listMenu',
            className: 'e-de-ui-wfloating-menu e-de-ui-bullets-menu e-de-list-container e-de-list-thumbnail'
        });
        numberListDiv.appendChild(ulTag);
        var numberedNone = this.createNumberNoneListTag(ulTag);
        var numberedNumberDot = this.createNumberListTag(ulTag, '1.', '2.', '3.', 'e-de-list-numbered-number-dot');
        var numberedNumberBrace = this.createNumberListTag(ulTag, '1)', '2)', '3)', 'e-de-list-numbered-number-brace');
        var numberedUpRoman = this.createNumberListTag(ulTag, 'I.', 'II.', 'III.', 'e-de-list-numbered-up-roman');
        var numberedUpLettter = this.createNumberListTag(ulTag, 'A.', 'B.', 'C.', 'e-de-list-numbered-up-letter');
        var numberedLowLetterDot = this.createNumberListTag(ulTag, 'a.', 'b.', 'c.', 'e-de-numbered-low-letter-dot');
        var numberedLowLetterBrace = this.createNumberListTag(ulTag, 'a)', 'b)', 'c)', 'e-de-list-numbered-low-letter-brace');
        var numberedLowRoman = this.createNumberListTag(ulTag, 'i.', 'ii.', 'iii.', 'e-de-list-numbered-low-roman');
        numberedNone.addEventListener('click', this.numberListClick);
        numberedNumberDot.addEventListener('click', this.numberListClick);
        numberedNumberBrace.addEventListener('click', this.numberListClick);
        numberedUpRoman.addEventListener('click', this.numberListClick);
        numberedUpLettter.addEventListener('click', this.numberListClick);
        numberedLowLetterBrace.addEventListener('click', this.numberListClick);
        numberedLowLetterDot.addEventListener('click', this.numberListClick);
        numberedLowRoman.addEventListener('click', this.numberListClick);
        this.target.appendChild(numberListDiv);
    };
    BulletsAndNumberingDialog.prototype.createNumberListTag = function (ulTag, text1, text2, text3, className) {
        var liTag = createElement('li', {
            styles: 'display:block',
            className: 'e-de-ui-wfloating-menuitem e-de-ui-wfloating-menuitem-md e-de-list-items  e-de-list-item-size ' + className
        });
        ulTag.appendChild(liTag);
        /* tslint:disable-next-line:max-line-length */
        var innerHTML = '<div>' + text1 + '<span class="e-de-ui-list-line"></span></div><div>' + text2 + '<span class="e-de-ui-list-line">';
        innerHTML += '</span></div><div>' + text3 + '<span class="e-de-ui-list-line"> </span></div >';
        var liInnerDiv = createElement('div', {
            className: 'e-de-ui-list-header-presetmenu',
            id: 'e-de-ui-zlist0', innerHTML: innerHTML
        });
        liTag.style.cssFloat = 'left';
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    BulletsAndNumberingDialog.prototype.createNumberNoneListTag = function (ulTag) {
        var liTag = createElement('li', {
            styles: 'display:block',
            /* tslint:disable-next-line:max-line-length */
            className: 'e-de-ui-wfloating-menuitem e-de-ui-wfloating-menuitem-md e-de-list-items  e-de-list-item-size e-de-list-numbered-none'
        });
        ulTag.appendChild(liTag);
        var innerHTML = '<div class="e-de-ui-bullets e-de-bullet-icons">None</div>';
        var liInnerDiv = createElement('div', {
            className: 'e-de-ui-list-header-presetmenu',
            id: 'e-de-ui-zlist0', innerHTML: innerHTML
        });
        liTag.style.cssFloat = 'left';
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    BulletsAndNumberingDialog.prototype.createBulletListTag = function (ulTag, iconCss, className) {
        var liTag = createElement('li', {
            styles: 'display:block;',
            className: 'e-de-ui-wfloating-menuitem e-de-ui-wfloating-bullet-menuitem-md e-de-list-items  e-de-list-item-size ' + className
        });
        ulTag.appendChild(liTag);
        /* tslint:disable-next-line:max-line-length */
        var liInnerDiv = createElement('div', { className: 'e-de-ui-bullet-list-header-presetmenu e-de-bullet-icon-size', id: 'e-de-ui-zlist0' });
        var liNextDiv = createElement('div', { className: iconCss });
        liInnerDiv.appendChild(liNextDiv);
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    BulletsAndNumberingDialog.prototype.createBulletList = function (id) {
        this.bulletListDiv = createElement('div', { className: 'e-de-ui-bullet-list-header-presetmenu', id: id + '_Bullet' });
        var bulletListDiv = this.bulletListDiv;
        bulletListDiv.style.height = '270px';
        bulletListDiv.style.display = 'none';
        var ulTag = createElement('ul', {
            styles: 'display: block; outline: 0px;', id: 'listMenu',
            className: 'e-de-ui-wfloating-menu e-de-ui-bullets-menu e-de-list-container e-de-list-thumbnail'
        });
        bulletListDiv.appendChild(ulTag);
        var bulletNone = this.createBulletListTag(ulTag, 'e-de-icon-bullet-list-none e-de-bullet-icons', 'e-bullet-none');
        var bulletDot = this.createBulletListTag(ulTag, 'e-de-icon-bullet-list-dot e-de-bullet-icons', 'e-bullet-dot');
        /* tslint:disable-next-line:max-line-length */
        var bulletCircle = this.createBulletListTag(ulTag, 'e-de-icon-bullet-list-circle e-de-bullet-icons', 'e-bullet-circle');
        var bulletSquare = this.createBulletListTag(ulTag, 'e-de-icon-bullet-list-square e-de-bullet-icons', 'e-bullet-square');
        /* tslint:disable-next-line:max-line-length */
        var bulletFlower = this.createBulletListTag(ulTag, 'e-de-icon-bullet-list-flower e-de-bullet-icons', 'e-bullet-flower');
        var bulletArrow = this.createBulletListTag(ulTag, 'e-de-icon-bullet-list-arrow e-de-bullet-icons', 'e-bullet-arrow');
        var bulletTick = this.createBulletListTag(ulTag, 'e-de-icon-bullet-list-tick e-de-bullet-icons', 'e-bullet-tick');
        bulletNone.addEventListener('click', this.bulletListClick);
        bulletDot.addEventListener('click', this.bulletListClick);
        bulletCircle.addEventListener('click', this.bulletListClick);
        bulletSquare.addEventListener('click', this.bulletListClick);
        bulletFlower.addEventListener('click', this.bulletListClick);
        bulletArrow.addEventListener('click', this.bulletListClick);
        bulletTick.addEventListener('click', this.bulletListClick);
        this.target.appendChild(bulletListDiv);
    };
    /**
     * @private
     */
    BulletsAndNumberingDialog.prototype.showNumberBulletDialog = function (listFormat, abstractList) {
        if (!isNullOrUndefined(listFormat)) {
            this.listFormat = listFormat;
        }
        else {
            this.listFormat = new WListFormat();
        }
        if (isNullOrUndefined(this.listFormat.list)) {
            this.listFormat.list = new WList();
        }
        if (!isNullOrUndefined(abstractList)) {
            this.abstractList = abstractList;
        }
        else {
            this.abstractList = new WAbstractList();
        }
        var locale = new L10n('documenteditor', this.owner.owner.defaultLocale);
        locale.setLocale(this.owner.owner.locale);
        if (!this.target) {
            this.initNumberingBulletDialog(locale);
        }
        this.owner.dialog.header = locale.getConstant('Numbering and Bullets');
        this.owner.dialog.width = 'auto';
        this.owner.dialog.height = 'auto';
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = this.loadNumberingBulletDialog;
        this.owner.dialog.close = this.closeNumberingBulletDialog;
        this.owner.dialog.position = { X: 'center', Y: 'center' };
        this.owner.dialog.buttons = [{
                click: this.onOkButtonClick,
                buttonModel: { content: locale.getConstant('Ok'), cssClass: 'e-flat e-numbering-bullet-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: locale.getConstant('Cancel'), cssClass: 'e-flat e-numbering-bullet-cancel' }
            }];
        this.owner.dialog.dataBind();
        this.owner.dialog.show();
        this.tabObj.refresh();
    };
    BulletsAndNumberingDialog.prototype.setActiveElement = function (args) {
        var html = args.currentTarget.parentElement;
        for (var i = 0; i < html.childElementCount; i++) {
            if (html.childNodes[i].classList.contains('e-de-list-active')) {
                html.childNodes[i].classList.remove('e-de-list-active');
            }
        }
        args.currentTarget.classList.add('e-de-list-active');
    };
    /**
     * @private
     */
    BulletsAndNumberingDialog.prototype.unWireEventsAndBindings = function () {
        //Unwire events
    };
    /**
     * @private
     */
    BulletsAndNumberingDialog.prototype.destroy = function () {
        this.owner = undefined;
        if (this.listFormat) {
            this.listFormat.destroy();
            this.listFormat = undefined;
        }
        if (this.tabObj) {
            this.tabObj.destroy();
            this.tabObj = undefined;
        }
        if (this.abstractList) {
            this.abstractList.destroy();
            this.abstractList = undefined;
        }
        if (this.target && this.target.parentElement) {
            this.target.parentElement.removeChild(this.target);
            for (var m = 0; m < this.target.childNodes.length; m++) {
                this.target.removeChild(this.target.childNodes[m]);
                m--;
            }
            this.target = undefined;
        }
        this.bulletListDiv = undefined;
        this.numberListDiv = undefined;
    };
    return BulletsAndNumberingDialog;
}());
export { BulletsAndNumberingDialog };
/* tslint:enable:no-any */ 
