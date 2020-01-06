import { Gantt } from './gantt';
import { ColumnModel } from '@syncfusion/ej2-treegrid';
import { IGanttData } from './interface';
/**
 * TreeGrid related code goes here
 */
export declare class GanttTreeGrid {
    private parent;
    private treeGridElement;
    treeGridColumns: ColumnModel[];
    /**
     * @private
     */
    currentEditRow: {};
    private previousScroll;
    constructor(parent: Gantt);
    private addEventListener;
    private createContainer;
    /**
     * Method to initiate TreeGrid
     */
    renderTreeGrid(): void;
    private composeProperties;
    private getContentDiv;
    private getHeaderDiv;
    private getScrollbarWidth;
    private ensureScrollBar;
    private bindEvents;
    private dataBound;
    private collapsing;
    private expanding;
    private collapsed;
    private expanded;
    private updateExpandStatus;
    private actionBegin;
    private created;
    private actionFailure;
    private queryCellInfo;
    private headerCellInfo;
    private rowDataBound;
    private columnMenuOpen;
    private columnMenuClick;
    private createExpandCollapseArgs;
    private treeActionComplete;
    private updateKeyConfigSettings;
    /**
     * Method to bind internal events on TreeGrid element
     */
    private wireEvents;
    private unWireEvents;
    private scrollHandler;
    /**
     * @private
     */
    validateGanttColumns(): void;
    /**
     *
     * @param column
     * @param isDefined
     */
    private createTreeGridColumn;
    /**
     * Compose Resource columns
     * @param column
     */
    private composeResourceColumn;
    /**
     *
     * @private
     */
    getResourceIds(data: IGanttData): object;
    /**
     * Create Id column
     * @param column
     */
    private composeIDColumn;
    /**
     * Create progress column
     * @param column
     */
    private composeProgressColumn;
    /**
     *
     */
    private bindTreeGridColumnProperties;
    private durationValueAccessor;
    private resourceValueAccessor;
    private updateScrollTop;
    private treeGridClickHandler;
    private removeEventListener;
    private destroy;
}
