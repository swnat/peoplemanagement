import { Chart } from '../chart';
import { DataLabelSettingsModel } from '../series/chart-series-model';
import { Series } from './chart-series';
/**
 * `DataLabel` module is used to render data label for the data point.
 */
export declare class DataLabel {
    private chart;
    private margin;
    private isShape;
    private locationX;
    private locationY;
    private fontBackground;
    private borderWidth;
    private markerHeight;
    private commonId;
    private yAxisInversed;
    private inverted;
    private errorHeight;
    private chartBackground;
    /**
     * Constructor for the data label module.
     * @private
     */
    constructor(chart: Chart);
    private initPrivateVariables;
    private calculateErrorHeight;
    private isRectSeries;
    /**
     * Render the data label for series.
     * @return {void}
     */
    render(series: Series, chart: Chart, dataLabel: DataLabelSettingsModel): void;
    /**
     * Render the data label template.
     * @return {void}
     * @private
     */
    private createDataLabelTemplate;
    private calculateTextPosition;
    private calculatePolarRectPosition;
    /**
     * Get the label location
     */
    private getLabelLocation;
    private calculateRectPosition;
    private calculatePathPosition;
    private isDataLabelShape;
    private calculateRectActualPosition;
    private calculateAlignment;
    private calculateTopAndOuterPosition;
    /**
     * Updates the label location
     */
    private updateLabelLocation;
    private calculatePathActualPosition;
    /**
     * Animates the data label.
     * @param  {Series} series - Data label of the series gets animated.
     * @return {void}
     */
    doDataLabelAnimation(series: Series, element?: Element): void;
    private getPosition;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the dataLabel for series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
