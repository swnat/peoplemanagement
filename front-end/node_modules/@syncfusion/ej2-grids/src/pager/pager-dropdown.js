import { createElement, remove } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * `PagerDropDown` module handles selected pageSize from DropDownList.
 */
var PagerDropDown = /** @class */ (function () {
    /**
     * Constructor for pager module
     * @hidden
     */
    function PagerDropDown(pagerModule) {
        this.pagerModule = pagerModule;
    }
    /**
     * For internal use only - Get the module name.
     * @private
     * @hidden
     */
    PagerDropDown.prototype.getModuleName = function () {
        return 'pagerdropdown';
    };
    /**
     * The function is used to render pager dropdown
     * @hidden
     */
    PagerDropDown.prototype.render = function () {
        var pagerObj = this.pagerModule;
        this.pagerDropDownDiv = createElement('div', { className: 'e-pagesizes' });
        var dropDownDiv = createElement('div', { className: 'e-pagerdropdown' });
        var defaultTextDiv = createElement('div', { className: 'e-pagerconstant' });
        var input = createElement('input', { attrs: { type: 'text', tabindex: '1' } });
        this.pagerCons = createElement('span', { className: 'e-constant', innerHTML: this.pagerModule.getLocalizedLabel('pagerDropDown') });
        dropDownDiv.appendChild(input);
        defaultTextDiv.appendChild(this.pagerCons);
        this.pagerDropDownDiv.appendChild(dropDownDiv);
        this.pagerDropDownDiv.appendChild(defaultTextDiv);
        this.pagerModule.element.appendChild(this.pagerDropDownDiv);
        var pageSizesModule = this.pagerModule.pageSizes;
        var pageSizesArray = (pageSizesModule.length ? this.convertValue(pageSizesModule) :
            [this.pagerModule.getLocalizedLabel('All'), '5', '10', '12', '20']);
        var defaultValue = this.pagerModule.pageSize;
        this.dropDownListObject = new DropDownList({
            dataSource: pageSizesArray,
            value: defaultValue.toString(),
            change: this.onChange.bind(this),
            cssClass: 'e-alldrop'
        });
        this.dropDownListObject.appendTo(input);
        if (pageSizesModule.length) {
            this.dropDownListObject.element.value = this.pagerModule.pageSize.toString();
        }
        pagerObj.pageSize = defaultValue;
        pagerObj.dataBind();
        pagerObj.trigger('dropDownChanged', { pageSize: defaultValue });
        this.addEventListener();
    };
    /**
     * For internal use only - Get the pagesize.
     * @private
     * @hidden
     */
    PagerDropDown.prototype.onChange = function (e) {
        if (this.dropDownListObject.value === this.pagerModule.getLocalizedLabel('All')) {
            this.pagerModule.pageSize = this.pagerModule.totalRecordsCount;
            this.pagerCons.innerHTML = this.pagerModule.getLocalizedLabel('pagerAllDropDown');
            e.value = this.pagerModule.pageSize;
            if (document.getElementsByClassName('e-popup-open e-alldrop').length) {
                document.getElementsByClassName('e-popup-open e-alldrop')[0].style.display = 'none';
            }
        }
        else {
            this.pagerModule.pageSize = parseInt(this.dropDownListObject.value, 10);
            if (this.pagerCons.innerHTML !== this.pagerModule.getLocalizedLabel('pagerDropDown')) {
                this.pagerCons.innerHTML = this.pagerModule.getLocalizedLabel('pagerDropDown');
            }
        }
        this.pagerModule.dataBind();
        this.pagerModule.trigger('dropDownChanged', { pageSize: parseInt(this.dropDownListObject.value, 10) });
    };
    PagerDropDown.prototype.beforeValueChange = function (prop) {
        if (typeof prop.newProp.value === 'number') {
            var val = prop.newProp.value.toString();
            prop.newProp.value = val;
        }
    };
    PagerDropDown.prototype.convertValue = function (pageSizeValue) {
        var item = pageSizeValue;
        for (var i = 0; i < item.length; i++) {
            item[i] = typeof item[i] === 'number' ? item[i].toString() : item[i];
        }
        return item;
    };
    PagerDropDown.prototype.setDropDownValue = function (prop, value) {
        if (this.dropDownListObject) {
            this.dropDownListObject[prop] = value;
        }
    };
    PagerDropDown.prototype.addEventListener = function () {
        this.dropDownListObject.on('beforeValueChange', this.beforeValueChange, this);
    };
    PagerDropDown.prototype.removeEventListener = function () {
        this.dropDownListObject.off('beforeValueChange', this.beforeValueChange);
    };
    /**
     * To destroy the Pagerdropdown
     * @method destroy
     * @return {void}
     * @hidden
     */
    PagerDropDown.prototype.destroy = function (args) {
        if (this.dropDownListObject && !this.dropDownListObject.isDestroyed) {
            this.removeEventListener();
            this.dropDownListObject.destroy();
            remove(this.pagerDropDownDiv);
        }
    };
    return PagerDropDown;
}());
export { PagerDropDown };
