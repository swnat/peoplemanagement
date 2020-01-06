import { Workbook, DataBind } from '../../workbook/index';
import { WorkbookSave, WorkbookNumberFormat, WorkbookFormula, WorkbookOpen, WorkbookSort } from '../integrations/index';
import { WorkbookEdit, WorkbookCellFormat } from '../actions/index';
/**
 * Workbook all module.
 * @private
 */
var WorkbookAllModule = /** @class */ (function () {
    /**
     * Constructor for Workbook all module.
     * @private
     */
    function WorkbookAllModule() {
        Workbook.Inject(DataBind, WorkbookSave, WorkbookNumberFormat, WorkbookCellFormat, WorkbookEdit, WorkbookFormula, WorkbookOpen, WorkbookSort);
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    WorkbookAllModule.prototype.getModuleName = function () {
        return 'workbook-all';
    };
    /**
     * Destroys the Workbook all module.
     * @return {void}
     */
    WorkbookAllModule.prototype.destroy = function () {
        /* code snippet */
    };
    return WorkbookAllModule;
}());
export { WorkbookAllModule };
