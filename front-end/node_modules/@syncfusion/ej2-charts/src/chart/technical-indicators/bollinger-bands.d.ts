import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
import { Chart } from '../chart';
/**
 * `BollingerBands` module is used to render bollinger band indicator.
 */
export declare class BollingerBands extends TechnicalAnalysis {
    /**
     * Initializes the series collection to represent bollinger band
     */
    initSeriesCollection(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * Defines the predictions using Bollinger Band Approach
     * @private
     */
    initDataSource(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * To destroy the Bollinger Band.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
