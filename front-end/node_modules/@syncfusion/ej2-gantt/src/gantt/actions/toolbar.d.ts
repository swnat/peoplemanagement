/**
 * Toolbar action related code goes here
 */
import { Gantt } from '../base/gantt';
import { Toolbar as NavToolbar } from '@syncfusion/ej2-navigations';
export declare class Toolbar {
    private parent;
    private predefinedItems;
    private id;
    toolbar: NavToolbar;
    private items;
    element: HTMLElement;
    private searchElement;
    constructor(parent: Gantt);
    private getModuleName;
    /**
     * @private
     */
    renderToolbar(): void;
    private createToolbar;
    private getSearchBarElement;
    private wireEvent;
    private propertyChanged;
    private unWireEvent;
    private keyUpHandler;
    private focusHandler;
    private blurHandler;
    /**
     * Method to set value for search input box
     * @hidden
     */
    updateSearchTextBox(): void;
    private getItems;
    private getItem;
    private getItemObject;
    private toolbarClickHandler;
    /**
     *
     * @return {void}
     * @private
     */
    zoomIn(): void;
    /**
     *
     * @return {void}
     * @private
     */
    zoomToFit(): void;
    /**
     *
     * @return {void}
     * @private
     */
    zoomOut(): void;
    /**
     * To refresh toolbar items bases current state of tasks
     */
    refreshToolbarItems(): void;
    /**
     * Enables or disables ToolBar items.
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @return {void}
     * @hidden
     */
    enableItems(items: string[], isEnable: boolean): void;
    /**
     * Destroys the Sorting of TreeGrid.
     * @method destroy
     * @return {void}
     * @private
     */
    destroy(): void;
}
