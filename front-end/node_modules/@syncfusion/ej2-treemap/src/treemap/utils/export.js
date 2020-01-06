import { print as printWindow, createElement, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { getElement } from '../utils/helper';
import { beforePrint } from '../model/constants';
import { PdfPageOrientation, PdfDocument, PdfBitmap } from '@syncfusion/ej2-pdf-export';
/**
 * Annotation Module handles the Annotation for Maps
 */
var ExportUtils = /** @class */ (function () {
    /**
     * Constructor for Maps
     * @param control
     */
    function ExportUtils(control) {
        this.control = control;
    }
    /**
     * To print the Maps
     * @param elements
     */
    ExportUtils.prototype.print = function (elements) {
        var _this = this;
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger(beforePrint, argsData, function () {
            if (!argsData.cancel) {
                printWindow(argsData.htmlContent, _this.printWindow);
            }
        });
    };
    /**
     * To get the html string of the Maps
     * @param elements
     * @private
     */
    ExportUtils.prototype.getHTMLContent = function (elements) {
        var div = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                elements.forEach(function (value) {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            div.appendChild(this.control.element.cloneNode(true));
        }
        return div;
    };
    /**
     * To export the file as image/svg format
     * @param type
     * @param fileName
     */
    ExportUtils.prototype.export = function (type, fileName, orientation) {
        var _this = this;
        var element = createElement('canvas', {
            id: 'ej2-canvas',
            attrs: {
                'width': this.control.availableSize.width.toString(),
                'height': this.control.availableSize.height.toString()
            }
        });
        var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
        orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
        var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
            this.control.svgObject.outerHTML +
            '</svg>';
        var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
            [(new XMLSerializer()).serializeToString(this.control.svgObject)], { type: 'image/svg+xml' }));
        if (type === 'SVG') {
            this.triggerDownload(fileName, type, url, isDownload);
        }
        else {
            var image_1 = new Image();
            var ctx_1 = element.getContext('2d');
            image_1.onload = (function () {
                ctx_1.drawImage(image_1, 0, 0);
                window.URL.revokeObjectURL(url);
                if (type === 'PDF') {
                    var document_1 = new PdfDocument();
                    var imageString = element.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                    document_1.pageSettings.orientation = orientation;
                    imageString = imageString.slice(imageString.indexOf(',') + 1);
                    document_1.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, (_this.control.availableSize.width - 60), _this.control.availableSize.height);
                    if (isDownload) {
                        document_1.save(fileName + '.pdf');
                        document_1.destroy();
                    }
                }
                else {
                    _this.triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                }
            });
            image_1.src = url;
        }
    };
    /**
     * To trigger the download element
     * @param fileName
     * @param type
     * @param url
     */
    ExportUtils.prototype.triggerDownload = function (fileName, type, url, isDownload) {
        createElement('a', {
            attrs: {
                'download': fileName + '.' + type.toLocaleLowerCase(),
                'href': url
            }
        }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
            view: window,
            bubbles: false,
            cancelable: true
        }));
    };
    return ExportUtils;
}());
export { ExportUtils };
