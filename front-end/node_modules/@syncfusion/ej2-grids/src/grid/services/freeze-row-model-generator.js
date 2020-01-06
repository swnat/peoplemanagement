import { RowModelGenerator } from '../services/row-model-generator';
import { isBlazor } from '@syncfusion/ej2-base';
/**
 * FreezeRowModelGenerator is used to generate grid data rows with freeze row and column.
 * @hidden
 */
var FreezeRowModelGenerator = /** @class */ (function () {
    function FreezeRowModelGenerator(parent) {
        this.isFrzLoad = 1;
        this.parent = parent;
        this.rowModelGenerator = new RowModelGenerator(this.parent);
    }
    FreezeRowModelGenerator.prototype.generateRows = function (data, notifyArgs, virtualRows) {
        var frzCols = this.parent.getFrozenColumns();
        if (this.isFrzLoad % 2 !== 0 && notifyArgs.requestType === 'virtualscroll' && notifyArgs.virtualInfo.sentinelInfo.axis === 'X') {
            this.isFrzLoad++;
            return null;
        }
        var row = this.parent.enableVirtualization ? virtualRows
            : this.rowModelGenerator.generateRows(data, notifyArgs);
        if (isBlazor() && !this.parent.isJsComponent) {
            return row;
        }
        for (var i = 0, len = row.length; i < len; i++) {
            if (this.isFrzLoad % 2 === 0) {
                row[i].cells = row[i].cells.slice(frzCols, row[i].cells.length);
            }
            else {
                row[i].isFreezeRow = true;
                row[i].cells = row[i].cells.slice(0, frzCols);
            }
        }
        this.isFrzLoad++;
        return row;
    };
    return FreezeRowModelGenerator;
}());
export { FreezeRowModelGenerator };
