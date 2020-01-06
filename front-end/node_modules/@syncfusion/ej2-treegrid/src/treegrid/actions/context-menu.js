import { Grid, ContextMenu as cmenu } from '@syncfusion/ej2-grids';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * ContextMenu Module for TreeGrid
 * @hidden
 */
var ContextMenu = /** @class */ (function () {
    function ContextMenu(parent) {
        Grid.Inject(cmenu);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     */
    ContextMenu.prototype.addEventListener = function () {
        this.parent.on('contextMenuOpen', this.contextMenuOpen, this);
        this.parent.on('contextMenuClick', this.contextMenuClick, this);
    };
    /**
     * @hidden
     */
    ContextMenu.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('contextMenuOpen', this.contextMenuOpen);
        this.parent.off('contextMenuClick', this.contextMenuClick);
    };
    ContextMenu.prototype.contextMenuOpen = function (args) {
        var addRow = args.element.querySelector('#' + this.parent.element.id + '_gridcontrol_cmenu_AddRow');
        var editRecord = args.element.querySelector('#' + this.parent.element.id + '_gridcontrol_cmenu_Edit');
        if (addRow) {
            if (this.parent.grid.editSettings.allowAdding === false) {
                addRow.style.display = 'none';
            }
            else {
                addRow.style.display = 'block';
            }
        }
        if ((this.parent.editSettings.mode === 'Cell' || this.parent.editSettings.mode === 'Batch')
            && !(isNullOrUndefined(editRecord)) && !(editRecord.classList.contains('e-menu-hide'))) {
            editRecord.style.display = 'none';
        }
    };
    ContextMenu.prototype.contextMenuClick = function (args) {
        if (args.item.id === 'Above' || args.item.id === 'Below') {
            this.parent.notify('savePreviousRowPosition', args);
            this.parent.setProperties({ editSettings: { newRowPosition: args.item.id } }, true);
            this.parent.addRecord();
        }
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    /**
     * Destroys the ContextMenu.
     * @method destroy
     * @return {void}
     */
    ContextMenu.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Gets the context menu element from the TreeGrid.
     * @return {Element}
     */
    ContextMenu.prototype.getContextMenu = function () {
        return this.parent.grid.contextMenuModule.getContextMenu();
    };
    return ContextMenu;
}());
export { ContextMenu };
