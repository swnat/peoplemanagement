import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { IGrid, IAction, ContextMenuClickEventArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
export declare const menuClass: CMenuClassList;
export interface CMenuClassList {
    header: string;
    content: string;
    edit: string;
    batchEdit: string;
    editIcon: string;
    pager: string;
    cancel: string;
    save: string;
    delete: string;
    copy: string;
    pdf: string;
    group: string;
    ungroup: string;
    csv: string;
    excel: string;
    fPage: string;
    lPage: string;
    nPage: string;
    pPage: string;
    ascending: string;
    descending: string;
    groupHeader: string;
    touchPop: string;
}
/**
 * The `ContextMenu` module is used to handle context menu actions.
 */
export declare class ContextMenu implements IAction {
    private element;
    contextMenu: Menu;
    private defaultItems;
    private disableItems;
    private hiddenItems;
    private gridID;
    private parent;
    private serviceLocator;
    private l10n;
    private localeText;
    private targetColumn;
    private eventArgs;
    isOpen: boolean;
    row: HTMLTableRowElement;
    cell: HTMLTableCellElement;
    private keyPressHandlerFunction;
    private targetRowdata;
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    private keyDownHandler;
    private render;
    private enableAfterRenderMenu;
    private getMenuItems;
    private getLastPage;
    private contextMenuOpen;
    /**
     * @hidden
     */
    contextMenuItemClick(args: ContextMenuClickEventArgs): void;
    private contextMenuOnClose;
    private getLocaleText;
    private updateItemStatus;
    private contextMenuBeforeOpen;
    private ensureTarget;
    private ensureFrozenHeader;
    private ensureDisabledStatus;
    /**
     * Gets the context menu element from the Grid.
     * @return {Element}
     */
    getContextMenu(): Element;
    /**
     * Destroys the context menu component in the Grid.
     * @method destroy
     * @return {void}
     * @hidden
     */
    destroy(): void;
    private getModuleName;
    private generateID;
    private getKeyFromId;
    private buildDefaultItems;
    private getDefaultItems;
    private setLocaleKey;
    private getColumn;
    private selectRow;
}
