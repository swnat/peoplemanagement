import { IGrid, IAction } from '../base/interface';
export declare const resizeClassList: ResizeClasses;
export interface ResizeClasses {
    root: string;
    suppress: string;
    icon: string;
    helper: string;
    header: string;
    cursor: string;
}
/**
 * `Resize` module is used to handle Resize to fit for columns.
 * @hidden
 * @private
 */
export declare class Resize implements IAction {
    private content;
    private header;
    private pageX;
    private column;
    private element;
    private helper;
    private tapped;
    private isDblClk;
    private minMove;
    private parentElementWidth;
    isFrozenColResized: boolean;
    private parent;
    private widthService;
    /**
     * Constructor for the Grid resize module
     * @hidden
     */
    constructor(parent?: IGrid);
    /**
     * Resize by field names.
     * @param  {string|string[]} fName - Defines the field name.
     * @return {void}
     */
    autoFitColumns(fName?: string | string[]): void;
    private autoFit;
    private resizeColumn;
    /**
     * To destroy the resize
     * @return {void}
     * @hidden
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private findColumn;
    /**
     * To create table for autofit
     * @hidden
     */
    protected createTable(table: Element, text: Element[], tag: string): number;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * @hidden
     */
    render(): void;
    private refreshHeight;
    private wireEvents;
    private unwireEvents;
    private getResizeHandlers;
    private setHandlerHeight;
    private callAutoFit;
    private resizeStart;
    private cancelResizeAction;
    private getWidth;
    private updateResizeEleHeight;
    private getColData;
    private resizing;
    private calulateColumnsWidth;
    private getSubColumns;
    private resizeEnd;
    private getPointX;
    private refreshColumnWidth;
    private refreshStackedColumnWidth;
    private getStackedWidth;
    private getTargetColumn;
    private updateCursor;
    private refresh;
    private appendHelper;
    private setHelperHeight;
    private getScrollBarWidth;
    private removeHelper;
    private updateHelper;
    private calcPos;
    private doubleTapEvent;
    private getUserAgent;
    private timeoutHandler;
}
