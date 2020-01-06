import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { getRecurrenceStringFromDate } from '../../recurrence-editor/date-generator';
/**
 * ICalendar Import Module
 */
var ICalendarImport = /** @class */ (function () {
    function ICalendarImport(parent) {
        this.allDay = false;
        this.parent = parent;
    }
    ICalendarImport.prototype.initializeCalendarImport = function (fileContent) {
        var _this = this;
        if (fileContent) {
            var fileReader_1 = new FileReader();
            fileReader_1.onload = function (event) {
                var iCalString = fileReader_1.result;
                _this.iCalendarParser(iCalString);
            };
            fileReader_1.readAsText(fileContent, 'ISO-8859-8');
        }
    };
    ICalendarImport.prototype.iCalendarParser = function (iCalString) {
        var _this = this;
        var fields = this.parent.eventFields;
        var events = [];
        var uId = 'UID';
        var calArray = iCalString.replace(new RegExp('\\r', 'g'), '').split('\n');
        var isEvent = false;
        var curEvent = null;
        var id = this.parent.eventBase.getEventMaxID();
        calArray.forEach(function (element) {
            var index;
            var type;
            var value;
            if (!isEvent && element === 'BEGIN:VEVENT') {
                isEvent = true;
                curEvent = {};
            }
            if (isEvent && element === 'END:VEVENT') {
                isEvent = false;
                events.push(curEvent);
                curEvent = null;
            }
            if (isEvent) {
                index = element.indexOf(':');
                type = element.substr(0, index).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                value = element.substr(index + 1, element.length - (index + 1)).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                if (element.indexOf('SUMMARY') !== -1) {
                    type = 'SUMMARY';
                }
                if (element.indexOf('DTSTART') !== -1) {
                    curEvent[fields.startTime] = _this.dateParsing(element);
                    curEvent[fields.isAllDay] = _this.allDay;
                    _this.allDay = false;
                }
                else if (element.indexOf('DTEND') !== -1) {
                    curEvent[fields.endTime] = _this.dateParsing(element);
                }
                else if (element.indexOf('EXDATE') !== -1) {
                    value = getRecurrenceStringFromDate(_this.dateParsing(element));
                    curEvent[fields.recurrenceException] = (isNullOrUndefined(curEvent[fields.recurrenceException])) ?
                        value : curEvent[fields.recurrenceException] + ',' + value;
                }
                else if (element.indexOf('RECURRENCE-ID') !== -1) {
                    value = getRecurrenceStringFromDate(_this.dateParsing(element));
                    curEvent[fields.recurrenceException] = value;
                    curEvent[fields.recurrenceID] = value;
                }
                else {
                    switch (type) {
                        case 'BEGIN':
                            break;
                        case 'UID':
                            curEvent[uId] = value;
                            curEvent[fields.id] = id++;
                            break;
                        case 'SUMMARY':
                            curEvent[fields.subject] = value;
                            break;
                        case 'LOCATION':
                            curEvent[fields.location] = value;
                            break;
                        case 'DESCRIPTION':
                            curEvent[fields.description] = value;
                            break;
                        case 'RRULE':
                            curEvent[fields.recurrenceRule] = value;
                            break;
                        default:
                            curEvent[type] = value;
                    }
                }
            }
        });
        var app = extend([], events, null, true);
        this.parent.addEvent(this.processOccurrence(app));
    };
    ICalendarImport.prototype.processOccurrence = function (app) {
        var appoint = [];
        var uId = 'UID';
        var fields = this.parent.eventFields;
        app.forEach(function (eventObj) {
            var parentObj;
            var id;
            if (!eventObj.hasOwnProperty(fields.recurrenceID)) {
                parentObj = eventObj;
                id = eventObj[fields.id];
            }
            var data = (new DataManager({ json: app }).executeLocal(new Query().where('UID', 'equal', eventObj[uId])));
            if (data.length > 1 && isNullOrUndefined(eventObj[fields.recurrenceID])) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].hasOwnProperty(fields.recurrenceID)) {
                        var exdate = data[i][fields.recurrenceID];
                        data[i][fields.recurrenceID] = id;
                        data[i][fields.recurrenceException] = null;
                        parentObj[fields.recurrenceException] = (isNullOrUndefined(parentObj[fields.recurrenceException])) ?
                            exdate : parentObj[fields.recurrenceException] + ',' + exdate;
                        appoint.push(data[i]);
                    }
                }
                appoint.push(parentObj);
            }
            else if (!eventObj.hasOwnProperty(fields.recurrenceID)) {
                appoint.push(eventObj);
            }
        });
        return appoint;
    };
    ICalendarImport.prototype.getDateString = function (value) {
        value = value || '';
        return (value
            .replace(/\\\,/g, ',')
            .replace(/\\\;/g, ';')
            .replace(/\\[nN]/g, '\n')
            .replace(/\\\\/g, '\\'));
    };
    ICalendarImport.prototype.dateParsing = function (element) {
        var expression = /([^':;]+)((?:;(?:[^':;]+)(?:=(?:(?:'[^']*')|(?:[^':;]+))))*):(.*)/;
        var split = (element.match(expression)).slice(1);
        var value = split[split.length - 1];
        var newDate = new Date(this.getDateString(value));
        if (element && element.indexOf('VALUE=DATE') > -1) {
            var data_1 = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
            if (data_1 !== null) {
                newDate = new Date(parseInt(data_1[1], 10), parseInt(data_1[2], 10) - 1, parseInt(data_1[3], 10));
            }
            if (element.indexOf('DTSTART') > -1) {
                this.allDay = true;
            }
        }
        var data = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(value);
        if (data !== null) {
            if (data[7] === 'Z') {
                newDate = new Date(Date.UTC(parseInt(data[1], 10), parseInt(data[2], 10) - 1, parseInt(data[3], 10), parseInt(data[4], 10), parseInt(data[5], 10), parseInt(data[6], 10)));
            }
            else {
                newDate = new Date(parseInt(data[1], 10), parseInt(data[2], 10) - 1, parseInt(data[3], 10), parseInt(data[4], 10), parseInt(data[5], 10), parseInt(data[6], 10));
            }
        }
        return newDate;
    };
    /**
     * Get module name.
     */
    ICalendarImport.prototype.getModuleName = function () {
        return 'iCalendarImport';
    };
    /**
     * To destroy the ICalendarImport.
     * @return {void}
     * @private
     */
    ICalendarImport.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
    };
    return ICalendarImport;
}());
export { ICalendarImport };
