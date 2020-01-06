import { Gantt } from './../base/gantt';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
/**
 * The ContextMenu module is used to handle the context menu items & sub-menu items.
 */
export declare class ContextMenu {
    /**
     * @private
     */
    contextMenu: Menu;
    private parent;
    private ganttID;
    private element;
    private headerMenuItems;
    private contentMenuItems;
    private rowData;
    /**
     * @private
     */
    isOpen: Boolean;
    /**
     * @private
     */
    item: string;
    private predecessors;
    private hideItems;
    private disableItems;
    constructor(parent?: Gantt);
    private addEventListener;
    private reRenderContextMenu;
    private render;
    private contextMenuItemClick;
    private contextMenuBeforeOpen;
    private updateItemStatus;
    private updateItemVisibility;
    private contextMenuOpen;
    private getMenuItems;
    private createItemModel;
    private getLocale;
    private buildDefaultItems;
    private getIconCSS;
    private getPredecessorsItems;
    private headerContextMenuClick;
    private headerContextMenuOpen;
    private getDefaultItems;
    /**
     * To get ContextMenu module name.
     */
    getModuleName(): string;
    private removeEventListener;
    private contextMenuOnClose;
    private revertItemStatus;
    private resetItems;
    private generateID;
    private getKeyFromId;
    /**
     * To destroy the contextmenu module.
     * @return {void}
     * @private
     */
    destroy(): void;
}
