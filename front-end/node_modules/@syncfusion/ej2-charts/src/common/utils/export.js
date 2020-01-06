import { print as printWindow, createElement, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { getElement, removeElement } from '../utils/helper';
import { beforePrint } from '../model/constants';
import { PdfPageOrientation, PdfDocument, PdfBitmap, SizeF } from '@syncfusion/ej2-pdf-export';
var ExportUtils = /** @class */ (function () {
    /**
     * Constructor for chart and accumulation annotation
     * @param control
     */
    function ExportUtils(control) {
        this.control = control;
    }
    /**
     * To print the accumulation and chart elements
     * @param elements
     */
    ExportUtils.prototype.print = function (elements) {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger(beforePrint, argsData);
        if (!argsData.cancel) {
            printWindow(argsData.htmlContent, this.printWindow);
        }
    };
    /**
     * To get the html string of the chart and accumulation
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
    ExportUtils.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical) {
        var _this = this;
        var controlValue = this.getControlsValue(controls, isVertical);
        width = width ? width : controlValue.width;
        height = height ? height : controlValue.height;
        var element = this.control.svgObject;
        var isCanvas = this.control.enableCanvas;
        var image;
        if (!isCanvas) {
            element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': width.toString(),
                    'height': height.toString()
                }
            });
        }
        var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
        orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
        var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
            controlValue.svg.outerHTML +
            '</svg>';
        var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
            [(new XMLSerializer()).serializeToString(controlValue.svg)], { type: 'image/svg+xml' }));
        if (type === 'SVG') {
            if (Browser.info.name === 'msie') {
                var svg = new Blob([(new XMLSerializer()).serializeToString(controlValue.svg)], { type: 'application/octet-stream' });
                window.navigator.msSaveOrOpenBlob(svg, fileName + '.' + type.toLocaleLowerCase());
            }
            else {
                this.triggerDownload(fileName, type, url, isDownload);
            }
        }
        else if (Browser.info.name === 'msie') {
            var canvas = element;
            if (!isCanvas) {
                canvas = this.createCanvas();
            }
            image = canvas.toDataURL();
            if (type === 'PDF') {
                this.exportPdf(canvas, orientation, width, height, isDownload, fileName);
            }
            else {
                this.doexport(type, image, fileName);
            }
        }
        else {
            var image_1 = new Image();
            var ctx_1 = element.getContext('2d');
            image_1.onload = (function () {
                ctx_1.drawImage(image_1, 0, 0);
                window.URL.revokeObjectURL(url);
                if (type === 'PDF') {
                    _this.exportPdf(element, orientation, width, height, isDownload, fileName);
                }
                else {
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(element.msToBlob(), fileName + '.' + type.toLocaleLowerCase());
                    }
                    else {
                        _this.triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                    }
                }
            });
            image_1.src = url;
        }
        if (!isCanvas) {
            removeElement(document.getElementById(this.control.element.id + '_canvas'));
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
    /**
     * To get the maximum size value
     * @param controls
     * @param name
     */
    ExportUtils.prototype.getControlsValue = function (controls, isVertical) {
        var width = 0;
        var height = 0;
        var content = '';
        var isCanvas = this.control.enableCanvas;
        var svgObject = new SvgRenderer('').createSvg({
            id: 'Svg_Export_Element',
            width: 200, height: 200
        });
        controls.map(function (control) {
            var svg = control.svgObject.cloneNode(true);
            var groupEle = control.renderer.createGroup({
                style: (isNullOrUndefined(isVertical) || isVertical) ? 'transform: translateY(' + height + 'px)' :
                    'transform: translateX(' + width + 'px)'
            });
            if (!isCanvas) {
                groupEle.appendChild(svg);
            }
            width = (isNullOrUndefined(isVertical) || isVertical) ? Math.max(control.availableSize.width, width) :
                width + control.availableSize.width;
            height = (isNullOrUndefined(isVertical) || isVertical) ? height + control.availableSize.height :
                Math.max(control.availableSize.height, height);
            content += control.svgObject.outerHTML;
            if (!isCanvas) {
                svgObject.appendChild(groupEle);
            }
        });
        if (!isCanvas) {
            svgObject.setAttribute('width', width + '');
            svgObject.setAttribute('height', height + '');
        }
        return {
            'width': width,
            'height': height,
            'svg': svgObject
        };
    };
    ExportUtils.prototype.createCanvas = function () {
        var chart = this.control;
        this.canvasRender(true, chart);
        var canvas = chart.svgObject;
        this.canvasRender(false, chart);
        return canvas;
    };
    /**
     * To convert svg chart into canvas chart to fix export issue in IE
     * We cant export svg to other formats in IE
     */
    // tslint:disable:no-string-literal
    ExportUtils.prototype.canvasRender = function (enableCanvas, chart) {
        chart.enableCanvas = enableCanvas;
        chart['preRender']();
        chart['render']();
    };
    ExportUtils.prototype.exportPdf = function (element, orientation, width, height, isDownload, fileName) {
        var document = new PdfDocument();
        var margin = document.pageSettings.margins;
        var pdfDefaultWidth = document.pageSettings.width;
        var pdfDefaultHeight = document.pageSettings.height;
        var exactWidth;
        var exactHeight;
        var imageString = element.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
        document.pageSettings.orientation = orientation;
        exactWidth = (pdfDefaultWidth < width) ? (width + margin.left + margin.right) : pdfDefaultWidth;
        exactHeight = (pdfDefaultHeight < height) ? (height + margin.top + margin.bottom) : pdfDefaultHeight;
        document.pageSettings.size = new SizeF(exactWidth, exactHeight);
        imageString = imageString.slice(imageString.indexOf(',') + 1);
        document.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, width, height);
        if (isDownload) {
            document.save(fileName + '.pdf');
            document.destroy();
        }
    };
    ExportUtils.prototype.doexport = function (type, image, fileName) {
        var images = [];
        var fileType = type || 'JPG';
        images = [image];
        this.exportImage(images, fileName, fileType, image);
    };
    ExportUtils.prototype.exportImage = function (images, fileName, fileType, image) {
        var buffers = [];
        var length = (!(images instanceof HTMLElement)) ? images.length : 0;
        for (var g = 0; g < length; g++) {
            image = images[g];
            image = image.replace(/^data:[a-z]*;,/, '');
            var image1 = image.split(',');
            var byteString = atob(image1[1]);
            var buffer = new ArrayBuffer(byteString.length);
            var intArray = new Uint8Array(buffer);
            for (var i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }
            buffers.push(buffer);
        }
        for (var j = 0; j < buffers.length; j++) {
            var b = new Blob([buffers[j]], { type: 'application/octet-stream' });
            if (Browser.info.name === 'msie') {
                window.navigator.msSaveOrOpenBlob(b, fileName + '.' + fileType.toLocaleLowerCase());
            }
        }
    };
    return ExportUtils;
}());
export { ExportUtils };
