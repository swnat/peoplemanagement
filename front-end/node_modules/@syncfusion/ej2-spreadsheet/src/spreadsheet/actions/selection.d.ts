import { Spreadsheet } from '../base/index';
/**
 * Represents selection support for Spreadsheet.
 */
export declare class Selection {
    private parent;
    private startCell;
    private isRowSelected;
    private isColSelected;
    private scrollInterval;
    private touchEvt;
    private mouseMoveEvt;
    /**
     * Constructor for the Spreadsheet selection module.
     * @private
     */
    constructor(parent: Spreadsheet);
    private addEventListener;
    private removeEventListener;
    private rowHeightChanged;
    private colWidthChanged;
    private selectRange;
    private init;
    private createSelectionElement;
    private mouseDownHandler;
    private mouseMoveHandler;
    private mouseUpHandler;
    private isSelected;
    private virtualContentLoadedHandler;
    private clearInterval;
    private getScrollContent;
    private getScrollLeft;
    private cellNavigateHandler;
    private getColIdxFromClientX;
    private getRowIdxFromClientY;
    private selectRangeByIdx;
    private UpdateRowColSelected;
    private updateActiveCell;
    private getSelectionElement;
    private getActiveCell;
    private getSheetElement;
    private highlightHdr;
    private getHdrIndexes;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    destroy(): void;
}
