import { Chart } from '../chart';
import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
/**
 * `AccumulationDistributionIndicator` module is used to render accumulation distribution indicator.
 */
export declare class AccumulationDistributionIndicator extends TechnicalAnalysis {
    /**
     * Defines the predictions using accumulation distribution approach
     * @private
     */
    initDataSource(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     *  Calculates the Accumulation Distribution values
     * @private
     */
    private calculateADPoints;
    /**
     * To destroy the Accumulation Distribution Technical Indicator.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
