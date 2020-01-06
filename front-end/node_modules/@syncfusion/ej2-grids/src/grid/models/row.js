import { merge } from '@syncfusion/ej2-base';
/**
 * Row
 * @hidden
 */
var Row = /** @class */ (function () {
    function Row(options) {
        merge(this, options);
    }
    Row.prototype.clone = function () {
        var row = new Row({});
        merge(row, this);
        row.cells = this.cells.map(function (cell) { return cell.clone(); });
        return row;
    };
    return Row;
}());
export { Row };
