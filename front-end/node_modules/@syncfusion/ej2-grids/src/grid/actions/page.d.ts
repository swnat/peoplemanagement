import { Pager } from '../../pager/pager';
import { PageSettingsModel } from '../models/page-settings-model';
import { IGrid, IAction, NotifyArgs } from '../base/interface';
/**
 * The `Page` module is used to render pager and handle paging action.
 */
export declare class Page implements IAction {
    private element;
    private pageSettings;
    private isForceCancel;
    private isInitialLoad;
    private parent;
    /** @hidden */
    pagerObj: Pager;
    private handlers;
    /**
     * Constructor for the Grid paging module
     * @hidden
     */
    constructor(parent?: IGrid, pageSettings?: PageSettingsModel);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * The function used to render pager from grid pageSettings
     * @return {void}
     * @hidden
     */
    render(): void;
    private onSelect;
    private addAriaAttr;
    private dataReady;
    /**
     * Refreshes the page count, pager information, and external message.
     * @return {void}
     */
    refresh(): void;
    /**
     * Navigates to the target page according to the given number.
     * @param  {number} pageNo - Defines the page number to navigate.
     * @return {void}
     */
    goToPage(pageNo: number): void;
    /**
     * @hidden
     */
    setPageSize(pageSize: number): void;
    /**
     * The function used to update pageSettings model
     * @return {void}
     * @hidden
     */
    updateModel(e?: NotifyArgs): void;
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    onActionComplete(e: NotifyArgs): void;
    /**
     * @hidden
     */
    onPropertyChanged(e: NotifyArgs): void;
    private clickHandler;
    private keyPressHandler;
    /**
     * Defines the text of the external message.
     * @param  {string} message - Defines the message to update.
     * @return {void}
     */
    updateExternalMessage(message: string): void;
    private appendToElement;
    private enableAfterRender;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * To destroy the pager
     * @return {void}
     * @hidden
     */
    destroy(): void;
    private pagerDestroy;
}
