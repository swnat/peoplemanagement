import { TreeGrid } from '../base';
/**
 * The `Page` module is used to render pager and handle paging action.
 * @hidden
 */
export declare class Page {
    private parent;
    constructor(parent: TreeGrid);
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * Refreshes the page count, pager information, and external message.
     * @return {void}
     */
    refresh(): void;
    /**
     * To destroy the pager
     * @return {void}
     * @hidden
     */
    destroy(): void;
    /**
     * Navigates to the target page according to the given number.
     * @param  {number} pageNo - Defines the page number to navigate.
     * @return {void}
     */
    goToPage(pageNo: number): void;
    /**
     * Defines the text of the external message.
     * @param  {string} message - Defines the message to update.
     * @return {void}
     */
    updateExternalMessage(message: string): void;
    /**
     * @hidden
     */
    private collapseExpandPagedchilds;
    private pageRoot;
    private pageAction;
}
