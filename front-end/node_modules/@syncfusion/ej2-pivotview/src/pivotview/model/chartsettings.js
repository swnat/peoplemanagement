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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, ChildProperty, Event, Complex, Collection } from '@syncfusion/ej2-base';
import { Border, ErrorBarSettings } from '@syncfusion/ej2-charts';
import { DataLabelSettings } from '@syncfusion/ej2-charts';
import { ErrorBarCapSettings } from '@syncfusion/ej2-charts';
import { Trendline, EmptyPointSettings } from '@syncfusion/ej2-charts';
import { CornerRadius, ChartSegment, Animation } from '@syncfusion/ej2-charts';
import { Theme, Font, Margin } from '@syncfusion/ej2-charts';
import { ChartArea, CrosshairSettings } from '@syncfusion/ej2-charts';
import { Indexes } from '@syncfusion/ej2-charts';
import { MajorTickLines, MinorTickLines, MajorGridLines } from '@syncfusion/ej2-charts';
import { MarkerSettings } from '@syncfusion/ej2-charts';
import { MinorGridLines, AxisLine, StripLineSettings, LabelBorder } from '@syncfusion/ej2-charts';
import { ChartLocation } from '@syncfusion/ej2-charts';
import { CrosshairTooltip } from '@syncfusion/ej2-charts';
/**
 *  third party configures for chart series in chart settings.
 */
var PivotChartSeriesBorder = /** @class */ (function () {
    function PivotChartSeriesBorder() {
    }
    __decorate([
        Property('')
    ], PivotChartSeriesBorder.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesBorder.prototype, "width", void 0);
    return PivotChartSeriesBorder;
}());
export { PivotChartSeriesBorder };
var PivotChartSeriesAnimation = /** @class */ (function () {
    function PivotChartSeriesAnimation() {
    }
    __decorate([
        Property(true)
    ], PivotChartSeriesAnimation.prototype, "enable", void 0);
    __decorate([
        Property(1000)
    ], PivotChartSeriesAnimation.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesAnimation.prototype, "delay", void 0);
    return PivotChartSeriesAnimation;
}());
export { PivotChartSeriesAnimation };
var PivotChartSeriesSegment = /** @class */ (function () {
    function PivotChartSeriesSegment() {
    }
    __decorate([
        Property(null)
    ], PivotChartSeriesSegment.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesSegment.prototype, "color", void 0);
    __decorate([
        Property('0')
    ], PivotChartSeriesSegment.prototype, "dashArray", void 0);
    return PivotChartSeriesSegment;
}());
export { PivotChartSeriesSegment };
var PivotChartSeriesMarkerSettings = /** @class */ (function () {
    function PivotChartSeriesMarkerSettings() {
    }
    __decorate([
        Property(false)
    ], PivotChartSeriesMarkerSettings.prototype, "visible", void 0);
    __decorate([
        Property('Circle')
    ], PivotChartSeriesMarkerSettings.prototype, "shape", void 0);
    __decorate([
        Property('')
    ], PivotChartSeriesMarkerSettings.prototype, "imageUrl", void 0);
    __decorate([
        Property(5)
    ], PivotChartSeriesMarkerSettings.prototype, "height", void 0);
    __decorate([
        Property(5)
    ], PivotChartSeriesMarkerSettings.prototype, "width", void 0);
    __decorate([
        Complex({ width: 2, color: null }, Border)
    ], PivotChartSeriesMarkerSettings.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesMarkerSettings.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesMarkerSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({}, DataLabelSettings)
    ], PivotChartSeriesMarkerSettings.prototype, "dataLabel", void 0);
    return PivotChartSeriesMarkerSettings;
}());
export { PivotChartSeriesMarkerSettings };
var PivotChartSeriesErrorSettings = /** @class */ (function () {
    function PivotChartSeriesErrorSettings() {
    }
    __decorate([
        Property(false)
    ], PivotChartSeriesErrorSettings.prototype, "visible", void 0);
    __decorate([
        Property('Fixed')
    ], PivotChartSeriesErrorSettings.prototype, "type", void 0);
    __decorate([
        Property('Both')
    ], PivotChartSeriesErrorSettings.prototype, "direction", void 0);
    __decorate([
        Property('Vertical')
    ], PivotChartSeriesErrorSettings.prototype, "mode", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesErrorSettings.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "verticalError", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "width", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "horizontalError", void 0);
    __decorate([
        Property(3)
    ], PivotChartSeriesErrorSettings.prototype, "verticalPositiveError", void 0);
    __decorate([
        Property(3)
    ], PivotChartSeriesErrorSettings.prototype, "verticalNegativeError", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "horizontalPositiveError", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "horizontalNegativeError", void 0);
    __decorate([
        Complex(null, ErrorBarCapSettings)
    ], PivotChartSeriesErrorSettings.prototype, "errorBarCap", void 0);
    return PivotChartSeriesErrorSettings;
}());
export { PivotChartSeriesErrorSettings };
var PivotChartSeriesTrendline = /** @class */ (function () {
    function PivotChartSeriesTrendline() {
    }
    __decorate([
        Property('')
    ], PivotChartSeriesTrendline.prototype, "name", void 0);
    __decorate([
        Property('Linear')
    ], PivotChartSeriesTrendline.prototype, "type", void 0);
    __decorate([
        Property(2)
    ], PivotChartSeriesTrendline.prototype, "period", void 0);
    __decorate([
        Property(2)
    ], PivotChartSeriesTrendline.prototype, "polynomialOrder", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesTrendline.prototype, "backwardForecast", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesTrendline.prototype, "forwardForecast", void 0);
    __decorate([
        Complex({}, Animation)
    ], PivotChartSeriesTrendline.prototype, "animation", void 0);
    __decorate([
        Complex({}, MarkerSettings)
    ], PivotChartSeriesTrendline.prototype, "marker", void 0);
    __decorate([
        Property(true)
    ], PivotChartSeriesTrendline.prototype, "enableTooltip", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesTrendline.prototype, "intercept", void 0);
    __decorate([
        Property('')
    ], PivotChartSeriesTrendline.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesTrendline.prototype, "width", void 0);
    __decorate([
        Property('SeriesType')
    ], PivotChartSeriesTrendline.prototype, "legendShape", void 0);
    return PivotChartSeriesTrendline;
}());
export { PivotChartSeriesTrendline };
var PivotChartSeriesEmptyPointSettings = /** @class */ (function () {
    function PivotChartSeriesEmptyPointSettings() {
    }
    __decorate([
        Property(null)
    ], PivotChartSeriesEmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], PivotChartSeriesEmptyPointSettings.prototype, "border", void 0);
    __decorate([
        Property('Gap')
    ], PivotChartSeriesEmptyPointSettings.prototype, "mode", void 0);
    return PivotChartSeriesEmptyPointSettings;
}());
export { PivotChartSeriesEmptyPointSettings };
var PivotChartSeriesCornerRadius = /** @class */ (function () {
    function PivotChartSeriesCornerRadius() {
    }
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "topLeft", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "topRight", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "bottomLeft", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "bottomRight", void 0);
    return PivotChartSeriesCornerRadius;
}());
export { PivotChartSeriesCornerRadius };
/**
 *  third party configures for chart axis in chart settings.
 */
var PivotChartAxisFont = /** @class */ (function () {
    function PivotChartAxisFont() {
    }
    __decorate([
        Property('Normal')
    ], PivotChartAxisFont.prototype, "fontStyle", void 0);
    __decorate([
        Property('16px')
    ], PivotChartAxisFont.prototype, "size", void 0);
    __decorate([
        Property('Normal')
    ], PivotChartAxisFont.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisFont.prototype, "color", void 0);
    __decorate([
        Property('Center')
    ], PivotChartAxisFont.prototype, "textAlignment", void 0);
    __decorate([
        Property('Segoe UI')
    ], PivotChartAxisFont.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], PivotChartAxisFont.prototype, "opacity", void 0);
    __decorate([
        Property('Trim')
    ], PivotChartAxisFont.prototype, "textOverflow", void 0);
    return PivotChartAxisFont;
}());
export { PivotChartAxisFont };
var PivotChartAxisCrosshairTooltip = /** @class */ (function () {
    function PivotChartAxisCrosshairTooltip() {
    }
    __decorate([
        Property(false)
    ], PivotChartAxisCrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisCrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        Complex(Theme.crosshairLabelFont, Font)
    ], PivotChartAxisCrosshairTooltip.prototype, "textStyle", void 0);
    return PivotChartAxisCrosshairTooltip;
}());
export { PivotChartAxisCrosshairTooltip };
var PivotChartAxisMajorTickLines = /** @class */ (function () {
    function PivotChartAxisMajorTickLines() {
    }
    __decorate([
        Property(1)
    ], PivotChartAxisMajorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], PivotChartAxisMajorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMajorTickLines.prototype, "color", void 0);
    return PivotChartAxisMajorTickLines;
}());
export { PivotChartAxisMajorTickLines };
var PivotChartAxisMajorGridLines = /** @class */ (function () {
    function PivotChartAxisMajorGridLines() {
    }
    __decorate([
        Property(1)
    ], PivotChartAxisMajorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisMajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMajorGridLines.prototype, "color", void 0);
    return PivotChartAxisMajorGridLines;
}());
export { PivotChartAxisMajorGridLines };
var PivotChartAxisMinorTickLines = /** @class */ (function () {
    function PivotChartAxisMinorTickLines() {
    }
    __decorate([
        Property(0.7)
    ], PivotChartAxisMinorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], PivotChartAxisMinorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMinorTickLines.prototype, "color", void 0);
    return PivotChartAxisMinorTickLines;
}());
export { PivotChartAxisMinorTickLines };
var PivotChartAxisMinorGridLines = /** @class */ (function () {
    function PivotChartAxisMinorGridLines() {
    }
    __decorate([
        Property(0.7)
    ], PivotChartAxisMinorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisMinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMinorGridLines.prototype, "color", void 0);
    return PivotChartAxisMinorGridLines;
}());
export { PivotChartAxisMinorGridLines };
var PivotChartAxisAxisLine = /** @class */ (function () {
    function PivotChartAxisAxisLine() {
    }
    __decorate([
        Property(1)
    ], PivotChartAxisAxisLine.prototype, "width", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisAxisLine.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisAxisLine.prototype, "color", void 0);
    return PivotChartAxisAxisLine;
}());
export { PivotChartAxisAxisLine };
var PivotChartAxisStripLineSettings = /** @class */ (function () {
    function PivotChartAxisStripLineSettings() {
    }
    __decorate([
        Property(true)
    ], PivotChartAxisStripLineSettings.prototype, "visible", void 0);
    __decorate([
        Property(false)
    ], PivotChartAxisStripLineSettings.prototype, "startFromAxis", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "start", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "end", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "size", void 0);
    __decorate([
        Property('#808080')
    ], PivotChartAxisStripLineSettings.prototype, "color", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "dashArray", void 0);
    __decorate([
        Property('Auto')
    ], PivotChartAxisStripLineSettings.prototype, "sizeType", void 0);
    __decorate([
        Property(false)
    ], PivotChartAxisStripLineSettings.prototype, "isRepeat", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "repeatEvery", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "repeatUntil", void 0);
    __decorate([
        Property(false)
    ], PivotChartAxisStripLineSettings.prototype, "isSegmented", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "segmentStart", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "segmentEnd", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "segmentAxisName", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], PivotChartAxisStripLineSettings.prototype, "border", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisStripLineSettings.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "rotation", void 0);
    __decorate([
        Property('Middle')
    ], PivotChartAxisStripLineSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Middle')
    ], PivotChartAxisStripLineSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Complex(Theme.stripLineLabelFont, Font)
    ], PivotChartAxisStripLineSettings.prototype, "textStyle", void 0);
    __decorate([
        Property('Behind')
    ], PivotChartAxisStripLineSettings.prototype, "zIndex", void 0);
    __decorate([
        Property(1)
    ], PivotChartAxisStripLineSettings.prototype, "opacity", void 0);
    return PivotChartAxisStripLineSettings;
}());
export { PivotChartAxisStripLineSettings };
var PivotChartAxisLabelBorder = /** @class */ (function () {
    function PivotChartAxisLabelBorder() {
    }
    __decorate([
        Property('')
    ], PivotChartAxisLabelBorder.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], PivotChartAxisLabelBorder.prototype, "width", void 0);
    __decorate([
        Property('Rectangle')
    ], PivotChartAxisLabelBorder.prototype, "type", void 0);
    return PivotChartAxisLabelBorder;
}());
export { PivotChartAxisLabelBorder };
/**
 *  third party configures in chart settings.
 */
var PivotChartSettingsChartArea = /** @class */ (function () {
    function PivotChartSettingsChartArea() {
    }
    __decorate([
        Complex({}, Border)
    ], PivotChartSettingsChartArea.prototype, "border", void 0);
    __decorate([
        Property('transparent')
    ], PivotChartSettingsChartArea.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], PivotChartSettingsChartArea.prototype, "opacity", void 0);
    return PivotChartSettingsChartArea;
}());
export { PivotChartSettingsChartArea };
var PivotChartSettingsCrosshairSettings = /** @class */ (function () {
    function PivotChartSettingsCrosshairSettings() {
    }
    __decorate([
        Property(false)
    ], PivotChartSettingsCrosshairSettings.prototype, "enable", void 0);
    __decorate([
        Property('')
    ], PivotChartSettingsCrosshairSettings.prototype, "dashArray", void 0);
    __decorate([
        Complex({ color: null, width: 1 }, Border)
    ], PivotChartSettingsCrosshairSettings.prototype, "line", void 0);
    __decorate([
        Property('Both')
    ], PivotChartSettingsCrosshairSettings.prototype, "lineType", void 0);
    return PivotChartSettingsCrosshairSettings;
}());
export { PivotChartSettingsCrosshairSettings };
var PivotChartSettingsLegendSettings = /** @class */ (function () {
    function PivotChartSettingsLegendSettings() {
    }
    __decorate([
        Property(true)
    ], PivotChartSettingsLegendSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], PivotChartSettingsLegendSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], PivotChartSettingsLegendSettings.prototype, "width", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, ChartLocation)
    ], PivotChartSettingsLegendSettings.prototype, "location", void 0);
    __decorate([
        Property('Auto')
    ], PivotChartSettingsLegendSettings.prototype, "position", void 0);
    __decorate([
        Property(8)
    ], PivotChartSettingsLegendSettings.prototype, "padding", void 0);
    __decorate([
        Property('Center')
    ], PivotChartSettingsLegendSettings.prototype, "alignment", void 0);
    __decorate([
        Complex(Theme.legendLabelFont, Font)
    ], PivotChartSettingsLegendSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsLegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsLegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        Complex({}, Border)
    ], PivotChartSettingsLegendSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, Margin)
    ], PivotChartSettingsLegendSettings.prototype, "margin", void 0);
    __decorate([
        Property(5)
    ], PivotChartSettingsLegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        Property('transparent')
    ], PivotChartSettingsLegendSettings.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], PivotChartSettingsLegendSettings.prototype, "opacity", void 0);
    __decorate([
        Property(true)
    ], PivotChartSettingsLegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        Property(null)
    ], PivotChartSettingsLegendSettings.prototype, "description", void 0);
    __decorate([
        Property(3)
    ], PivotChartSettingsLegendSettings.prototype, "tabIndex", void 0);
    return PivotChartSettingsLegendSettings;
}());
export { PivotChartSettingsLegendSettings };
var PivotChartSettingsIndexes = /** @class */ (function () {
    function PivotChartSettingsIndexes() {
    }
    __decorate([
        Property(0)
    ], PivotChartSettingsIndexes.prototype, "series", void 0);
    __decorate([
        Property(0)
    ], PivotChartSettingsIndexes.prototype, "point", void 0);
    return PivotChartSettingsIndexes;
}());
export { PivotChartSettingsIndexes };
var PivotChartSettingsMargin = /** @class */ (function () {
    function PivotChartSettingsMargin() {
    }
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "left", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "right", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "top", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "bottom", void 0);
    return PivotChartSettingsMargin;
}());
export { PivotChartSettingsMargin };
/**
 *  Configures the series in charts.
 */
var PivotSeries = /** @class */ (function (_super) {
    __extends(PivotSeries, _super);
    function PivotSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "fill", void 0);
    __decorate([
        Complex(null, Animation)
    ], PivotSeries.prototype, "animation", void 0);
    __decorate([
        Property('0')
    ], PivotSeries.prototype, "dashArray", void 0);
    __decorate([
        Property(1)
    ], PivotSeries.prototype, "width", void 0);
    __decorate([
        Property('X')
    ], PivotSeries.prototype, "segmentAxis", void 0);
    __decorate([
        Property('Line')
    ], PivotSeries.prototype, "drawType", void 0);
    __decorate([
        Property(true)
    ], PivotSeries.prototype, "isClosed", void 0);
    __decorate([
        Collection([], ChartSegment)
    ], PivotSeries.prototype, "segments", void 0);
    __decorate([
        Property('')
    ], PivotSeries.prototype, "stackingGroup", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], PivotSeries.prototype, "border", void 0);
    __decorate([
        Property(true)
    ], PivotSeries.prototype, "visible", void 0);
    __decorate([
        Property(1)
    ], PivotSeries.prototype, "opacity", void 0);
    __decorate([
        Property('Line')
    ], PivotSeries.prototype, "type", void 0);
    __decorate([
        Complex(null, MarkerSettings)
    ], PivotSeries.prototype, "marker", void 0);
    __decorate([
        Complex(null, ErrorBarSettings)
    ], PivotSeries.prototype, "errorBar", void 0);
    __decorate([
        Property(true)
    ], PivotSeries.prototype, "enableTooltip", void 0);
    __decorate([
        Collection([], Trendline)
    ], PivotSeries.prototype, "trendlines", void 0);
    __decorate([
        Property('')
    ], PivotSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        Property('SeriesType')
    ], PivotSeries.prototype, "legendShape", void 0);
    __decorate([
        Property(1)
    ], PivotSeries.prototype, "minRadius", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "selectionStyle", void 0);
    __decorate([
        Property('Natural')
    ], PivotSeries.prototype, "splineType", void 0);
    __decorate([
        Property(3)
    ], PivotSeries.prototype, "maxRadius", void 0);
    __decorate([
        Property(0.5)
    ], PivotSeries.prototype, "cardinalSplineTension", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "columnWidth", void 0);
    __decorate([
        Complex(null, EmptyPointSettings)
    ], PivotSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        Complex(null, CornerRadius)
    ], PivotSeries.prototype, "cornerRadius", void 0);
    __decorate([
        Property(0)
    ], PivotSeries.prototype, "columnSpacing", void 0);
    return PivotSeries;
}(ChildProperty));
export { PivotSeries };
/**
 * Configures the axes in charts.
 */
var PivotAxis = /** @class */ (function (_super) {
    __extends(PivotAxis, _super);
    function PivotAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Rotate45')
    ], PivotAxis.prototype, "labelIntersectAction", void 0);
    __decorate([
        Complex(Theme.axisLabelFont, Font)
    ], PivotAxis.prototype, "labelStyle", void 0);
    __decorate([
        Property('')
    ], PivotAxis.prototype, "title", void 0);
    __decorate([
        Complex({}, CrosshairTooltip)
    ], PivotAxis.prototype, "crosshairTooltip", void 0);
    __decorate([
        Property('')
    ], PivotAxis.prototype, "labelFormat", void 0);
    __decorate([
        Complex(Theme.axisTitleFont, Font)
    ], PivotAxis.prototype, "titleStyle", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "isIndexed", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "plotOffset", void 0);
    __decorate([
        Property('None')
    ], PivotAxis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        Property('BetweenTicks')
    ], PivotAxis.prototype, "labelPlacement", void 0);
    __decorate([
        Property('Outside')
    ], PivotAxis.prototype, "tickPosition", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "opposedPosition", void 0);
    __decorate([
        Property(true)
    ], PivotAxis.prototype, "visible", void 0);
    __decorate([
        Property('Outside')
    ], PivotAxis.prototype, "labelPosition", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "labelRotation", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "maximum", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "minimum", void 0);
    __decorate([
        Property(34)
    ], PivotAxis.prototype, "maximumLabelWidth", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "interval", void 0);
    __decorate([
        Complex({}, MajorTickLines)
    ], PivotAxis.prototype, "majorTickLines", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "enableTrim", void 0);
    __decorate([
        Complex({}, MajorGridLines)
    ], PivotAxis.prototype, "majorGridLines", void 0);
    __decorate([
        Complex({}, MinorTickLines)
    ], PivotAxis.prototype, "minorTickLines", void 0);
    __decorate([
        Complex({}, AxisLine)
    ], PivotAxis.prototype, "lineStyle", void 0);
    __decorate([
        Complex({}, MinorGridLines)
    ], PivotAxis.prototype, "minorGridLines", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "isInversed", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "description", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "startAngle", void 0);
    __decorate([
        Property(100)
    ], PivotAxis.prototype, "coefficient", void 0);
    __decorate([
        Collection([], StripLineSettings)
    ], PivotAxis.prototype, "stripLines", void 0);
    __decorate([
        Property(2)
    ], PivotAxis.prototype, "tabIndex", void 0);
    __decorate([
        Complex({ color: null, width: 0, type: 'Rectangle' }, LabelBorder)
    ], PivotAxis.prototype, "border", void 0);
    return PivotAxis;
}(ChildProperty));
export { PivotAxis };
/**
 * Configures the ToolTips in the chart.
 */
var PivotTooltipSettings = /** @class */ (function (_super) {
    __extends(PivotTooltipSettings, _super);
    function PivotTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], PivotTooltipSettings.prototype, "enableMarker", void 0);
    __decorate([
        Property(true)
    ], PivotTooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(false)
    ], PivotTooltipSettings.prototype, "shared", void 0);
    __decorate([
        Property(0.75)
    ], PivotTooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "format", void 0);
    __decorate([
        Complex(Theme.tooltipLabelFont, Font)
    ], PivotTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "template", void 0);
    __decorate([
        Complex({ color: '#cccccc', width: 0.5 }, Border)
    ], PivotTooltipSettings.prototype, "border", void 0);
    __decorate([
        Property(true)
    ], PivotTooltipSettings.prototype, "enableAnimation", void 0);
    return PivotTooltipSettings;
}(ChildProperty));
export { PivotTooltipSettings };
/**
 * Configures the zooming behavior for the chart.
 */
var PivotZoomSettings = /** @class */ (function (_super) {
    __extends(PivotZoomSettings, _super);
    function PivotZoomSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enablePinchZooming", void 0);
    __decorate([
        Property(true)
    ], PivotZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enableDeferredZooming", void 0);
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enableMouseWheelZooming", void 0);
    __decorate([
        Property('XY')
    ], PivotZoomSettings.prototype, "mode", void 0);
    __decorate([
        Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    ], PivotZoomSettings.prototype, "toolbarItems", void 0);
    __decorate([
        Property(true)
    ], PivotZoomSettings.prototype, "enableScrollbar", void 0);
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enablePan", void 0);
    return PivotZoomSettings;
}(ChildProperty));
export { PivotZoomSettings };
/**
 *  Configures the chart settings.
 */
var ChartSettings = /** @class */ (function (_super) {
    __extends(ChartSettings, _super);
    function ChartSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, PivotSeries)
    ], ChartSettings.prototype, "chartSeries", void 0);
    __decorate([
        Complex({}, PivotAxis)
    ], ChartSettings.prototype, "primaryXAxis", void 0);
    __decorate([
        Complex({}, PivotAxis)
    ], ChartSettings.prototype, "primaryYAxis", void 0);
    __decorate([
        Property('')
    ], ChartSettings.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "enableMultiAxis", void 0);
    __decorate([
        Complex(Theme.chartTitleFont, Font)
    ], ChartSettings.prototype, "titleStyle", void 0);
    __decorate([
        Property('')
    ], ChartSettings.prototype, "title", void 0);
    __decorate([
        Complex(Theme.chartSubTitleFont, Font)
    ], ChartSettings.prototype, "subTitleStyle", void 0);
    __decorate([
        Property('')
    ], ChartSettings.prototype, "subTitle", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], ChartSettings.prototype, "border", void 0);
    __decorate([
        Complex({}, Margin)
    ], ChartSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, ChartArea)
    ], ChartSettings.prototype, "chartArea", void 0);
    __decorate([
        Property(null)
    ], ChartSettings.prototype, "background", void 0);
    __decorate([
        Property('Material')
    ], ChartSettings.prototype, "theme", void 0);
    __decorate([
        Property([])
    ], ChartSettings.prototype, "palettes", void 0);
    __decorate([
        Complex({}, CrosshairSettings)
    ], ChartSettings.prototype, "crosshair", void 0);
    __decorate([
        Complex({}, PivotTooltipSettings)
    ], ChartSettings.prototype, "tooltip", void 0);
    __decorate([
        Complex({}, PivotZoomSettings)
    ], ChartSettings.prototype, "zoomSettings", void 0);
    __decorate([
        Property()
    ], ChartSettings.prototype, "legendSettings", void 0);
    __decorate([
        Property('None')
    ], ChartSettings.prototype, "selectionMode", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableExport", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "isMultiSelect", void 0);
    __decorate([
        Collection([], Indexes)
    ], ChartSettings.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "isTransposed", void 0);
    __decorate([
        Property(1)
    ], ChartSettings.prototype, "tabIndex", void 0);
    __decorate([
        Property(null)
    ], ChartSettings.prototype, "description", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "resized", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableSideBySidePlacement", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "load", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseClick", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseMove", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "pointMove", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "pointClick", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseDown", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseLeave", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "dragComplete", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseUp", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "scrollStart", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "zoomComplete", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "scrollChanged", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "scrollEnd", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "showMultiLevelLabels", void 0);
    return ChartSettings;
}(ChildProperty));
export { ChartSettings };
