import { IGrid, IAction, NotifyArgs } from '../base/interface';
/**
 * The `Search` module is used to handle search action.
 */
export declare class Search implements IAction {
    private parent;
    private refreshSearch;
    private actionCompleteFunc;
    /**
     * Constructor for Grid search module.
     * @hidden
     */
    constructor(parent?: IGrid);
    /**
     * Searches Grid records by given key.
     *
     * > You can customize the default search action by using [`searchSettings`](grid/#searchsettings/).
     * @param  {string} searchString - Defines the key.
     * @return {void}
     */
    search(searchString: string): void;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * To destroy the print
     * @return {void}
     * @hidden
     */
    destroy(): void;
    /**
     * @hidden
     */
    onPropertyChanged(e: NotifyArgs): void;
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    onSearchComplete(e: NotifyArgs): void;
    onActionComplete(e: NotifyArgs): void;
    private cancelBeginEvent;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
}
