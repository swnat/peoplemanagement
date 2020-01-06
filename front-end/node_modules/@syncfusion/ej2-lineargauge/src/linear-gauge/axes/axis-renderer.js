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
import { isNullOrUndefined, remove } from '@syncfusion/ej2-base';
import { Animations } from './animation';
import { Size, valueToCoefficient, PathOption, textElement, getElement } from '../utils/helper';
import { TextOption, RectOption, calculateShapes, getBox, getPathToRect, getRangeColor } from '../utils/helper';
/**
 * @private
 * To render the axis elements
 */
var AxisRenderer = /** @class */ (function (_super) {
    __extends(AxisRenderer, _super);
    function AxisRenderer(gauge) {
        return _super.call(this, gauge) || this;
    }
    AxisRenderer.prototype.renderAxes = function () {
        var _this = this;
        var axis;
        var major;
        var minor;
        this.axisElements = [];
        var gaugeAxesG = this.gauge.svgObject.querySelector('#' + this.gauge.element.id + '_Axis_Collections');
        if (gaugeAxesG) {
            remove(gaugeAxesG);
        }
        this.axisObject = this.gauge.renderer.createGroup({
            id: this.gauge.element.id + '_Axis_Collections',
            transform: 'translate( 0, 0 )'
        });
        for (var i = 0; i < this.gauge.axes.length; i++) {
            axis = this.gauge.axes[i];
            major = axis.majorTicks;
            minor = axis.minorTicks;
            this.htmlObject = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_Axis_Group_' + i });
            this.drawAxisLine(axis, this.htmlObject, i);
            this.drawRanges(axis, this.htmlObject, i);
            this.drawTicks(axis, major, this.htmlObject, 'MajorTicks', axis.majorTickBounds);
            this.drawTicks(axis, minor, this.htmlObject, 'MinorTicks', axis.minorTickBounds);
            this.drawAxisLabels(axis, this.htmlObject);
            this.drawPointers(axis, this.htmlObject, i);
            this.axisElements.push(this.htmlObject);
        }
        this.axisElements.forEach(function (axisElement) {
            _this.axisObject.appendChild(axisElement);
        });
        this.gauge.svgObject.appendChild(this.axisObject);
        if (this.gauge.nearSizes.length !== this.gauge.farSizes.length && this.gauge.axes.length > 1) {
            this.axisAlign(this.gauge.axes);
        }
    };
    AxisRenderer.prototype.axisAlign = function (axes) {
        var nearAxisWidth = 0;
        var farAxisWidth = 0;
        var axis;
        var tranX;
        var transY;
        if (this.gauge.orientation === 'Vertical') {
            axes.forEach(function (axis, axisIndex) {
                if (!axis.opposedPosition) {
                    nearAxisWidth += axis.bounds.width;
                }
                else {
                    farAxisWidth += axis.bounds.width;
                }
            });
            nearAxisWidth += this.gauge.containerBounds.width / 2;
            farAxisWidth += this.gauge.containerBounds.width / 2;
            tranX = (nearAxisWidth / 2) - (farAxisWidth / 2);
            this.axisObject.setAttribute('transform', 'translate(' + tranX + ',0)');
            if (!(isNullOrUndefined(this.gauge.containerObject))) {
                this.gauge.containerObject.setAttribute('transform', 'translate(' + tranX + ',0)');
            }
        }
        else {
            axes.forEach(function (axis, axisIndex) {
                if (!axis.opposedPosition) {
                    nearAxisWidth += axis.bounds.height;
                }
                else {
                    farAxisWidth += axis.bounds.height;
                }
            });
            nearAxisWidth += (this.gauge.containerBounds.height / 2);
            farAxisWidth += (this.gauge.containerBounds.height / 2);
            transY = (nearAxisWidth / 2) - (farAxisWidth / 2);
            this.axisObject.setAttribute('transform', 'translate(0,' + transY + ')');
            if (!(isNullOrUndefined(this.gauge.containerObject))) {
                this.gauge.containerObject.setAttribute('transform', 'translate(0,' + transY + ')');
            }
        }
    };
    AxisRenderer.prototype.drawAxisLine = function (axis, axisObject, axisIndex) {
        var options;
        var rect = axis.lineBounds;
        var path = '';
        var color = axis.line.color || this.gauge.themeStyle.lineColor;
        if (axis.line.width > 0) {
            path = 'M' + rect.x + ' ' + rect.y + ' L ' + (this.gauge.orientation === 'Vertical' ? rect.x : rect.x + rect.width) +
                ' ' + (this.gauge.orientation === 'Vertical' ? rect.y + rect.height : rect.y) + 'z';
            options = new PathOption(this.gauge.element.id + '_AxisLine_' + axisIndex, color, axis.line.width, color, 1, axis.line.dashArray, path);
            axisObject.appendChild(this.gauge.renderer.drawPath(options));
        }
    };
    AxisRenderer.prototype.drawTicks = function (axis, ticks, axisObject, tickID, tickBounds) {
        var tickPath = '';
        var pointY;
        var pointX;
        var options;
        var range = axis.visibleRange;
        var line = axis.lineBounds;
        var majorTickColor = axis.majorTicks.color || this.gauge.themeStyle.majorTickColor;
        var minorTickColor = axis.minorTicks.color || this.gauge.themeStyle.minorTickColor;
        var tickColor = (tickID === 'MajorTicks') ? majorTickColor : minorTickColor;
        var interval = ((tickID === 'MajorTicks') ? axis.majorInterval : axis.minorInterval);
        for (var i = range.min; (i <= range.max && interval > 0); i += interval) {
            if ((tickID === 'MajorTicks') || (tickID === 'MinorTicks' && i !== range.min && i !== range.max
                && (i % axis.majorInterval) !== 0)) {
                if (this.gauge.orientation === 'Vertical') {
                    pointX = tickBounds.x;
                    pointY = (valueToCoefficient(i, axis, this.gauge.orientation, range) * line.height) + line.y;
                    tickPath = tickPath.concat('M' + pointX + ' ' + pointY + ' ' + 'L' + (pointX + ticks.height) + ' ' + pointY + ' ');
                }
                else {
                    pointX = (valueToCoefficient(i, axis, this.gauge.orientation, range) * line.width) + line.x;
                    pointY = tickBounds.y;
                    tickPath = tickPath.concat('M' + pointX + ' ' + pointY + ' ' + 'L' + pointX + ' ' + (pointY + ticks.height) + ' ');
                }
            }
        }
        options = new PathOption(this.gauge.element.id + '_' + tickID + 'Line_' + 0, tickColor, ticks.width, tickColor, 1, null, tickPath);
        axisObject.appendChild(this.gauge.renderer.drawPath(options));
    };
    AxisRenderer.prototype.drawAxisLabels = function (axis, axisObject) {
        var options;
        var pointX;
        var pointY;
        var rect = axis.lineBounds;
        var bounds = axis.labelBounds;
        var tick = axis.majorTickBounds;
        var labelSize;
        var range = axis.visibleRange;
        var anchor;
        var baseline;
        var padding = 5;
        var fontColor = this.gauge.themeStyle.labelColor;
        var labelColor;
        var offset = axis.labelStyle.offset;
        var labelElement = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_AxisLabelsGroup' });
        for (var i = 0; i < axis.visibleLabels.length; i++) {
            labelSize = axis.visibleLabels[i].size;
            labelColor = axis.labelStyle.useRangeColor ? getRangeColor(axis.visibleLabels[i].value, axis.ranges) :
                null;
            labelColor = isNullOrUndefined(labelColor) ? (axis.labelStyle.font.color || fontColor) : labelColor;
            if (this.gauge.orientation === 'Vertical') {
                pointY = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) *
                    rect.height) + rect.y;
                pointX = (!axis.opposedPosition ? (tick.x - labelSize.width - padding) + offset : bounds.x);
                pointY += (labelSize.height / 4);
            }
            else {
                pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) *
                    rect.width) + rect.x;
                pointY = bounds.y;
                anchor = 'middle';
                baseline = '';
            }
            axis.labelStyle.font.fontFamily = this.gauge.themeStyle.labelFontFamily || axis.labelStyle.font.fontFamily;
            options = new TextOption(this.gauge.element.id + '_AxisLabel_' + i, pointX, pointY, anchor, axis.visibleLabels[i].text, null, baseline);
            textElement(options, axis.labelStyle.font, labelColor, labelElement);
        }
        axisObject.appendChild(labelElement);
    };
    AxisRenderer.prototype.drawPointers = function (axis, axisObject, axisIndex) {
        var pointer;
        var clipId;
        var pointesGroup;
        var pointerClipRectGroup;
        pointesGroup = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_PointersGroup' });
        for (var i = 0; i < axis.pointers.length; i++) {
            pointer = axis.pointers[i];
            clipId = 'url(#' + this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + '_' + pointer.type + 'ClipRect_' + i + ')';
            if (!(isNullOrUndefined(pointer.bounds))) {
                pointerClipRectGroup = this.gauge.renderer.createGroup({
                    'id': this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer_' + i,
                    'clip-path': clipId
                });
                if (isNullOrUndefined(pointer.startValue)) {
                    pointer.startValue = axis.visibleRange.min;
                }
                this['draw' + pointer.type + 'Pointer'](axis, axisIndex, pointer, i, pointerClipRectGroup);
                pointesGroup.appendChild(pointerClipRectGroup);
            }
        }
        axisObject.appendChild(pointesGroup);
    };
    AxisRenderer.prototype.drawMarkerPointer = function (axis, axisIndex, pointer, pointerIndex, parentElement) {
        var options;
        var pointerID = this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer' + '_' + pointerIndex;
        var transform = 'translate( 0, 0 )';
        var pointerElement;
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            remove(getElement(pointerID));
        }
        var pointerColor = pointer.color || this.gauge.themeStyle.pointerColor;
        options = new PathOption(pointerID, pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, null, null, transform);
        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.gauge.orientation, axis, pointer);
        pointerElement = ((pointer.markerType === 'Circle' ? this.gauge.renderer.drawCircle(options)
            : (pointer.markerType === 'Image') ? this.gauge.renderer.drawImage(options) :
                this.gauge.renderer.drawPath(options)));
        parentElement.appendChild(pointerElement);
        if (pointer.animationDuration > 0 && !this.gauge.gaugeResized) {
            pointer.animationComplete = false;
            this.performMarkerAnimation(pointerElement, axis, pointer);
        }
        pointerElement.setAttribute('aria-label', pointer.description || 'Pointer:' + Number(pointer.currentValue).toString());
    };
    AxisRenderer.prototype.drawBarPointer = function (axis, axisIndex, pointer, pointerIndex, parentElement) {
        var rectOptions;
        var clipRectElement;
        var pointerElement;
        var path = '';
        var options;
        var box;
        var radius;
        var bottomRadius;
        var topRadius;
        var size = new Size(this.gauge.availableSize.width, this.gauge.availableSize.height);
        var pointerID = this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer' + '_' + pointerIndex;
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            remove(getElement(pointerID));
        }
        if (this.gauge.container.type === 'Normal') {
            rectOptions = new RectOption(pointerID, pointer.color || this.gauge.themeStyle.pointerColor, pointer.border, pointer.opacity, pointer.bounds, null, null);
            box = pointer.bounds;
            pointerElement = this.gauge.renderer.drawRectangle(rectOptions);
        }
        else {
            path = getBox(pointer.bounds, this.gauge.container.type, this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.gauge.container.width, axis, pointer.roundedCornerRadius);
            options = new PathOption(pointerID, pointer.color || this.gauge.themeStyle.pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, null, path);
            pointerElement = this.gauge.renderer.drawPath(options);
            box = getPathToRect(pointerElement.cloneNode(true), size, this.gauge.element);
        }
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            var element = getElement(pointerID).firstElementChild;
            if (this.gauge.container.type === 'Normal') {
                element.setAttribute('x', rectOptions.x + '');
                element.setAttribute('y', rectOptions.y + '');
                element.setAttribute('width', rectOptions.width + '');
                element.setAttribute('height', rectOptions.height + '');
            }
            else {
                element.setAttribute('d', options.d);
            }
        }
        else {
            parentElement.appendChild(pointerElement);
        }
        pointerElement.setAttribute('aria-label', pointer.description || 'Pointer:' + Number(pointer.currentValue).toString());
        if (pointer.animationDuration > 0 && !this.gauge.gaugeResized) {
            if (this.gauge.container.type === 'Thermometer' && pointer.startValue === 0) {
                clipRectElement = this.gauge.renderer.drawClipPath(new RectOption(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + '_' + pointer.type + 'ClipRect_' + pointerIndex, 'transparent', { width: 1, color: 'Gray' }, 1, box));
                parentElement.appendChild(clipRectElement);
            }
            this.performBarAnimation(pointerElement, axis, pointer);
        }
    };
    AxisRenderer.prototype.drawRanges = function (axis, axisObject, axisIndex) {
        var range;
        var options;
        var rangeElement = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_RangesGroup' });
        for (var j = 0; j < axis.ranges.length; j++) {
            range = axis.ranges[j];
            if (!(isNullOrUndefined(range.path))) {
                options = new PathOption(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_Range_' + j, range.interior, range.border.width, range.border.color, 1, null, range.path);
                rangeElement.appendChild(this.gauge.renderer.drawPath(options));
            }
        }
        axisObject.appendChild(rangeElement);
    };
    return AxisRenderer;
}(Animations));
export { AxisRenderer };
