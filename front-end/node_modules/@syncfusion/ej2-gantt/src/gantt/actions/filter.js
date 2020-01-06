import { TreeGrid, Filter as TreeGridFilter } from '@syncfusion/ej2-treegrid';
import { filterAfterOpen, getFilterMenuPostion } from '@syncfusion/ej2-grids';
import { getActualProperties } from '@syncfusion/ej2-grids';
import { getValue, isNullOrUndefined, remove, createElement } from '@syncfusion/ej2-base';
import { TextBox } from '@syncfusion/ej2-inputs';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
/**
 * The Filter module is used to handle filter action.
 */
var Filter = /** @class */ (function () {
    function Filter(gantt) {
        this.parent = gantt;
        TreeGrid.Inject(TreeGridFilter);
        this.parent.treeGrid.allowFiltering = this.parent.allowFiltering;
        this.updateCustomFilters();
        this.parent.treeGrid.filterSettings = getActualProperties(this.parent.filterSettings);
        this.addEventListener();
    }
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    /**
     * Update custom filter for default Gantt columns
     */
    Filter.prototype.updateCustomFilters = function () {
        var settings = this.parent.taskFields;
        for (var i = 0; i < this.parent.ganttColumns.length; i++) {
            var column = this.parent.ganttColumns[i];
            if (((column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit') &&
                (column.field === settings.startDate || column.field === settings.endDate
                    || column.field === settings.baselineStartDate || column.field === settings.baselineEndDate)) ||
                (column.field === settings.duration && column.editType === 'stringedit')) {
                this.initiateFiltering(this.parent.ganttColumns[i]);
            }
        }
    };
    Filter.prototype.updateModel = function () {
        this.parent.filterSettings = this.parent.treeGrid.filterSettings;
    };
    Filter.prototype.addEventListener = function () {
        this.parent.on('updateModel', this.updateModel, this);
        this.parent.on('actionBegin', this.actionBegin, this);
        this.parent.on('actionComplete', this.actionComplete, this);
        this.parent.on('columnMenuOpen', this.columnMenuOpen, this);
    };
    Filter.prototype.initiateFiltering = function (column) {
        var treeColumn = this.parent.getColumnByField(column.field, this.parent.treeGridModule.treeGridColumns);
        column.allowFiltering = column.allowFiltering === false ? false : true;
        if (column.allowFiltering && this.parent.filterSettings.type === 'Menu' && !column.filter) {
            column.filter = { ui: this.getCustomFilterUi(column) };
        }
        if (treeColumn) {
            treeColumn.allowFiltering = column.allowFiltering;
            treeColumn.filter = column.filter;
        }
    };
    /**
     * To get filter menu UI
     * @param column
     */
    Filter.prototype.getCustomFilterUi = function (column) {
        var settings = this.parent.taskFields;
        var filterUI = {};
        if (column.editType === 'datepickeredit' && (column.field === settings.startDate || column.field === settings.endDate
            || column.field === settings.baselineStartDate || column.field === settings.baselineEndDate)) {
            filterUI = this.getDatePickerFilter(column.field);
        }
        else if (column.editType === 'datetimepickeredit' && (column.field === settings.startDate || column.field === settings.endDate
            || column.field === settings.baselineStartDate || column.field === settings.baselineEndDate)) {
            filterUI = this.getDateTimePickerFilter();
        }
        else if (column.field === settings.duration && column.editType === 'stringedit') {
            filterUI = this.getDurationFilter();
        }
        return filterUI;
    };
    Filter.prototype.getDatePickerFilter = function (columnName) {
        var _this = this;
        var parent = this.parent;
        var timeValue = (columnName === parent.taskFields.startDate) || (columnName === parent.taskFields.baselineStartDate)
            ? parent.defaultStartTime : parent.defaultEndTime;
        var dropDateInstance;
        var filterDateUI = {
            create: function (args) {
                var flValInput = createElement('input', { className: 'flm-input' });
                args.target.appendChild(flValInput);
                dropDateInstance = new DatePicker({ placeholder: _this.parent.localeObj.getConstant('enterValue') });
                dropDateInstance.appendTo(flValInput);
            },
            write: function (args) {
                dropDateInstance.value = args.filteredValue;
            },
            read: function (args) {
                if (dropDateInstance.value) {
                    dropDateInstance.value.setSeconds(timeValue);
                }
                args.fltrObj.filterByColumn(args.column.field, args.operator, dropDateInstance.value);
            }
        };
        return filterDateUI;
    };
    Filter.prototype.getDateTimePickerFilter = function () {
        var _this = this;
        var dropInstance;
        var filterDateTimeUI = {
            create: function (args) {
                var flValInput = createElement('input', { className: 'flm-input' });
                args.target.appendChild(flValInput);
                dropInstance = new DateTimePicker({ placeholder: _this.parent.localeObj.getConstant('enterValue') });
                dropInstance.appendTo(flValInput);
            },
            write: function (args) {
                dropInstance.value = args.filteredValue;
            },
            read: function (args) {
                args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance.value);
            }
        };
        return filterDateTimeUI;
    };
    Filter.prototype.getDurationFilter = function () {
        var _this = this;
        var parent = this.parent;
        var textBoxInstance;
        var textValue = '';
        var filterDurationUI = {
            create: function (args) {
                var flValInput = createElement('input', { className: 'e-input' });
                flValInput.setAttribute('placeholder', _this.parent.localeObj.getConstant('enterValue'));
                args.target.appendChild(flValInput);
                textBoxInstance = new TextBox();
                textBoxInstance.appendTo(flValInput);
            },
            write: function (args) {
                textBoxInstance.value = args.filteredValue ? textValue : '';
            },
            read: function (args) {
                var durationObj = _this.parent.dataOperation.getDurationValue(textBoxInstance.value);
                var intVal = getValue('duration', durationObj);
                var unit = getValue('durationUnit', durationObj);
                if (intVal >= 0) {
                    var dayVal = void 0;
                    if (unit === 'minute') {
                        dayVal = (intVal * 60) / parent.secondsPerDay;
                    }
                    else if (unit === 'hour') {
                        dayVal = (intVal * 60 * 60) / parent.secondsPerDay;
                    }
                    else {
                        //Consider it as day unit
                        dayVal = intVal;
                        unit = 'day';
                    }
                    args.fltrObj.filterByColumn(args.column.field, args.operator, dayVal);
                    textValue = _this.parent.dataOperation.getDurationString(intVal, unit);
                }
                else {
                    args.fltrObj.filterByColumn(args.column.field, args.operator, null);
                    textValue = null;
                }
            }
        };
        return filterDurationUI;
    };
    /**
     * Remove filter menu while opening column chooser menu
     * @param args
     */
    Filter.prototype.columnMenuOpen = function (args) {
        if (this.filterMenuElement && this.parent.element.contains(this.filterMenuElement)) {
            remove(this.filterMenuElement);
        }
        this.filterMenuElement = null;
    };
    Filter.prototype.actionBegin = function (args) {
        // ...
    };
    Filter.prototype.actionComplete = function (args) {
        if (args.requestType === filterAfterOpen) {
            this.filterMenuElement = getValue('filterModel.dlgObj.element', args);
            this.updateFilterMenuPosition(this.filterMenuElement, args);
            // To set default values as 'contains' in filter dialog
            var taskID = this.parent.taskFields.id;
            var predecessor = this.parent.taskFields.dependency;
            var resource = this.parent.taskFields.resourceInfo;
            var filterObj = this.parent.treeGrid.grid.filterModule;
            var filterValues = getValue('values', filterObj);
            if ((args.columnName === predecessor && isNullOrUndefined(getValue(predecessor, filterValues)))
                || (args.columnName === resource && isNullOrUndefined(getValue(resource, filterValues)))) {
                var element = this.filterMenuElement.querySelector('.e-dropdownlist');
                var instanceObj = getValue('ej2_instances[0]', element);
                instanceObj.index = 2;
                instanceObj.dataBind();
            }
            else if (args.columnName === taskID && isNullOrUndefined(getValue(taskID, filterValues))) {
                var element = this.filterMenuElement.querySelector('.e-numerictextbox');
                var instanceObj = getValue('ej2_instances[0]', element);
                if (!isNullOrUndefined(instanceObj) && isNullOrUndefined(this.parent.columnByField[args.columnName].format)) {
                    instanceObj.format = 'n';
                }
            }
        }
    };
    Filter.prototype.setPosition = function (li, ul) {
        var gridPos = this.parent.element.getBoundingClientRect();
        var liPos = li.getBoundingClientRect();
        var left = liPos.left - gridPos.left;
        var top = liPos.top - gridPos.top;
        if (gridPos.height < top) {
            top = top - ul.offsetHeight + liPos.height;
        }
        else if (gridPos.height < top + ul.offsetHeight) {
            top = gridPos.height - ul.offsetHeight;
        }
        if (window.innerHeight < ul.offsetHeight + top + gridPos.top) {
            top = window.innerHeight - ul.offsetHeight - gridPos.top;
        }
        left += (this.parent.enableRtl ? -ul.offsetWidth : liPos.width);
        if (gridPos.width <= left + ul.offsetWidth) {
            left -= liPos.width + ul.offsetWidth;
        }
        else if (left < 0) {
            left += ul.offsetWidth + liPos.width;
        }
        ul.style.top = top + 7 + 'px';
        ul.style.left = left + 7 + 'px';
    };
    Filter.prototype.updateFilterMenuPosition = function (element, args) {
        this.parent.element.appendChild(element);
        var targetElement;
        if (this.parent.showColumnMenu) {
            targetElement = document.querySelector('#treeGrid' + this.parent.controlId + '_gridcontrol_colmenu_Filter');
            this.setPosition(targetElement, getValue('filterModel.dlgObj.element', args));
        }
        else {
            targetElement = this.parent.treeGrid.grid.getColumnHeaderByField(args.columnName).querySelector('.e-filtermenudiv');
            getFilterMenuPostion(targetElement, getValue('filterModel.dlgObj', args), this.parent.treeGrid.grid);
        }
    };
    Filter.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('updateModel', this.updateModel);
        this.parent.off('actionBegin', this.actionBegin);
        this.parent.off('actionComplete', this.actionComplete);
        this.parent.off('columnMenuOpen', this.columnMenuOpen);
    };
    /**
     * To destroy module
     */
    Filter.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Filter;
}());
export { Filter };
