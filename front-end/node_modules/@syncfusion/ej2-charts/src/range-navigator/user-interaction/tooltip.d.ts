import { RangeNavigator, RangeSlider } from '../../range-navigator';
import { Tooltip as SVGTooltip } from '@syncfusion/ej2-svg-base';
/**
 * `Tooltip` module is used to render the tooltip for chart series.
 */
export declare class RangeTooltip {
    leftTooltip: SVGTooltip;
    rightTooltip: SVGTooltip;
    private elementId;
    toolTipInterval: number;
    private control;
    /**
     * Constructor for tooltip module.
     * @private.
     */
    constructor(range: RangeNavigator);
    /**
     * Left tooltip method called here
     * @param rangeSlider
     */
    renderLeftTooltip(rangeSlider: RangeSlider): void;
    /**
     * get the content size
     * @param value
     */
    private getContentSize;
    /**
     * Right tooltip method called here
     * @param rangeSlider
     */
    renderRightTooltip(rangeSlider: RangeSlider): void;
    /**
     * Tooltip element creation
     * @param id
     */
    private createElement;
    /**
     * Tooltip render called here
     * @param bounds
     * @param parent
     * @param pointX
     * @param value
     */
    private renderTooltip;
    /**
     * Tooltip content processed here
     * @param value
     */
    private getTooltipContent;
    /**
     * Fadeout animation performed here
     */
    private fadeOutTooltip;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the tooltip.
     * @return {void}
     * @private
     */
    destroy(chart: RangeNavigator): void;
}
