import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Print class
 */
var Print = /** @class */ (function () {
    function Print() {
    }
    /**
     * Gets module name.
     */
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    /**
     * Prints the current viewer
     * @param viewer
     * @param printWindow
     * @private
     */
    Print.prototype.print = function (viewer, printWindow) {
        this.printWindow(viewer, navigator.userAgent, printWindow);
    };
    /**
     * Opens print window and displays current page to print.
     * @private
     */
    Print.prototype.printWindow = function (viewer, browserUserAgent, printWindow) {
        var height = this.getPageHeight(viewer.pages);
        var width = this.getPageWidth(viewer.pages);
        var printElement = document.createElement('div');
        printElement.style.width = '100%';
        printElement.style.height = '100%';
        printElement.style.overflow = 'scroll';
        // Rendering canvas to print
        this.generatePrintContent(viewer, printElement);
        if (isNullOrUndefined(printWindow)) {
            printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
        }
        if ((browserUserAgent.indexOf('Chrome') !== -1) || (browserUserAgent.indexOf('Firefox')) !== -1) {
            // Chrome and Firefox
            printWindow.document.write('<!DOCTYPE html>');
            // tslint:disable-next-line:max-line-length
            printWindow.document.write('<html moznomarginboxes mozdisallowselectionprint><head><style>html, body { height: 100 %; } img { height: 100 %; width: 100 %; display: block;}img { box-sizing: border-box; }br, button { display: none; }@page{ margin: 0cm; size:' + width.toString() + 'px ' + height.toString() + 'px; }@media print{ body { margin: 0cm; }</style></head> <body><center>');
        }
        else {
            // Internet Explorer and Edge
            // tslint:disable-next-line:max-line-length
            printWindow.document.write('<html><head><style>@page{margin:0;size:' + width.toString() + 'px ' + height.toString() + 'px;}</style></head><body><center>');
        }
        // tslint:disable-next-line:max-line-length
        printWindow.document.write(printElement.innerHTML + '</center><script> (function() { window.ready = true; })(); </script></body></html>');
        printElement = undefined;
        printWindow.document.close();
        printWindow.focus();
        var interval = setInterval(function () {
            if (printWindow.ready) {
                printWindow.print();
                printWindow.close();
                clearInterval(interval);
            }
        }, 500);
    };
    /**
     * Generates print content.
     * @private
     */
    Print.prototype.generatePrintContent = function (viewer, element) {
        // Rendering canvas to print
        var htmlString = '';
        for (var i = 0; i < viewer.pages.length; i++) {
            var page = viewer.pages[i];
            var pageHeight = page.boundingRectangle.height;
            var pageWidth = page.boundingRectangle.width;
            viewer.render.isPrinting = true;
            viewer.render.renderWidgets(page, 0, 0, 0, 0);
            var canvasURL = viewer.render.pageCanvas.toDataURL();
            viewer.render.isPrinting = false;
            // tslint:disable-next-line:max-line-length
            htmlString += '<div><img src=' + canvasURL + ' style="margin:0px;display:block;width: ' + pageWidth.toString() + 'px; height:' + pageHeight.toString() + 'px; "/></div><br/>';
        }
        element.innerHTML = htmlString;
    };
    /**
     * Gets page width.
     * @param pages
     * @private
     */
    Print.prototype.getPageWidth = function (pages) {
        var width = 0;
        for (var i = 0; i < pages.length; i++) {
            if (width < pages[i].boundingRectangle.width) {
                width = pages[i].boundingRectangle.width;
            }
        }
        return width;
    };
    /**
     *  Gets page height.
     * @private
     */
    Print.prototype.getPageHeight = function (pages) {
        var height = 0;
        for (var i = 0; i < pages.length; i++) {
            if (height < pages[i].boundingRectangle.height) {
                height = pages[i].boundingRectangle.height;
            }
        }
        return height;
    };
    /**
     * @private
     */
    Print.prototype.destroy = function () {
        return;
    };
    return Print;
}());
export { Print };
