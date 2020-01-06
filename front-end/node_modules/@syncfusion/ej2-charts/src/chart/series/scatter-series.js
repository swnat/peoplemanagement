import { withInRange, getPoint, drawSymbol, getElement } from '../../common/utils/helper';
import { markerAnimate, TransformToVisible, appendChildElement } from '../../common/utils/helper';
import { PathOption, Rect, Size } from '@syncfusion/ej2-svg-base';
import { pointRender } from '../../common/model/constants';
/**
 * `ScatterSeries` module is used to render the scatter series.
 */
var ScatterSeries = /** @class */ (function () {
    function ScatterSeries() {
    }
    /**
     * Render the scatter series.
     * @return {void}
     * @private
     */
    ScatterSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        // Scatter series DataLabel is not rendered after selecting StackingColumn
        series.isRectSeries = false;
        var marker = series.marker;
        var visiblePoints = series.points;
        var argsData;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var startLocation;
        var redraw = series.chart.redraw;
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            startLocation = (redraw && point.symbolLocations) ? point.symbolLocations[0] : null;
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                argsData = {
                    cancel: false, name: pointRender, series: series, point: point,
                    fill: series.setPointColor(point, series.interior),
                    border: series.setBorderColor(point, { width: series.border.width, color: series.border.color }),
                    height: marker.height, width: marker.width, shape: marker.shape
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series));
                    point.color = argsData.fill;
                    this.refresh(series, point, argsData, startLocation);
                }
                else {
                    point.marker = { visible: true };
                }
            }
        }
    };
    /**
     * To append scatter element
     * @param series
     * @param point
     * @param argsData
     * @param startLocation
     */
    ScatterSeries.prototype.refresh = function (series, point, argsData, startLocation) {
        var chart = series.chart;
        var circlePath;
        var previousPath;
        var marker = series.marker;
        var shapeOption = new PathOption(chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
        if (chart.redraw && getElement(shapeOption.id)) {
            circlePath = argsData.shape === 'Circle' ? 'c' : '';
            previousPath = getElement(shapeOption.id).getAttribute('d');
        }
        appendChildElement(false, series.seriesElement, drawSymbol(point.symbolLocations[0], argsData.shape, new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.yValue.toString(), series.chart.svgRenderer, series.clipRect), chart.redraw, true, circlePath + 'x', circlePath + 'y', startLocation, previousPath);
        point.regions.push(new Rect(point.symbolLocations[0].x - marker.width, point.symbolLocations[0].y - marker.height, 2 * marker.width, 2 * marker.height));
        point.marker = {
            border: argsData.border, fill: argsData.fill,
            height: argsData.height, visible: true,
            width: argsData.width, shape: argsData.shape
        };
    };
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    ScatterSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.symbolLocations.length || !rectElements[count]) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
            count++;
        }
    };
    /**
     * Get module name.
     */
    ScatterSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'ScatterSeries';
    };
    /**
     * To destroy the scatter.
     * @return {void}
     */
    ScatterSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    return ScatterSeries;
}());
export { ScatterSeries };
