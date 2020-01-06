import { getLocationFromAngle, PathOption, stringToNumber, TextOption, textElement, appendPath, toPixel } from '../utils/helper';
import { getAngleFromValue, isCompleteAngle, getPathArc, getRoundedPathArc, getRangeColor } from '../utils/helper';
import { getRangePalette } from '../model/theme';
/**
 * Specifies the Axis rendering for circular gauge
 */
var AxisRenderer = /** @class */ (function () {
    /**
     * Constructor for axis renderer.
     * @private.
     */
    function AxisRenderer(gauge) {
        this.gauge = gauge;
    }
    /**
     * Method to render the axis element of the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisOuterLine = function (axis, index, element, gauge) {
        var background = axis.background;
        this.setRangeColor(axis);
        if (background !== null) {
            appendPath(new PathOption(gauge.element.id + '_AxisOuterLine_' + index, background, 0, 'transparent', null, '0', getPathArc(gauge.midPoint, 0, 360, (Math.min(axis.rect.width, axis.rect.height) / 2)), '', 'pointer-events:none;'), element, gauge);
        }
    };
    /**
     * Method to render the axis line of the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisLine = function (axis, index, element, gauge) {
        var startAngle = axis.startAngle;
        var endAngle = axis.endAngle;
        var color = axis.lineStyle.color || this.gauge.themeStyle.lineColor;
        if (axis.lineStyle.width > 0) {
            startAngle = !isCompleteAngle(startAngle, endAngle) ? startAngle : [0, endAngle = 360][0];
            appendPath(new PathOption(gauge.element.id + '_AxisLine_' + index, 'transparent', axis.lineStyle.width, color, null, axis.lineStyle.dashArray, getPathArc(gauge.midPoint, startAngle - 90, endAngle - 90, axis.currentRadius), '', 'pointer-events:none;'), element, gauge);
        }
    };
    /**
     * Method to render the axis labels of the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisLabels = function (axis, index, element, gauge) {
        var labelElement = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_Labels_' + index
        });
        var min = axis.visibleRange.min;
        var max = axis.visibleRange.max;
        var labelCollection = axis.visibleLabels;
        var location;
        var textWidth;
        var textHeight;
        var labelsVisible = true;
        var currentTextWidth;
        var currentTextHeight;
        var previousLocation;
        var currentLocation;
        var lastLabelLocation;
        var lastLabelAngle;
        var lastLabelAnchor;
        var lastTextWidth;
        var lastTextHeight;
        var style = axis.labelStyle;
        var anchor;
        var angle;
        var label;
        var radius = axis.currentRadius;
        var labelPadding = 10;
        var color = style.font.color || this.gauge.themeStyle.labelColor;
        if (style.position === 'Outside') {
            radius += (axis.nearSize - (axis.maxLabelSize.height + axis.lineStyle.width / 2)) + (labelPadding / 2);
        }
        else {
            radius -= (axis.farSize - (axis.maxLabelSize.height + axis.lineStyle.width / 2) + (style.autoAngle ? labelPadding : 0));
        }
        //To get and store lastlabelposition
        if (axis.hideIntersectingLabel) {
            lastLabelAngle = Math.round(getAngleFromValue(labelCollection[labelCollection.length - 1].value, max, min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise'));
            lastLabelLocation = getLocationFromAngle(lastLabelAngle, radius, gauge.midPoint);
            lastLabelAnchor = this.findAnchor(lastLabelLocation, style, lastLabelAngle, labelCollection[labelCollection.length - 1]);
            lastTextWidth = (!axis.showLastLabel && (isCompleteAngle(axis.startAngle, axis.endAngle)) && (style.hiddenLabel !== 'First')) ?
                labelCollection[0].size.width : labelCollection[labelCollection.length - 1].size.width;
            lastTextHeight = (!axis.showLastLabel && (isCompleteAngle(axis.startAngle, axis.endAngle)) && (style.hiddenLabel !== 'First')) ?
                (!style.autoAngle ? labelCollection[0].size.height : labelCollection[0].size.width) :
                (!style.autoAngle ? labelCollection[labelCollection.length - 1].size.height :
                    labelCollection[labelCollection.length - 1].size.width);
            lastTextHeight = lastTextHeight - this.offsetAxisLabelsize(lastLabelAngle, lastTextHeight);
            lastLabelLocation = this.getAxisLabelStartPosition(lastLabelLocation, lastTextWidth, style, lastTextHeight, lastLabelAnchor, lastLabelAngle);
        }
        for (var i = 0, length_1 = labelCollection.length; i < length_1; i++) {
            label = labelCollection[i];
            angle = Math.round(getAngleFromValue(label.value, max, min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise'));
            location = getLocationFromAngle(angle, radius, gauge.midPoint);
            anchor = this.findAnchor(location, style, angle, label);
            //To get the current label and previous label position for initial stage
            if (axis.hideIntersectingLabel) {
                currentLocation = getLocationFromAngle(angle, radius, gauge.midPoint);
                currentTextWidth = label.size.width;
                currentTextHeight = !style.autoAngle ? label.size.height : currentTextWidth;
                currentTextHeight = currentTextHeight - this.offsetAxisLabelsize(angle, currentTextHeight);
                currentLocation = this.getAxisLabelStartPosition(currentLocation, currentTextWidth, style, currentTextHeight, anchor, angle);
                if (i === 0) {
                    previousLocation = getLocationFromAngle(angle, radius, gauge.midPoint);
                    textWidth = label.size.width;
                    textHeight = !style.autoAngle ? label.size.height : textWidth;
                    textHeight = textHeight - this.offsetAxisLabelsize(angle, textHeight);
                    previousLocation = this.getAxisLabelStartPosition(previousLocation, textWidth, style, textHeight, anchor, angle);
                }
            }
            if ((i === 0 && style.hiddenLabel === 'First') || (i === (length_1 - 1) && style.hiddenLabel === 'Last')) {
                continue;
            }
            style.font.fontFamily = this.gauge.themeStyle.labelFontFamily || style.font.fontFamily;
            if (axis.hideIntersectingLabel && (i !== 0)) {
                //To remove the labels which is intersecting with last label.
                var lastlabel = ((i !== (labelCollection.length - 1)) && ((isCompleteAngle(axis.startAngle, axis.endAngle) ||
                    axis.showLastLabel))) ? this.FindAxisLabelCollision(lastLabelLocation, lastTextWidth, lastTextHeight, currentLocation, currentTextWidth, currentTextHeight) : true;
                //Checking wether the axis label is intersecting with previous label or not.
                labelsVisible = (this.FindAxisLabelCollision(previousLocation, textWidth, textHeight, currentLocation, currentTextWidth, currentTextHeight) && lastlabel);
            }
            else {
                labelsVisible = true;
            }
            if (labelsVisible || (i === labelCollection.length - 1)) {
                //To hide first and last label based on requirement
                label.text = (!axis.showLastLabel && ((isCompleteAngle(axis.startAngle, axis.endAngle) && style.hiddenLabel !== 'First') ||
                    !labelsVisible)
                    && axis.hideIntersectingLabel && (i === (length_1 - 1))) ? '' : label.text;
                label.text = (axis.showLastLabel && axis.hideIntersectingLabel && isCompleteAngle(axis.startAngle, axis.endAngle)
                    && (i === 0)) ? '' : label.text;
                textElement(new TextOption(gauge.element.id + '_Axis_' + index + '_Label_' + i, location.x, location.y, anchor, label.text, style.autoAngle ? 'rotate(' + (angle + 90) + ',' + (location.x) + ',' + location.y + ')' : '', 'auto'), style.font, style.useRangeColor ? getRangeColor(label.value, axis.ranges, color) : color, labelElement, 'pointer-events:none;');
                if (axis.hideIntersectingLabel) {
                    textWidth = label.size.width;
                    textHeight = !style.autoAngle ? label.size.height : textWidth;
                    textHeight = textHeight - this.offsetAxisLabelsize(angle, textHeight);
                    previousLocation.x = currentLocation.x;
                    previousLocation.y = currentLocation.y;
                }
            }
        }
        element.appendChild(labelElement);
    };
    /**
     * Method to find the anchor of the axis label.
     * @private
     */
    AxisRenderer.prototype.findAnchor = function (location, style, angle, label) {
        if (style.autoAngle) {
            return 'middle';
        }
        var anchor = style.position === 'Inside' ?
            ((angle > 120 && angle < 240) ? 'start' : ((300 < angle || angle < 60) ? 'end' : 'middle')) :
            ((angle > 120 && angle < 240) ? 'end' : ((300 < angle || angle < 60) ? 'start' : 'middle'));
        location.y += style.position === 'Inside' ?
            ((angle >= 240 && angle <= 300) ? (label.size.height / 2) :
                (angle >= 60 && angle <= 120) ? 0 : label.size.height / 4) :
            ((angle >= 240 && angle <= 300) ? 0 :
                (angle >= 60 && angle <= 120) ? label.size.height / 2 : label.size.height / 4);
        return anchor;
    };
    /**
     * Methode to check whether the labels are intersecting or not.
     * @private
     */
    AxisRenderer.prototype.FindAxisLabelCollision = function (previousLocation, previousWidth, previousHeight, currentLocation, currentWidth, currentHeight) {
        var labelVisisble = ((previousLocation.x > (currentLocation.x + (currentWidth))) ||
            ((previousLocation.x + (previousWidth)) < (currentLocation.x)) ||
            ((previousLocation.y + (previousHeight)) < (currentLocation.y)) || ((previousLocation.y) > (currentLocation.y + (currentHeight))));
        return labelVisisble;
    };
    /**
     * Methode to get anchor position of label as start.
     * @private
     */
    AxisRenderer.prototype.getAxisLabelStartPosition = function (actualLocation, textWidth, style, textHeight, anchorPosition, angle) {
        if (anchorPosition === 'end') {
            actualLocation.x = actualLocation.x - textWidth;
        }
        else if (anchorPosition === 'middle') {
            actualLocation.x = actualLocation.x - (textWidth / 2);
        }
        else {
            actualLocation.x = actualLocation.x;
        }
        return actualLocation;
    };
    /**
     * Methode to offset label height and width based on angle.
     * @private
     */
    AxisRenderer.prototype.offsetAxisLabelsize = function (angle, size) {
        var finalSize = ((angle >= 20 && angle <= 60) || (angle >= 120 && angle <= 160) || (angle >= 200 && angle <= 240) ||
            (angle >= 300 && angle <= 340)) ? size / 5 : 0;
        return finalSize;
    };
    /**
     * Method to render the axis minor tick lines of the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.drawMinorTickLines = function (axis, index, element, gauge) {
        var minorTickElements = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_MinorTickLines_' + index
        });
        var minorLineStyle = axis.minorTicks;
        var minorInterval = minorLineStyle.interval !== null ?
            minorLineStyle.interval : (axis.visibleRange.interval / 2);
        var isRangeColor = minorLineStyle.useRangeColor;
        var color = minorLineStyle.color || this.gauge.themeStyle.minorTickColor;
        if (minorLineStyle.width && minorLineStyle.height && minorInterval) {
            for (var i = axis.visibleRange.min, max = axis.visibleRange.max; i <= max; i += minorInterval) {
                if (this.majorValues.indexOf(+i.toFixed(3)) < 0) {
                    appendPath(new PathOption(gauge.element.id + '_Axis_Minor_TickLine_' + index + '_' + i, 'transparent', minorLineStyle.width, isRangeColor ? getRangeColor(i, axis.ranges, color) : color, null, '0', this.calculateTicks(i, minorLineStyle, axis), '', 'pointer-events:none;'), minorTickElements, gauge);
                }
            }
            element.appendChild(minorTickElements);
        }
    };
    /**
     * Method to render the axis major tick lines of the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.drawMajorTickLines = function (axis, index, element, gauge) {
        var majorTickElements = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_MajorTickLines_' + index
        });
        var majorLineStyle = axis.majorTicks;
        var isRangeColor = majorLineStyle.useRangeColor;
        this.majorValues = [];
        var color = majorLineStyle.color || this.gauge.themeStyle.majorTickColor;
        if (majorLineStyle.width && majorLineStyle.height && axis.visibleRange.interval) {
            for (var i = axis.visibleRange.min, max = axis.visibleRange.max, interval = axis.visibleRange.interval; i <= max; i += interval) {
                this.majorValues.push(+i.toFixed(3));
                appendPath(new PathOption(gauge.element.id + '_Axis_Major_TickLine_' + index + '_' + i, 'transparent', majorLineStyle.width, isRangeColor ? getRangeColor(i, axis.ranges, color) : color, null, '0', this.calculateTicks(i, majorLineStyle, axis), '', 'pointer-events:none;'), majorTickElements, gauge);
            }
            element.appendChild(majorTickElements);
        }
    };
    /**
     * Method to calcualte the tick elements for the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.calculateTicks = function (value, options, axis) {
        var axisLineWidth = (axis.lineStyle.width / 2) + options.offset;
        var isOutside = options.position === 'Outside';
        var angle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
        var start = getLocationFromAngle(angle, axis.currentRadius +
            (isOutside ? axisLineWidth : -axisLineWidth), this.gauge.midPoint);
        var end = getLocationFromAngle(angle, axis.currentRadius +
            (isOutside ? axisLineWidth : -axisLineWidth) +
            (isOutside ? options.height : -options.height), this.gauge.midPoint);
        return 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y + ' ';
    };
    /**
     * Method to render the axis range of the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisRange = function (axis, index, element, gauge) {
        var _this = this;
        var rangeElement = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_Ranges_' + index
        });
        var location = this.gauge.midPoint;
        var startAngle;
        var endAngle;
        var isClockWise = axis.direction === 'ClockWise';
        var startValue;
        var endValue;
        var min = axis.visibleRange.min;
        var max = axis.visibleRange.max;
        var startWidth;
        var endWidth;
        var roundedStartAngle;
        var roundedEndAngle;
        var oldStart;
        var oldEnd;
        axis.ranges.map(function (range, rangeIndex) {
            _this.calculateRangeRadius(axis, range);
            startValue = Math.min(Math.max(range.start, min), range.end);
            endValue = Math.min(Math.max(range.start, range.end), max);
            startAngle = getAngleFromValue(startValue, max, min, axis.startAngle, axis.endAngle, isClockWise);
            endAngle = getAngleFromValue(endValue, max, min, axis.startAngle, axis.endAngle, isClockWise);
            var isAngleCross360 = (startAngle > endAngle);
            if (axis.rangeGap != null && axis.rangeGap > 0) {
                startAngle = (rangeIndex === 0 && !axis.startAndEndRangeGap) ? startAngle : startAngle + (axis.rangeGap / Math.PI);
                endAngle = (rangeIndex === axis.ranges.length - 1 && !axis.startAndEndRangeGap) ? endAngle : endAngle -
                    (axis.rangeGap / Math.PI);
            }
            if ((startValue !== endValue) && (isAngleCross360 ? startAngle < (endAngle + 360) : (startAngle < endAngle))) {
                if (range.startWidth.length > 0) {
                    startWidth = toPixel(range.startWidth, range.currentRadius);
                }
                else {
                    startWidth = range.startWidth;
                }
                if (range.endWidth.length > 0) {
                    endWidth = toPixel(range.endWidth, range.currentRadius);
                }
                else {
                    endWidth = range.endWidth;
                }
                endAngle = isClockWise ? endAngle : [startAngle, startAngle = endAngle][0];
                endWidth = isClockWise ? endWidth : [startWidth, startWidth = endWidth][0];
                var radius = range.roundedCornerRadius;
                var process = (radius * 0.25);
                oldStart = ((((range.currentRadius - (startWidth / 2)) * ((startAngle * Math.PI) / 180) -
                    (radius / process)) / (range.currentRadius - (startWidth / 2))) * 180) / Math.PI;
                oldEnd = ((((range.currentRadius - (endWidth / 2)) * ((endAngle * Math.PI) / 180) +
                    (radius / process)) / (range.currentRadius - (endWidth / 2))) * 180) / Math.PI;
                roundedStartAngle = ((((range.currentRadius) * ((startAngle * Math.PI) / 180) +
                    radius) / (range.currentRadius)) * 180) / Math.PI;
                roundedEndAngle = ((((range.currentRadius) * ((endAngle * Math.PI) / 180) -
                    radius) / (range.currentRadius)) * 180) / Math.PI;
                if (range.roundedCornerRadius) {
                    appendPath(new PathOption(gauge.element.id + '_Axis_' + index + '_Range_' + rangeIndex, range.rangeColor, 0, range.rangeColor, range.opacity, '0', getRoundedPathArc(location, Math.floor(roundedStartAngle), Math.ceil(roundedEndAngle), oldStart, oldEnd, range.currentRadius, startWidth, endWidth), '', ''), rangeElement, gauge);
                }
                else {
                    appendPath(new PathOption(gauge.element.id + '_Axis_' + index + '_Range_' + rangeIndex, range.rangeColor, 0, range.rangeColor, range.opacity, '0', getPathArc(gauge.midPoint, Math.floor(startAngle), Math.ceil(endAngle), range.currentRadius, startWidth, endWidth), '', ''), rangeElement, gauge);
                }
            }
        });
        element.appendChild(rangeElement);
    };
    /**
     * Method to calculate the radius of the axis range.
     * @return {void}
     */
    AxisRenderer.prototype.calculateRangeRadius = function (axis, range) {
        var radius = range.radius !== null ? range.radius : '100%';
        range.currentRadius = stringToNumber(radius, axis.currentRadius);
    };
    /**
     * Method to get the range color of the circular gauge.
     * @return {void}
     * @private
     */
    AxisRenderer.prototype.setRangeColor = function (axis) {
        var rangeColors = getRangePalette(this.gauge.theme);
        axis.ranges.map(function (range, index) {
            range.rangeColor = range.color ? range.color : rangeColors[index % rangeColors.length];
        });
    };
    return AxisRenderer;
}());
export { AxisRenderer };
