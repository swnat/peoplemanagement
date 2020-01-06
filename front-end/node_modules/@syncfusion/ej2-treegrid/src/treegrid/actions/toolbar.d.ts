import { TreeGrid } from '../base';
/**
 * Toolbar Module for TreeGrid
 * @hidden
 */
export declare class Toolbar {
    private parent;
    constructor(parent: TreeGrid);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    private getModuleName;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    private refreshToolbar;
    private toolbarClickHandler;
    /**
     * Gets the toolbar of the TreeGrid.
     * @return {Element}
     * @hidden
     */
    getToolbar(): Element;
    /**
     * Enables or disables ToolBar items.
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @return {void}
     * @hidden
     */
    enableItems(items: string[], isEnable: boolean): void;
    /**
     * Destroys the ToolBar.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
}
