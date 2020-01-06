import { TreeGrid } from '../base/treegrid';
import { SortDirection } from '@syncfusion/ej2-grids';
/**
 * Internal dataoperations for TreeGrid
 * @hidden
 */
export declare class Sort {
    private flatSortedData;
    private taskIds;
    private storedIndex;
    private parent;
    private isSelfReference;
    constructor(grid: TreeGrid);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    private getModuleName;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    private createdSortedRecords;
    private iterateSort;
    /**
     * Sorts a column with the given options.
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @return {void}
     */
    sortColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    removeSortColumn(field: string): void;
    /**
     * The function used to update sortSettings of TreeGrid.
     * @return {void}
     * @hidden
     */
    private updateModel;
    /**
     * Clears all the sorted columns of the TreeGrid.
     * @return {void}
     */
    clearSorting(): void;
    /**
     * Destroys the Sorting of TreeGrid.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
}
