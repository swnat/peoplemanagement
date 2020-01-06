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
import { Browser, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getMousePosition, textFormatter, formatValue } from '../utils/helper';
import { tooltipRendering } from '../model/constants';
/**
 * Render Tooltip
 */
var TreeMapTooltip = /** @class */ (function () {
    function TreeMapTooltip(treeMap) {
        this.treemap = treeMap;
        this.tooltipSettings = this.treemap.tooltipSettings;
        this.tooltipId = this.treemap.element.id + '_TreeMapTooltip';
        this.addEventListener();
    }
    /* tslint:disable:no-string-literal */
    TreeMapTooltip.prototype.renderTooltip = function (e) {
        var _this = this;
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var tootipArgs;
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
        var value;
        var targetId = target.id;
        var item = {};
        var tooltipEle;
        var location;
        var toolTipHeader;
        var toolTipData = {};
        var tooltipContent = [];
        var markerFill;
        if (targetId.indexOf('_Item_Index') > -1) {
            item = this.treemap.layout.renderItems[parseFloat(targetId.split('_')[6])];
            if (!isNullOrUndefined(item)) {
                toolTipHeader = item['name'];
                value = item['weight'];
                toolTipData = item['data'];
                markerFill = item['options']['fill'];
                if (this.treemap.enableRtl) {
                    tooltipContent = [textFormatter(this.tooltipSettings.format, toolTipData, this.treemap) ||
                            formatValue(value, this.treemap) + ' : ' + this.treemap.weightValuePath.toString()];
                }
                else {
                    tooltipContent = [textFormatter(this.tooltipSettings.format, toolTipData, this.treemap) ||
                            this.treemap.weightValuePath.toString() + ' : ' + formatValue(value, this.treemap)];
                }
                if (document.getElementById(this.tooltipId)) {
                    tooltipEle = document.getElementById(this.tooltipId);
                }
                else {
                    tooltipEle = createElement('div', {
                        id: this.treemap.element.id + '_TreeMapTooltip',
                        className: 'EJ2-TreeMap-Tooltip',
                        styles: 'position: absolute;pointer-events:none;'
                    });
                    document.getElementById(this.treemap.element.id + '_Secondary_Element').appendChild(tooltipEle);
                }
                location = getMousePosition(pageX, pageY, this.treemap.svgObject);
                location.y = (this.tooltipSettings.template) ? location.y + 10 : location.y;
                this.tooltipSettings.textStyle.fontFamily = this.treemap.themeStyle.fontFamily;
                this.tooltipSettings.textStyle.color = this.treemap.themeStyle.tooltipFontColor
                    || this.tooltipSettings.textStyle.color;
                this.tooltipSettings.textStyle.opacity = this.treemap.themeStyle.tooltipTextOpacity
                    || this.tooltipSettings.textStyle.opacity;
                tootipArgs = {
                    cancel: false, name: tooltipRendering, item: item,
                    options: {
                        location: location, text: tooltipContent, data: toolTipData,
                        textStyle: this.tooltipSettings.textStyle, template: this.tooltipSettings.template
                    },
                    treemap: this.treemap,
                    element: target, eventArgs: e
                };
                if (this.treemap.isBlazor) {
                    var tooltipArgs_1 = {
                        cancel: false,
                        location: tootipArgs.options['location'],
                        text: tootipArgs.options['text'],
                        textStyle: tootipArgs.options['textStyle'],
                        data: tootipArgs.options['data'],
                        template: tootipArgs.options['template'],
                        name: tooltipRendering
                    };
                    this.treemap.trigger(tooltipRendering, tooltipArgs_1, function (args) {
                        _this.addTooltip(null, markerFill, tooltipEle, tooltipArgs_1);
                    });
                }
                else {
                    this.treemap.trigger(tooltipRendering, tootipArgs, function (args) {
                        _this.addTooltip(tootipArgs, markerFill, tooltipEle);
                    });
                }
            }
        }
        else {
            this.removeTooltip();
        }
    };
    TreeMapTooltip.prototype.addTooltip = function (tootipArgs, markerFill, tooltipEle, eventArgs) {
        var cancel;
        var args;
        if (!isNullOrUndefined(tootipArgs)) {
            var c = tootipArgs.cancel, otherArgs = __rest(tootipArgs, ["cancel"]);
            cancel = c;
            args = otherArgs.options;
        }
        else {
            cancel = eventArgs.cancel;
            args = eventArgs;
        }
        if (!cancel) {
            this.svgTooltip = new Tooltip({
                enable: true,
                header: '',
                data: args['data'],
                template: args['template'],
                content: args['text'],
                shapes: [],
                location: args['location'],
                palette: [markerFill],
                areaBounds: this.treemap.areaRect,
                textStyle: args['textStyle'],
                blazorTemplate: { name: 'TooltipTemplate', parent: this.treemap.tooltipSettings }
            });
            this.svgTooltip.opacity = this.treemap.themeStyle.tooltipFillOpacity || this.svgTooltip.opacity;
            this.svgTooltip.appendTo(tooltipEle);
        }
        else {
            this.removeTooltip();
        }
    };
    TreeMapTooltip.prototype.mouseUpHandler = function (e) {
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    };
    TreeMapTooltip.prototype.removeTooltip = function () {
        if (document.getElementsByClassName('EJ2-TreeMap-Tooltip').length > 0) {
            var tooltipElementId = document.getElementsByClassName('EJ2-TreeMap-Tooltip')[0];
            tooltipElementId.parentNode.removeChild(tooltipElementId);
        }
    };
    /**
     * To bind events for tooltip module
     */
    TreeMapTooltip.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.treemap.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    /**
     * To unbind events for tooltip module
     */
    TreeMapTooltip.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.renderTooltip);
        this.treemap.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /**
     * Get module name.
     */
    TreeMapTooltip.prototype.getModuleName = function () {
        return 'treeMapTooltip';
    };
    /**
     * To destroy the tooltip.
     * @return {void}
     * @private
     */
    TreeMapTooltip.prototype.destroy = function (treeMap) {
        /**
         * Destroy method performed here
         */
        this.removeEventListener();
    };
    return TreeMapTooltip;
}());
export { TreeMapTooltip };
