/**
 * StripLine src
 */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { valueToCoefficient, textElement, RectOption, appendChildElement, appendClipElement, withIn, getElement } from '../../common/utils/helper';
import { measureText, TextOption, PathOption, Rect } from '@syncfusion/ej2-svg-base';
/**
 * `StripLine` module is used to render the stripLine in chart.
 */
var StripLine = /** @class */ (function () {
    function StripLine() {
    }
    /**
     * Finding x, y, width and height of the strip line
     * @param axis
     * @param strip line
     * @param seriesClipRect
     * @param startValue
     * @param segmentAxis
     */
    StripLine.prototype.measureStripLine = function (axis, stripline, seriesClipRect, startValue, segmentAxis) {
        var actualStart;
        var actualEnd;
        var orientation = axis.orientation;
        if (stripline.isRepeat && stripline.size !== null) {
            actualStart = startValue;
            actualEnd = null;
        }
        else {
            if (axis.valueType === 'DateTimeCategory') {
                var start = stripline.start;
                var end = stripline.end;
                actualStart = (start != null && typeof start !== 'number') ? axis.labels.indexOf((start).getTime().toString()) :
                    start;
                actualEnd = (end != null && typeof end !== 'number') ? axis.labels.indexOf((end).getTime().toString()) : end;
            }
            else {
                actualStart = stripline.start === null ? null : +stripline.start;
                actualEnd = stripline.end === null ? null : +stripline.end;
            }
        }
        var rect = this.getFromTovalue(actualStart, actualEnd, stripline.size, stripline.startFromAxis, axis, stripline);
        var height = (orientation === 'Vertical') ? (rect.to - rect.from) * axis.rect.height : seriesClipRect.height;
        var width = (orientation === 'Horizontal') ? (rect.to - rect.from) * axis.rect.width : seriesClipRect.width;
        var x = (orientation === 'Vertical') ? seriesClipRect.x : ((rect.from * axis.rect.width) + axis.rect.x);
        var y = (orientation === 'Horizontal') ? seriesClipRect.y : (axis.rect.y + axis.rect.height -
            ((stripline.sizeType === 'Pixel' ? rect.from : rect.to) * axis.rect.height));
        if (stripline.isSegmented && stripline.segmentStart != null && stripline.segmentEnd != null && stripline.sizeType !== 'Pixel') {
            var segRect = this.getFromTovalue(+stripline.segmentStart, +stripline.segmentEnd, null, null, segmentAxis, stripline);
            if (segmentAxis.orientation === 'Vertical') {
                y = (segmentAxis.rect.y + segmentAxis.rect.height -
                    (segRect.to * segmentAxis.rect.height));
                height = (segRect.to - segRect.from) * segmentAxis.rect.height;
            }
            else {
                x = ((segRect.from * segmentAxis.rect.width) + segmentAxis.rect.x);
                width = (segRect.to - segRect.from) * segmentAxis.rect.width;
            }
        }
        if ((height !== 0 && width !== 0) || (stripline.sizeType === 'Pixel' && (stripline.start !== null || stripline.startFromAxis))) {
            return new Rect(x, y, width, height);
        }
        return new Rect(0, 0, 0, 0);
    };
    /**
     * To get from to value from start, end, size, start from axis
     * @param start
     * @param end
     * @param size
     * @param startFromAxis
     * @param axis
     * @param strip line
     */
    StripLine.prototype.getFromTovalue = function (start, end, size, startFromAxis, axis, stripline) {
        var from = (!stripline.isRepeat && startFromAxis) ? axis.visibleRange.min : start;
        var to = this.getToValue(Math.max(start, isNullOrUndefined(end) ? start : end), from, size, axis, end, stripline);
        from = this.findValue(from, axis);
        to = this.findValue(to, axis);
        return { from: valueToCoefficient(axis.isInversed ? to : from, axis), to: valueToCoefficient(axis.isInversed ? from : to, axis) };
    };
    /**
     * Finding end value of the strip line
     * @param to
     * @param from
     * @param size
     * @param axis
     * @param end
     * @param strip line
     */
    StripLine.prototype.getToValue = function (to, from, size, axis, end, stripline) {
        var sizeType = stripline.sizeType;
        var isEnd = (end === null);
        if (axis.valueType === 'DateTime') {
            var fromValue = new Date(from);
            if (sizeType === 'Auto') {
                sizeType = axis.actualIntervalType;
                size *= axis.visibleRange.interval;
            }
            switch (sizeType) {
                case 'Years':
                    return (isEnd ? new Date(fromValue.setFullYear(fromValue.getFullYear() + size)) : to);
                case 'Months':
                    return (isEnd ? new Date(fromValue.setMonth(fromValue.getMonth() + size)) : to);
                case 'Days':
                    return (isEnd ? new Date(fromValue.setDate(fromValue.getDate() + size)) : to);
                case 'Hours':
                    return (isEnd ? new Date(fromValue.setHours(fromValue.getHours() + size)) : to);
                case 'Minutes':
                    return (isEnd ? new Date(fromValue.setMinutes(fromValue.getMinutes() + size)) : to);
                case 'Seconds':
                    return (isEnd ? new Date(fromValue.setSeconds(fromValue.getSeconds() + size)) : to);
                default:
                    return from;
            }
        }
        else {
            return stripline.sizeType === 'Pixel' ? from : (isEnd ? (from + size) : to);
        }
    };
    /**
     * To check the strip line values within range
     * @param value
     * @param axis
     */
    StripLine.prototype.findValue = function (value, axis) {
        if (value < axis.visibleRange.min) {
            value = axis.visibleRange.min;
        }
        else if (value > axis.visibleRange.max) {
            value = axis.visibleRange.max;
        }
        return value;
    };
    /**
     * To render strip lines based start and end.
     * @private
     * @param chart
     * @param position
     * @param axes
     */
    StripLine.prototype.renderStripLine = function (chart, position, axes) {
        var id = chart.element.id + '_stripline_' + position + '_';
        var seriesClipRect = chart.chartAxisLayoutPanel.seriesClipRect;
        var end = 0;
        var limit = 0;
        var startValue = 0;
        var segmentAxis = null;
        var range;
        var options = new RectOption(id + 'ClipRect', 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: chart.initialClipRect.x, y: chart.initialClipRect.y,
            width: chart.initialClipRect.width,
            height: chart.initialClipRect.height
        });
        var striplineGroup = chart.renderer.createGroup({
            id: id + 'collections',
            'clip-path': 'url(#' + id + 'ClipRect' + ')'
        });
        striplineGroup.appendChild(appendClipElement(chart.redraw, options, chart.renderer));
        for (var _i = 0, axes_1 = axes; _i < axes_1.length; _i++) {
            var axis = axes_1[_i];
            var count = 0;
            for (var _a = 0, _b = axis.stripLines; _a < _b.length; _a++) {
                var stripline = _b[_a];
                if (stripline.visible && stripline.zIndex === position) {
                    if (stripline.isSegmented && stripline.segmentStart != null && stripline.segmentEnd != null &&
                        stripline.sizeType !== 'Pixel') {
                        segmentAxis = this.getSegmentAxis(axes, axis, stripline);
                    }
                    if (stripline.isRepeat && stripline.repeatEvery != null && stripline.size !== null && stripline.sizeType !== 'Pixel') {
                        limit = (stripline.repeatUntil != null) ? ((axis.valueType === 'DateTime') ?
                            stripline.repeatUntil.getTime() : +stripline.repeatUntil) : axis.actualRange.max;
                        startValue = stripline.start;
                        if ((stripline.startFromAxis && axis.valueType === 'DateTime' && stripline.sizeType === 'Auto') ||
                            (stripline.start < axis.visibleRange.min)) {
                            startValue = axis.visibleLabels[0].value === axis.visibleRange.min ? axis.visibleRange.min :
                                axis.visibleLabels[0].value - (axis.valueType === 'DateTime' ? axis.dateTimeInterval :
                                    axis.visibleRange.interval);
                        }
                        startValue = stripline.startFromAxis && axis.valueType !== 'DateTime' ? axis.visibleRange.min : startValue;
                        while (startValue < limit) {
                            end = (startValue + (axis.valueType === 'DateTime' ? axis.dateTimeInterval * +stripline.size : stripline.size));
                            range = withIn(end, axis.visibleRange);
                            if ((startValue >= axis.visibleRange.min && startValue < axis.visibleRange.max) || range) {
                                this.renderStripLineElement(axis, stripline, seriesClipRect, id, striplineGroup, chart, startValue, segmentAxis, count);
                            }
                            count++;
                            startValue = this.getStartValue(axis, stripline, startValue);
                        }
                    }
                    else {
                        this.renderStripLineElement(axis, stripline, seriesClipRect, id, striplineGroup, chart, null, segmentAxis, count);
                        count++;
                    }
                }
            }
        }
        appendChildElement(chart.enableCanvas, chart.svgObject, striplineGroup, chart.redraw);
    };
    /**
     * To draw the single line strip line
     * @param strip line
     * @param rect
     * @param id
     * @param parent
     * @param chart
     * @param axis
     */
    StripLine.prototype.renderPath = function (stripline, rect, id, parent, chart, axis) {
        var element = getElement(id);
        var direction = element ? element.getAttribute('d') : '';
        var d = (axis.orientation === 'Vertical') ? ('M' + rect.x + ' ' + rect.y + ' ' + 'L' + (rect.x + rect.width)
            + ' ' + rect.y) :
            ('M' + rect.x + ' ' + rect.y + ' ' + 'L' + rect.x + ' ' + (rect.y + rect.height));
        appendChildElement(chart.enableCanvas, parent, chart.renderer.drawPath(new PathOption(id, '', stripline.size, stripline.color, stripline.opacity, stripline.dashArray, d)), chart.redraw, true, 'x', 'y', null, direction, true);
    };
    ;
    /**
     * To draw the rectangle
     * @param strip line
     * @param rect
     * @param id
     * @param parent
     * @param chart
     */
    StripLine.prototype.renderRectangle = function (stripline, rect, id, parent, chart) {
        var element = getElement(id);
        var previousRect = element ? new Rect(+element.getAttribute('x'), +element.getAttribute('y'), +element.getAttribute('width'), +element.getAttribute('height')) : null;
        appendChildElement(chart.enableCanvas, parent, chart.renderer.drawRectangle(new RectOption(id, stripline.color, stripline.border, stripline.opacity, rect, 0, 0, '', stripline.dashArray)), chart.redraw, true, 'x', 'y', null, null, true, true, previousRect);
    };
    /**
     * To create the text on strip line
     * @param strip line
     * @param rect
     * @param id
     * @param parent
     * @param chart
     * @param axis
     */
    StripLine.prototype.renderText = function (stripline, rect, id, parent, chart, axis) {
        var textSize = measureText(stripline.text, stripline.textStyle);
        var textMid = 3 * (textSize.height / 8);
        var ty = rect.y + (rect.height / 2) + textMid;
        var rotation = (stripline.rotation === null) ? ((axis.orientation === 'Vertical') ? 0 : -90) : stripline.rotation;
        var tx = rect.x + (rect.width / 2);
        var anchor;
        var padding = 5;
        if (axis.orientation === 'Horizontal') {
            tx = this.getTextStart(tx + (textMid * this.factor(stripline.horizontalAlignment)), rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty - textMid, rect.height, stripline.verticalAlignment);
            anchor = this.invertAlignment(stripline.verticalAlignment);
        }
        else {
            tx = this.getTextStart(tx, rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty + (textMid * this.factor(stripline.verticalAlignment)) - padding, rect.height, stripline.verticalAlignment);
            anchor = stripline.horizontalAlignment;
        }
        textElement(chart.renderer, new TextOption(id, tx, ty, anchor, stripline.text, 'rotate(' + rotation + ' ' + tx + ',' + ty + ')', 'middle'), stripline.textStyle, stripline.textStyle.color, parent);
    };
    StripLine.prototype.invertAlignment = function (anchor) {
        switch (anchor) {
            case 'Start':
                anchor = 'End';
                break;
            case 'End':
                anchor = 'Start';
                break;
        }
        return anchor;
    };
    /**
     * To find the next value of the recurrence strip line
     * @param axis
     * @param stripline
     * @param startValue
     */
    StripLine.prototype.getStartValue = function (axis, stripline, startValue) {
        if (axis.valueType === 'DateTime') {
            return this.getToValue(null, startValue, +stripline.repeatEvery, axis, null, stripline);
        }
        else {
            return startValue + (+stripline.repeatEvery);
        }
    };
    /**
     * Finding segment axis for segmented strip line
     * @param axes
     * @param axis
     * @param strip line
     */
    StripLine.prototype.getSegmentAxis = function (axes, axis, stripline) {
        var segment;
        if (stripline.segmentAxisName == null) {
            return (axis.orientation === 'Horizontal') ? axes[1] : axes[0];
        }
        else {
            for (var i = 0; i < axes.length; i++) {
                if (stripline.segmentAxisName === axes[i].name) {
                    segment = axes[i];
                }
            }
            return segment;
        }
    };
    /**
     * To render strip line on chart
     * @param axis
     * @param stripline
     * @param seriesClipRect
     * @param id
     * @param striplineGroup
     * @param chart
     * @param startValue
     * @param segmentAxis
     * @param count
     */
    StripLine.prototype.renderStripLineElement = function (axis, stripline, seriesClipRect, id, striplineGroup, chart, startValue, segmentAxis, count) {
        var rect = this.measureStripLine(axis, stripline, seriesClipRect, startValue, segmentAxis);
        if (stripline.sizeType === 'Pixel') {
            this.renderPath(stripline, rect, id + 'path_' + axis.name + '_' + count, striplineGroup, chart, axis);
        }
        else {
            if (rect.height !== 0 && rect.width !== 0) {
                this.renderRectangle(stripline, rect, id + 'rect_' + axis.name + '_' + count, striplineGroup, chart);
            }
        }
        if (stripline.text !== '') {
            this.renderText(stripline, rect, id + 'text_' + axis.name + '_' + count, striplineGroup, chart, axis);
        }
    };
    /**
     * To find the factor of the text
     * @param anchor
     */
    StripLine.prototype.factor = function (anchor) {
        var factor = 0;
        switch (anchor) {
            case 'Start':
                factor = 1;
                break;
            case 'End':
                factor = -1;
                break;
        }
        return factor;
    };
    /**
     * To find the start value of the text
     * @param xy
     * @param size
     * @param textAlignment
     */
    StripLine.prototype.getTextStart = function (xy, size, textAlignment) {
        var padding = 5;
        switch (textAlignment) {
            case 'Start':
                xy = xy - (size / 2) + padding;
                break;
            case 'End':
                xy = xy + (size / 2) - padding;
                break;
        }
        return xy;
    };
    /**
     * To get the module name for `StripLine`.
     * @private
     */
    StripLine.prototype.getModuleName = function () {
        return 'StripLine';
    };
    /**
     * To destroy the `StripLine` module.
     * @private
     */
    StripLine.prototype.destroy = function () {
        // destroy peform here
    };
    return StripLine;
}());
export { StripLine };
