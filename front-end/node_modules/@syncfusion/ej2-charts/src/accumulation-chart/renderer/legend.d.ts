import { AccumulationSeries } from '../model/acc-base';
import { MarginModel } from '../../common/model/base-model';
import { AccumulationChart } from '../accumulation';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { LegendSettingsModel } from '../../common/legend/legend-model';
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { ChartLocation } from '../../common/utils/helper';
/**
 * AccumulationLegend module used to render `Legend` for Accumulation chart.
 */
export declare class AccumulationLegend extends BaseLegend {
    titleRect: Rect;
    private totalRowCount;
    private maxColumnWidth;
    /**
     * Constructor for Accumulation Legend.
     * @param chart
     */
    constructor(chart: AccumulationChart);
    /**
     * Get the legend options.
     * @return {void}
     * @private
     */
    getLegendOptions(chart: AccumulationChart, series: AccumulationSeries[]): void;
    /**
     * To find legend bounds for accumulation chart.
     * @private
     */
    getLegendBounds(availableSize: Size, legendBounds: Rect, legend: LegendSettingsModel): void;
    /**
     * To find maximum column size for legend
     */
    private getMaxColumn;
    /**
     * To find available width from legend x position.
     */
    private getAvailWidth;
    /**
     * To find legend rendering locations from legend options.
     * @private
     */
    getRenderPoint(legendOption: LegendOptions, start: ChartLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    /**
     * finding the smart legend place according to positions.
     * @return {void}
     * @private
     */
    getSmartLegendLocation(labelBound: Rect, legendBound: Rect, margin: MarginModel): void;
    /**
     * To get title rect.
     */
    private getTitleRect;
    /**
     * To get legend by index
     */
    private legendByIndex;
    /**
     * To show or hide the legend on clicking the legend.
     * @return {void}
     */
    click(event: Event): void;
    /**
     * To translate the point elements by index and position
     */
    private sliceVisibility;
    /**
     * Slice animation
     * @param element
     * @param name
     * @param isVisible
     */
    private sliceAnimate;
    /**
     * Get module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the Legend.
     * @return {void}
     * @private
     */
    destroy(chart: AccumulationChart): void;
}
