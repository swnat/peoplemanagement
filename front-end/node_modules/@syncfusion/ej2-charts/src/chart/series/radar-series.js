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
import { firstToLowerCase } from '../../common/utils/helper';
import { PolarSeries } from '../series/polar-series';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * `RadarSeries` module is used to render the radar series.
 */
var RadarSeries = /** @class */ (function (_super) {
    __extends(RadarSeries, _super);
    function RadarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render radar Series.
     * @return {void}.
     * @private
     */
    RadarSeries.prototype.render = function (series, xAxis, yAxis, inverted) {
        var seriesType = firstToLowerCase(series.drawType);
        var yAxisMin = yAxis.minimum;
        var yAxisMax = yAxis.maximum;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.visible = point.visible && !((!isNullOrUndefined(yAxisMin) && point.yValue < yAxisMin) ||
                (!isNullOrUndefined(yAxisMax) && point.yValue > yAxisMax));
        }
        if (series.drawType.indexOf('Column') === -1) {
            series.chart[seriesType + 'SeriesModule'].render(series, xAxis, yAxis, inverted);
        }
        else {
            this.columnDrawTypeRender(series, xAxis, yAxis);
        }
    };
    /**
     * Get module name.
     */
    RadarSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'RadarSeries';
    };
    /**
     * To destroy the radar series.
     * @return {void}
     * @private
     */
    RadarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return RadarSeries;
}(PolarSeries));
export { RadarSeries };
