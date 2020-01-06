var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { Tooltip } from '@syncfusion/ej2-svg-base';
import { getPointer, Rect, getMousePosition, getElementSize, stringToNumber } from '../utils/helper';
import { getAngleFromValue, getLabelFormat, getLocationFromAngle } from '../utils/helper';
import { Browser, createElement, remove } from '@syncfusion/ej2-base';
import { tooltipRender } from '../model/constants';
/**
 * Tooltip Module handles the tooltip of the circular gauge
 */
var GaugeTooltip = /** @class */ (function () {
    /**
     * Constructor for Tooltip module.
     * @private.
     */
    function GaugeTooltip(gauge) {
        this.gauge = gauge;
        this.tooltipId = this.gauge.element.id + '_CircularGauge_Tooltip';
        this.tooltip = gauge.tooltip;
        this.textStyle = this.tooltip.textStyle;
        this.borderStyle = this.tooltip.border;
        this.addEventListener();
    }
    /**
     * Method to render the tooltip for circular gauge.
     */
    /* tslint:disable:no-string-literal */
    /* tslint:disable:max-func-body-length */
    GaugeTooltip.prototype.renderTooltip = function (e) {
        this.gaugeId = this.gauge.element.getAttribute('id');
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var location;
        var samePointerEle = false;
        if (e.type.indexOf('touch') !== -1) {
            touchArg = e;
            target = touchArg.target;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
        }
        else {
            target = e.target;
            pageX = e.pageX;
            pageY = e.pageY;
        }
        if ((this.tooltip.type.indexOf('Pointer') > -1) && (target.id.indexOf('_Pointer_') >= 0) &&
            (target.id.indexOf(this.gaugeId) >= 0)) {
            if (this.pointerEle !== null) {
                samePointerEle = (this.pointerEle === target);
            }
            var svgRect = this.gauge.svgObject.getBoundingClientRect();
            var elementRect = this.gauge.element.getBoundingClientRect();
            var axisRect = document.getElementById(this.gauge.element.id + '_AxesCollection').getBoundingClientRect();
            var rect = new Rect(Math.abs(elementRect.left - svgRect.left), Math.abs(elementRect.top - svgRect.top), svgRect.width, svgRect.height);
            var currentPointer = getPointer(target.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentPointer.axisIndex];
            this.currentPointer = (this.currentAxis.pointers)[currentPointer.pointerIndex];
            var angle = getAngleFromValue(this.currentPointer.currentValue, this.currentAxis.visibleRange.max, this.currentAxis.visibleRange.min, this.currentAxis.startAngle, this.currentAxis.endAngle, this.currentAxis.direction === 'ClockWise') % 360;
            var tooltipFormat = this.gauge.tooltip.format || this.currentAxis.labelStyle.format;
            var customLabelFormat = tooltipFormat && tooltipFormat.match('{value}') !== null;
            var format = this.gauge.intl.getNumberFormat({
                format: getLabelFormat(tooltipFormat), useGrouping: this.gauge.useGroupingSeparator
            });
            this.tooltipElement();
            if (this.tooltipEle.childElementCount !== 0 && !this.gauge.enablePointerDrag && !this.gauge.tooltip.showAtMousePosition) {
                return null;
            }
            var roundValue = this.roundedValue(this.currentPointer.currentValue);
            var pointerContent = customLabelFormat ?
                tooltipFormat.replace(new RegExp('{value}', 'g'), format(roundValue)) :
                format(roundValue);
            location = getLocationFromAngle(angle, this.currentAxis.currentRadius, this.gauge.midPoint);
            location.x = (this.tooltip.template && ((angle >= 150 && angle <= 250) || (angle >= 330 && angle <= 360) ||
                (angle >= 0 && angle <= 45))) ? (location.x + 10) : location.x;
            var tooltipArgs = {
                name: tooltipRender, cancel: false, content: pointerContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, pointer: this.currentPointer, event: e, gauge: this.gauge, appendInBodyTag: false
            };
            if (this.gauge.isBlazor) {
                var name_1 = tooltipArgs.name, cancel = tooltipArgs.cancel, content = tooltipArgs.content, location_1 = tooltipArgs.location, tooltip = tooltipArgs.tooltip, event_1 = tooltipArgs.event, appendInBodyTag = tooltipArgs.appendInBodyTag;
                tooltipArgs = { name: name_1, cancel: cancel, content: content, location: location_1, tooltip: tooltip, event: event_1, appendInBodyTag: appendInBodyTag };
            }
            this.gauge.trigger(tooltipRender, tooltipArgs);
            var template = tooltipArgs.tooltip.template;
            if (template !== null && template.length === 1) {
                template = template[template[0]];
            }
            if (!this.tooltip.showAtMousePosition) {
                if (template) {
                    var elementSize = getElementSize(template, this.gauge, this.tooltipEle);
                    this.tooltipRect = Math.abs(axisRect.left - svgRect.left) > elementSize.width ?
                        this.findPosition(rect, angle, pointerContent, tooltipArgs.location) : rect;
                }
                else {
                    this.findPosition(rect, angle, pointerContent, tooltipArgs.location);
                }
            }
            else {
                tooltipArgs.location = getMousePosition(pageX, pageY, this.gauge.svgObject);
                this.tooltipRect = rect;
            }
            if (!tooltipArgs.cancel && !samePointerEle) {
                tooltipArgs.tooltip.textStyle.color = tooltipArgs.tooltip.textStyle.color || this.gauge.themeStyle.tooltipFontColor;
                tooltipArgs.tooltip.textStyle.fontFamily = this.gauge.themeStyle.fontFamily || tooltipArgs.tooltip.textStyle.fontFamily;
                tooltipArgs.tooltip.textStyle.opacity = this.gauge.themeStyle.tooltipTextOpacity || tooltipArgs.tooltip.textStyle.opacity;
                this.svgTooltip = this.svgTooltipCreate(this.svgTooltip, tooltipArgs, template, this.arrowInverted, this.tooltipRect, this.gauge, tooltipArgs.tooltip.fill, tooltipArgs.tooltip.textStyle, tooltipArgs.tooltip.border);
                this.svgTooltip.opacity = this.gauge.themeStyle.tooltipFillOpacity || this.svgTooltip.opacity;
                this.svgTooltip.appendTo(this.tooltipEle);
                if (template && Math.abs(pageY - this.tooltipEle.getBoundingClientRect().top) <= 0) {
                    this.tooltipEle.style.top = (parseFloat(this.tooltipEle.style.top) + 20) + 'px';
                }
            }
        }
        else if ((this.tooltip.type.indexOf('Range') > -1) && (target.id.indexOf('_Range_') >= 0) && (!this.gauge.isDrag) &&
            (target.id.indexOf(this.gaugeId) >= 0)) {
            var rangeSvgRect = this.gauge.svgObject.getBoundingClientRect();
            var rangeElementRect = this.gauge.element.getBoundingClientRect();
            var rangeAxisRect = document.getElementById(this.gauge.element.id + '_AxesCollection').getBoundingClientRect();
            var rect = new Rect(Math.abs(rangeElementRect.left - rangeSvgRect.left), Math.abs(rangeElementRect.top - rangeSvgRect.top), rangeSvgRect.width, rangeSvgRect.height);
            var currentRange = getPointer(target.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentRange.axisIndex];
            this.currentRange = (this.currentAxis.ranges)[currentRange.pointerIndex];
            var rangeAngle = getAngleFromValue((this.currentRange.end - Math.abs((this.currentRange.end - this.currentRange.start) / 2)), this.currentAxis.visibleRange.max, this.currentAxis.visibleRange.min, this.currentAxis.startAngle, this.currentAxis.endAngle, this.currentAxis.direction === 'ClockWise') % 360;
            var rangeTooltipFormat = this.gauge.tooltip.rangeSettings.format || this.currentAxis.labelStyle.format;
            var customLabelFormat = rangeTooltipFormat && (rangeTooltipFormat.match('{end}') !== null ||
                rangeTooltipFormat.match('{start}') !== null);
            var rangeFormat = this.gauge.intl.getNumberFormat({
                format: getLabelFormat(rangeTooltipFormat), useGrouping: this.gauge.useGroupingSeparator
            });
            this.tooltipElement();
            var roundStartValue = this.roundedValue(this.currentRange.start);
            var roundEndValue = this.roundedValue(this.currentRange.end);
            var startData = (this.currentRange.start).toString();
            var endData = (this.currentRange.end).toString();
            var rangeContent = customLabelFormat ?
                rangeTooltipFormat.replace(/{start}/g, startData).replace(/{end}/g, endData) :
                'Start : ' + rangeFormat(roundStartValue) + '<br>' + 'End : ' + rangeFormat(roundEndValue);
            location = getLocationFromAngle(rangeAngle, this.currentRange.currentRadius, this.gauge.midPoint);
            location.x = (this.tooltip.rangeSettings.template && ((rangeAngle >= 150 && rangeAngle <= 250) ||
                (rangeAngle >= 330 && rangeAngle <= 360) ||
                (rangeAngle >= 0 && rangeAngle <= 45))) ? (location.x + 10) : location.x;
            var rangeTooltipArgs = {
                name: tooltipRender, cancel: false, content: rangeContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, range: this.currentRange, event: e, gauge: this.gauge, appendInBodyTag: false
            };
            if (this.gauge.isBlazor) {
                var gauge = rangeTooltipArgs.gauge, blazorEventArgs = __rest(rangeTooltipArgs, ["gauge"]);
                rangeTooltipArgs = blazorEventArgs;
            }
            this.gauge.trigger(tooltipRender, rangeTooltipArgs);
            var rangeTemplate = rangeTooltipArgs.tooltip.rangeSettings.template;
            if (rangeTemplate !== null && rangeTemplate.length === 1) {
                rangeTemplate = rangeTemplate[rangeTemplate[0]];
            }
            if (rangeTemplate) {
                rangeTemplate = rangeTemplate.replace(/[$]{start}/g, startData);
                rangeTemplate = rangeTemplate.replace(/[$]{end}/g, endData);
            }
            if (!this.tooltip.rangeSettings.showAtMousePosition) {
                if (rangeTemplate) {
                    var elementSize = getElementSize(rangeTemplate, this.gauge, this.tooltipEle);
                    this.tooltipRect = Math.abs(rangeAxisRect.left - rangeSvgRect.left) > elementSize.width ?
                        this.findPosition(rect, rangeAngle, rangeContent, rangeTooltipArgs.location) : rect;
                }
                else {
                    this.findPosition(rect, rangeAngle, rangeContent, rangeTooltipArgs.location);
                }
            }
            else {
                rangeTooltipArgs.location = getMousePosition(pageX, pageY, this.gauge.svgObject);
                this.tooltipRect = rect;
            }
            if (!rangeTooltipArgs.cancel) {
                rangeTooltipArgs.tooltip.rangeSettings.textStyle.color = rangeTooltipArgs.tooltip.rangeSettings.textStyle.color ||
                    this.gauge.themeStyle.tooltipFontColor;
                rangeTooltipArgs.tooltip.rangeSettings.textStyle.fontFamily = this.gauge.themeStyle.fontFamily ||
                    rangeTooltipArgs.tooltip.rangeSettings.textStyle.fontFamily;
                rangeTooltipArgs.tooltip.rangeSettings.textStyle.opacity = this.gauge.themeStyle.tooltipTextOpacity ||
                    rangeTooltipArgs.tooltip.rangeSettings.textStyle.opacity;
                this.svgTooltip = this.svgTooltipCreate(this.svgTooltip, rangeTooltipArgs, rangeTemplate, this.arrowInverted, this.tooltipRect, this.gauge, rangeTooltipArgs.tooltip.rangeSettings.fill, rangeTooltipArgs.tooltip.rangeSettings.textStyle, rangeTooltipArgs.tooltip.rangeSettings.border);
                this.svgTooltip.opacity = this.gauge.themeStyle.tooltipFillOpacity || this.svgTooltip.opacity;
                this.svgTooltip.appendTo(this.tooltipEle);
                if (rangeTemplate && Math.abs(pageY - this.tooltipEle.getBoundingClientRect().top) <= 0) {
                    this.tooltipEle.style.top = (parseFloat(this.tooltipEle.style.top) + 20) + 'px';
                }
            }
        }
        else if ((this.tooltip.type.indexOf('Annotation') > -1) && this.checkParentAnnotationId(target) && ((!this.gauge.isDrag)) &&
            (this.annotationTargetElement.id.indexOf(this.gaugeId) >= 0)) {
            var annotationSvgRect = this.gauge.svgObject.getBoundingClientRect();
            var annotationElementRect = this.gauge.element.getBoundingClientRect();
            var annotationAxisRect = document.getElementById(this.gauge.element.id + '_AxesCollection').getBoundingClientRect();
            var rect = new Rect(Math.abs(annotationElementRect.left - annotationSvgRect.left), Math.abs(annotationElementRect.top - annotationSvgRect.top), annotationSvgRect.width, annotationSvgRect.height);
            var currentAnnotation = getPointer(this.annotationTargetElement.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentAnnotation.axisIndex];
            this.currentAnnotation = (this.currentAxis.annotations)[currentAnnotation.pointerIndex];
            var annotationAngle = (this.currentAnnotation.angle - 90);
            this.tooltipElement();
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(this.tooltipEle);
            var annotationContent = (this.gauge.tooltip.annotationSettings.format !== null) ?
                this.gauge.tooltip.annotationSettings.format : '';
            location = getLocationFromAngle(annotationAngle, stringToNumber(this.currentAnnotation.radius, this.currentAxis.currentRadius), this.gauge.midPoint);
            location.x = (this.tooltip.annotationSettings.template && ((annotationAngle >= 150 && annotationAngle <= 250) ||
                (annotationAngle >= 330 && annotationAngle <= 360) || (annotationAngle >= 0 && annotationAngle <= 45))) ?
                (location.x + 10) : location.x;
            var annotationTooltipArgs = {
                name: tooltipRender, cancel: false, content: annotationContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, annotation: this.currentAnnotation, event: e, gauge: this.gauge, appendInBodyTag: false
            };
            if (this.gauge.isBlazor) {
                var gauge = annotationTooltipArgs.gauge, blazorEventArgs = __rest(annotationTooltipArgs, ["gauge"]);
                annotationTooltipArgs = blazorEventArgs;
            }
            this.gauge.trigger(tooltipRender, annotationTooltipArgs);
            var annotationTemplate = annotationTooltipArgs.tooltip.annotationSettings.template;
            if (annotationTemplate !== null && annotationTemplate.length === 1) {
                annotationTemplate = annotationTemplate[annotationTemplate[0]];
            }
            var elementSizeAn = this.annotationTargetElement.getBoundingClientRect();
            this.tooltipPosition = 'RightTop';
            this.arrowInverted = true;
            annotationTooltipArgs.location.x = annotationTooltipArgs.location.x + (elementSizeAn.width / 2);
            this.tooltipRect = new Rect(rect.x, rect.y, rect.width, rect.height);
            if (!annotationTooltipArgs.cancel && (this.gauge.tooltip.annotationSettings.format !== null ||
                this.gauge.tooltip.annotationSettings.template !== null)) {
                annotationTooltipArgs.tooltip.annotationSettings.textStyle.color = annotationTooltipArgs.tooltip.textStyle.color ||
                    this.gauge.themeStyle.tooltipFontColor;
                annotationTooltipArgs.tooltip.annotationSettings.textStyle.fontFamily = this.gauge.themeStyle.fontFamily ||
                    annotationTooltipArgs.tooltip.textStyle.fontFamily;
                annotationTooltipArgs.tooltip.annotationSettings.textStyle.opacity = this.gauge.themeStyle.tooltipTextOpacity ||
                    annotationTooltipArgs.tooltip.textStyle.opacity;
                this.svgTooltip = this.svgTooltipCreate(this.svgTooltip, annotationTooltipArgs, annotationTemplate, this.arrowInverted, this.tooltipRect, this.gauge, annotationTooltipArgs.tooltip.annotationSettings.fill, annotationTooltipArgs.tooltip.annotationSettings.textStyle, annotationTooltipArgs.tooltip.annotationSettings.border);
                this.svgTooltip.opacity = this.gauge.themeStyle.tooltipFillOpacity || this.svgTooltip.opacity;
                this.svgTooltip.appendTo(this.tooltipEle);
                if (annotationTemplate && Math.abs(pageY - this.tooltipEle.getBoundingClientRect().top) <= 0) {
                    this.tooltipEle.style.top = (parseFloat(this.tooltipEle.style.top) + 20) + 'px';
                }
            }
        }
        else {
            this.removeTooltip();
        }
    };
    ;
    /**
     * Method to create tooltip svg element.
     */
    GaugeTooltip.prototype.svgTooltipCreate = function (svgTooltip, tooltipArg, template, arrowInverted, tooltipRect, gauge, fill, textStyle, border) {
        svgTooltip = new Tooltip({
            enable: true,
            data: { value: tooltipArg.content },
            template: template,
            enableAnimation: tooltipArg.tooltip.enableAnimation,
            content: [tooltipArg.content],
            location: tooltipArg.location,
            inverted: arrowInverted,
            areaBounds: tooltipRect,
            fill: fill || gauge.themeStyle.tooltipFillColor,
            textStyle: textStyle,
            availableSize: gauge.availableSize,
            border: border,
            blazorTemplate: { name: 'TooltipTemplate', parent: gauge.tooltip }
        });
        return svgTooltip;
    };
    /**
     * Method to create or modify tolltip element.
     */
    GaugeTooltip.prototype.tooltipElement = function () {
        if (document.getElementById(this.tooltipId)) {
            this.tooltipEle = document.getElementById(this.tooltipId);
        }
        else {
            this.tooltipEle = createElement('div', {
                id: this.tooltipId,
                className: 'EJ2-CircularGauge-Tooltip',
                styles: 'position: absolute;pointer-events:none;'
            });
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(this.tooltipEle);
        }
    };
    ;
    /**
     * Method to get parent annotation element.
     */
    GaugeTooltip.prototype.checkParentAnnotationId = function (child) {
        this.annotationTargetElement = child.parentElement;
        while (this.annotationTargetElement != null) {
            if ((this.annotationTargetElement.id.indexOf('_Annotation_') >= 0)) {
                child = this.annotationTargetElement;
                return true;
            }
            this.annotationTargetElement = this.annotationTargetElement.parentElement;
        }
        return false;
    };
    /**
     * Method to apply label rounding places.
     */
    GaugeTooltip.prototype.roundedValue = function (currentValue) {
        var roundNumber;
        roundNumber = this.currentAxis.roundingPlaces ?
            parseFloat(currentValue.toFixed(this.currentAxis.roundingPlaces)) :
            currentValue;
        return roundNumber;
    };
    /**
     * Method to find the position of the tooltip anchor for circular gauge.
     */
    GaugeTooltip.prototype.findPosition = function (rect, angle, text, location) {
        var addLeft;
        var addTop;
        var addHeight;
        var addWidth;
        switch (true) {
            case (angle >= 0 && angle < 45):
                this.arrowInverted = true;
                addLeft = (angle >= 15 && angle <= 30) ? location.y : 0;
                this.tooltipRect = new Rect(rect.x, rect.y + addTop, rect.width, rect.height);
                this.tooltipPosition = 'RightBottom';
                break;
            case (angle >= 45 && angle < 90):
                this.arrowInverted = false;
                this.tooltipRect = new Rect(rect.x, rect.y + location.y, rect.width, rect.height);
                this.tooltipPosition = 'BottomRight';
                break;
            case (angle >= 90 && angle < 135):
                this.arrowInverted = false;
                this.tooltipRect = new Rect(rect.x, rect.y + location.y, rect.width, rect.height);
                this.tooltipPosition = 'BottomLeft';
                break;
            case (angle >= 135 && angle < 180):
                this.arrowInverted = true;
                addTop = (angle >= 150 && angle <= 160) ? location.y : 0;
                this.tooltipRect = new Rect(rect.x - rect.width, rect.y + addTop, rect.width, rect.height);
                this.tooltipPosition = 'LeftBottom';
                break;
            case (angle >= 180 && angle < 225):
                this.arrowInverted = true;
                addHeight = (angle >= 200 && angle <= 225) ? Math.abs(rect.y - location.y) : rect.height;
                this.tooltipRect = new Rect(rect.x - rect.width, rect.y, rect.width, addHeight);
                this.tooltipPosition = 'LeftTop';
                break;
            case (angle >= 225 && angle < 270):
                this.arrowInverted = false;
                addWidth = (angle >= 250 && angle <= 290) ? rect.width : Math.abs(rect.x - location.x);
                this.tooltipRect = new Rect(rect.x, rect.y, addWidth, rect.height);
                this.tooltipPosition = 'TopLeft';
                break;
            case (angle >= 270 && angle < 315):
                this.arrowInverted = false;
                addLeft = (angle >= 270 && angle > 290) ? location.x : 0;
                this.tooltipRect = new Rect(rect.x + addLeft, rect.y, rect.width, rect.height);
                this.tooltipPosition = 'TopRight';
                break;
            case (angle >= 315 && angle <= 360):
                this.arrowInverted = true;
                addHeight = (angle >= 315 && angle <= 340) ? Math.abs(rect.y - location.y) : rect.height;
                this.tooltipRect = new Rect(rect.x, rect.y, rect.width, addHeight);
                this.tooltipPosition = 'RightTop';
                break;
        }
        return this.tooltipRect;
    };
    GaugeTooltip.prototype.removeTooltip = function () {
        if (document.getElementsByClassName('EJ2-CircularGauge-Tooltip').length > 0) {
            var tooltip = document.getElementsByClassName('EJ2-CircularGauge-Tooltip')[0];
            if (tooltip) {
                remove(tooltip);
            }
            this.pointerEle = null;
        }
    };
    GaugeTooltip.prototype.mouseUpHandler = function (e) {
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    };
    /**
     * To bind events for tooltip module
     */
    GaugeTooltip.prototype.addEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.gauge.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    /**
     * To unbind events for tooltip module
     */
    GaugeTooltip.prototype.removeEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.off(Browser.touchMoveEvent, this.renderTooltip);
        this.gauge.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /**
     * Get module name.
     */
    GaugeTooltip.prototype.getModuleName = function () {
        // Returns te module name
        return 'Tooltip';
    };
    /**
     * To destroy the tooltip.
     * @return {void}
     * @private
     */
    GaugeTooltip.prototype.destroy = function (gauge) {
        // Destroy method performed here
        this.removeEventListener();
    };
    return GaugeTooltip;
}());
export { GaugeTooltip };
