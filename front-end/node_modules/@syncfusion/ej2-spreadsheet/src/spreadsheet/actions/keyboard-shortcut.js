import { keyDown, cut, paste, copy, clearCopy } from '../common/index';
import { setCellFormat, textDecorationUpdate, getCellIndexes } from '../../workbook/common/index';
/**
 * Represents keyboard shortcut support for Spreadsheet.
 */
var KeyboardShortcut = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Keyboard Shortcut module.
     * @private
     */
    function KeyboardShortcut(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    KeyboardShortcut.prototype.addEventListener = function () {
        this.parent.on(keyDown, this.keyDownHandler, this);
    };
    KeyboardShortcut.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(keyDown, this.keyDownHandler);
        }
    };
    KeyboardShortcut.prototype.keyDownHandler = function (e) {
        if (e.ctrlKey) {
            if ([79, 83, 65].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
            if (e.keyCode === 79) {
                this.parent.element.querySelector('#' + this.parent.element.id + '_fileUpload').click();
            }
            else if (e.keyCode === 83) {
                if (this.parent.saveUrl && this.parent.allowSave) {
                    this.parent.save();
                }
            }
            else if (e.keyCode === 88) {
                this.parent.notify(cut, null);
            }
            else if (e.keyCode === 67) {
                this.parent.notify(copy, null);
            }
            else if (e.keyCode === 86) {
                this.parent.notify(paste, null);
            }
            else if (e.keyCode === 66) {
                e.preventDefault();
                var value = this.parent.getCellStyleValue(['fontWeight'], getCellIndexes(this.parent.getActiveSheet().activeCell)).fontWeight;
                value = value === 'bold' ? 'normal' : 'bold';
                this.parent.notify(setCellFormat, { style: { fontWeight: value }, onActionUpdate: true, refreshRibbon: true });
            }
            else if (e.keyCode === 73) {
                e.preventDefault();
                var value = this.parent.getCellStyleValue(['fontStyle'], getCellIndexes(this.parent.getActiveSheet().activeCell)).fontStyle;
                value = value === 'italic' ? 'normal' : 'italic';
                this.parent.notify(setCellFormat, { style: { fontStyle: value }, onActionUpdate: true, refreshRibbon: true });
            }
            else if (e.keyCode === 85) {
                e.preventDefault();
                this.parent.notify(textDecorationUpdate, { style: { textDecoration: 'underline' }, refreshRibbon: true });
            }
            else if (e.keyCode === 53) {
                e.preventDefault();
                this.parent.notify(textDecorationUpdate, { style: { textDecoration: 'line-through' }, refreshRibbon: true });
            }
        }
        if (e.keyCode === 27) {
            this.parent.notify(clearCopy, null);
        }
    };
    KeyboardShortcut.prototype.getModuleName = function () {
        return 'keyboardShortcut';
    };
    KeyboardShortcut.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return KeyboardShortcut;
}());
export { KeyboardShortcut };
