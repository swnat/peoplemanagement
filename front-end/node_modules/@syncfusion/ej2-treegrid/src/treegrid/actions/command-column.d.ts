import { TreeGrid } from '../base';
/**
 * Command Column Module for TreeGrid
 * @hidden
 */
export declare class CommandColumn {
    private parent;
    constructor(parent: TreeGrid);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * Destroys the ContextMenu.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
}
