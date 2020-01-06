import { Chart } from '../chart';
/**
 * Zooming Toolkit created here
 * @private
 */
export declare class Toolkit {
    private chart;
    private selectionColor;
    private fillColor;
    private elementOpacity;
    private elementId;
    private zoomInElements;
    private zoomOutElements;
    private zoomElements;
    private panElements;
    private iconRect;
    private hoveredID;
    private selectedID;
    private iconRectOverFill;
    private iconRectSelectionFill;
    /** @private */
    constructor(chart: Chart);
    /**
     * To create the pan button.
     * @return {void}
     * @private
     */
    createPanButton(childElement: Element, parentElement: Element, chart: Chart): void;
    /**
     * To create the zoom button.
     * @return {void}
     * @private
     */
    createZoomButton(childElement: Element, parentElement: Element, chart: Chart): void;
    /**
     * To create the ZoomIn button.
     * @return {void}
     * @private
     */
    createZoomInButton(childElement: Element, parentElement: Element, chart: Chart): void;
    /**
     * To create the ZoomOut button.
     * @return {void}
     * @private
     */
    createZoomOutButton(childElement: Element, parentElement: Element, chart: Chart): void;
    /**
     * To create the Reset button.
     * @return {void}
     * @private
     */
    createResetButton(childElement: Element, parentElement: Element, chart: Chart, isDevice: Boolean): void;
    /**
     * To bind events.
     * @return {void}
     * @private
     */
    wireEvents(element: Element, process: Function): void;
    /**
     * To show tooltip.
     * @return {void}
     * @private
     */
    private showTooltip;
    /** @private */
    removeTooltip(): void;
    /** @private */
    reset(): boolean;
    private zoomIn;
    private zoomOut;
    private zoom;
    /** @private */
    pan(): boolean;
    private zoomInOutCalculation;
    private applySelection;
}
