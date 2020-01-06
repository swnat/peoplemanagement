import { IGrid, NotifyArgs } from '../base/interface';
import { ReturnType } from '../base/type';
import { Data } from '../actions/data';
import { ServiceLocator } from '../services/service-locator';
/**
 * Content module is used to render grid content
 * @hidden
 */
export declare class Render {
    private isColTypeDef;
    private parent;
    private locator;
    private headerRenderer;
    private contentRenderer;
    private l10n;
    data: Data;
    private ariaService;
    private renderer;
    private emptyGrid;
    private isLayoutRendered;
    private counter;
    /**
     * Constructor for render module
     */
    constructor(parent?: IGrid, locator?: ServiceLocator);
    /**
     * To initialize grid header, content and footer rendering
     */
    render(): void;
    /**
     * Refresh the entire Grid.
     * @return {void}
     */
    refresh(e?: NotifyArgs): void;
    private resetTemplates;
    private refreshComplete;
    /**
     * The function is used to refresh the dataManager
     * @return {void}
     */
    private refreshDataManager;
    private getFData;
    private isNeedForeignAction;
    private foreignKey;
    private sendBulkRequest;
    private dmSuccess;
    private dmFailure;
    /**
     * Render empty row to Grid which is used at the time to represent to no records.
     * @return {void}
     * @hidden
     */
    renderEmptyRow(): void;
    emptyRow(isTrigger?: boolean): void;
    private dynamicColumnChange;
    private updateColumnType;
    /** @hidden */
    dataManagerSuccess(e: ReturnType, args?: NotifyArgs): void;
    /** @hidden */
    dataManagerFailure(e: {
        result: Object[];
    }, args: NotifyArgs): void;
    private updatesOnInitialRender;
    private iterateComplexColumns;
    private buildColumns;
    private instantiateRenderer;
    private addEventListener;
    /** @hidden */
    validateGroupRecords(e: ReturnType): Promise<Object>;
    private getPredicate;
    private updateGroupInfo;
}
