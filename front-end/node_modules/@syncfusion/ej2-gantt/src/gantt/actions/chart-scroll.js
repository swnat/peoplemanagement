import { formatUnit, EventHandler, getValue } from '@syncfusion/ej2-base';
/**
 * To handle scroll event on chart and from TreeGrid
 * @hidden
 */
var ChartScroll = /** @class */ (function () {
    /**
     * Constructor for the scrolling.
     * @hidden
     */
    function ChartScroll(parent) {
        this.previousScroll = { top: 0, left: 0 };
        this.parent = parent;
        this.element = this.parent.ganttChartModule.scrollElement;
        this.addEventListeners();
    }
    /**
     * Bind event
     */
    ChartScroll.prototype.addEventListeners = function () {
        this.parent.on('grid-scroll', this.gridScrollHandler, this);
        EventHandler.add(this.element, 'scroll', this.onScroll, this);
    };
    /**
     * Unbind events
     */
    ChartScroll.prototype.removeEventListeners = function () {
        EventHandler.remove(this.element, 'scroll', this.onScroll);
        this.parent.off('grid-scroll', this.gridScrollHandler);
    };
    /**
     *
     * @param args
     */
    ChartScroll.prototype.gridScrollHandler = function (args) {
        this.element.scrollTop = getValue('top', args);
        this.isFromTreeGrid = true;
    };
    /**
     * Scroll event handler
     */
    ChartScroll.prototype.onScroll = function () {
        var scrollArgs = {};
        if (this.element.scrollTop !== this.previousScroll.top) {
            !this.isFromTreeGrid ? this.parent.notify('chartScroll', { top: this.element.scrollTop }) : (this.isFromTreeGrid = false);
            scrollArgs.previousScrollTop = this.previousScroll.top;
            this.previousScroll.top = this.element.scrollTop;
            scrollArgs.scrollTop = this.element.scrollTop;
            scrollArgs.scrollDirection = 'Vertical';
            scrollArgs.action = 'VerticalScroll';
        }
        if (this.element.scrollLeft !== this.previousScroll.left) {
            this.parent.ganttChartModule.chartTimelineContainer.scrollLeft = this.element.scrollLeft;
            scrollArgs.previousScrollLeft = this.previousScroll.left;
            this.previousScroll.left = this.element.scrollLeft;
            scrollArgs.scrollLeft = this.element.scrollLeft;
            scrollArgs.scrollDirection = 'Horizontal';
            scrollArgs.action = 'HorizontalScroll';
        }
        scrollArgs.requestType = 'scroll';
        this.parent.trigger('actionComplete', scrollArgs);
    };
    /**
     * To set height for chart scroll container
     * @param height - To set height for scroll container in chart side
     * @private
     */
    ChartScroll.prototype.setHeight = function (height) {
        this.element.style.height = formatUnit(height);
    };
    /**
     * To set width for chart scroll container
     * @param width - To set width to scroll container
     * @private
     */
    ChartScroll.prototype.setWidth = function (width) {
        this.element.style.width = formatUnit(width);
    };
    /**
     * To set scroll top for chart scroll container
     * @param scrollTop - To set scroll top for scroll container
     * @private
     */
    ChartScroll.prototype.setScrollTop = function (scrollTop) {
        this.element.scrollTop = scrollTop;
    };
    /**
     * To set scroll left for chart scroll container
     * @param scrollLeft  - To set scroll left for scroll container
     */
    ChartScroll.prototype.setScrollLeft = function (scrollLeft) {
        this.element.scrollLeft = scrollLeft;
        this.parent.ganttChartModule.chartTimelineContainer.scrollLeft = this.element.scrollLeft;
        this.previousScroll.left = this.element.scrollLeft;
    };
    /**
     * Destroy scroll related elements and unbind the events
     * @private
     */
    ChartScroll.prototype.destroy = function () {
        this.removeEventListeners();
    };
    return ChartScroll;
}());
export { ChartScroll };
