import { TreeGrid, Sort as TreeGrdSort } from '@syncfusion/ej2-treegrid';
import { getActualProperties } from '@syncfusion/ej2-grids';
/**
 * The Sort module is used to handle sorting action.
 */
var Sort = /** @class */ (function () {
    function Sort(gantt) {
        this.parent = gantt;
        TreeGrid.Inject(TreeGrdSort);
        this.parent.treeGrid.allowSorting = this.parent.allowSorting;
        this.parent.treeGrid.sortSettings = getActualProperties(this.parent.sortSettings);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Sort.prototype.getModuleName = function () {
        return 'sort';
    };
    /**
     * @private
     */
    Sort.prototype.addEventListener = function () {
        this.parent.on('updateModel', this.updateModel, this);
    };
    /**
     * @hidden
     */
    Sort.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('updateModel', this.updateModel);
    };
    /**
     * Destroys the Sorting of TreeGrid.
     * @private
     */
    Sort.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Sort a column with given options.
     * @param {string} columnName - Defines the column name to sort.
     * @param {SortDirection} direction - Defines the direction of sort.
     * @param {boolean} isMultiSort - Defines whether the previously sorted columns are to be maintained.
     */
    Sort.prototype.sortColumn = function (columnName, direction, isMultiSort) {
        this.parent.treeGrid.sortByColumn(columnName, direction, isMultiSort);
    };
    /**
     * Method to clear all sorted columns.
     */
    Sort.prototype.clearSorting = function () {
        this.parent.treeGrid.clearSorting();
    };
    /**
     * The function used to update sortSettings of TreeGrid.
     * @return {void}
     * @hidden
     */
    Sort.prototype.updateModel = function () {
        this.parent.sortSettings = this.parent.treeGrid.sortSettings;
    };
    /**
     * To clear sorting for specific column.
     * @param {string} columnName - Defines the sorted column name to remove.
     */
    Sort.prototype.removeSortColumn = function (columnName) {
        this.parent.treeGrid.grid.removeSortColumn(columnName);
    };
    return Sort;
}());
export { Sort };
