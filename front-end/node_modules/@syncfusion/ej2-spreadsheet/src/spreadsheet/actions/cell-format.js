import { rowHeightChanged } from '../common/index';
import { getRowHeight, setRowHeight, applyCellFormat } from '../../workbook/index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * CellFormat module allows to format the cell styles.
 */
var CellFormat = /** @class */ (function () {
    function CellFormat(parent) {
        this.checkHeight = false;
        //Spreadsheet.Inject(WorkbookCellFormat);
        this.parent = parent;
        this.row = parent.createElement('tr', { className: 'e-row' });
        this.addEventListener();
    }
    CellFormat.prototype.applyCellFormat = function (args) {
        var keys = Object.keys(args.style);
        if (args.lastCell && !this.row.childElementCount && !keys.length) {
            return;
        }
        var cell = args.cell || this.parent.getCell(args.rowIdx, args.colIdx);
        if (cell) {
            Object.assign(cell.style, args.style);
            if (args.isHeightCheckNeeded) {
                if (!args.manualUpdate) {
                    if (this.isHeightCheckNeeded(args.style)) {
                        var clonedCell = cell.cloneNode(true);
                        if (!clonedCell.innerHTML) {
                            clonedCell.textContent = 'Test';
                        }
                        this.row.appendChild(clonedCell);
                    }
                    if (args.lastCell && this.row.childElementCount) {
                        var sheet = this.parent.getActiveSheet();
                        var row = this.parent.getRow(args.rowIdx) || args.row;
                        var prevHeight = getRowHeight(sheet, args.rowIdx);
                        var height = this.getRowHeightOnInit();
                        if (height > prevHeight) {
                            row.style.height = height + "px";
                            if (sheet.showHeaders) {
                                (this.parent.getRow(args.rowIdx, this.parent.getRowHeaderTable()) || args.hRow).style.height =
                                    height + "px";
                            }
                            setRowHeight(sheet, args.rowIdx, height);
                        }
                        this.row.innerHTML = '';
                    }
                }
                else {
                    var idx = void 0;
                    if (this.parent.scrollSettings.enableVirtualization) {
                        idx = args.rowIdx - this.parent.viewport.topIndex;
                    }
                    if (!this.checkHeight) {
                        this.checkHeight = this.isHeightCheckNeeded(args.style, args.onActionUpdate);
                    }
                    if (isNullOrUndefined(this.parent.getActiveSheet().rows[idx]) ||
                        isNullOrUndefined(this.parent.getActiveSheet().rows[idx].customHeight)) {
                        this.updateRowHeight(cell, args.rowIdx, args.lastCell, args.onActionUpdate);
                    }
                    else {
                        cell.parentElement.style.lineHeight = parseInt(cell.parentElement.style.height, 10) - 1 + 'px';
                    }
                }
            }
        }
        else {
            this.updateRowHeight(cell, args.rowIdx, true, args.onActionUpdate);
        }
    };
    CellFormat.prototype.updateRowHeight = function (cell, rowIdx, isLastCell, onActionUpdate) {
        if (this.checkHeight && isLastCell) {
            this.checkHeight = false;
            var sheet = this.parent.getActiveSheet();
            var row = this.parent.getRow(rowIdx);
            if (!row) {
                return;
            }
            if (!cell) {
                cell = row.lastElementChild;
            }
            var test = false;
            row.style.height = '';
            if (!cell.innerHTML) {
                cell.textContent = 'test';
                test = true;
            }
            var height = Math.ceil(row.getBoundingClientRect().height);
            if (test) {
                cell.textContent = '';
            }
            height = height < 20 ? 20 : height;
            var prevHeight = getRowHeight(sheet, rowIdx);
            var heightChanged = onActionUpdate ? height !== prevHeight : height > prevHeight;
            if (heightChanged) {
                row.style.height = height + "px";
                if (sheet.showHeaders) {
                    this.parent.getRow(rowIdx, this.parent.getRowHeaderTable()).style.height = height + "px";
                }
                setRowHeight(sheet, rowIdx, height);
                this.parent.notify(rowHeightChanged, { rowIdx: rowIdx, threshold: height - prevHeight });
            }
            else {
                row.style.height = prevHeight + "px";
            }
        }
    };
    CellFormat.prototype.isHeightCheckNeeded = function (style, onActionUpdate) {
        var keys = Object.keys(style);
        return (onActionUpdate ? keys.indexOf('fontSize') > -1 : keys.indexOf('fontSize') > -1
            && Number(style.fontSize.split('pt')[0]) > 12) || keys.indexOf('fontFamily') > -1;
    };
    CellFormat.prototype.getRowHeightOnInit = function () {
        var table = this.parent.createElement('table', { className: 'e-table e-test-table' });
        var tBody = table.appendChild(this.parent.createElement('tbody'));
        tBody.appendChild(this.row);
        this.parent.element.appendChild(table);
        var height = Math.round(this.row.getBoundingClientRect().height);
        this.parent.element.removeChild(table);
        return height < 20 ? 20 : height;
    };
    CellFormat.prototype.addEventListener = function () {
        this.parent.on(applyCellFormat, this.applyCellFormat.bind(this));
    };
    CellFormat.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.on(applyCellFormat, this.applyCellFormat.bind(this));
        }
    };
    /**
     * Destroy cell format module.
     */
    CellFormat.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
        this.row = null;
        this.checkHeight = null;
    };
    /**
     * Get the cell format module name.
     */
    CellFormat.prototype.getModuleName = function () {
        return 'cellformat';
    };
    return CellFormat;
}());
export { CellFormat };
