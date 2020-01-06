import { SortSettings } from '../base/grid';
import { IGrid, IAction, NotifyArgs } from '../base/interface';
import { SortDirection } from '../base/enum';
import { ServiceLocator } from '../services/service-locator';
/**
 *
 * The `Sort` module is used to handle sorting action.
 */
export declare class Sort implements IAction {
    private columnName;
    private direction;
    private isMultiSort;
    private lastSortedCol;
    private sortSettings;
    private enableSortMultiTouch;
    private contentRefresh;
    private isRemove;
    private sortedColumns;
    private isModelChanged;
    private aria;
    private focus;
    private lastSortedCols;
    private lastCols;
    private parent;
    private currentTarget;
    /**
     * Constructor for Grid sorting module
     * @hidden
     */
    constructor(parent?: IGrid, sortSettings?: SortSettings, sortedColumns?: string[], locator?: ServiceLocator);
    /**
     * The function used to update sortSettings
     * @return {void}
     * @hidden
     */
    updateModel(): void;
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    onActionComplete(e: NotifyArgs): void;
    /**
     * Sorts a column with the given options.
     * @param {string} columnName - Defines the column name to sort.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previously sorted columns are to be maintained.
     * @return {void}
     */
    sortColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    private backupSettings;
    private restoreSettings;
    private updateSortedCols;
    /**
     * @hidden
     */
    onPropertyChanged(e: NotifyArgs): void;
    private refreshSortSettings;
    /**
     * Clears all the sorted columns of the Grid.
     * @return {void}
     */
    clearSorting(): void;
    private isActionPrevent;
    /**
     * Remove sorted column by field name.
     * @param {string} field - Defines the column field name to remove sort.
     * @return {void}
     * @hidden
     */
    removeSortColumn(field: string): void;
    private getSortedColsIndexByField;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private initialEnd;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * To destroy the sorting
     * @return {void}
     * @hidden
     */
    destroy(): void;
    private cancelBeginEvent;
    private clickHandler;
    private keyPressed;
    private initiateSort;
    private showPopUp;
    private popUpClickHandler;
    private addSortIcons;
    private removeSortIcons;
    private getSortColumnFromField;
    private updateAriaAttr;
    private refreshSortIcons;
}
