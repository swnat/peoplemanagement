import { ExportUtils } from '../../common/utils/export';
/**
 * `ExportModule` module is used to print and export the rendered chart.
 */
var Export = /** @class */ (function () {
    /**
     * Constructor for export module.
     * @private
     */
    function Export(chart) {
        this.chart = chart;
    }
    /**
     * Handles the export method for chart control.
     * @param type
     * @param fileName
     */
    Export.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical) {
        var exportChart = new ExportUtils(this.chart);
        controls = controls ? controls : [this.chart];
        exportChart.export(type, fileName, orientation, controls, width, height, isVertical);
    };
    /**
     * Get module name.
     */
    Export.prototype.getModuleName = function () {
        // Returns the module name
        return 'Export';
    };
    /**
     * To destroy the chart.
     * @return {void}
     * @private
     */
    Export.prototype.destroy = function (chart) {
        // Destroy method performed here
    };
    return Export;
}());
export { Export };
