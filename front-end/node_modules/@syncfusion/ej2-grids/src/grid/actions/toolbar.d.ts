import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import { IGrid, NotifyArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * The `Toolbar` module is used to handle ToolBar actions.
 * @hidden
 */
export declare class Toolbar {
    private element;
    private predefinedItems;
    toolbar: tool;
    private searchElement;
    private gridID;
    private parent;
    private serviceLocator;
    private l10n;
    private items;
    private searchBoxObj;
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    private render;
    /**
     * Gets the toolbar of the Grid.
     * @return {Element}
     * @hidden
     */
    getToolbar(): Element;
    /**
     * Destroys the ToolBar.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
    private bindSearchEvents;
    private createToolbar;
    private refreshToolbarItems;
    private getItems;
    private getItem;
    private getItemObject;
    /**
     * Enables or disables ToolBar items.
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @return {void}
     * @hidden
     */
    enableItems(items: string[], isEnable: boolean): void;
    private toolbarClickHandler;
    private modelChanged;
    protected onPropertyChanged(e: NotifyArgs): void;
    private keyUpHandler;
    private search;
    private updateSearchBox;
    private wireEvent;
    private unWireEvent;
    protected addEventListener(): void;
    protected removeEventListener(): void;
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
}
