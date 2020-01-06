import { createElement } from '@syncfusion/ej2-base';
/**
 * Print Module
 */
var Print = /** @class */ (function () {
    function Print(parent) {
        this.parent = parent;
    }
    Print.prototype.printScheduler = function () {
        var clone = this.parent.element.cloneNode(true);
        clone.id = this.parent.element.id + '_print';
        document.body.appendChild(clone);
        var scrollableEle = this.getScrollableElement(this.parent.element);
        this.print(clone, scrollableEle.scrollTop, scrollableEle.scrollLeft);
    };
    Print.prototype.getScrollableElement = function (element) {
        if (this.parent.currentView === 'MonthAgenda') {
            return element.querySelector('.e-appointment-wrap');
        }
        return element.querySelector('.e-content-wrap');
    };
    Print.prototype.print = function (clone, top, left) {
        var _this = this;
        var links = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('link, style'));
        var reference = '';
        for (var i = 0, len = links.length; i < len; i++) {
            reference += links[i].outerHTML;
        }
        var div = createElement('div');
        clone.style.width = this.parent.element.offsetWidth + 'px';
        var elementWidth = Math.round((parseInt(clone.style.width, 10)) / 100) * 100;
        div.appendChild(clone);
        var printWindow = window.open('', 'print', 'height=550,width=' + elementWidth + ',tabbar=no');
        printWindow.document.write('<!DOCTYPE html> <html><head>' + reference + '</head><body>' + div.innerHTML +
            '<script> (function() { window.ready = true; })(); </script>' + '</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(function () {
            // tslint:disable-next-line:no-any
            if (printWindow.ready) {
                _this.scrolledScheduler(printWindow, top, left);
                printWindow.print();
                printWindow.close();
            }
        }, 500);
    };
    Print.prototype.scrolledScheduler = function (printWindow, top, left) {
        var scrollableEle = this.getScrollableElement(printWindow.document.body);
        scrollableEle.scrollLeft = left;
        scrollableEle.scrollTop = top;
        var headerTimeCellsScroll = printWindow.document.querySelector('.e-date-header-wrap');
        if (this.parent.activeView.isTimelineView()) {
            headerTimeCellsScroll.scrollLeft = left;
        }
        if (this.parent.currentView === 'Day' || this.parent.currentView === 'Week' || this.parent.currentView === 'WorkWeek') {
            var timeCellsScroll = printWindow.document.querySelector('.e-time-cells-wrap');
            timeCellsScroll.scrollTop = top;
            headerTimeCellsScroll.scrollLeft = left;
        }
        if (this.parent.currentView === 'Month') {
            headerTimeCellsScroll.scrollLeft = left;
        }
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Print.prototype.getModuleName = function () {
        return 'print';
    };
    Print.prototype.destroy = function () {
        this.parent = null;
    };
    return Print;
}());
export { Print };
