/**
 * Defines the behavior of a funnel series
 */
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { AccumulationChart } from '../accumulation';
import { TriangularBase } from './triangular-base';
/**
 * FunnelSeries module used to render `Funnel` Series.
 */
export declare class FunnelSeries extends TriangularBase {
    /**
     * Defines the path of a funnel segment
     */
    private getSegmentData;
    /**
     * Renders a funnel segment
     * @private
     */
    renderPoint(point: AccPoints, series: AccumulationSeries, chart: AccumulationChart, options: PathOption, seriesGroup: Element, redraw: boolean): void;
    /**
     * To get the module name of the funnel series.
     */
    protected getModuleName(): string;
    /**
     * To destroy the funnel series.
     * @return {void}
     * @private
     */
    destroy(accumulation: AccumulationChart): void;
}
