import { Grid, ColumnMenu as GridColumnMenu } from '@syncfusion/ej2-grids';
/**
 * TreeGrid ColumnMenu module
 * @hidden
 */
var ColumnMenu = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function ColumnMenu(parent) {
        Grid.Inject(GridColumnMenu);
        this.parent = parent;
    }
    ColumnMenu.prototype.getColumnMenu = function () {
        return this.parent.grid.columnMenuModule.getColumnMenu();
    };
    ColumnMenu.prototype.destroy = function () {
        //this.parent.grid.columnMenuModule.destroy();
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    ColumnMenu.prototype.getModuleName = function () {
        return 'columnMenu';
    };
    return ColumnMenu;
}());
export { ColumnMenu };
