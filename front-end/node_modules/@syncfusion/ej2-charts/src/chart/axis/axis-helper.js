var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Double } from '../axis/double-axis';
/**
 * Common axis classes
 * @private
 */
var NiceInterval = /** @class */ (function (_super) {
    __extends(NiceInterval, _super);
    function NiceInterval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Method to calculate numeric datetime interval
     */
    NiceInterval.prototype.calculateDateTimeNiceInterval = function (axis, size, start, end, isChart) {
        if (isChart === void 0) { isChart = true; }
        var oneDay = 24 * 60 * 60 * 1000;
        var startDate = new Date(start);
        var endDate = new Date(end);
        //var axisInterval ;
        var totalDays = (Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));
        var interval;
        axis.actualIntervalType = axis.intervalType;
        var type = axis.intervalType;
        switch (type) {
            case 'Years':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                break;
            case 'Quarter':
                interval = this.calculateNumericNiceInterval(axis, (totalDays / 365) * 4, size);
                break;
            case 'Months':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                break;
            case 'Weeks':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 7, size);
                break;
            case 'Days':
                interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                break;
            case 'Hours':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                break;
            case 'Minutes':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                break;
            case 'Seconds':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                break;
            case 'Auto':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Years';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, (totalDays / 365) * 4, size);
                if (interval >= 1 && !isChart) {
                    axis.actualIntervalType = 'Quarter';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Months';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays / 7, size);
                if (interval >= 1 && !isChart) {
                    axis.actualIntervalType = 'Weeks';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Days';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Hours';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Minutes';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                axis.actualIntervalType = 'Seconds';
                return interval;
        }
        return interval;
    };
    /**
     * To get the skeleton for the DateTime axis.
     * @return {string}
     * @private
     */
    NiceInterval.prototype.getSkeleton = function (axis, currentValue, previousValue) {
        var skeleton;
        var intervalType = axis.actualIntervalType;
        if (axis.skeleton) {
            return axis.skeleton;
        }
        if (intervalType === 'Years') {
            skeleton = axis.isChart ? (axis.valueType === 'DateTime' ? 'y' : 'yMMM') : 'y';
        }
        else if (intervalType === 'Quarter') {
            skeleton = 'yMMM';
        }
        else if (intervalType === 'Months') {
            skeleton = axis.isChart ? 'MMMd' : 'MMM';
        }
        else if (intervalType === 'Weeks') {
            skeleton = 'MEd';
        }
        else if (intervalType === 'Days') {
            skeleton = axis.isChart ? this.getDayFormat(axis, currentValue, previousValue) : 'MMMd';
        }
        else if (intervalType === 'Hours') {
            skeleton = axis.isChart ? (axis.valueType === 'DateTime' ? 'Hm' : 'EHm') : 'h';
        }
        else if (intervalType === 'Minutes') {
            skeleton = axis.isChart ? 'Hms' : 'hm';
        }
        else {
            skeleton = axis.isChart ? 'Hms' : 'hms';
        }
        return skeleton;
    };
    /**
     * Get intervalType month format
     * @param currentValue
     * @param previousValue
     */
    NiceInterval.prototype.getMonthFormat = function (currentValue, previousValue) {
        return ((new Date(currentValue).getFullYear() === new Date(previousValue).getFullYear()) ? 'MMM' : 'y MMM');
    };
    /**
     * Get intervalType day label format for the axis
     * @param axis
     * @param currentValue
     * @param previousValue
     */
    NiceInterval.prototype.getDayFormat = function (axis, currentValue, previousValue) {
        return (axis.valueType === 'DateTime' ?
            ((new Date(currentValue).getMonth() !== new Date(previousValue).getMonth()) ? 'MMMd' : 'd') : 'yMd');
    };
    /**
     * Find label format for axis
     * @param axis
     * @param currentValue
     * @param previousValue
     * @private
     */
    NiceInterval.prototype.findCustomFormats = function (axis, currentValue, previousValue) {
        var labelFormat = axis.labelFormat ? axis.labelFormat : '';
        if (axis.isChart && !axis.skeleton && axis.actualIntervalType === 'Months' && !labelFormat) {
            labelFormat = axis.valueType === 'DateTime' ? this.getMonthFormat(currentValue, previousValue) : 'yMMM';
        }
        return labelFormat;
    };
    return NiceInterval;
}(Double));
export { NiceInterval };
