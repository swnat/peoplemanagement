import { IRenderer, IGrid } from '../base/interface';
import { Column } from '../models/column';
import { Row } from '../models/row';
import { ServiceLocator } from '../services/service-locator';
import { ColumnWidthService } from '../services/width-controller';
import { AriaService } from '../services/aria-service';
/**
 * Content module is used to render grid content
 * @hidden
 */
export declare class HeaderRender implements IRenderer {
    private headerTable;
    private headerPanel;
    private colgroup;
    private caption;
    protected colDepth: number;
    private column;
    protected rows: Row<Column>[];
    private frzIdx;
    private notfrzIdx;
    private lockColsRendered;
    freezeReorder: boolean;
    private helper;
    private dragStart;
    private drag;
    private dragStop;
    private drop;
    protected parent: IGrid;
    protected serviceLocator: ServiceLocator;
    protected widthService: ColumnWidthService;
    protected ariaService: AriaService;
    /**
     * Constructor for header renderer module
     */
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    /**
     * The function is used to render grid header div
     */
    renderPanel(): void;
    /**
     * The function is used to render grid header table
     */
    renderTable(): void;
    /**
     * Get the header content div element of grid
     * @return {Element}
     */
    getPanel(): Element;
    /**
     * Set the header content div element of grid
     * @param  {Element} panel
     */
    setPanel(panel: Element): void;
    /**
     * Get the header table element of grid
     * @return {Element}
     */
    getTable(): Element;
    /**
     * Set the header table element of grid
     * @param  {Element} table
     */
    setTable(table: Element): void;
    /**
     * Get the header colgroup element
     * @returns {Element}
     */
    getColGroup(): Element;
    /**
     * Set the header colgroup element
     * @param {Element} colgroup
     * @returns {Element}
     */
    setColGroup(colGroup: Element): Element;
    /**
     * Get the header row element collection.
     * @return {Element[]}
     */
    getRows(): Row<Column>[] | HTMLCollectionOf<HTMLTableRowElement>;
    /**
     * The function is used to create header table elements
     * @return {Element}
     * @hidden
     */
    private createHeaderTable;
    /**
     * @hidden
     */
    createTable(tableEle?: Element): Element;
    private createHeaderContent;
    private updateColGroup;
    private ensureColumns;
    private getHeaderCells;
    private appendCells;
    private getStackedLockColsCount;
    private refreshFrozenHdr;
    private getColSpan;
    private generateRow;
    private generateCell;
    /**
     * Function to hide header table column based on visible property
     * @param  {Column[]} columns?
     */
    setVisible(columns?: Column[]): void;
    private colPosRefresh;
    /**
     * Refresh the header of the Grid.
     * @returns {void}
     */
    refreshUI(): void;
    toggleStackClass(div: Element): void;
    appendContent(table?: Element): void;
    private getCellCnt;
    protected initializeHeaderDrag(): void;
    protected initializeHeaderDrop(): void;
}
