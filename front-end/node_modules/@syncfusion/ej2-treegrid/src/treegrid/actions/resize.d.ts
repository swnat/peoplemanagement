import { TreeGrid } from '../base/treegrid';
/**
 * TreeGrid Resize module
 * @hidden
 */
export declare class Resize {
    private parent;
    /**
     * Constructor for Resize module
     */
    constructor(parent?: TreeGrid);
    /**
     * Resize by field names.
     * @param  {string|string[]} fName - Defines the field name.
     * @return {void}
     */
    autoFitColumns(fName?: string | string[]): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    private getModuleName;
    /**
     * Destroys the Resize.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
}
