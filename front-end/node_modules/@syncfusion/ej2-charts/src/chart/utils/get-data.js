import { withInBounds, PointData, getValueXByPoint, getValueYByPoint } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
/**
 * To get the data on mouse move.
 * @private
 */
var ChartData = /** @class */ (function () {
    /**
     * Constructor for the data.
     * @private
     */
    function ChartData(chart) {
        /** @private */
        this.currentPoints = [];
        /** @private */
        this.previousPoints = [];
        this.insideRegion = false;
        this.chart = chart;
        this.lierIndex = 0;
    }
    /**
     * Method to get the Data.
     * @private
     */
    ChartData.prototype.getData = function () {
        var chart = this.chart;
        var point = null;
        var series = null;
        var width;
        var height;
        var mouseX;
        var mouseY;
        for (var len = chart.visibleSeries.length, i = len - 1; i >= 0; i--) {
            series = chart.visibleSeries[i];
            width = (series.type === 'Scatter' || series.drawType === 'Scatter' || (!series.isRectSeries && series.marker.visible))
                ? (series.marker.height + 5) / 2 : 0;
            height = (series.type === 'Scatter' || series.drawType === 'Scatter' || (!series.isRectSeries && series.marker.visible))
                ? (series.marker.width + 5) / 2 : 0;
            mouseX = chart.mouseX;
            mouseY = chart.mouseY;
            if (series.dragSettings.enable && series.isRectSeries) {
                if (!(series.type === 'Bar' && chart.isTransposed) && (chart.isTransposed || series.type === 'Bar')) {
                    var markerWidth = series.marker.width / 2;
                    mouseX = series.yAxis.isInversed ? mouseX + markerWidth : mouseX - markerWidth;
                }
                else {
                    var markerHeight = series.marker.height / 2;
                    mouseY = series.yAxis.isInversed ? mouseY - markerHeight : mouseY + markerHeight;
                }
            }
            if (series.visible && withInBounds(mouseX, mouseY, series.clipRect, width, height)) {
                point = this.getRectPoint(series, series.clipRect, mouseX, mouseY);
            }
            if (point) {
                return new PointData(point, series);
            }
        }
        return new PointData(point, series);
    };
    ChartData.prototype.isSelected = function (chart) {
        return ((chart.selectionMode.indexOf('Drag') > -1 || chart.selectionMode.indexOf('Lasso') > -1) && chart.selectionModule &&
            chart.selectionModule.rectPoints !== null);
    };
    ChartData.prototype.getRectPoint = function (series, rect, x, y) {
        var currentRect;
        var chart = this.chart;
        var fromCenterX;
        var fromCenterY;
        var clickAngle;
        var arcAngle = 0;
        var startAngle;
        var endAngle;
        var distanceFromCenter;
        if (chart.isScrolling) {
            return null;
        }
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.regionData) {
                if (!point.regions || !point.regions.length) {
                    continue;
                }
            }
            if (point.regionData && this.chart.chartAreaType === 'PolarRadar' && series.drawType.indexOf('Column') > -1) {
                fromCenterX = x - (series.clipRect.width / 2 + series.clipRect.x);
                fromCenterY = y - (series.clipRect.height / 2 + series.clipRect.y);
                arcAngle = 2 * Math.PI * (point.regionData.currentXPosition < 0 ? 1 + point.regionData.currentXPosition
                    : point.regionData.currentXPosition);
                clickAngle = (Math.atan2(fromCenterY, fromCenterX) + 0.5 * Math.PI - arcAngle) % (2 * Math.PI);
                clickAngle = clickAngle < 0 ? 2 * Math.PI + clickAngle : clickAngle;
                clickAngle = clickAngle + 2 * Math.PI * series.chart.primaryXAxis.startAngle;
                startAngle = point.regionData.startAngle;
                startAngle -= arcAngle;
                startAngle = startAngle < 0 ? 2 * Math.PI + startAngle : startAngle;
                endAngle = point.regionData.endAngle;
                endAngle -= arcAngle;
                endAngle = endAngle < 0 ? 2 * Math.PI + endAngle : endAngle;
                distanceFromCenter = Math.sqrt(Math.pow(Math.abs(fromCenterX), 2) + Math.pow(Math.abs(fromCenterY), 2));
                if (clickAngle >= startAngle && clickAngle <= endAngle &&
                    (((distanceFromCenter >= point.regionData.innerRadius && distanceFromCenter <= point.regionData.radius) ||
                        (distanceFromCenter <= point.regionData.innerRadius && distanceFromCenter >= point.regionData.radius))
                        && distanceFromCenter <= series.chart.radius)) {
                    return point;
                }
            }
            if (series.dragSettings.enable && series.isRectSeries) {
                if (this.rectRegion(x, y, point, rect, series)) {
                    this.insideRegion = true;
                    return point;
                }
            }
            if (!this.insideRegion && this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                return point;
            }
            else if (this.insideRegion && this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                return point;
            }
        }
        return null;
    };
    /**
     * Checks whether the region contains a point
     */
    ChartData.prototype.checkRegionContainsPoint = function (regionRect, rect, x, y) {
        var _this = this;
        return regionRect.some(function (region, index) {
            _this.lierIndex = index;
            return withInBounds(x, y, new Rect((_this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x, (_this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y, region.width, region.height));
        });
    };
    /**
     * To find drag region for column and bar series
     * @param x
     * @param y
     * @param point
     * @param rect
     * @param series
     */
    ChartData.prototype.rectRegion = function (x, y, point, rect, series) {
        var _this = this;
        var isBar = series.type === 'Bar';
        var isInversed = series.yAxis.isInversed;
        var isTransposed = series.chart.isTransposed;
        var heightValue = 10;
        var yValue = 0;
        var xValue = 0;
        var width;
        var height = width = 2 * heightValue;
        if (isInversed && isTransposed) {
            if (isBar) {
                yValue = point.regions[0].height - heightValue;
                width = point.regions[0].width;
            }
            else {
                xValue = -heightValue;
                height = point.regions[0].height;
            }
        }
        else if (isInversed || point.yValue < 0) {
            if (isBar) {
                xValue = -heightValue;
                height = point.regions[0].height;
            }
            else {
                yValue = point.regions[0].height - heightValue;
                width = point.regions[0].width;
            }
        }
        else if (isTransposed) {
            if (isBar) {
                yValue = -heightValue;
                width = point.regions[0].width;
            }
            else {
                xValue = point.regions[0].width - heightValue;
                height = point.regions[0].height;
            }
        }
        else {
            if (isBar) {
                xValue = point.regions[0].width - heightValue;
                height = point.regions[0].height;
            }
            else {
                yValue = -heightValue;
                width = point.regions[0].width;
            }
        }
        return point.regions.some(function (region) {
            return withInBounds(x, y, new Rect((_this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x + xValue, (_this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y + yValue, width, height));
        });
    };
    /**
     * @private
     */
    ChartData.prototype.getClosest = function (series, value) {
        var xData = series.xData;
        var closest;
        if (value >= series.xMin - 0.5 && value <= series.xMax + 0.5) {
            for (var _i = 0, xData_1 = xData; _i < xData_1.length; _i++) {
                var data = xData_1[_i];
                if (closest == null || Math.abs(data - value) < Math.abs(closest - value)) {
                    closest = data;
                }
            }
        }
        return closest;
    };
    ChartData.prototype.getClosestX = function (chart, series) {
        var value;
        var rect = series.clipRect;
        if (!chart.requireInvertedAxis) {
            value = getValueXByPoint(chart.mouseX - rect.x, rect.width, series.xAxis);
        }
        else {
            value = getValueYByPoint(chart.mouseY - rect.y, rect.height, series.xAxis);
        }
        var closest = this.getClosest(series, value);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (closest === point.xValue && point.visible) {
                return new PointData(point, series);
            }
        }
        return null;
    };
    return ChartData;
}());
export { ChartData };
