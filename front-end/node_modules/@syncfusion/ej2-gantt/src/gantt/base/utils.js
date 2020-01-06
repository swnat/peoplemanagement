/**
 * Common methods used in Gantt
 */
import { isNullOrUndefined, extend, getValue } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor, WebApiAdaptor, ODataAdaptor } from '@syncfusion/ej2-data';
import { WebMethodAdaptor, CacheAdaptor } from '@syncfusion/ej2-data';
/** @hidden */
export function parentsUntil(elem, selector, isID) {
    var parent = elem;
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            break;
        }
        parent = parent.parentElement;
    }
    return parent;
}
export function isScheduledTask(ganttProp) {
    if (isNullOrUndefined(ganttProp.startDate) && isNullOrUndefined(ganttProp.endDate) &&
        isNullOrUndefined(ganttProp.duration)) {
        return null;
    }
    else if (isNullOrUndefined(ganttProp.startDate) || isNullOrUndefined(ganttProp.endDate) ||
        isNullOrUndefined(ganttProp.duration)) {
        return false;
    }
    else {
        return true;
    }
}
export function getSwapKey(obj) {
    var temp = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        temp[obj[key]] = key;
    }
    return temp;
}
export function isRemoteData(dataSource) {
    if (dataSource instanceof DataManager) {
        var adaptor = dataSource.adaptor;
        return (adaptor instanceof ODataAdaptor ||
            (adaptor instanceof WebApiAdaptor) || (adaptor instanceof WebMethodAdaptor) ||
            (adaptor instanceof CacheAdaptor) || adaptor instanceof UrlAdaptor);
    }
    return false;
}
export function getTaskData(records) {
    var result = [];
    for (var i = 0; i < records.length; i++) {
        var data = extend({}, records[i].taskData, {}, true);
        result.push(data);
    }
    return result;
}
export function formatString(str, args) {
    var regx;
    for (var i = 0; i < args.length; i++) {
        regx = new RegExp('\\{' + (i) + '\\}', 'gm');
        str = str.replace(regx, args[i].toString());
    }
    return str;
}
/* tslint:disable-next-line */
export function getIndex(value, key1, collection, key2) {
    var index = -1;
    for (var i = 0; i < collection.length; i++) {
        if (getValue(key1, collection[i]) === getValue(key1, value) && isNullOrUndefined(key2)
            || (!isNullOrUndefined(key2) && getValue(key1, collection[i]) === getValue(key1, value)
                && getValue(key2, collection[i]) === getValue(key2, value))) {
            index = i;
            break;
        }
    }
    return index;
}
