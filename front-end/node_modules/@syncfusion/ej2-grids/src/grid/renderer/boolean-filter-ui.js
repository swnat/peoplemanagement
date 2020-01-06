import { getZIndexCalcualtion } from '../base/util';
import { Query, DataManager, DataUtil } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
/**
 * `boolfilterui` render boolean column.
 * @hidden
 */
var BooleanFilterUI = /** @class */ (function () {
    function BooleanFilterUI(parent, serviceLocator, filterSettings) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.filterSettings = filterSettings;
    }
    BooleanFilterUI.prototype.create = function (args) {
        var isForeignColumn = args.column.isForeignColumn();
        var dataSource = isForeignColumn ? args.column.dataSource : this.parent.dataSource;
        var fields = isForeignColumn ? args.column.foreignKeyValue : args.column.field;
        this.elem = this.parent.createElement('input', { className: 'e-flmenu-input', id: 'bool-ui-' + args.column.uid });
        args.target.appendChild(this.elem);
        this.dialogObj = args.dialogObj;
        this.dropInstance = new DropDownList(extend({
            dataSource: dataSource instanceof DataManager ?
                dataSource : new DataManager(dataSource),
            query: new Query().select(fields),
            fields: { text: fields, value: fields },
            placeholder: args.localizeText.getConstant('SelectValue'),
            cssClass: 'e-popup-flmenu',
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            open: this.openPopup.bind(this),
            actionComplete: function (e) {
                e.result = DataUtil.distinct(e.result, fields, true);
            }
        }, args.column.filter.params));
        this.dropInstance.appendTo(this.elem);
    };
    BooleanFilterUI.prototype.write = function (args) {
        var drpuiObj = document.querySelector('#bool-ui-' + args.column.uid).ej2_instances[0];
        if (!isNullOrUndefined(args.filteredValue)) {
            drpuiObj.text = args.filteredValue;
        }
    };
    BooleanFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        var drpuiObj = document.querySelector('#bool-ui-' + column.uid).ej2_instances[0];
        var filterValue = drpuiObj.value;
        filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', false);
    };
    BooleanFilterUI.prototype.openPopup = function (args) {
        getZIndexCalcualtion(args, this.dialogObj);
    };
    return BooleanFilterUI;
}());
export { BooleanFilterUI };
