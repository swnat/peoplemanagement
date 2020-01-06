import { keyDown, cellNavigate, renameSheet } from '../common/index';
import { getCellIndexes, getRangeAddress, getRowHeight, getColumnWidth } from '../../workbook/index';
import { closest } from '@syncfusion/ej2-base';
/**
 * Represents keyboard navigation support for Spreadsheet.
 */
var KeyboardNavigation = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Keyboard Navigation module.
     * @private
     */
    function KeyboardNavigation(parent) {
        this.parent = parent;
        this.addEventListener();
        /* code snippet */
    }
    KeyboardNavigation.prototype.addEventListener = function () {
        this.parent.on(keyDown, this.keyDownHandler, this);
        /* code snippet */
    };
    KeyboardNavigation.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(keyDown, this.keyDownHandler);
        }
        /* code snippet */
    };
    KeyboardNavigation.prototype.keyDownHandler = function (e) {
        if (!this.parent.isEdit && (document.activeElement.classList.contains('e-spreadsheet') ||
            closest(document.activeElement, '.e-sheet'))) {
            var isNavigate = void 0;
            var scrollIdxes = void 0;
            var isRtl = this.parent.enableRtl;
            var sheet = this.parent.getActiveSheet();
            var actIdxes = getCellIndexes(this.parent.getActiveSheet().activeCell);
            if ([9, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
            if ((!e.shiftKey && ((!isRtl && e.keyCode === 37) || (isRtl && e.keyCode === 39)))
                || (e.shiftKey && e.keyCode === 9)) { //left key
                if (actIdxes[1] > 0) {
                    actIdxes[1] -= 1;
                    isNavigate = true;
                }
                else {
                    var content = this.parent.getMainContent();
                    if (actIdxes[1] === 0 && content.scrollLeft && !isRtl) {
                        content.scrollLeft = 0;
                    }
                }
            }
            else if ((!e.shiftKey && e.keyCode === 38) || (e.shiftKey && e.keyCode === 13)) { // Up key
                if (actIdxes[0] > 0) {
                    actIdxes[0] -= 1;
                    isNavigate = true;
                }
                else {
                    var content = this.parent.getMainContent();
                    if (actIdxes[0] === 0 && content.scrollTop) {
                        content.scrollTop = 0;
                    }
                }
            }
            else if ((!e.shiftKey && ((!isRtl && e.keyCode === 39) || (isRtl && e.keyCode === 37))) || e.keyCode === 9) { // Right key
                if (actIdxes[1] < sheet.colCount - 1) {
                    actIdxes[1] += 1;
                    isNavigate = true;
                }
            }
            else if ((!e.shiftKey && e.keyCode === 40) || e.keyCode === 13) { // Down Key
                if (actIdxes[0] < sheet.rowCount - 1) {
                    actIdxes[0] += 1;
                    isNavigate = true;
                }
            }
            /* else if (e.keyCode === 36) {
                actIdxes[1] = 0;
                if (e.ctrlKey) {
                    actIdxes[0] = 0;
                }
                isNavigate = true;
                e.preventDefault();
            } else if (e.keyCode === 35 && e.ctrlKey) {
                actIdxes = [sheet.usedRange.rowIndex, sheet.usedRange.colIndex];
                scrollIdxes = [sheet.usedRange.rowIndex - this.parent.viewport.rowCount,
                    sheet.usedRange.colIndex - this.parent.viewport.colCount];
                isNavigate = true;
                e.preventDefault();
            } */
            if (isNavigate) {
                this.scrollNavigation(scrollIdxes || actIdxes, scrollIdxes ? true : false);
                sheet.activeCell = getRangeAddress(actIdxes);
                this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
                this.parent.notify(cellNavigate, { range: actIdxes });
            }
        }
        var target = e.target;
        if (target.classList.contains('e-sheet-rename')) {
            if (e.keyCode === 32) {
                e.stopPropagation();
            }
            else if (e.keyCode === 13 || e.keyCode === 27) {
                this.parent.notify(renameSheet, e);
            }
        }
    };
    KeyboardNavigation.prototype.scrollNavigation = function (actIdxes, isScroll) {
        var x = this.parent.enableRtl ? -1 : 1;
        var cont = this.parent.getMainContent();
        var sheet = this.parent.getActiveSheet();
        var prevActIdxes = getCellIndexes(sheet.activeCell);
        var topLeftIdxes = getCellIndexes(sheet.topLeftCell);
        if (this.getBottomIdx(topLeftIdxes) <= actIdxes[0] || isScroll) {
            cont.scrollTop += getRowHeight(sheet, actIdxes[0]);
        }
        else if (topLeftIdxes[0] > actIdxes[0]) {
            cont.scrollTop -= getRowHeight(sheet, actIdxes[0]);
        }
        if (this.getRightIdx(topLeftIdxes) <= actIdxes[1] || isScroll) {
            cont.scrollLeft += getColumnWidth(sheet, actIdxes[1]) * x;
        }
        else if (topLeftIdxes[1] > actIdxes[1]) {
            cont.scrollLeft -= getColumnWidth(sheet, actIdxes[1]) * x;
        }
    };
    KeyboardNavigation.prototype.getBottomIdx = function (topLeftIdxes) {
        var hgt = 0;
        var sheet = this.parent.getActiveSheet();
        for (var i = topLeftIdxes[0];; i++) {
            hgt += getRowHeight(sheet, i);
            if (hgt >= this.parent.viewport.height - 17) {
                return i;
            }
        }
    };
    KeyboardNavigation.prototype.getRightIdx = function (topLeftIdxes) {
        var width = 0;
        var sheet = this.parent.getActiveSheet();
        var contWidth = this.parent.getMainContent().offsetWidth;
        for (var i = topLeftIdxes[1];; i++) {
            width += getColumnWidth(sheet, i);
            if (width >= contWidth - 17) {
                return i;
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    KeyboardNavigation.prototype.getModuleName = function () {
        return 'keyboardNavigation';
    };
    KeyboardNavigation.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return KeyboardNavigation;
}());
export { KeyboardNavigation };
