import { Indexes } from '../../common/model/base';
import { IndexesModel } from '../../common/model/base-model';
import { Chart } from '../../chart';
import { AccumulationChart } from '../../accumulation-chart';
/**
 * Selection Module handles the selection for chart.
 * @private
 */
export declare class BaseSelection {
    protected styleId: string;
    protected unselected: string;
    protected control: Chart | AccumulationChart;
    constructor(control: Chart | AccumulationChart);
    /**
     * To create selection styles for series
     */
    protected seriesStyles(): void;
    /**
     * To concat indexes
     */
    protected concatIndexes(userIndexes: IndexesModel[], localIndexes: Indexes[]): Indexes[];
    /**
     * Selected points series visibility checking on legend click
     */
    protected checkVisibility(selectedIndexes: Indexes[]): boolean;
    /**
     * To add svg element style class
     * @private
     */
    addSvgClass(element: Element, className: string): void;
    /**
     * To remove svg element style class
     * @private
     */
    removeSvgClass(element: Element, className: string): void;
    /**
     * To get children from parent element
     */
    protected getChildren(parent: Element): Element[];
}
