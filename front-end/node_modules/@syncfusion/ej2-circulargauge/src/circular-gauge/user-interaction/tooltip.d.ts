import { CircularGauge } from '../circular-gauge';
/**
 * Tooltip Module handles the tooltip of the circular gauge
 */
export declare class GaugeTooltip {
    private gauge;
    private tooltipEle;
    private currentAxis;
    private tooltip;
    private currentPointer;
    private currentRange;
    private currentAnnotation;
    private borderStyle;
    private textStyle;
    private svgTooltip;
    private tooltipId;
    private gaugeId;
    private tooltipPosition;
    private arrowInverted;
    private tooltipRect;
    private clearTimeout;
    private pointerEle;
    private annotationTargetElement;
    /**
     * Constructor for Tooltip module.
     * @private.
     */
    constructor(gauge: CircularGauge);
    /**
     * Method to render the tooltip for circular gauge.
     */
    renderTooltip(e: PointerEvent): void;
    /**
     * Method to create tooltip svg element.
     */
    private svgTooltipCreate;
    /**
     * Method to create or modify tolltip element.
     */
    private tooltipElement;
    /**
     * Method to get parent annotation element.
     */
    private checkParentAnnotationId;
    /**
     * Method to apply label rounding places.
     */
    private roundedValue;
    /**
     * Method to find the position of the tooltip anchor for circular gauge.
     */
    private findPosition;
    removeTooltip(): void;
    mouseUpHandler(e: PointerEvent): void;
    /**
     * To bind events for tooltip module
     */
    addEventListener(): void;
    /**
     * To unbind events for tooltip module
     */
    removeEventListener(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the tooltip.
     * @return {void}
     * @private
     */
    destroy(gauge: CircularGauge): void;
}
