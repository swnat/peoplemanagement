import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { Browser, isNullOrUndefined, extend, getValue } from '@syncfusion/ej2-base';
import { getZIndexCalcualtion } from '../base/util';
/**
 * `string filterui` render string column.
 * @hidden
 */
var StringFilterUI = /** @class */ (function () {
    function StringFilterUI(parent, serviceLocator, filterSettings) {
        this.parent = parent;
        this.serLocator = serviceLocator;
        this.filterSettings = filterSettings;
    }
    StringFilterUI.prototype.create = function (args) {
        var data;
        var floptr;
        this.instance = this.parent.createElement('input', { className: 'e-flmenu-input', id: 'strui-' + args.column.uid });
        args.target.appendChild(this.instance);
        this.dialogObj = args.dialogObj;
        this.actObj = this.getAutoCompleteOptions(args);
        this.actObj.appendTo(this.instance);
    };
    StringFilterUI.prototype.getAutoCompleteOptions = function (args) {
        var _this = this;
        var isForeignColumn = args.column.isForeignColumn();
        var dataSource = isForeignColumn ? args.column.dataSource : this.parent.dataSource;
        var fields = { value: isForeignColumn ? args.column.foreignKeyValue : args.column.field };
        var autoComplete = new AutoComplete(extend({
            dataSource: dataSource instanceof DataManager ? dataSource : new DataManager(dataSource),
            fields: fields,
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            query: this.parent.query.clone(),
            sortOrder: 'Ascending',
            open: this.openPopup.bind(this),
            cssClass: 'e-popup-flmenu',
            focus: function () {
                _this.actObj.filterType = args.getOptrInstance.getFlOperator();
            },
            autofill: true,
            placeholder: args.localizeText.getConstant('EnterValue'),
            actionComplete: function (e) {
                e.result = e.result.filter(function (obj, index, arr) {
                    return arr.map(function (mapObj) {
                        return (getValue(_this.actObj.fields.value, mapObj));
                    }).indexOf(getValue((_this.actObj.fields.value), obj)) === index;
                });
            }
        }, args.column.filter.params));
        return autoComplete;
    };
    StringFilterUI.prototype.write = function (args) {
        var columns = this.filterSettings.columns;
        if (args.filteredValue !== '' && !isNullOrUndefined(args.filteredValue)) {
            var struiObj = document.querySelector('#strui-' + args.column.uid).ej2_instances[0];
            struiObj.value = args.filteredValue;
        }
    };
    StringFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        var actuiObj = document.querySelector('#strui-' + column.uid).ej2_instances[0];
        if (Browser.isDevice) {
            actuiObj.hidePopup();
            actuiObj.focusOut();
        }
        var filterValue = actuiObj.value;
        if (isNullOrUndefined(filterValue) || filterValue === '') {
            filterValue = null;
        }
        filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', this.parent.filterSettings.enableCaseSensitivity);
    };
    StringFilterUI.prototype.openPopup = function (args) {
        getZIndexCalcualtion(args, this.dialogObj);
    };
    return StringFilterUI;
}());
export { StringFilterUI };
