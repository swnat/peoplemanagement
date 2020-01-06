import { Chart } from '../chart';
import { Series } from './chart-series';
import { Axis } from '../../chart/axis/axis';
import { MultiColoredSeries } from './multi-colored-base';
/**
 * `AreaSeries` module is used to render the area series.
 */
export declare class AreaSeries extends MultiColoredSeries {
    /**
     * Render Area series.
     * @return {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    /**
     * To destroy the area series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
    /**
     * Get module name
     */
    protected getModuleName(): string;
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    doAnimation(series: Series): void;
}
