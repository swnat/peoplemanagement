import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { axisLabelRender } from '../model/constant';
import { VisibleLabels, Size, measureText, getLabelFormat, Rect, textFormatter, formatValue } from '../utils/helper';
import { valueToCoefficient, Align, getRangePalette, VisibleRange, withInRange, calculateNiceInterval } from '../utils/helper';
/**
 * @private
 * To calculate the overall axis bounds for gauge.
 */
var AxisLayoutPanel = /** @class */ (function () {
    function AxisLayoutPanel(gauge) {
        this.gauge = gauge;
    }
    /**
     * To calculate the axis bounds
     */
    AxisLayoutPanel.prototype.calculateAxesBounds = function () {
        var axis;
        var bounds;
        var pointer;
        this.gauge.nearSizes = [];
        this.gauge.farSizes = [];
        var x;
        var y;
        var width;
        var height;
        var axisPadding = 8;
        var containerRect = this.gauge.containerBounds;
        this.checkThermometer();
        for (var i = 0; i < this.gauge.axes.length; i++) {
            axis = this.gauge.axes[i];
            axis.checkAlign = new Align(i, ((!axis.opposedPosition) ? 'Near' : 'Far'));
            (!axis.opposedPosition) ? this.gauge.nearSizes.push(1) : this.gauge.farSizes.push(1);
            this.calculateLineBounds(axis, i);
            this.calculateTickBounds(axis, i);
            this.calculateLabelBounds(axis, i);
            if (axis.pointers.length > 0) {
                this.calculatePointerBounds(axis, i);
            }
            if (axis.ranges.length > 0) {
                this.calculateRangesBounds(axis, i);
            }
            bounds = axis.labelBounds;
            if (this.gauge.orientation === 'Vertical') {
                x = (!axis.opposedPosition) ? bounds.x - axisPadding : axis.lineBounds.x;
                y = axis.lineBounds.y;
                height = axis.lineBounds.height;
                width = Math.abs((!axis.opposedPosition) ? (axis.lineBounds.x - x) : ((bounds.x + bounds.width + axisPadding) - x));
            }
            else {
                y = (!axis.opposedPosition) ? bounds.y - bounds.height - axisPadding : axis.lineBounds.y;
                x = axis.lineBounds.x;
                width = axis.lineBounds.width;
                height = Math.abs((!axis.opposedPosition) ? Math.abs(axis.lineBounds.y - y) : (bounds.y + axisPadding) - y);
            }
            axis.bounds = new Rect(x, y, width, height);
        }
    };
    /**
     * Calculate axis line bounds
     * @param axis
     * @param axisIndex
     */
    AxisLayoutPanel.prototype.calculateLineBounds = function (axis, axisIndex) {
        var x;
        var y;
        var width;
        var height;
        var index;
        var prevAxis;
        var lineHeight = axis.line.height;
        var orientation = this.gauge.orientation;
        var containerRect = this.gauge.containerBounds;
        lineHeight = (axis.line.width > 0) ? lineHeight : null;
        if (orientation === 'Vertical') {
            y = (isNullOrUndefined(lineHeight)) ? containerRect.y :
                containerRect.y + ((containerRect.height / 2) - (lineHeight / 2));
            width = axis.line.width;
            height = (isNullOrUndefined(lineHeight)) ? containerRect.height : lineHeight;
        }
        else {
            x = (isNullOrUndefined(lineHeight)) ? containerRect.x :
                containerRect.x + ((containerRect.width / 2) - (lineHeight / 2));
            height = axis.line.width;
            width = (isNullOrUndefined(lineHeight)) ? containerRect.width : lineHeight;
        }
        index = this.checkPreviousAxes(axis, axisIndex);
        if (isNullOrUndefined(index)) {
            if (orientation === 'Vertical') {
                x = (!axis.opposedPosition ? containerRect.x : containerRect.x + containerRect.width) + axis.line.offset;
            }
            else {
                y = (!axis.opposedPosition ? containerRect.y : containerRect.y + containerRect.height) + axis.line.offset;
            }
        }
        else {
            prevAxis = this.gauge.axes[index];
            if (orientation === 'Vertical') {
                x = ((!axis.opposedPosition) ? prevAxis.bounds.x : (prevAxis.bounds.x + prevAxis.bounds.width)) + axis.line.offset;
            }
            else {
                y = ((!axis.opposedPosition) ? prevAxis.bounds.y : (prevAxis.bounds.y + prevAxis.bounds.height)) + axis.line.offset;
            }
        }
        axis.lineBounds = new Rect(x, y, width, height);
    };
    /**
     * Calculate axis tick bounds
     * @param axis
     * @param axisIndex
     */
    AxisLayoutPanel.prototype.calculateTickBounds = function (axis, axisIndex) {
        var x;
        var y;
        var width;
        var height;
        var major;
        var minor;
        var min = Math.min(axis.minimum, axis.maximum);
        var max = Math.max(axis.minimum, axis.maximum);
        min = (min === max) ? max - 1 : min;
        var interval = axis.majorTicks.interval;
        var bounds = axis.lineBounds;
        major = axis.majorTicks;
        minor = axis.minorTicks;
        axis.majorInterval = major.interval;
        axis.minorInterval = minor.interval;
        var size = (this.gauge.orientation === 'Vertical' ? bounds.height : bounds.width);
        var lineSize = (this.gauge.orientation === 'Vertical' ? bounds.width : bounds.height) / 2;
        axis.majorInterval = isNullOrUndefined(axis.majorInterval) ? calculateNiceInterval(min, max, size, this.gauge.orientation)
            : major.interval;
        axis.visibleRange = new VisibleRange(min, max, axis.majorInterval, (max - min));
        axis.minorInterval = (isNullOrUndefined(axis.minorInterval)) ? axis.majorInterval / 2 : axis.minorInterval;
        if (this.gauge.orientation === 'Vertical') {
            x = (!axis.opposedPosition ? (bounds.x - lineSize - major.height) : bounds.x + lineSize) + major.offset;
            axis.majorTickBounds = new Rect(x, bounds.y, major.height, bounds.height);
            x = (!axis.opposedPosition ? (bounds.x - lineSize - minor.height) : bounds.x + lineSize) + minor.offset;
            axis.minorTickBounds = new Rect(x, bounds.y, minor.height, bounds.height);
        }
        else {
            y = (!axis.opposedPosition ? (bounds.y - lineSize - major.height) : bounds.y + lineSize) + major.offset;
            axis.majorTickBounds = new Rect(bounds.x, y, bounds.width, major.height);
            y = (!axis.opposedPosition ? (bounds.y - lineSize - minor.height) : bounds.y + lineSize) + minor.offset;
            axis.minorTickBounds = new Rect(bounds.x, y, bounds.width, minor.height);
        }
    };
    /**
     * To Calculate axis label bounds
     * @param axis
     * @param axisIndex
     */
    AxisLayoutPanel.prototype.calculateLabelBounds = function (axis, axisIndex) {
        var x;
        var y;
        var width;
        var height;
        var padding = 5;
        var bounds = axis.majorTickBounds;
        var offset = axis.labelStyle.offset;
        this.calculateVisibleLabels(axis);
        width = axis.maxLabelSize.width;
        height = axis.maxLabelSize.height / 2;
        if (this.gauge.orientation === 'Vertical') {
            x = (!axis.opposedPosition ? (bounds.x - width - padding) : (bounds.x + bounds.width + padding)) + offset;
            y = axis.lineBounds.y;
        }
        else {
            y = (!axis.opposedPosition ? (bounds.y - padding) : ((bounds.y + bounds.height + padding) + height)) + offset;
            x = axis.lineBounds.x;
        }
        axis.labelBounds = new Rect(x, y, width, height);
    };
    /**
     * Calculate pointer bounds
     * @param axis
     * @param axisIndex
     */
    AxisLayoutPanel.prototype.calculatePointerBounds = function (axis, axisIndex) {
        var pointer;
        var actualValue;
        var length;
        var val = [];
        var range = axis.visibleRange;
        var orientation = this.gauge.orientation;
        var bounds;
        var line = axis.lineBounds;
        var label = axis.labelBounds;
        var currentVal;
        var type;
        var markerType;
        var nearX;
        var farX;
        var nearY;
        var farY;
        var minimumValue = Math.min(range.min, range.max);
        var maximumValue = Math.max(range.min, range.max);
        for (var i = 0; i < axis.pointers.length; i++) {
            pointer = axis.pointers[i];
            pointer.currentValue = pointer.value !== null ?
                pointer.value < minimumValue ? minimumValue : pointer.value > maximumValue ? maximumValue : pointer.value
                : minimumValue;
            if (pointer.width > 0 && withInRange(pointer.currentValue, null, null, range.max, range.min, 'pointer')) {
                this['calculate' + pointer.type + 'Bounds'](axisIndex, axis, i, pointer);
            }
        }
    };
    /**
     * Calculate marker pointer bounds
     * @param axisIndex
     * @param axis
     * @param pointerIndex
     * @param pointer
     */
    AxisLayoutPanel.prototype.calculateMarkerBounds = function (axisIndex, axis, pointerIndex, pointer) {
        var x;
        var y;
        var line = axis.lineBounds;
        var offset = pointer.offset;
        var range = axis.visibleRange;
        var placement = pointer.placement;
        var tick = axis.majorTickBounds;
        var label = axis.labelBounds;
        var border = pointer.border.width;
        if (this.gauge.orientation === 'Vertical') {
            x = (!axis.opposedPosition) ? (placement === 'Near') ? label.x : (placement === 'Center') ? tick.x : line.x :
                placement === 'Far' ? label.x + label.width : (placement === 'Center' ? tick.x + tick.width : line.x);
            x = !axis.opposedPosition ? ((pointer.placement === 'Far' ? x + border : x - border) + (offset)) :
                ((pointer.placement === 'Near' ? x - border : x + border) + (offset));
            y = ((valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * line.height) + line.y);
        }
        else {
            y = (!axis.opposedPosition) ? (placement === 'Near') ? label.y - label.height : (placement === 'Center') ? tick.y :
                line.y : (placement === 'Far') ? label.y : (placement === 'Center') ? tick.y + tick.height : line.y;
            y = !axis.opposedPosition ? ((pointer.placement === 'Far' ? y + border : y - border) + (offset)) :
                ((pointer.placement === 'Near' ? y - border : y + border) + (offset));
            x = ((valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * line.width) + line.x);
        }
        pointer.bounds = new Rect(x, y, pointer.width, pointer.height);
    };
    /**
     * Calculate bar pointer bounds
     * @param axisIndex
     * @param axis
     * @param pointerIndex
     * @param pointer
     */
    AxisLayoutPanel.prototype.calculateBarBounds = function (axisIndex, axis, pointerIndex, pointer) {
        var x1;
        var x2;
        var y1;
        var y2;
        var height;
        var width;
        var line = axis.lineBounds;
        var padding = 10;
        var range = axis.visibleRange;
        var orientation = this.gauge.orientation;
        var offset = pointer.offset;
        var container = this.gauge.containerBounds;
        if (orientation === 'Vertical') {
            x1 = (container.width > 0) ? container.x + ((container.width / 2) - (pointer.width / 2)) :
                (!axis.opposedPosition) ? (line.x + padding) : (line.x - pointer.width - padding);
            x1 += (offset);
            y1 = ((valueToCoefficient(pointer.currentValue, axis, orientation, range) * line.height) + line.y);
            y2 = ((valueToCoefficient(range.min, axis, orientation, range) * line.height) + line.y);
            height = Math.abs(y2 - y1);
            y1 = (!axis.isInversed) ? y1 : y2;
            width = pointer.width;
        }
        else {
            x1 = ((valueToCoefficient(range.min, axis, orientation, range) * line.width) + line.x);
            y1 = (container.height > 0) ? (container.y + (container.height / 2) - (pointer.height) / 2) :
                (!axis.opposedPosition) ? (line.y + padding) : (line.y - pointer.height - padding);
            y1 += (offset);
            height = pointer.height;
            x2 = ((valueToCoefficient(pointer.currentValue, axis, orientation, range) * line.width) + line.x);
            width = Math.abs(x2 - x1);
            x1 = (!axis.isInversed) ? x1 : x2;
        }
        pointer.bounds = new Rect(x1, y1, width, height);
    };
    /**
     * Calculate ranges bounds
     * @param axis
     * @param axisIndex
     */
    AxisLayoutPanel.prototype.calculateRangesBounds = function (axis, axisIndex) {
        var range;
        var start;
        var end;
        var line = axis.lineBounds;
        var visibleRange = axis.visibleRange;
        var orientation = this.gauge.orientation;
        var startVal;
        var endVal;
        var pointX;
        var pointY;
        var width;
        var height;
        var position;
        var startWidth;
        var endWidth;
        var colors;
        for (var i = 0; i < axis.ranges.length; i++) {
            range = axis.ranges[i];
            if (withInRange(null, range.start, range.end, visibleRange.max, visibleRange.min, 'range')) {
                start = Math.min(range.start, range.end);
                end = Math.max(range.start, range.end);
                position = range.position;
                startWidth = range.startWidth;
                endWidth = range.endWidth;
                colors = this.gauge.rangePalettes.length ? this.gauge.rangePalettes : getRangePalette();
                range.interior = range.color ? range.color : colors[i % colors.length];
                if (this.gauge.orientation === 'Vertical') {
                    pointX = line.x + (range.offset);
                    pointY = (valueToCoefficient(end, axis, orientation, visibleRange) * line.height) + line.y;
                    height = (valueToCoefficient(start, axis, orientation, visibleRange) * line.height) + line.y;
                    height -= pointY;
                    startVal = !axis.opposedPosition ? position === 'Inside' ? (pointX + startWidth) : (pointX - startWidth)
                        : position === 'Inside' ? (pointX - startWidth) : (pointX + startWidth);
                    endVal = !axis.opposedPosition ? position === 'Inside' ? (pointX + endWidth) : (pointX - endWidth) :
                        position === 'Inside' ? (pointX - endWidth) : (pointX + endWidth);
                    range.path = 'M' + pointX + ' ' + pointY + ' L ' + pointX + ' ' + (pointY + height) +
                        ' L ' + startVal + ' ' + (pointY + height) + ' L ' + endVal + ' ' + pointY +
                        ' L ' + pointX + ' ' + pointY + ' z ';
                }
                else {
                    pointX = (valueToCoefficient(end, axis, orientation, visibleRange) * line.width) + line.x;
                    pointY = axis.lineBounds.y + (range.offset);
                    width = (valueToCoefficient(start, axis, orientation, visibleRange) * line.width) + line.x;
                    width = pointX - width;
                    startVal = !axis.opposedPosition ? position === 'Inside' ? (pointY + startWidth) :
                        (pointY - startWidth) : (position === 'Inside') ? (pointY - startWidth) :
                        (pointY + startWidth);
                    endVal = !axis.opposedPosition ? position === 'Inside' ? (pointY + endWidth) : (pointY - endWidth) :
                        (position === 'Inside') ? (pointY - endWidth) : (pointY + endWidth);
                    range.path = 'M' + pointX + ' ' + pointY + ' L ' + (pointX - width) + ' ' + pointY +
                        ' L ' + (pointX - width) + ' ' + startVal + ' L ' + pointX + ' ' + endVal +
                        ' L ' + pointX + ' ' + pointY + ' z ';
                }
            }
        }
    };
    AxisLayoutPanel.prototype.checkPreviousAxes = function (currentAxis, axisIndex) {
        var index = axisIndex - 1;
        var prevAxis;
        var isPositive = (index >= 0) ? true : false;
        if (isPositive) {
            prevAxis = this.gauge.axes[index];
            index = (prevAxis.checkAlign.align === currentAxis.checkAlign.align) ? index : this.checkPreviousAxes(currentAxis, index);
        }
        else {
            index = null;
        }
        return index;
    };
    /**
     *
     * @param axis To calculate the visible labels
     */
    AxisLayoutPanel.prototype.calculateVisibleLabels = function (axis) {
        axis.visibleLabels = [];
        var min = axis.visibleRange.min;
        var max = axis.visibleRange.max;
        var interval = axis.visibleRange.interval;
        var format;
        var argsData;
        var style = axis.labelStyle;
        var text;
        var labelSize;
        var customLabelFormat = style.format && style.format.match('{value}') !== null;
        format = this.gauge.intl.getNumberFormat({
            format: getLabelFormat(style.format), useGrouping: this.gauge.useGroupingSeparator
        });
        var _loop_1 = function (i) {
            argsData = {
                cancel: false, name: axisLabelRender, axis: axis,
                text: customLabelFormat ? textFormatter(style.format, { value: i }, this_1.gauge) :
                    formatValue(i, this_1.gauge).toString(),
                value: i
            };
            this_1.gauge.trigger('axisLabelRender', argsData, function (argsData) {
                labelSize = measureText(argsData.text, axis.labelStyle.font);
                if (!argsData.cancel) {
                    axis.visibleLabels.push(new VisibleLabels(argsData.text, i, labelSize));
                }
            });
        };
        var this_1 = this;
        for (var i = min; (i <= max && interval > 0); i += interval) {
            _loop_1(i);
        }
        this.getMaxLabelWidth(this.gauge, axis);
    };
    /**
     * Calculate maximum label width for the axis.
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.getMaxLabelWidth = function (gauge, axis) {
        axis.maxLabelSize = new Size(0, 0);
        var label;
        for (var i = 0; i < axis.visibleLabels.length; i++) {
            label = axis.visibleLabels[i];
            label.size = measureText(label.text, axis.labelStyle.font);
            if (label.size.width > axis.maxLabelSize.width) {
                axis.maxLabelSize.width = label.size.width;
            }
            if (label.size.height > axis.maxLabelSize.height) {
                axis.maxLabelSize.height = label.size.height;
            }
        }
    };
    AxisLayoutPanel.prototype.checkThermometer = function () {
        if (this.gauge.container.type === 'Thermometer') {
            this.gauge.axes.map(function (axis, index) {
                if (axis.isInversed) {
                    axis.pointers.map(function (pointer, index) {
                        if (pointer.type === 'Bar') {
                            axis.isInversed = false;
                        }
                    });
                }
            });
        }
    };
    return AxisLayoutPanel;
}());
export { AxisLayoutPanel };
