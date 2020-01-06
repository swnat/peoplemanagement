import { IGrid } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { Row } from '../models/row';
import { Column } from '../models/column';
/**
 * The `DetailRow` module is used to handle detail template and hierarchy Grid operations.
 */
export declare class DetailRow {
    private aria;
    private parent;
    private focus;
    /**
     * Constructor for the Grid detail template module
     * @hidden
     */
    constructor(parent?: IGrid, locator?: ServiceLocator);
    private clickHandler;
    private toogleExpandcollapse;
    /**
     * @hidden
     * @param gObj
     * @param rowObj
     */
    getGridModel(gObj: IGrid, rowObj: Row<Column>, printMode: string): Object;
    private promiseResolve;
    private isDetailRow;
    private destroy;
    private getTDfromIndex;
    /**
     * Expands a detail row with the given target.
     * @param  {Element} target - Defines the collapsed element to expand.
     * @return {void}
     */
    expand(target: number | Element): void;
    /**
     * Collapses a detail row with the given target.
     * @param  {Element} target - Defines the expanded element to collapse.
     * @return {void}
     */
    collapse(target: number | Element): void;
    /**
     * Expands all the detail rows of the Grid.
     * @return {void}
     */
    expandAll(): void;
    /**
     * Collapses all the detail rows of the Grid.
     * @return {void}
     */
    collapseAll(): void;
    private expandCollapse;
    private keyPressHandler;
    private refreshColSpan;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
}
