import { isNullOrUndefined, getValue, setValue } from '@syncfusion/ej2-base';
/**
 *  Date processor is used to handle date of task data.
 */
var DateProcessor = /** @class */ (function () {
    function DateProcessor(parent) {
        this.parent = parent;
    }
    /**
     *
     */
    DateProcessor.prototype.isValidateNonWorkDays = function (ganttProp) {
        return (!isNullOrUndefined(ganttProp) && ganttProp.isAutoSchedule &&
            (!this.parent.includeWeekend || this.parent.totalHolidayDates.length > 0)) ||
            (isNullOrUndefined(ganttProp) && (!this.parent.includeWeekend || this.parent.totalHolidayDates.length > 0));
    };
    /**
     * Method to convert given date value as valid start date
     * @param date
     * @param ganttProp
     * @param validateAsMilestone
     * @private
     */
    DateProcessor.prototype.checkStartDate = function (date, ganttProp, validateAsMilestone) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        var cloneStartDate = new Date(date.getTime());
        var hour = this.getSecondsInDecimal(cloneStartDate);
        validateAsMilestone = isNullOrUndefined(validateAsMilestone) ? !isNullOrUndefined(ganttProp) ?
            ganttProp.isMilestone : false : validateAsMilestone;
        if (hour < this.parent.defaultStartTime) {
            this.setTime(this.parent.defaultStartTime, cloneStartDate);
        }
        else if (hour === this.parent.defaultEndTime && (!ganttProp || !validateAsMilestone)) {
            cloneStartDate.setDate(cloneStartDate.getDate() + 1);
            this.setTime(this.parent.defaultStartTime, cloneStartDate);
        }
        else if (hour > this.parent.defaultEndTime) {
            cloneStartDate.setDate(cloneStartDate.getDate() + 1);
            this.setTime(this.parent.defaultStartTime, cloneStartDate);
        }
        else if (hour > this.parent.defaultStartTime && hour < this.parent.defaultEndTime) {
            for (var index = 0; index < this.parent.workingTimeRanges.length; index++) {
                var value = this.parent.workingTimeRanges[index];
                if (hour >= value.to && (this.parent.workingTimeRanges[index + 1] &&
                    hour < this.parent.workingTimeRanges[index + 1].from)) {
                    // milestone can fall at end any interval time
                    if (hour === value.to && (!ganttProp || !validateAsMilestone)) {
                        this.setTime(this.parent.workingTimeRanges[index + 1].from, cloneStartDate);
                    }
                    else if (hour !== value.to) {
                        this.setTime(this.parent.workingTimeRanges[index + 1].from, cloneStartDate);
                    }
                    break;
                }
            }
        }
        var tStartDate;
        do {
            tStartDate = new Date(cloneStartDate.getTime());
            var holidayLength = this.parent.totalHolidayDates.length;
            // check holidays and weekends
            if (this.isValidateNonWorkDays(ganttProp)) {
                if (!this.parent.includeWeekend) {
                    var tempDate = new Date(cloneStartDate.getTime());
                    cloneStartDate = this.getNextWorkingDay(cloneStartDate);
                    if (tempDate.getTime() !== cloneStartDate.getTime()) {
                        this.setTime(this.parent.defaultStartTime, cloneStartDate);
                    }
                }
                for (var count = 0; count < holidayLength; count++) {
                    var holidayFrom = this.getDateFromFormat(new Date(this.parent.totalHolidayDates[count]));
                    var holidayTo = new Date(holidayFrom.getTime());
                    holidayFrom.setHours(0, 0, 0, 0);
                    holidayTo.setHours(23, 59, 59, 59);
                    if (cloneStartDate.getTime() >= holidayFrom.getTime() && cloneStartDate.getTime() < holidayTo.getTime()) {
                        cloneStartDate.setDate(cloneStartDate.getDate() + 1);
                        this.setTime(this.parent.defaultStartTime, cloneStartDate);
                    }
                }
            }
        } while (tStartDate.getTime() !== cloneStartDate.getTime());
        return new Date(cloneStartDate.getTime());
    };
    /**
     * To update given date value to valid end date
     * @param date
     * @param ganttProp
     * @private
     */
    DateProcessor.prototype.checkEndDate = function (date, ganttProp) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        var cloneEndDate = new Date(date.getTime());
        var hour = this.getSecondsInDecimal(cloneEndDate);
        if (hour > this.parent.defaultEndTime) {
            this.setTime(this.parent.defaultEndTime, cloneEndDate);
        }
        else if (hour <= this.parent.defaultStartTime) {
            cloneEndDate.setDate(cloneEndDate.getDate() - 1);
            this.setTime(this.parent.defaultEndTime, cloneEndDate);
        }
        else if (hour > this.parent.defaultStartTime && hour < this.parent.defaultEndTime) {
            for (var index = 0; index < this.parent.workingTimeRanges.length; index++) {
                var value = this.parent.workingTimeRanges[index];
                if (hour > value.to && (this.parent.workingTimeRanges[index + 1] &&
                    hour <= this.parent.workingTimeRanges[index + 1].from)) {
                    this.setTime(this.parent.workingTimeRanges[index].to, cloneEndDate);
                    break;
                }
            }
        }
        var tempCheckDate;
        do {
            tempCheckDate = new Date(cloneEndDate.getTime());
            var holidayLength = this.parent.totalHolidayDates.length;
            if (this.isValidateNonWorkDays(ganttProp)) {
                if (!this.parent.includeWeekend) {
                    var tempDate = new Date(cloneEndDate.getTime());
                    cloneEndDate = this.getPreviousWorkingDay(cloneEndDate);
                    if (tempDate.getTime() !== cloneEndDate.getTime()) {
                        this.setTime(this.parent.defaultEndTime, cloneEndDate);
                    }
                }
                for (var count = 0; count < holidayLength; count++) {
                    var holidayFrom = this.getDateFromFormat(new Date(this.parent.totalHolidayDates[count]));
                    var holidayTo = new Date(holidayFrom.getTime());
                    var tempHoliday = new Date(cloneEndDate.getTime());
                    tempHoliday.setMinutes(cloneEndDate.getMilliseconds() - 2);
                    holidayFrom.setHours(0, 0, 0, 0);
                    holidayTo.setHours(23, 59, 59, 59);
                    if (cloneEndDate.getTime() >= holidayFrom.getTime() && cloneEndDate.getTime() < holidayTo.getTime() ||
                        tempHoliday.getTime() >= holidayFrom.getTime() && tempHoliday.getTime() < holidayTo.getTime()) {
                        cloneEndDate.setDate(cloneEndDate.getDate() - 1);
                        if (!(cloneEndDate.getTime() === holidayFrom.getTime() && this.parent.defaultEndTime === 86400 &&
                            this.getSecondsInDecimal(cloneEndDate) === 0)) {
                            this.setTime(this.parent.defaultEndTime, cloneEndDate);
                        }
                    }
                }
            }
        } while (tempCheckDate.getTime() !== cloneEndDate.getTime());
        return new Date(cloneEndDate.getTime());
    };
    /**
     * To validate the baseline start date
     * @param date
     * @private
     */
    DateProcessor.prototype.checkBaselineStartDate = function (date) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        else {
            var cloneDate = new Date(date.getTime());
            var hour = this.getSecondsInDecimal(cloneDate);
            if (hour < this.parent.defaultStartTime) {
                this.setTime(this.parent.defaultStartTime, cloneDate);
            }
            else if (hour >= this.parent.defaultEndTime) {
                cloneDate.setDate(cloneDate.getDate() + 1);
                this.setTime(this.parent.defaultStartTime, cloneDate);
            }
            else if (hour > this.parent.defaultStartTime && hour < this.parent.defaultEndTime) {
                for (var i = 0; i < this.parent.workingTimeRanges.length; i++) {
                    var value = this.parent.workingTimeRanges[i];
                    if (hour >= value.to && (this.parent.workingTimeRanges[i + 1] &&
                        hour < this.parent.workingTimeRanges[i + 1].from)) {
                        this.setTime(this.parent.workingTimeRanges[i + 1].from, cloneDate);
                        break;
                    }
                }
            }
            return cloneDate;
        }
    };
    /**
     * To validate baseline end date
     * @param date
     * @private
     */
    DateProcessor.prototype.checkBaselineEndDate = function (date) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        else {
            var cloneDate = new Date(date.getTime());
            var hour = this.getSecondsInDecimal(cloneDate);
            if (hour > this.parent.defaultEndTime) {
                this.setTime(this.parent.defaultEndTime, cloneDate);
            }
            else if (hour <= this.parent.defaultStartTime) {
                cloneDate.setDate(cloneDate.getDate() - 1);
                this.setTime(this.parent.defaultEndTime, cloneDate);
            }
            else if (hour > this.parent.defaultStartTime && hour < this.parent.defaultEndTime) {
                for (var i = 0; i < this.parent.workingTimeRanges.length; i++) {
                    var value = this.parent.workingTimeRanges[i];
                    if (hour > value.to && (this.parent.workingTimeRanges[i + 1] && hour <= this.parent.workingTimeRanges[i + 1].from)) {
                        this.setTime(this.parent.workingTimeRanges[i].to, cloneDate);
                        break;
                    }
                }
            }
            return cloneDate;
        }
    };
    /**
     * To calculate start date value from duration and end date
     * @param ganttData
     * @private
     */
    DateProcessor.prototype.calculateStartDate = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        var tempStartDate = null;
        if (!isNullOrUndefined(ganttProp.endDate) && !isNullOrUndefined(ganttProp.duration)) {
            tempStartDate = this.getStartDate(ganttProp.endDate, ganttProp.duration, ganttProp.durationUnit, ganttProp);
        }
        this.parent.setRecordValue('startDate', tempStartDate, ganttProp, true);
        if (this.parent.taskFields.startDate) {
            this.parent.dataOperation.updateMappingData(ganttData, 'startDate');
        }
    };
    /**
     *
     * @param ganttData
     * @private
     */
    DateProcessor.prototype.calculateEndDate = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        var tempEndDate = null;
        if (!isNullOrUndefined(ganttProp.startDate)) {
            if (!isNullOrUndefined(ganttProp.endDate) && isNullOrUndefined(ganttProp.duration)) {
                if (this.compareDates(ganttProp.startDate, ganttProp.endDate) === 1) {
                    this.parent.setRecordValue('startDate', new Date(ganttProp.endDate.getTime()), ganttProp, true);
                    this.setTime(this.parent.defaultStartTime, ganttProp.startDate);
                }
                this.calculateDuration(ganttData);
            }
            if (!isNullOrUndefined(ganttProp.duration)) {
                tempEndDate = this.getEndDate(ganttProp.startDate, ganttProp.duration, ganttProp.durationUnit, ganttProp, false);
            }
            this.parent.setRecordValue('endDate', tempEndDate, ganttProp, true);
        }
        if (this.parent.taskFields.endDate) {
            this.parent.dataOperation.updateMappingData(ganttData, 'endDate');
        }
    };
    /**
     * To calculate duration from start date and end date
     * @param {IGanttData} ganttData - Defines the gantt data.
     */
    DateProcessor.prototype.calculateDuration = function (ganttData) {
        var ganttProperties = ganttData.ganttProperties;
        var tDuration = this.getDuration(ganttProperties.startDate, ganttProperties.endDate, ganttProperties.durationUnit, ganttProperties.isAutoSchedule, ganttProperties.isMilestone);
        this.parent.setRecordValue('duration', tDuration, ganttProperties, true);
        if (this.parent.taskFields.duration) {
            this.parent.dataOperation.updateMappingData(ganttData, 'duration');
            if (this.parent.taskFields.durationUnit) {
                this.parent.dataOperation.updateMappingData(ganttData, 'durationUnit');
            }
        }
    };
    /**
     *
     * @param sDate Method to get total nonworking time between two date values
     * @param eDate
     * @param isAutoSchedule
     * @param isCheckTimeZone
     */
    DateProcessor.prototype.getNonworkingTime = function (sDate, eDate, isAutoSchedule, isCheckTimeZone) {
        isCheckTimeZone = isNullOrUndefined(isCheckTimeZone) ? true : isCheckTimeZone;
        var timeDiff = this.getTimeDifference(sDate, eDate, isCheckTimeZone) / 1000; // To convert milliseconds to seconds
        var weekendCount = !this.parent.includeWeekend && isAutoSchedule ? this.getWeekendCount(sDate, eDate) : 0;
        var totalHours = this.getNumberOfSeconds(sDate, eDate, isCheckTimeZone);
        var holidaysCount = isAutoSchedule ? this.getHolidaysCount(sDate, eDate) : 0;
        var totWorkDays = (totalHours - (weekendCount * 86400) - (holidaysCount * 86400)) / 86400; // working days between two dates
        var nonWorkHours = this.getNonWorkingSecondsOnDate(sDate, eDate);
        var totalNonWorkTime = (totWorkDays * (86400 - this.parent.secondsPerDay)) +
            (weekendCount * 86400) + (holidaysCount * 86400) + nonWorkHours;
        return totalNonWorkTime;
    };
    /**
     *
     * @param startDate
     * @param endDate
     * @param durationUnit
     * @param isAutoSchedule
     * @param isCheckTimeZone
     * @private
     */
    DateProcessor.prototype.getDuration = function (startDate, endDate, durationUnit, isAutoSchedule, isMilestone, isCheckTimeZone) {
        if (isNullOrUndefined(startDate) || isNullOrUndefined(endDate)) {
            return null;
        }
        isCheckTimeZone = isNullOrUndefined(isCheckTimeZone) ? true : isCheckTimeZone;
        var durationValue = 0;
        var timeDiff = this.getTimeDifference(startDate, endDate, isCheckTimeZone) / 1000;
        var nonWorkHours = this.getNonworkingTime(startDate, endDate, isAutoSchedule, isCheckTimeZone);
        var durationHours = timeDiff - nonWorkHours;
        if (isMilestone && this.parent.getFormatedDate(startDate) === this.parent.getFormatedDate(endDate)) {
            durationValue = 0;
        }
        else {
            if (!durationUnit || durationUnit === 'day') {
                durationValue = durationHours / this.parent.secondsPerDay;
            }
            else if (durationUnit === 'minute') {
                durationValue = durationHours / 60;
            }
            else {
                durationValue = durationHours / 3600;
            }
        }
        return parseFloat(durationValue.toString());
    };
    /**
     *
     * @param duration
     * @param durationUnit
     */
    DateProcessor.prototype.getDurationAsSeconds = function (duration, durationUnit) {
        var value = 0;
        if (!durationUnit || durationUnit === 'day') {
            value = this.parent.secondsPerDay * duration;
        }
        else if (durationUnit === 'hour') {
            value = duration * 3600;
        }
        else {
            value = duration * 60;
        }
        return value;
    };
    /**
     * To get date from start date and duration
     * @param startDate
     * @param duration
     * @param durationUnit
     * @param ganttProp
     * @param validateAsMilestone
     * @private
     */
    DateProcessor.prototype.getEndDate = function (startDate, duration, durationUnit, ganttProp, validateAsMilestone) {
        var tempStart = new Date(startDate.getTime());
        var endDate = new Date(startDate.getTime());
        var secondDuration = this.getDurationAsSeconds(duration, durationUnit);
        var nonWork = 0;
        var workHours = 0;
        while (secondDuration > 0) {
            endDate.setSeconds(endDate.getSeconds() + secondDuration);
            nonWork = this.getNonworkingTime(tempStart, endDate, ganttProp.isAutoSchedule, true);
            workHours = secondDuration - nonWork;
            secondDuration = secondDuration - workHours;
            if (secondDuration > 0) {
                endDate = this.checkStartDate(endDate, ganttProp, validateAsMilestone);
            }
            tempStart = new Date(endDate.getTime());
        }
        return endDate;
    };
    /**
     *
     * @param endDate To calculate start date vale from end date and duration
     * @param duration
     * @param durationUnit
     * @param ganttProp
     * @private
     */
    DateProcessor.prototype.getStartDate = function (endDate, duration, durationUnit, ganttProp) {
        var tempEnd = new Date(endDate.getTime());
        var startDate = new Date(endDate.getTime());
        var secondDuration = this.getDurationAsSeconds(duration, durationUnit);
        var nonWork = 0;
        var workHours = 0;
        while (secondDuration > 0) {
            startDate.setSeconds(startDate.getSeconds() - secondDuration);
            nonWork = this.getNonworkingTime(startDate, tempEnd, ganttProp.isAutoSchedule, true);
            workHours = secondDuration - nonWork;
            secondDuration = secondDuration - workHours;
            if (secondDuration > 0) {
                tempEnd = this.checkEndDate(startDate, ganttProp);
            }
            tempEnd = new Date(startDate.getTime());
        }
        return startDate;
    };
    /**
     * @private
     */
    DateProcessor.prototype.getProjectStartDate = function (ganttProp, isLoad) {
        if (!isNullOrUndefined(this.parent.cloneProjectStartDate)) {
            var cloneStartDate = this.checkStartDate(this.parent.cloneProjectStartDate);
            this.parent.cloneProjectStartDate = cloneStartDate;
            return new Date(cloneStartDate.getTime());
        }
        else if (!isNullOrUndefined(this.parent.projectStartDate)) {
            var cloneStartDate = this.getDateFromFormat(this.parent.projectStartDate);
            this.parent.cloneProjectStartDate = this.checkStartDate(cloneStartDate);
        }
        else if (!isNullOrUndefined(isLoad)) {
            var flatData = this.parent.flatData;
            var minStartDate = void 0;
            if (flatData.length > 0) {
                minStartDate = flatData[0].ganttProperties.startDate;
            }
            else {
                minStartDate = new Date();
                minStartDate.setHours(0, 0, 0, 0);
            }
            for (var index = 1; index < flatData.length; index++) {
                var startDate = flatData[index].ganttProperties.startDate;
                if (!isNullOrUndefined(startDate) && this.compareDates(startDate, minStartDate) === -1) {
                    minStartDate = startDate;
                }
            }
            this.parent.cloneProjectStartDate = this.checkStartDate(minStartDate, ganttProp);
        }
        else {
            return null;
        }
        return new Date(this.parent.cloneProjectStartDate.getTime());
    };
    /**
     * @private
     * @param ganttProp
     */
    DateProcessor.prototype.getValidStartDate = function (ganttProp) {
        var sDate = null;
        if (isNullOrUndefined(ganttProp.startDate)) {
            if (!isNullOrUndefined(ganttProp.endDate)) {
                sDate = new Date(ganttProp.endDate.getTime());
                this.setTime(this.parent.defaultStartTime, sDate);
            }
            else if (!isNullOrUndefined(ganttProp.duration)) {
                sDate = this.getProjectStartDate(ganttProp);
            }
        }
        else {
            sDate = new Date(ganttProp.startDate.getTime());
        }
        return sDate;
    };
    /**
     *
     * @param ganttProp
     * @private
     */
    DateProcessor.prototype.getValidEndDate = function (ganttProp) {
        var eDate = null;
        if (isNullOrUndefined(ganttProp.endDate)) {
            if (!isNullOrUndefined(ganttProp.startDate)) {
                if (ganttProp.isMilestone) {
                    eDate = this.checkStartDate(ganttProp.startDate);
                }
                else {
                    eDate = new Date(ganttProp.startDate.getTime());
                    this.setTime(this.parent.defaultEndTime, eDate);
                }
            }
            else if (!isNullOrUndefined(ganttProp.duration)) {
                var sDate = this.getValidStartDate(ganttProp);
                if (sDate) {
                    eDate = this.getEndDate(sDate, ganttProp.duration, ganttProp.durationUnit, ganttProp, false);
                }
            }
        }
        else {
            eDate = new Date(ganttProp.endDate.getTime());
        }
        return eDate;
    };
    /**
     * @private
     */
    DateProcessor.prototype.getSecondsPerDay = function () {
        var dayWorkingTime = this.parent.dayWorkingTime;
        var length = dayWorkingTime.length;
        var totalSeconds = 0;
        var startDate = new Date('10/11/2018');
        var endDate = new Date('10/12/2018');
        this.parent.nonWorkingHours = [];
        var nonWorkingHours = this.parent.nonWorkingHours;
        this.parent.workingTimeRanges = [];
        var workingTimeRanges = this.parent.workingTimeRanges;
        this.parent.nonWorkingTimeRanges = [];
        var nonWorkingTimeRanges = this.parent.nonWorkingTimeRanges;
        for (var count = 0; count < length; count++) {
            var currentRange = dayWorkingTime[count];
            if (!isNullOrUndefined(currentRange.from) && !isNullOrUndefined(currentRange.to)) {
                startDate.setHours(0, 0, 0, 0);
                var tempDate = new Date(startDate.getTime());
                startDate.setTime(startDate.getTime() + (currentRange.from * 3600000));
                var startHour = new Date(startDate.getTime());
                tempDate.setTime(tempDate.getTime() + (currentRange.to * 3600000));
                var endHour = new Date(tempDate.getTime());
                var timeDiff = endHour.getTime() - startHour.getTime();
                var sdSeconds = this.getSecondsInDecimal(startHour);
                var edSeconds = this.getSecondsInDecimal(endHour);
                if (edSeconds === 0) {
                    edSeconds = 86400;
                }
                totalSeconds += timeDiff / 1000;
                if (count === 0) {
                    this.parent.defaultStartTime = sdSeconds;
                }
                if (count === length - 1) {
                    this.parent.defaultEndTime = edSeconds;
                }
                if (count > 0) {
                    nonWorkingHours.push(nonWorkingHours[nonWorkingHours.length - 1] +
                        sdSeconds - workingTimeRanges[count - 1].to);
                    if (workingTimeRanges[count - 1].to < sdSeconds) {
                        nonWorkingTimeRanges.push({
                            from: workingTimeRanges[count - 1].to, to: sdSeconds, isWorking: false,
                            interval: (sdSeconds - workingTimeRanges[count - 1].to)
                        });
                    }
                }
                else {
                    nonWorkingHours.push(0);
                    nonWorkingTimeRanges.push({ from: 0, to: sdSeconds, isWorking: false, interval: sdSeconds });
                }
                workingTimeRanges.push({ from: sdSeconds, to: edSeconds });
                nonWorkingTimeRanges.push({
                    from: sdSeconds, to: edSeconds, isWorking: true, interval: (edSeconds - sdSeconds)
                });
            }
        }
        if (this.parent.defaultEndTime / 3600 !== 24) {
            nonWorkingTimeRanges.push({
                from: this.parent.defaultEndTime, to: 86400,
                isWorking: false, interval: 86400 - this.parent.defaultEndTime
            });
        }
        return totalSeconds;
    };
    /**
     *
     * @param value
     * @param isFromDialog
     * @private
     */
    DateProcessor.prototype.getDurationValue = function (value, isFromDialog) {
        var durationUnit = null;
        var duration = null;
        if (typeof value === 'string') {
            var values = value.match(/(\d*\.*\d+|.+$)/g);
            if (values && values.length <= 2) {
                duration = parseFloat(values[0].toString().trim());
                var unit = values[1] ? values[1].toString().trim().toLowerCase() : null;
                if (getValue('minute', this.parent.durationUnitEditText).indexOf(unit) !== -1) {
                    durationUnit = 'minute';
                }
                else if (getValue('hour', this.parent.durationUnitEditText).indexOf(unit) !== -1) {
                    durationUnit = 'hour';
                }
                else if (getValue('day', this.parent.durationUnitEditText).indexOf(unit) !== -1) {
                    durationUnit = 'day';
                }
            }
        }
        else {
            duration = value;
            durationUnit = null;
        }
        var output = {
            duration: duration,
            durationUnit: durationUnit
        };
        return output;
    };
    /**
     *
     * @param date
     */
    DateProcessor.prototype.getNextWorkingDay = function (date) {
        var dayIndex = date.getDay();
        if (this.parent.nonWorkingDayIndex.indexOf(dayIndex) !== -1) {
            date.setDate(date.getDate() + 1);
            date = this.getNextWorkingDay(date);
            return date;
        }
        else {
            return date;
        }
    };
    /**
     * get weekend days between two dates without including args dates
     * @param startDate
     * @param endDate
     */
    DateProcessor.prototype.getWeekendCount = function (startDate, endDate) {
        var weekendCount = 0;
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        sDate.setHours(0, 0, 0, 0);
        sDate.setDate(sDate.getDate() + 1);
        eDate.setHours(0, 0, 0, 0);
        while (sDate.getTime() < eDate.getTime()) {
            if (this.parent.nonWorkingDayIndex.indexOf(sDate.getDay()) !== -1) {
                weekendCount += 1;
            }
            sDate.setDate(sDate.getDate() + 1);
        }
        return weekendCount;
    };
    /**
     *
     * @param startDate
     * @param endDate
     * @param isCheckTimeZone
     */
    DateProcessor.prototype.getNumberOfSeconds = function (startDate, endDate, isCheckTimeZone) {
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        var weekendCount = 0;
        var timeDiff = 0;
        sDate.setDate(sDate.getDate() + 1);
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(0, 0, 0, 0);
        if (sDate.getTime() < eDate.getTime()) {
            timeDiff = (this.getTimeDifference(sDate, eDate, isCheckTimeZone)) / 1000;
        }
        if (timeDiff % 86400 !== 0) {
            timeDiff = timeDiff - (timeDiff % 86400) + 86400;
        }
        return timeDiff;
    };
    /**
     *
     * @param startDate
     * @param endDate
     */
    DateProcessor.prototype.getHolidaysCount = function (startDate, endDate) {
        var holidaysCount = 0;
        var holidays = this.parent.totalHolidayDates;
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        sDate.setDate(sDate.getDate() + 1);
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(0, 0, 0, 0);
        if (sDate.getTime() < eDate.getTime()) {
            for (var i = 0; i < holidays.length; i++) {
                var currentHoliday = this.getDateFromFormat(new Date(holidays[i]));
                if (sDate.getTime() <= currentHoliday.getTime() && eDate.getTime() >= currentHoliday.getTime()) {
                    if (!this.parent.includeWeekend && this.parent.nonWorkingDayIndex.indexOf(currentHoliday.getDay()) === -1) {
                        holidaysCount += 1;
                    }
                    else if (this.parent.includeWeekend) {
                        holidaysCount += 1;
                    }
                }
            }
        }
        return holidaysCount;
    };
    /**
     * @private
     */
    DateProcessor.prototype.getHolidayDates = function () {
        var holidays = this.parent.holidays;
        var holidayDates = [];
        for (var i = 0; i < holidays.length; i++) {
            var from = this.getDateFromFormat(holidays[i].from);
            var to = this.getDateFromFormat(holidays[i].to);
            if (isNullOrUndefined(from) && isNullOrUndefined(to)) {
                continue;
            }
            else if (isNullOrUndefined(from) || isNullOrUndefined(to)) {
                var tempDate = from ? from : to;
                tempDate.setHours(0, 0, 0, 0);
                if (holidayDates.indexOf(tempDate.getTime()) === -1) {
                    holidayDates.push(tempDate.getTime());
                }
            }
            else {
                while (from <= to) {
                    from.setHours(0, 0, 0, 0);
                    if (holidayDates.indexOf(from.getTime()) === -1) {
                        holidayDates.push(from.getTime());
                    }
                    from.setDate(from.getDate() + 1);
                }
            }
        }
        return holidayDates;
    };
    /*Check given date is on holidays*/
    DateProcessor.prototype.isOnHolidayOrWeekEnd = function (date, checkWeekEnd) {
        checkWeekEnd = !isNullOrUndefined(checkWeekEnd) ? checkWeekEnd : this.parent.includeWeekend;
        if (!checkWeekEnd && this.parent.nonWorkingDayIndex.indexOf(date.getDay()) !== -1) {
            return true;
        }
        var holidays = this.parent.totalHolidayDates;
        for (var count = 0; count < holidays.length; count++) {
            var holidayFrom = this.getDateFromFormat(new Date(holidays[count]));
            var holidayTo = new Date(holidayFrom.getTime());
            holidayFrom.setHours(0, 0, 0, 0);
            holidayTo.setHours(23, 59, 59, 59);
            if (date.getTime() >= holidayFrom.getTime() && date.getTime() < holidayTo.getTime()) {
                return true;
            }
        }
        return false;
    };
    /**
     * To calculate non working times in given date
     * @param startDate
     * @param endDate
     */
    DateProcessor.prototype.getNonWorkingSecondsOnDate = function (startDate, endDate) {
        var sHour = this.getSecondsInDecimal(startDate);
        var eHour = this.getSecondsInDecimal(endDate);
        var startRangeIndex = -1;
        var endRangeIndex = -1;
        var totNonWrkSecs = 0;
        var startOnHoliday = this.isOnHolidayOrWeekEnd(startDate, null);
        var endOnHoliday = this.isOnHolidayOrWeekEnd(endDate, null);
        for (var i = 0; i < this.parent.nonWorkingTimeRanges.length; i++) {
            var val = this.parent.nonWorkingTimeRanges[i];
            if (sHour >= val.from && sHour <= val.to) {
                startRangeIndex = i;
            }
            if (eHour >= val.from && eHour <= val.to) {
                endRangeIndex = i;
            }
        }
        if (startDate.getDate() !== endDate.getDate() || startDate.getMonth() !== endDate.getMonth() ||
            startDate.getFullYear() !== endDate.getFullYear()) {
            if (!startOnHoliday) {
                for (var i = startRangeIndex; i < this.parent.nonWorkingTimeRanges.length; i++) {
                    if (!this.parent.nonWorkingTimeRanges[i].isWorking) {
                        if (i === startRangeIndex) {
                            totNonWrkSecs += (this.parent.nonWorkingTimeRanges[i].to - sHour);
                        }
                        else {
                            totNonWrkSecs += (this.parent.nonWorkingTimeRanges[i].interval);
                        }
                    }
                }
            }
            else {
                totNonWrkSecs += (86400 - sHour);
            }
            if (!endOnHoliday) {
                for (var i = 0; i <= endRangeIndex; i++) {
                    if (!this.parent.nonWorkingTimeRanges[i].isWorking) {
                        if (i === endRangeIndex) {
                            totNonWrkSecs += (eHour - this.parent.nonWorkingTimeRanges[i].from);
                        }
                        else {
                            totNonWrkSecs += this.parent.nonWorkingTimeRanges[i].interval;
                        }
                    }
                }
            }
            else {
                totNonWrkSecs += eHour;
            }
        }
        else {
            if (startRangeIndex !== endRangeIndex) {
                if (!endOnHoliday) {
                    for (var i = startRangeIndex; i <= endRangeIndex; i++) {
                        if (!this.parent.nonWorkingTimeRanges[i].isWorking) {
                            if (i === startRangeIndex) {
                                totNonWrkSecs += (this.parent.nonWorkingTimeRanges[i].to - sHour);
                            }
                            else if (i === endRangeIndex) {
                                totNonWrkSecs += (eHour - this.parent.nonWorkingTimeRanges[i].from);
                            }
                            else {
                                totNonWrkSecs += this.parent.nonWorkingTimeRanges[i].interval;
                            }
                        }
                    }
                }
                else {
                    totNonWrkSecs += (eHour - sHour);
                }
            }
            else {
                if (!endOnHoliday) {
                    var range = this.parent.nonWorkingTimeRanges[startRangeIndex];
                    if (!range.isWorking) {
                        totNonWrkSecs = eHour - sHour;
                    }
                }
                else {
                    totNonWrkSecs += (eHour - sHour);
                }
            }
        }
        return totNonWrkSecs;
    };
    /**
     *
     * @param date
     */
    DateProcessor.prototype.getPreviousWorkingDay = function (date) {
        var dayIndex = date.getDay();
        var previousIndex = (dayIndex === 0) ? 6 : dayIndex - 1;
        if (this.parent.nonWorkingDayIndex.indexOf(dayIndex) !== -1 || (this.parent.nonWorkingDayIndex.indexOf(previousIndex) !== -1
            && this.parent.defaultEndTime === 86400 && this.getSecondsInDecimal(date) === 0)) {
            date.setDate(date.getDate() - 1);
            if (this.parent.nonWorkingDayIndex.indexOf(date.getDay()) !== -1) {
                date = this.getPreviousWorkingDay(date);
            }
            return date;
        }
        else {
            return date;
        }
    };
    /**
     * To get non-working day indexes.
     * @return {void}
     * @private
     */
    DateProcessor.prototype.getNonWorkingDayIndex = function () {
        var weekDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        var weekDayLength = weekDay.length;
        if (this.parent.workWeek.length === 0) {
            this.parent.workWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        }
        var workWeek = this.parent.workWeek.slice();
        var length = workWeek.length;
        for (var i = 0; i < length; i++) {
            workWeek[i] = workWeek[i].toLowerCase();
        }
        this.parent.nonWorkingDayIndex = [];
        for (var i = 0; i < weekDayLength; i++) {
            if (workWeek.indexOf(weekDay[i]) === -1) {
                this.parent.nonWorkingDayIndex.push(i);
            }
        }
    };
    /**
     *
     * @param seconds
     * @param date
     * @private
     */
    DateProcessor.prototype.setTime = function (seconds, date) {
        /* tslint:disable-next-line:no-any */
        var hour = seconds / 3600;
        hour = parseInt(hour, 10);
        /* tslint:disable-next-line:no-any */
        var min = (seconds - (hour * 3600)) / 60;
        min = parseInt(min, 10);
        var sec = seconds - (hour * 3600) - (min * 60);
        date.setHours(hour, min, sec);
    };
    /**
     *
     */
    DateProcessor.prototype.getTimeDifference = function (startDate, endDate, isCheckTimeZone) {
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        if (isCheckTimeZone) {
            this.updateDateWithTimeZone(sDate, eDate);
        }
        return eDate.getTime() - sDate.getTime();
    };
    /**
     *
     */
    DateProcessor.prototype.updateDateWithTimeZone = function (sDate, eDate) {
        var sTZ = sDate.getTimezoneOffset();
        var eTZ = eDate.getTimezoneOffset();
        var uTZ;
        var uDate;
        if (sTZ !== eTZ) {
            var standardTZ = new Date(new Date().getFullYear(), 0, 1).getTimezoneOffset();
            if (standardTZ !== sTZ) {
                uDate = sDate;
                uTZ = sTZ;
            }
            else if (standardTZ !== eTZ) {
                uDate = eDate;
                uTZ = eTZ;
            }
            if (standardTZ < 0) {
                var tzDiff = standardTZ - uTZ;
                uDate.setTime(uDate.getTime() + (tzDiff * 60 * 1000));
            }
            else if (standardTZ > 0) {
                var tzDiff = uTZ - standardTZ;
                uDate.setTime(uDate.getTime() - (tzDiff * 60 * 1000));
            }
        }
    };
    /**
     *
     * @param date
     */
    DateProcessor.prototype.getSecondsInDecimal = function (date) {
        return (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds() + (date.getMilliseconds() / 1000);
    };
    /**
     * @param date
     * @private
     */
    DateProcessor.prototype.getDateFromFormat = function (date) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        else if (date instanceof Date) {
            return new Date(date.getTime());
        }
        else {
            var dateObject = this.parent.globalize.parseDate(date, { format: this.parent.dateFormat, type: 'dateTime' });
            return isNullOrUndefined(dateObject) && !isNaN(new Date(date).getTime()) ? new Date(date) : dateObject;
        }
    };
    /**
     * @private
     */
    DateProcessor.prototype.compareDates = function (date1, date2) {
        if (!isNullOrUndefined(date1) && !isNullOrUndefined(date2)) {
            return (date1.getTime() > date2.getTime()) ? 1 : (date1.getTime() < date2.getTime()) ? -1 : 0;
        }
        else if (!isNullOrUndefined(date1) && isNullOrUndefined(date2)) {
            return 1;
        }
        else if (isNullOrUndefined(date1) && !isNullOrUndefined(date2)) {
            return -1;
        }
        else {
            return null;
        }
    };
    /**
     *
     * @param duration
     * @param durationUnit
     * @private
     */
    DateProcessor.prototype.getDurationString = function (duration, durationUnit) {
        var value = '';
        if (!isNullOrUndefined(duration)) {
            value += parseFloat(duration.toFixed(2)) + ' ';
            if (!isNullOrUndefined(durationUnit)) {
                var plural = duration !== 1;
                if (durationUnit === 'day') {
                    value += plural ? this.parent.localeObj.getConstant('days') : this.parent.localeObj.getConstant('day');
                }
                else if (durationUnit === 'hour') {
                    value += plural ? this.parent.localeObj.getConstant('hours') : this.parent.localeObj.getConstant('hour');
                }
                else if (durationUnit === 'minute') {
                    value += plural ? this.parent.localeObj.getConstant('minutes') :
                        this.parent.localeObj.getConstant('minute');
                }
            }
        }
        return value;
    };
    /**
     *
     * @param editArgs
     * @private
     */
    DateProcessor.prototype.calculateProjectDates = function (editArgs) {
        var _this = this;
        var projectStartDate = this.parent.timelineModule.isZooming && this.parent.cloneProjectStartDate
            ? this.getDateFromFormat(this.parent.cloneProjectStartDate) : this.getDateFromFormat(this.parent.projectStartDate);
        var projectEndDate = this.parent.timelineModule.isZooming && this.parent.cloneProjectEndDate
            ? this.getDateFromFormat(this.parent.cloneProjectEndDate) : this.getDateFromFormat(this.parent.projectEndDate);
        var minStartDate = null;
        var maxEndDate = null;
        var flatData = this.parent.flatData;
        var taskRange = [];
        var addDateToList = function (date) {
            if (!isNullOrUndefined(date)) {
                taskRange.push(date);
            }
        };
        var sortDates = function (dates) {
            if (dates.length > 0) {
                dates.sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
                minStartDate = new Date(dates[0].getTime());
                maxEndDate = dates.length > 1 ? new Date(dates[dates.length - 1].getTime()) : null;
            }
        };
        if (((!projectStartDate || !projectEndDate) && flatData.length > 0) || editArgs || this.parent.timelineModule.isZoomToFit) {
            flatData.forEach(function (data, index) {
                taskRange = [];
                var task = data.ganttProperties;
                var tempStartDate = _this.getValidStartDate(task);
                var tempEndDate = _this.getValidEndDate(task);
                addDateToList(minStartDate);
                addDateToList(maxEndDate);
                addDateToList(tempStartDate);
                addDateToList(tempEndDate);
                if (_this.parent.renderBaseline) {
                    addDateToList(task.baselineStartDate);
                    addDateToList(task.baselineEndDate);
                }
                if (task.indicators && task.indicators.length > 0) {
                    task.indicators.forEach(function (item, index) {
                        addDateToList(_this.getDateFromFormat(item.date));
                    });
                }
                sortDates(taskRange);
            });
            taskRange = [];
            addDateToList(minStartDate);
            addDateToList(maxEndDate);
            //update schedule dates as per holiday and strip line collection
            if (this.parent.eventMarkers.length > 0) {
                var eventMarkers = this.parent.eventMarkers;
                eventMarkers.forEach(function (marker, index) {
                    addDateToList(_this.getDateFromFormat(marker.day));
                });
            }
            if (this.parent.totalHolidayDates.length > 0) {
                var holidays = this.parent.totalHolidayDates;
                holidays.forEach(function (holiday, index) {
                    addDateToList(new Date(holiday));
                });
            }
            sortDates(taskRange);
            if (!minStartDate || !maxEndDate) {
                minStartDate = isNullOrUndefined(minStartDate) ? this.getDateFromFormat(new Date()) : minStartDate;
                maxEndDate = this.getDateFromFormat(new Date(minStartDate.getTime()));
                maxEndDate.setDate(maxEndDate.getDate() + 20);
            }
        }
        else if ((!projectStartDate || !projectEndDate) && flatData.length === 0) {
            minStartDate = this.getDateFromFormat(new Date());
            maxEndDate = this.getDateFromFormat(new Date(minStartDate.getTime()));
        }
        if (!editArgs) {
            this.parent.cloneProjectStartDate = minStartDate ? minStartDate : new Date(projectStartDate.getTime());
            this.parent.cloneProjectEndDate = maxEndDate ? maxEndDate : new Date(projectEndDate.getTime());
        }
        else {
            setValue('minStartDate', minStartDate, editArgs);
            setValue('maxEndDate', maxEndDate, editArgs);
        }
    };
    return DateProcessor;
}());
export { DateProcessor };
