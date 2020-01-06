import { IGrid } from '../base/interface';
/**
 *
 * Reorder module is used to handle row reordering.
 * @hidden
 */
export declare class RowDD {
    private isSingleRowDragDrop;
    private hoverState;
    private startedRow;
    private startedRowIndex;
    private dragTarget;
    private onDataBoundFn;
    private timer;
    private selectedRows;
    private isOverflowBorder;
    private selectedRowColls;
    private isRefresh;
    private rows;
    private rowData;
    private dragStartData;
    private draggable;
    private helper;
    private dragStart;
    private drag;
    private dragStop;
    private processDragStop;
    private saveChange;
    reorderRows(fromIndexes: number[], toIndex: number): void;
    private removeCell;
    private parent;
    /**
     * Constructor for the Grid print module
     * @hidden
     */
    constructor(parent?: IGrid);
    private stopTimer;
    private initializeDrag;
    private updateScrollPostion;
    private setScrollDown;
    private moveDragRows;
    private setBorder;
    private getScrollWidth;
    private removeFirstRowBorder;
    private removeLastRowBorder;
    private removeBorder;
    private getElementFromPosition;
    private onDataBound;
    private getTargetIdx;
    private singleRowDrop;
    private columnDrop;
    private reorderRow;
    private enableAfterRender;
    /**
     * To destroy the print
     * @return {void}
     * @hidden
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private processArgs;
}
