import { TreeGrid } from '../base/treegrid';
/**
 * TreeGrid Freeze module
 * @hidden
 */
export declare class Freeze {
    private parent;
    /**
     * Constructor for render module
     */
    constructor(parent?: TreeGrid);
    addEventListener(): void;
    removeEventListener(): void;
    private rowExpandCollapse;
    private dblClickHandler;
    private dataBoundArg;
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    private getModuleName;
}
