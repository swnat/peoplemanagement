import { beginSave, saveCompleted } from '../../workbook/common/event';
/**
 * `Save` module is used to handle the save action in Spreadsheet.
 */
var Save = /** @class */ (function () {
    /**
     * Constructor for Save module in Spreadsheet.
     * @private
     */
    function Save(parent) {
        this.parent = parent;
        this.addEventListener();
        //Spreadsheet.Inject(WorkbookSave);
    }
    /**
     * To destroy the Save module.
     * @return {void}
     * @hidden
     */
    Save.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    Save.prototype.addEventListener = function () {
        this.parent.on(beginSave, this.initiateSave, this);
        this.parent.on(saveCompleted, this.saveCompleted, this);
    };
    Save.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(beginSave, this.initiateSave);
            this.parent.off(saveCompleted, this.saveCompleted);
        }
    };
    /**
     * Get the module name.
     * @returns string
     * @private
     */
    Save.prototype.getModuleName = function () {
        return 'save';
    };
    /**
     * Initiate save process.
     * @hidden
     */
    Save.prototype.initiateSave = function (args) {
        this.parent.showSpinner();
    };
    /**
     * Save action completed.
     * @hidden
     */
    Save.prototype.saveCompleted = function (args) {
        this.parent.hideSpinner();
    };
    return Save;
}());
export { Save };
