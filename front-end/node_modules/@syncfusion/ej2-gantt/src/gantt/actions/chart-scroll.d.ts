import { Gantt } from '../base/gantt';
/**
 * To handle scroll event on chart and from TreeGrid
 * @hidden
 */
export declare class ChartScroll {
    private parent;
    private element;
    private isFromTreeGrid;
    previousScroll: {
        top: number;
        left: number;
    };
    /**
     * Constructor for the scrolling.
     * @hidden
     */
    constructor(parent: Gantt);
    /**
     * Bind event
     */
    private addEventListeners;
    /**
     * Unbind events
     */
    private removeEventListeners;
    /**
     *
     * @param args
     */
    private gridScrollHandler;
    /**
     * Scroll event handler
     */
    private onScroll;
    /**
     * To set height for chart scroll container
     * @param height - To set height for scroll container in chart side
     * @private
     */
    setHeight(height: string | number): void;
    /**
     * To set width for chart scroll container
     * @param width - To set width to scroll container
     * @private
     */
    setWidth(width: string | number): void;
    /**
     * To set scroll top for chart scroll container
     * @param scrollTop - To set scroll top for scroll container
     * @private
     */
    setScrollTop(scrollTop: number): void;
    /**
     * To set scroll left for chart scroll container
     * @param scrollLeft  - To set scroll left for scroll container
     */
    setScrollLeft(scrollLeft: number): void;
    /**
     * Destroy scroll related elements and unbind the events
     * @private
     */
    destroy(): void;
}
