import { createElement, Browser } from '@syncfusion/ej2-base';
import { tooltipRender } from '../model/constant';
import { Tooltip } from '@syncfusion/ej2-svg-base';
import { getElement, GaugeLocation, Size, textFormatter, formatValue, Rect } from '../utils/helper';
import { getPointer } from '../utils/helper';
/**
 * Represent the tooltip rendering for gauge
 */
var GaugeTooltip = /** @class */ (function () {
    function GaugeTooltip(gauge) {
        this.gauge = gauge;
        this.element = gauge.element;
        this.tooltip = gauge.tooltip;
        this.textStyle = this.tooltip.textStyle;
        this.borderStyle = this.tooltip.border;
        this.tooltipId = this.gauge.element.id + '_LinearGauge_Tooltip';
        this.addEventListener();
    }
    /**
     * Internal use for tooltip rendering
     * @param pointerElement
     */
    /* tslint:disable:no-string-literal */
    GaugeTooltip.prototype.renderTooltip = function (e) {
        var _this = this;
        var pageX;
        var pageY;
        var target;
        var touchArg;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        var tooltipEle;
        var tooltipContent;
        if (target.id.indexOf('Pointer') > -1) {
            this.pointerElement = target;
            var areaRect_1 = this.gauge.element.getBoundingClientRect();
            var current = getPointer(this.pointerElement, this.gauge);
            this.currentAxis = current.axis;
            this.axisIndex = current.axisIndex;
            this.currentPointer = current.pointer;
            var customTooltipFormat = this.tooltip.format && this.tooltip.format.match('{value}') !== null;
            this.tooltip.textStyle.fontFamily = this.gauge.themeStyle.fontFamily || this.tooltip.textStyle.fontFamily;
            this.tooltip.textStyle.opacity = this.gauge.themeStyle.tooltipTextOpacity || this.tooltip.textStyle.opacity;
            tooltipContent = customTooltipFormat ? textFormatter(this.tooltip.format, { value: this.currentPointer.currentValue }, this.gauge) :
                formatValue(this.currentPointer.currentValue, this.gauge).toString();
            if (document.getElementById(this.tooltipId)) {
                tooltipEle = document.getElementById(this.tooltipId);
            }
            else {
                tooltipEle = createElement('div', {
                    id: this.tooltipId,
                    className: 'EJ2-LinearGauge-Tooltip',
                    styles: 'position: absolute;pointer-events:none;'
                });
                document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(tooltipEle);
            }
            if (tooltipEle.childElementCount !== 0 && !this.gauge.pointerDrag) {
                return null;
            }
            var location_1 = this.getTooltipLocation();
            var args_1 = {
                name: tooltipRender,
                cancel: false,
                gauge: this.gauge,
                event: e,
                location: location_1,
                content: tooltipContent,
                tooltip: this.tooltip,
                axis: this.currentAxis,
                pointer: this.currentPointer
            };
            var tooltipPos_1 = this.getTooltipPosition();
            location_1.y += (this.tooltip.template && tooltipPos_1 === 'Top') ? 20 : 0;
            location_1.x += (this.tooltip.template && tooltipPos_1 === 'Right') ? 20 : 0;
            this.gauge.trigger(tooltipRender, args_1, function (observedArgs) {
                var template = args_1.tooltip.template;
                if (template !== null && Object.keys(template).length === 1) {
                    template = template[Object.keys(template)[0]];
                }
                var themes = _this.gauge.theme.toLowerCase();
                if (!args_1.cancel) {
                    args_1['tooltip']['properties']['textStyle']['color'] = _this.tooltip.textStyle.color ||
                        _this.gauge.themeStyle.tooltipFontColor;
                    _this.svgTooltip = new Tooltip({
                        enable: true,
                        header: '',
                        data: { value: args_1.pointer.currentValue },
                        template: template,
                        content: [args_1.content],
                        shapes: [],
                        location: args_1.location,
                        palette: [],
                        inverted: !(args_1.gauge.orientation === 'Horizontal'),
                        enableAnimation: args_1.tooltip.enableAnimation,
                        fill: _this.tooltip.fill || _this.gauge.themeStyle.tooltipFillColor,
                        availableSize: _this.gauge.availableSize,
                        areaBounds: new Rect(areaRect_1.left, tooltipPos_1 === 'Bottom' ? location_1.y : areaRect_1.top, tooltipPos_1 === 'Right' ? Math.abs(areaRect_1.left - location_1.x) : areaRect_1.width, areaRect_1.height),
                        textStyle: args_1.tooltip.textStyle,
                        border: args_1.tooltip.border,
                        theme: args_1.gauge.theme,
                        blazorTemplate: { name: 'TooltipTemplate', parent: _this.gauge.tooltip }
                    });
                    _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(tooltipEle);
                }
            });
        }
        else {
            this.removeTooltip();
        }
    };
    GaugeTooltip.prototype.getTooltipPosition = function () {
        var position;
        if (this.gauge.orientation === 'Vertical') {
            position = (!this.currentAxis.opposedPosition) ? 'Left' : 'Right';
        }
        else {
            position = (this.currentAxis.opposedPosition) ? 'Top' : 'Bottom';
        }
        return position;
    };
    GaugeTooltip.prototype.getTooltipLocation = function () {
        var location;
        var bounds;
        var radix = 10;
        var lineX;
        var lineY;
        var size = new Size(this.gauge.availableSize.width, this.gauge.availableSize.height);
        var x;
        var y;
        var height;
        var width;
        var lineId = this.gauge.element.id + '_AxisLine_' + this.axisIndex;
        var tickID = this.gauge.element.id + '_MajorTicksLine_' + this.axisIndex;
        var lineBounds;
        if (getElement(lineId)) {
            lineBounds = getElement(lineId).getBoundingClientRect();
            lineX = lineBounds.left;
            lineY = lineBounds.top;
        }
        else {
            lineBounds = getElement(tickID).getBoundingClientRect();
            lineX = (!this.currentAxis.opposedPosition) ? (lineBounds.left + lineBounds.width) : lineBounds.left;
            lineY = (!this.currentAxis.opposedPosition) ? (lineBounds.top + lineBounds.height) : lineBounds.top;
        }
        bounds = this.pointerElement.getBoundingClientRect();
        var elementRect = this.gauge.element.getBoundingClientRect();
        x = bounds.left - elementRect.left;
        y = bounds.top - elementRect.top;
        height = bounds.height;
        width = bounds.width;
        if (this.gauge.orientation === 'Vertical') {
            x = (lineX - elementRect.left);
            y = (this.currentPointer.type === 'Marker') ? y + (height / 2) : (!this.currentAxis.isInversed) ? y : y + height;
        }
        else {
            y = (lineY - elementRect.top);
            x = (this.currentPointer.type === 'Marker') ? (x + width / 2) : (!this.currentAxis.isInversed) ? x + width : x;
        }
        location = new GaugeLocation(x, y);
        return location;
    };
    GaugeTooltip.prototype.removeTooltip = function () {
        if (document.getElementsByClassName('EJ2-LinearGauge-Tooltip').length > 0) {
            document.getElementsByClassName('EJ2-LinearGauge-Tooltip')[0].remove();
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
    /*
     * Get module name.
     */
    GaugeTooltip.prototype.getModuleName = function () {
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
