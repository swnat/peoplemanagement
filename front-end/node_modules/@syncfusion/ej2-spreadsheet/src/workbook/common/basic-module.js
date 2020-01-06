import { Workbook, DataBind } from '../index';
import { WorkbookSave, WorkbookFormula, WorkbookOpen, WorkbookSort } from '../integrations/index';
import { WorkbookNumberFormat } from '../integrations/number-format';
import { WorkbookEdit, WorkbookCellFormat } from '../actions/index';
/**
 * Workbook basic module.
 * @private
 */
var WorkbookBasicModule = /** @class */ (function () {
    /**
     * Constructor for Workbook basic module.
     * @private
     */
    function WorkbookBasicModule() {
        Workbook.Inject(DataBind, WorkbookSave, WorkbookOpen, WorkbookNumberFormat, WorkbookCellFormat, WorkbookEdit, WorkbookFormula, WorkbookSort);
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    WorkbookBasicModule.prototype.getModuleName = function () {
        return 'workbookBasic';
    };
    /**
     * Destroys the Workbook basic module.
     * @return {void}
     */
    WorkbookBasicModule.prototype.destroy = function () {
        /* code snippet */
    };
    return WorkbookBasicModule;
}());
export { WorkbookBasicModule };
