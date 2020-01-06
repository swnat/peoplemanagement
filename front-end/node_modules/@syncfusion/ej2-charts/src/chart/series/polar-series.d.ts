import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { PolarRadarPanel } from '../axis/polar-radar-panel';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
import { Axis } from '../axis/axis';
/**
 * `PolarSeries` module is used to render the polar series.
 */
export declare class PolarSeries extends PolarRadarPanel {
    /**
     * Render Polar Series.
     * @return {void}.
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, inverted: boolean): void;
    /**
     * Render Column DrawType.
     * @return {void}.
     * @private
     */
    columnDrawTypeRender(series: Series, xAxis: Axis, yAxis: Axis): void;
    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    triggerEvent(chart: Chart, series: Series, point: Points): IPointRenderEventArgs;
    /** get position for column drawtypes
     * @return {void}.
     * @private
     */
    getSeriesPosition(series: Series): void;
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    doAnimation(series: Series): void;
    /**
     * To do the Polar Radar draw type column animation.
     * @return {void}
     * @private
     */
    doPolarRadarAnimation(animateElement: Element, delay: number, duration: number, series: Series): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the polar series.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
