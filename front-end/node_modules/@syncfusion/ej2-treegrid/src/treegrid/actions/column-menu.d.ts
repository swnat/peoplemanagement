import { TreeGrid } from '../base/treegrid';
/**
 * TreeGrid ColumnMenu module
 * @hidden
 */
export declare class ColumnMenu {
    private parent;
    /**
     * Constructor for render module
     */
    constructor(parent?: TreeGrid);
    getColumnMenu(): HTMLElement;
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    private getModuleName;
}
