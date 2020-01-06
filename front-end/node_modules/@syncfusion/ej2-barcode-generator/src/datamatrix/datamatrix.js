var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Property, L10n } from '@syncfusion/ej2-base';
import { Complex, Event } from '@syncfusion/ej2-base';
import { BarcodeEvent, DataMatrixSize } from '../barcode/enum/enum';
import { DisplayText } from '../barcode/primitives/displaytext';
import { Margin } from '../barcode/primitives/margin';
import { BarcodeRenderer } from '../barcode/rendering/renderer';
import { removeChildElements, refreshCanvasBarcode } from '../barcode/utility/barcode-util';
import { DataMatrix } from './datamatrix-util';
/**
 * Represents the Datamatrix control
 * ```
 */
var DataMatrixGenerator = /** @class */ (function (_super) {
    __extends(DataMatrixGenerator, _super);
    /**
     * Constructor for creating the widget
     */
    function DataMatrixGenerator(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Destroys the the data matrix generator
     */
    DataMatrixGenerator.prototype.destroy = function () {
        this.notify('destroy', {});
        _super.prototype.destroy.call(this);
    };
    DataMatrixGenerator.prototype.initializePrivateVariables = function () {
        this.defaultLocale = {};
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}
     */
    DataMatrixGenerator.prototype.getPersistData = function () {
        var keyEntity = ['loaded'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Returns the module name of the the data matrix generator
     */
    DataMatrixGenerator.prototype.getModuleName = function () {
        return 'DataMatrixGenerator';
    };
    DataMatrixGenerator.prototype.setCulture = function () {
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
    };
    DataMatrixGenerator.prototype.getElementSize = function (real, rulerSize) {
        //this method will return the size of the datamatrix 
        var value;
        if (real.toString().indexOf('px') > 0 || real.toString().indexOf('%') > 0) {
            value = real.toString();
        }
        else {
            value = real.toString() + 'px';
        }
        return value;
    };
    DataMatrixGenerator.prototype.initialize = function () {
        //Initialize the width of the datamatrix generator
        this.element.style.width = this.getElementSize(this.width);
        //Initialize the hieght of the datamatrix generator
        this.element.style.height = this.getElementSize(this.height);
        var mode = this.mode;
        //initialize the canvas element
        this.barcodeCanvas = this.barcodeRenderer.renderRootElement({
            id: this.element.id, height: mode === 'SVG' ? this.element.offsetHeight : this.element.offsetHeight * 1.5,
            width: mode === 'SVG' ? this.element.offsetWidth : this.element.offsetWidth * 1.5
        }, this.backgroundColor, this.element.offsetWidth, this.element.offsetHeight);
        this.element.appendChild(this.barcodeCanvas);
    };
    DataMatrixGenerator.prototype.triggerEvent = function (eventName, message) {
        var arg = {
            message: message
        };
        this.trigger(BarcodeEvent[eventName], arg);
    };
    DataMatrixGenerator.prototype.preRender = function () {
        //initialize the data matrix renderer
        this.barcodeRenderer = new BarcodeRenderer(this.element.id, this.mode === 'SVG');
        this.initialize();
        //initialize the data matrix renderer private variables
        this.initializePrivateVariables();
        this.setCulture();
        //set class data matrix renderer
        this.element.classList.add('e-datamatrix');
    };
    DataMatrixGenerator.prototype.onPropertyChanged = function (newProp, oldProp) {
        var width;
        var height;
        if (this.mode === 'Canvas' && newProp.mode !== 'Canvas') {
            refreshCanvasBarcode(this, this.barcodeCanvas);
        }
        else {
            this.barcodeRenderer = removeChildElements(newProp, this.barcodeCanvas, this.mode, this.element.id);
        }
        if (newProp.width) {
            width = (this.mode === 'Canvas' && newProp.mode !== 'Canvas') ? ((newProp.width * 1.5)) : newProp.width;
            this.barcodeCanvas.setAttribute('width', String(width));
        }
        if (newProp.height) {
            height = (this.mode === 'Canvas' && newProp.mode !== 'Canvas') ? ((newProp.height * 1.5)) : newProp.height;
            this.barcodeCanvas.setAttribute('height', String(height));
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'mode':
                    this.initialize();
                    break;
                case 'height':
                    this.element.style.height = this.getElementSize(height);
                    this.barcodeCanvas.setAttribute('height', String(this.element.offsetHeight));
                    break;
                case 'width':
                    this.element.style.width = this.getElementSize(width);
                    this.barcodeCanvas.setAttribute('width', String(this.element.offsetWidth));
                    break;
                case 'backgroundColor':
                    this.barcodeCanvas.setAttribute('style', 'background:' + newProp.backgroundColor);
                    break;
            }
        }
        this.renderElements();
    };
    DataMatrixGenerator.prototype.checkdata = function (value) {
        var validData = false;
        for (var i = 0; i < value.length; i++) {
            var number = 0;
            if ((value.charCodeAt(i) >= 32 && value.charCodeAt(i) <= 126) || (value.charCodeAt(i) === 10 || value.charCodeAt(i) === 13)) {
                validData = true;
            }
        }
        return validData;
    };
    DataMatrixGenerator.prototype.renderElements = function () {
        var dataMatrix = new DataMatrix();
        dataMatrix.encodingValue = this.encoding;
        dataMatrix.size = this.size;
        dataMatrix.value = this.value;
        dataMatrix.width = this.barcodeCanvas.getAttribute('width');
        dataMatrix.height = this.barcodeCanvas.getAttribute('height');
        dataMatrix.XDimension = this.xDimension;
        dataMatrix.isSvgMode = this.mode === 'SVG' ? true : false;
        dataMatrix.margin = this.margin;
        dataMatrix.displayText = this.displayText;
        dataMatrix.foreColor = this.foreColor;
        var checkOtherLanguage = this.checkdata(this.value);
        var encoding = (dataMatrix.BuildDataMatrix());
        if (isNaN(encoding[0])) {
            this.triggerEvent(BarcodeEvent.invalid, encoding);
        }
        else if (!checkOtherLanguage) {
            this.triggerEvent(BarcodeEvent.invalid, 'Invalid input');
        }
        else {
            dataMatrix.draw(this.barcodeCanvas);
        }
        if (this.mode === 'Canvas') {
            this.barcodeCanvas.style.transform = 'scale(' + (2 / 3) + ')';
            this.barcodeCanvas.style.transformOrigin = '0 0';
        }
    };
    /**
     * Renders the barcode control with nodes and connectors
     */
    DataMatrixGenerator.prototype.render = function () {
        this.notify('initial-load', {});
        /**
         * Used to load context menu
         */
        this.trigger('load');
        this.notify('initial-end', {});
        this.renderElements();
        this.renderComplete();
    };
    __decorate([
        Property('Auto')
    ], DataMatrixGenerator.prototype, "encoding", void 0);
    __decorate([
        Property(DataMatrixSize.Auto)
    ], DataMatrixGenerator.prototype, "size", void 0);
    __decorate([
        Property('SVG')
    ], DataMatrixGenerator.prototype, "mode", void 0);
    __decorate([
        Property(undefined)
    ], DataMatrixGenerator.prototype, "value", void 0);
    __decorate([
        Property('100%')
    ], DataMatrixGenerator.prototype, "height", void 0);
    __decorate([
        Property('100%')
    ], DataMatrixGenerator.prototype, "width", void 0);
    __decorate([
        Complex({}, DisplayText)
    ], DataMatrixGenerator.prototype, "displayText", void 0);
    __decorate([
        Complex({}, Margin)
    ], DataMatrixGenerator.prototype, "margin", void 0);
    __decorate([
        Property('white')
    ], DataMatrixGenerator.prototype, "backgroundColor", void 0);
    __decorate([
        Event()
    ], DataMatrixGenerator.prototype, "invalid", void 0);
    __decorate([
        Property('black')
    ], DataMatrixGenerator.prototype, "foreColor", void 0);
    __decorate([
        Property(1)
    ], DataMatrixGenerator.prototype, "xDimension", void 0);
    return DataMatrixGenerator;
}(Component));
export { DataMatrixGenerator };
