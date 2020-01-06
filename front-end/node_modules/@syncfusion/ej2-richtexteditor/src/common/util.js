/**
 * Exports common util methods used by RichTextEditor.
 */
import { isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
export function isIDevice() {
    var result = false;
    if (Browser.isDevice && Browser.isIos) {
        result = true;
    }
    return result;
}
export function setEditFrameFocus(editableElement, selector) {
    if (editableElement.nodeName === 'BODY' && !isNullOrUndefined(selector)) {
        var iframe = top.window.document.querySelector(selector);
        if (!isNullOrUndefined(iframe)) {
            iframe.contentWindow.focus();
        }
    }
}
