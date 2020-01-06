import { isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
import { getRecurrenceStringFromDate, generate } from '../../recurrence-editor/date-generator';
import * as events from '../base/constant';
import * as util from '../base/util';
/**
 * Schedule CRUD operations
 */
var Crud = /** @class */ (function () {
    function Crud(parent) {
        this.parent = parent;
    }
    Crud.prototype.getQuery = function () {
        var start = this.parent.activeView.startDate();
        var end = this.parent.activeView.endDate();
        return this.parent.dataModule.generateQuery(start, end);
    };
    Crud.prototype.getTable = function () {
        if (this.parent.eventSettings.query) {
            var query = this.parent.eventSettings.query.clone();
            return query.fromTable;
        }
        return null;
    };
    Crud.prototype.refreshData = function (args) {
        var _this = this;
        var actionArgs = {
            requestType: args.requestType, cancel: false, data: args.data,
            addedRecords: args.editParms.addedRecords, changedRecords: args.editParms.changedRecords,
            deletedRecords: args.editParms.deletedRecords
        };
        if (this.parent.dataModule.dataManager.dataSource.offline) {
            this.parent.trigger(events.actionComplete, actionArgs, function (offlineArgs) {
                if (!offlineArgs.cancel) {
                    _this.parent.renderModule.refreshDataManager();
                }
            });
        }
        else {
            args.promise.then(function (e) {
                if (_this.parent.isDestroyed) {
                    return;
                }
                _this.parent.trigger(events.actionComplete, actionArgs, function (onlineArgs) {
                    if (!onlineArgs.cancel) {
                        _this.parent.renderModule.refreshDataManager();
                    }
                });
            }).catch(function (e) {
                if (_this.parent.isDestroyed) {
                    return;
                }
                _this.parent.trigger(events.actionFailure, { error: e });
            });
        }
    };
    Crud.prototype.addEvent = function (eventData) {
        var _this = this;
        if (this.parent.eventSettings.allowAdding) {
            if (this.parent.eventBase.isBlockRange(eventData)) {
                this.parent.quickPopup.openValidationError('blockAlert', (eventData instanceof Array) ? [eventData] : eventData);
                return;
            }
            var addEvents = (eventData instanceof Array) ? eventData : [eventData];
            var args = {
                requestType: 'eventCreate', cancel: false,
                addedRecords: addEvents, changedRecords: [], deletedRecords: []
            };
            if (!isBlazor()) {
                args.data = addEvents;
            }
            this.parent.trigger(events.actionBegin, args, function (addArgs) {
                _this.serializeData(addArgs.addedRecords);
                if (!addArgs.cancel) {
                    var fields = _this.parent.eventFields;
                    var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
                    var promise = void 0;
                    if (addArgs.addedRecords instanceof Array) {
                        for (var _i = 0, _a = addArgs.addedRecords; _i < _a.length; _i++) {
                            var event_1 = _a[_i];
                            editParms.addedRecords.push(_this.parent.eventBase.processTimezone(event_1, true));
                        }
                        // tslint:disable-next-line:max-line-length
                        promise = _this.parent.dataModule.dataManager.saveChanges(editParms, fields.id, _this.getTable(), _this.getQuery());
                    }
                    else {
                        var event_2 = _this.parent.eventBase.processTimezone(addArgs.addedRecords, true);
                        editParms.addedRecords.push(event_2);
                        promise = _this.parent.dataModule.dataManager.insert(event_2, _this.getTable(), _this.getQuery());
                    }
                    var crudArgs = {
                        requestType: 'eventCreated', cancel: false, data: addArgs.addedRecords, promise: promise, editParms: editParms
                    };
                    _this.refreshData(crudArgs);
                }
            });
        }
    };
    Crud.prototype.saveEvent = function (eventData, action) {
        var _this = this;
        if (this.parent.eventSettings.allowEditing) {
            if (this.parent.eventBase.isBlockRange(eventData)) {
                this.parent.quickPopup.openValidationError('blockAlert', (eventData instanceof Array) ? [eventData] : eventData);
                return;
            }
            this.parent.currentAction = action;
            if (action) {
                switch (action) {
                    case 'EditOccurrence':
                        this.processOccurrences(eventData, action);
                        break;
                    case 'EditFollowingEvents':
                        this.processFollowSeries(eventData, action);
                        break;
                    case 'EditSeries':
                        this.processEntireSeries(eventData, action);
                        break;
                }
            }
            else {
                var updateEvents = (eventData instanceof Array) ? eventData : [eventData];
                var args = {
                    requestType: 'eventChange', cancel: false,
                    addedRecords: [], changedRecords: updateEvents, deletedRecords: []
                };
                if (!isBlazor()) {
                    args.data = eventData;
                }
                this.parent.trigger(events.actionBegin, args, function (saveArgs) {
                    _this.serializeData(saveArgs.changedRecords);
                    if (!saveArgs.cancel) {
                        var promise = void 0;
                        var fields = _this.parent.eventFields;
                        var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
                        if (saveArgs.changedRecords instanceof Array) {
                            for (var _i = 0, _a = saveArgs.changedRecords; _i < _a.length; _i++) {
                                var event_3 = _a[_i];
                                editParms.changedRecords.push(_this.parent.eventBase.processTimezone(event_3, true));
                            }
                            // tslint:disable-next-line:max-line-length
                            promise = _this.parent.dataModule.dataManager.saveChanges(editParms, fields.id, _this.getTable(), _this.getQuery());
                        }
                        else {
                            var event_4 = _this.parent.eventBase.processTimezone(saveArgs.changedRecords, true);
                            editParms.changedRecords.push(event_4);
                            // tslint:disable-next-line:max-line-length
                            promise = _this.parent.dataModule.dataManager.update(fields.id, event_4, _this.getTable(), _this.getQuery());
                        }
                        var crudArgs = {
                            requestType: 'eventChanged', cancel: false, data: saveArgs.data, promise: promise, editParms: editParms
                        };
                        _this.refreshData(crudArgs);
                    }
                });
            }
        }
    };
    Crud.prototype.deleteEvent = function (eventData, action) {
        var _this = this;
        if (this.parent.eventSettings.allowDeleting) {
            this.parent.currentAction = action;
            var deleteEvents = [];
            if (typeof eventData === 'string' || typeof eventData === 'number') {
                deleteEvents = this.parent.eventsData.filter(function (eventObj) {
                    return eventObj[_this.parent.eventFields.id] === eventData;
                });
            }
            else {
                deleteEvents = (eventData instanceof Array ? eventData : [eventData]);
            }
            if (action) {
                switch (action) {
                    case 'Delete':
                        this.processEventDelete(deleteEvents);
                        break;
                    case 'DeleteOccurrence':
                        this.processOccurrences(deleteEvents, action);
                        break;
                    case 'DeleteFollowingEvents':
                        this.processFollowSeries(deleteEvents, action);
                        break;
                    case 'DeleteSeries':
                        this.processEntireSeries(deleteEvents, action);
                        break;
                }
            }
            else {
                var args = {
                    requestType: 'eventRemove', cancel: false,
                    addedRecords: [], changedRecords: [], deletedRecords: deleteEvents
                };
                if (!isBlazor()) {
                    args.data = eventData;
                }
                this.parent.trigger(events.actionBegin, args, function (deleteArgs) {
                    _this.serializeData(deleteArgs.deletedRecords);
                    if (!deleteArgs.cancel) {
                        var promise = void 0;
                        var fields = _this.parent.eventFields;
                        var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
                        if (deleteArgs.deletedRecords.length > 1) {
                            for (var _i = 0, _a = deleteArgs.deletedRecords; _i < _a.length; _i++) {
                                var eventObj = _a[_i];
                                editParms.deletedRecords.push(eventObj);
                            }
                            // tslint:disable-next-line:max-line-length
                            promise = _this.parent.dataModule.dataManager.saveChanges(editParms, fields.id, _this.getTable(), _this.getQuery());
                        }
                        else {
                            editParms.deletedRecords.push(deleteArgs.deletedRecords[0]);
                            // tslint:disable-next-line:max-line-length
                            promise = _this.parent.dataModule.dataManager.remove(fields.id, deleteArgs.deletedRecords[0], _this.getTable(), _this.getQuery());
                        }
                        _this.parent.eventBase.selectWorkCellByTime(deleteArgs.deletedRecords);
                        var crudArgs = {
                            requestType: 'eventRemoved', cancel: false, data: deleteArgs.data, promise: promise, editParms: editParms
                        };
                        _this.refreshData(crudArgs);
                    }
                });
            }
        }
    };
    Crud.prototype.processOccurrences = function (eventData, action) {
        var _this = this;
        var occurenceData = [];
        if (eventData instanceof Array) {
            for (var _i = 0, eventData_1 = eventData; _i < eventData_1.length; _i++) {
                var event_5 = eventData_1[_i];
                occurenceData.push({ occurrence: event_5, parent: this.getParentEvent(event_5) });
            }
        }
        else {
            occurenceData = { occurrence: eventData, parent: this.getParentEvent(eventData) };
        }
        var updateEvents = (eventData instanceof Array) ? eventData : [eventData];
        var args = {
            requestType: action === 'EditOccurrence' ? 'eventChange' : 'eventRemove', cancel: false,
            addedRecords: [], changedRecords: updateEvents, deletedRecords: []
        };
        if (!isBlazor()) {
            args.data = occurenceData;
        }
        this.parent.trigger(events.actionBegin, args, function (occurenceArgs) {
            _this.serializeData(occurenceArgs.changedRecords);
            if (!occurenceArgs.cancel) {
                var fields = _this.parent.eventFields;
                var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
                var occurrenceEvents = (occurenceData instanceof Array ? occurenceData : [occurenceData]);
                var _loop_1 = function (a, count) {
                    var childEvent = occurenceArgs.changedRecords[a];
                    var parentEvent = occurrenceEvents[a].parent;
                    var parentException = parentEvent[fields.recurrenceException];
                    switch (action) {
                        case 'EditOccurrence':
                            var editedData = _this.parent.eventsProcessed.filter(function (event) { return event.Guid === childEvent.Guid; })[0];
                            var exceptionDate = _this.excludeDateCheck(editedData[fields.startTime], parentException);
                            if (exceptionDate !== parentEvent[fields.recurrenceException]) {
                                parentEvent[fields.recurrenceException] = exceptionDate;
                                childEvent[fields.recurrenceException] = getRecurrenceStringFromDate(editedData[fields.startTime]);
                                childEvent[fields.recurrenceID] = parentEvent[fields.id];
                                childEvent[fields.followingID] = null;
                                editParms.changedRecords.push(_this.parent.eventBase.processTimezone(parentEvent, true));
                                editParms.addedRecords.push(_this.parent.eventBase.processTimezone(childEvent, true));
                            }
                            else {
                                editParms.changedRecords.push(_this.parent.eventBase.processTimezone(childEvent, true));
                            }
                            break;
                        case 'DeleteOccurrence':
                            if (!childEvent[fields.recurrenceException]) {
                                parentEvent[fields.recurrenceException] =
                                    _this.excludeDateCheck(childEvent[fields.startTime], parentException);
                                editParms.changedRecords.push(_this.parent.eventBase.processTimezone(parentEvent, true));
                            }
                            if (childEvent[fields.id] !== parentEvent[fields.id]) {
                                editParms.deletedRecords.push(childEvent);
                            }
                            break;
                    }
                };
                for (var a = 0, count = occurenceArgs.changedRecords.length; a < count; a++) {
                    _loop_1(a, count);
                }
                // tslint:disable-next-line:max-line-length
                var promise = _this.parent.dataModule.dataManager.saveChanges(editParms, fields.id, _this.getTable(), _this.getQuery());
                _this.parent.eventBase.selectWorkCellByTime(occurenceArgs.changedRecords);
                var crudArgs = {
                    requestType: action === 'EditOccurrence' ? 'eventChanged' : 'eventRemoved',
                    cancel: false, data: occurenceArgs.data, promise: promise, editParms: editParms
                };
                _this.refreshData(crudArgs);
            }
        });
    };
    Crud.prototype.processFollowSeries = function (eventData, action) {
        var _this = this;
        var followData = [];
        if (eventData instanceof Array) {
            for (var _i = 0, eventData_2 = eventData; _i < eventData_2.length; _i++) {
                var event_6 = eventData_2[_i];
                followData.push({ occurrence: event_6, parent: this.getParentEvent(event_6) });
            }
        }
        else {
            followData = { occurrence: eventData, parent: this.getParentEvent(eventData) };
        }
        var updateFollowEvents = (eventData instanceof Array) ? eventData : [eventData];
        var args = {
            requestType: action === 'EditFollowingEvents' ? 'eventChange' : 'eventRemove', cancel: false,
            addedRecords: [], changedRecords: updateFollowEvents, deletedRecords: []
        };
        if (!isBlazor()) {
            args.data = followData;
        }
        this.parent.trigger(events.actionBegin, args, function (followArgs) {
            _this.serializeData(followArgs.changedRecords);
            if (!followArgs.cancel) {
                var fields_1 = _this.parent.eventFields;
                var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
                var followEvents = (followData instanceof Array ? followData : [followData]);
                var _loop_2 = function (a, count) {
                    var childEvent = followArgs.changedRecords[a];
                    var parentEvent = followEvents[a].parent;
                    var followData_1 = _this.parent.eventBase.getEventCollections(parentEvent, childEvent);
                    switch (action) {
                        case 'EditFollowingEvents':
                            _this.processRecurrenceRule(parentEvent, childEvent);
                            var isSplitted = !_this.parent.eventBase.isFollowingEvent(parentEvent, childEvent);
                            childEvent[fields_1.followingID] = isSplitted ? null : parentEvent[fields_1.id];
                            childEvent[fields_1.recurrenceID] = null;
                            editParms.addedRecords.push(_this.parent.eventBase.processTimezone(childEvent, true));
                            editParms.changedRecords.push(_this.parent.eventBase.processTimezone(parentEvent, true));
                            if (!_this.parent.uiStateValues.isIgnoreOccurrence) {
                                childEvent[fields_1.recurrenceException] = null;
                                if (followData_1.occurrence.length > 0) {
                                    childEvent[fields_1.recurrenceRule] =
                                        followData_1.occurrence.slice(-1)[0][fields_1.recurrenceRule];
                                }
                                if (followData_1.follow.length > 0) {
                                    childEvent[fields_1.recurrenceRule] =
                                        followData_1.follow.slice(-1)[0][fields_1.recurrenceRule];
                                    editParms.deletedRecords = editParms.deletedRecords.concat(followData_1.follow);
                                }
                                if (isSplitted) {
                                    followData_1.occurrence = followData_1.occurrence.filter(function (eventObj) {
                                        return eventObj[fields_1.recurrenceID] === childEvent[fields_1.id];
                                    });
                                }
                                editParms.deletedRecords = editParms.deletedRecords.concat(followData_1.occurrence);
                            }
                            break;
                        case 'DeleteFollowingEvents':
                            _this.processRecurrenceRule(parentEvent, childEvent[fields_1.startTime]);
                            editParms.changedRecords.push(_this.parent.eventBase.processTimezone(parentEvent, true));
                            editParms.deletedRecords =
                                editParms.deletedRecords.concat(followData_1.occurrence).concat(followData_1.follow);
                            break;
                    }
                };
                for (var a = 0, count = followArgs.changedRecords.length; a < count; a++) {
                    _loop_2(a, count);
                }
                // tslint:disable-next-line:max-line-length
                var promise = _this.parent.dataModule.dataManager.saveChanges(editParms, fields_1.id, _this.getTable(), _this.getQuery());
                _this.parent.eventBase.selectWorkCellByTime(followArgs.changedRecords);
                var crudArgs = {
                    requestType: action === 'EditFollowingEvents' ? 'eventChanged' : 'eventRemoved',
                    cancel: false, data: followArgs.data, promise: promise, editParms: editParms
                };
                _this.refreshData(crudArgs);
            }
        });
    };
    Crud.prototype.processEntireSeries = function (eventData, action) {
        var _this = this;
        var seriesData = [];
        if (eventData instanceof Array) {
            for (var _i = 0, eventData_3 = eventData; _i < eventData_3.length; _i++) {
                var event_7 = eventData_3[_i];
                seriesData.push(this.getParentEvent(event_7, true));
            }
        }
        else {
            seriesData = this.getParentEvent(eventData, true);
        }
        var updateSeriesEvents = (eventData instanceof Array) ? eventData : [eventData];
        var args = {
            requestType: action === 'EditSeries' ? 'eventChange' : 'eventRemove', cancel: false,
            addedRecords: [], changedRecords: updateSeriesEvents, deletedRecords: []
        };
        if (!isBlazor()) {
            args.data = seriesData;
        }
        this.parent.trigger(events.actionBegin, args, function (seriesArgs) {
            _this.serializeData(seriesArgs.changedRecords);
            if (!seriesArgs.cancel) {
                var fields_2 = _this.parent.eventFields;
                var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
                var seriesEvents = (seriesData instanceof Array ? seriesData : [seriesData]);
                var _loop_3 = function (a, count) {
                    var childEvent = seriesArgs.changedRecords[a];
                    var parentEvent = seriesEvents[a];
                    var eventCollections = _this.parent.eventBase.getEventCollections(parentEvent);
                    var deletedEvents = eventCollections.follow.concat(eventCollections.occurrence);
                    switch (action) {
                        case 'EditSeries':
                            childEvent[fields_2.id] = parentEvent[fields_2.id];
                            childEvent[fields_2.recurrenceID] = null;
                            childEvent[fields_2.followingID] = null;
                            if (_this.parent.uiStateValues.isIgnoreOccurrence && childEvent[fields_2.recurrenceException]) {
                                var originalParent = _this.parent.eventsData.filter(function (eventObj) {
                                    return eventObj[fields_2.id] === childEvent[fields_2.id];
                                });
                                if (originalParent.length > 0) {
                                    childEvent[fields_2.recurrenceRule] = originalParent[0][fields_2.recurrenceRule];
                                }
                            }
                            else {
                                childEvent[fields_2.recurrenceException] = null;
                                editParms.deletedRecords = editParms.deletedRecords.concat(deletedEvents);
                            }
                            editParms.changedRecords.push(_this.parent.eventBase.processTimezone(childEvent, true));
                            _this.parent.uiStateValues.isIgnoreOccurrence = false;
                            break;
                        case 'DeleteSeries':
                            editParms.deletedRecords = editParms.deletedRecords.concat(deletedEvents.concat(parentEvent));
                            break;
                    }
                };
                for (var a = 0, count = seriesArgs.changedRecords.length; a < count; a++) {
                    _loop_3(a, count);
                }
                // tslint:disable-next-line:max-line-length
                var promise = _this.parent.dataModule.dataManager.saveChanges(editParms, fields_2.id, _this.getTable(), _this.getQuery());
                _this.parent.eventBase.selectWorkCellByTime(seriesArgs.changedRecords);
                var crudArgs = {
                    requestType: action === 'EditSeries' ? 'eventChanged' : 'eventRemoved',
                    cancel: false, data: seriesArgs.data, promise: promise, editParms: editParms
                };
                _this.refreshData(crudArgs);
            }
        });
    };
    Crud.prototype.processEventDelete = function (eventData) {
        var _this = this;
        var deleteData = [];
        for (var _i = 0, eventData_4 = eventData; _i < eventData_4.length; _i++) {
            var eventObj = eventData_4[_i];
            if (eventObj[this.parent.eventFields.recurrenceRule]) {
                deleteData.push({ occurrence: eventObj, parent: this.getParentEvent(eventObj) });
            }
            else {
                deleteData.push(eventObj);
            }
        }
        var args = {
            requestType: 'eventRemove', cancel: false,
            addedRecords: [], changedRecords: [], deletedRecords: eventData
        };
        if (!isBlazor()) {
            args.data = deleteData;
        }
        this.parent.trigger(events.actionBegin, args, function (deleteArgs) {
            _this.serializeData(deleteArgs.deletedRecords);
            if (!deleteArgs.cancel) {
                var fields_3 = _this.parent.eventFields;
                var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
                var _loop_4 = function (a, count) {
                    var isDelete = isNullOrUndefined(deleteArgs.deletedRecords[a][_this.parent.eventFields.recurrenceRule]);
                    if (!isDelete) {
                        var parentEvent_1 = deleteData[a].parent;
                        var isEdited = editParms.changedRecords.filter(function (obj) {
                            return obj[fields_3.id] === parentEvent_1[fields_3.id];
                        });
                        var editedDate = deleteArgs.deletedRecords[a][fields_3.startTime];
                        if (isEdited.length > 0) {
                            var editedData = isEdited[0];
                            editedData[fields_3.recurrenceException] =
                                _this.excludeDateCheck(editedDate, editedData[fields_3.recurrenceException]);
                        }
                        else {
                            parentEvent_1[fields_3.recurrenceException] =
                                _this.excludeDateCheck(editedDate, parentEvent_1[fields_3.recurrenceException]);
                        }
                        if (isEdited.length === 0) {
                            editParms.changedRecords.push(_this.parent.eventBase.processTimezone(parentEvent_1, true));
                        }
                        isDelete = (deleteArgs.deletedRecords[a][fields_3.id] !== parentEvent_1[fields_3.id]);
                    }
                    if (isDelete) {
                        editParms.deletedRecords.push(deleteArgs.deletedRecords[a]);
                    }
                };
                for (var a = 0, count = deleteArgs.deletedRecords.length; a < count; a++) {
                    _loop_4(a, count);
                }
                // tslint:disable-next-line:max-line-length
                var promise = _this.parent.dataModule.dataManager.saveChanges(editParms, fields_3.id, _this.getTable(), _this.getQuery());
                var crudArgs = {
                    requestType: 'eventRemoved', cancel: false, data: deleteArgs.data, promise: promise, editParms: editParms
                };
                _this.refreshData(crudArgs);
            }
        });
    };
    Crud.prototype.serializeData = function (eventData) {
        if (isBlazor()) {
            var eventFields = this.parent.eventFields;
            for (var _i = 0, _a = eventData; _i < _a.length; _i++) {
                var event_8 = _a[_i];
                event_8[eventFields.startTime] = this.parent.getDateTime(event_8[eventFields.startTime]);
                event_8[eventFields.endTime] = this.parent.getDateTime(event_8[eventFields.endTime]);
            }
        }
    };
    Crud.prototype.getParentEvent = function (event, isParent) {
        if (isParent === void 0) { isParent = false; }
        var parentEvent = this.parent.eventBase.getParentEvent(event, isParent) || event;
        if (parentEvent[this.parent.eventFields.startTimezone] || parentEvent[this.parent.eventFields.endTimezone]) {
            this.parent.eventBase.timezoneConvert(parentEvent);
        }
        return parentEvent;
    };
    Crud.prototype.excludeDateCheck = function (eventStartTime, exceptionDateList) {
        var exDate = getRecurrenceStringFromDate(eventStartTime);
        if (!isNullOrUndefined(exceptionDateList)) {
            if (exceptionDateList.indexOf(exDate) === -1) {
                exceptionDateList = !(isNullOrUndefined(exceptionDateList)) ? exceptionDateList + ',' + exDate : exDate;
            }
        }
        else {
            exceptionDateList = exDate;
        }
        return exceptionDateList;
    };
    Crud.prototype.processRecurrenceRule = function (parentEvent, followEvent) {
        var fields = this.parent.eventFields;
        var recurrenceRule = parentEvent[fields.recurrenceRule];
        var endDate;
        if (followEvent instanceof Date) {
            endDate = new Date(+followEvent);
        }
        else {
            endDate = followEvent[fields.startTime];
            var startDate = parentEvent[fields.startTime];
            var ruleException = followEvent[fields.recurrenceException];
            var dateCollection = generate(startDate, recurrenceRule, ruleException, this.parent.activeViewOptions.firstDayOfWeek);
            var untilDate = new Date(dateCollection.slice(-1)[0]);
            followEvent[fields.recurrenceRule] = this.getUpdatedRecurrenceRule(recurrenceRule, new Date(+untilDate), false);
        }
        parentEvent[fields.recurrenceRule] =
            this.getUpdatedRecurrenceRule(recurrenceRule, util.addDays(new Date(endDate.getTime()), -1), true);
    };
    Crud.prototype.getUpdatedRecurrenceRule = function (recurrenceRule, untilDate, isParent) {
        var splitRule = recurrenceRule.split(';');
        var updatedRule = '';
        for (var _i = 0, splitRule_1 = splitRule; _i < splitRule_1.length; _i++) {
            var rule = splitRule_1[_i];
            if (rule !== '') {
                var ruleKey = rule.split('=')[0];
                var ruleValue = rule.split('=')[1];
                if (ruleKey === 'COUNT' || ruleKey === 'UNTIL') {
                    ruleValue = getRecurrenceStringFromDate(untilDate);
                    rule = rule.replace(rule, 'UNTIL=' + ruleValue);
                }
                updatedRule += rule + ';';
            }
        }
        if (isParent && updatedRule.indexOf('UNTIL') === -1) {
            updatedRule += 'UNTIL=' + getRecurrenceStringFromDate(untilDate);
        }
        return updatedRule;
    };
    return Crud;
}());
export { Crud };
