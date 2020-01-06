import { ClosestPoint, SmithchartRect } from '../../smithchart/utils/utils';
import { Tooltip } from '@syncfusion/ej2-svg-base';
import { isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
/**
 * To render tooltip
 */
var TooltipRender = /** @class */ (function () {
    function TooltipRender() {
    }
    TooltipRender.prototype.smithchartMouseMove = function (smithchart, e) {
        var touchArg;
        var pageX;
        var pageY;
        if (e.type === 'touchend' || e.type === 'touchmove') {
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            this.tooltipElement = undefined;
        }
        else {
            pageY = e.clientY;
            pageX = e.clientX;
        }
        this.setMouseXY(smithchart, pageX, pageY);
        for (var i = 0; i < smithchart.series.length; i++) {
            var series = smithchart.series[i];
            var seriesIndex = i;
            var closestPoint = new ClosestPoint();
            closestPoint = this.closestPointXY(smithchart, this.mouseX, this.mouseY, series, seriesIndex);
            if (closestPoint.location && series.tooltip.visible && series.visibility === 'visible') {
                this.createTooltip(smithchart, e, closestPoint.index, seriesIndex, series);
                break;
            }
            else if (this.tooltipElement && this.tooltipElement.enable && !series.tooltip.template) {
                this.tooltipElement.fadeOut();
                this.tooltipElement.enable = false;
            }
            else if (series.tooltip.template) {
                this.tooltipElement.fadeOut();
            }
        }
        return this.tooltipElement;
    };
    TooltipRender.prototype.setMouseXY = function (smithchart, pageX, pageY) {
        var rect = smithchart.element.getBoundingClientRect();
        var svgRect = document.getElementById(smithchart.element.id + '_svg').getBoundingClientRect();
        this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
    };
    TooltipRender.prototype.createTooltip = function (smithchart, e, pointindex, seriesindex, series) {
        var pointX = series.points[pointindex].resistance;
        var pointY = series.points[pointindex].reactance;
        var tooltipText = [pointX + ' ' + ':' + ' ' + '<b>' + pointY + '</b>'];
        var markerHeight = smithchart.series[seriesindex].marker.height / 2;
        var div = document.getElementById(smithchart.element.id + '_smithchart_tooltip_div');
        if (isNullOrUndefined(div)) {
            div = createElement('div', {
                id: smithchart.element.id + '_smithchart_tooltip_div',
                styles: 'pointer-events: none; position: absolute;z-index:1;'
            });
            document.getElementById(smithchart.element.id + '_Secondary_Element').appendChild(div);
        }
        this.tooltipElement = new Tooltip({
            enable: true,
            header: '<b>' + series.name + '</b>',
            content: tooltipText,
            border: series.tooltip.border,
            fill: smithchart.themeStyle.tooltipFill,
            data: { reactance: pointY },
            template: series.tooltip.template,
            location: {
                x: this.locationX + smithchart.element.offsetLeft,
                y: this.locationY - markerHeight + smithchart.element.offsetTop
            },
            shared: false,
            areaBounds: new SmithchartRect(smithchart.bounds.x, smithchart.bounds.y, smithchart.bounds.width, smithchart.bounds.height),
            palette: [series.fill || smithchart.seriesColors[seriesindex % smithchart.seriesColors.length]],
            shapes: ['Circle'],
            availableSize: smithchart.availableSize,
            theme: smithchart.theme,
            blazorTemplate: { name: 'TooltipTemplate', parent: smithchart.series[seriesindex].tooltip }
        });
        this.tooltipElement.opacity = smithchart.themeStyle.tooltipFillOpacity || this.tooltipElement.opacity;
        this.tooltipElement.textStyle.fontFamily = smithchart.themeStyle.fontFamily || 'Roboto, Segoe UI, Noto, Sans-serif';
        this.tooltipElement.textStyle.opacity = smithchart.themeStyle.tooltipTextOpacity || this.tooltipElement.textStyle.opacity;
        this.tooltipElement.appendTo(div);
    };
    TooltipRender.prototype.closestPointXY = function (smithchart, x, y, series, seriesindex) {
        var pointIndex;
        var chartPoint;
        var closePoint;
        for (var j = 0; j < series.points.length; j++) {
            chartPoint = smithchart.seriesrender.getLocation(seriesindex, j);
            this.locationX = chartPoint.x;
            this.locationY = chartPoint.y;
            pointIndex = j;
            var a = x - chartPoint.x;
            var b = y - chartPoint.y;
            var distance = Math.abs(Math.sqrt((a * a) + (b * b)));
            if (distance < series.marker.width) {
                closePoint = chartPoint;
                pointIndex = j;
                break;
            }
        }
        return { location: closePoint, index: pointIndex };
    };
    /**
     * Get module name.
     */
    TooltipRender.prototype.getModuleName = function () {
        return 'TooltipRender';
    };
    /**
     * To destroy the legend.
     * @return {void}
     * @private
     */
    TooltipRender.prototype.destroy = function (smithchart) {
        /**
         * Destroy method performed here
         */
    };
    return TooltipRender;
}());
export { TooltipRender };
