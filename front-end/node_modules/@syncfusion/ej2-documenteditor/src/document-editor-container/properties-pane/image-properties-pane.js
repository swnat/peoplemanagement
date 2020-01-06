import { createElement, L10n, classList } from '@syncfusion/ej2-base';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
/**
 * Image Property pane
 * @private
 */
var ImageProperties = /** @class */ (function () {
    function ImageProperties(container, isRtl) {
        var _this = this;
        this.isWidthApply = false;
        this.isHeightApply = false;
        this.initializeImageProperties = function () {
            // tslint:disable-next-line:max-line-length
            _this.element = createElement('div', { id: _this.elementId + '_imageProperties', className: 'e-de-prop-pane' });
            _this.element.style.display = 'none';
            _this.container.propertiesPaneContainer.appendChild(_this.element);
            _this.initImageProp();
            _this.wireEvents();
        };
        this.initImageProp = function () {
            var localObj = new L10n('documenteditorcontainer', _this.container.defaultLocale, _this.container.locale);
            // tslint:disable-next-line:max-line-length
            var imageDiv = createElement('div', { id: _this.elementId + '_imageDiv', className: 'e-de-cntr-pane-padding', styles: 'border:0px' });
            _this.element.appendChild(imageDiv);
            var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.textContent = localObj.getConstant('Image');
            imageDiv.appendChild(label);
            var outerDiv = createElement('div');
            imageDiv.appendChild(outerDiv);
            // tslint:disable-next-line:max-line-length
            _this.widthElement = _this.createImagePropertiesDiv('_widthDiv', outerDiv, '_widthInput', localObj.getConstant('W'), localObj.getConstant('Width'));
            // tslint:disable-next-line:max-line-length
            _this.widthNumericBox = new NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
            _this.widthNumericBox.appendTo(_this.widthElement);
            // tslint:disable-next-line:max-line-length
            _this.heightElement = _this.createImagePropertiesDiv('_heightDiv', outerDiv, '_heightInput', localObj.getConstant('H'), localObj.getConstant('Height'));
            // tslint:disable-next-line:max-line-length
            _this.heightNumericBox = new NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
            _this.heightNumericBox.appendTo(_this.heightElement);
            // tslint:disable-next-line:max-line-length        
            var aspectRatioDiv = createElement('div', { id: _this.elementId + '_aspectRatioDiv' });
            aspectRatioDiv.setAttribute('title', localObj.getConstant('Aspect ratio'));
            outerDiv.appendChild(aspectRatioDiv);
            // tslint:disable-next-line:max-line-length
            var aspectRatio = createElement('input', { id: _this.elementId + '_aspectRatio', className: 'e-de-ctnr-prop-label' });
            aspectRatioDiv.appendChild(aspectRatio);
            _this.aspectRatioBtn = new CheckBox({ label: localObj.getConstant('Aspect ratio'), enableRtl: _this.isRtl }, aspectRatio);
        };
        // tslint:disable-next-line:max-line-length
        this.createImagePropertiesDiv = function (id, outerDiv, inputId, spanContent, tooltip) {
            // tslint:disable-next-line:max-line-length
            var divElement = createElement('div', { id: _this.elementId + id, styles: 'position: relative;width: 100%;', className: 'e-de-ctnr-segment' });
            divElement.setAttribute('title', tooltip);
            outerDiv.appendChild(divElement);
            // tslint:disable-next-line:max-line-length
            var inputElement = createElement('input', { id: _this.elementId + inputId, className: 'e-textbox', styles: 'width:100%;' });
            divElement.appendChild(inputElement);
            var spanElement = createElement('span', { className: 'e-de-img-prty-span' });
            spanElement.textContent = spanContent;
            divElement.appendChild(spanElement);
            return inputElement;
        };
        this.wireEvents = function () {
            _this.aspectRatioBtn.element.addEventListener('change', _this.onAspectRatioBtnClick);
            _this.widthNumericBox.element.addEventListener('click', function () { _this.isWidthApply = true; });
            _this.heightNumericBox.element.addEventListener('click', function () { _this.isHeightApply = true; });
            _this.widthNumericBox.element.addEventListener('keydown', _this.onImageWidth);
            _this.heightNumericBox.element.addEventListener('keydown', _this.onImageHeight);
            _this.widthNumericBox.element.addEventListener('blur', function () { _this.applyImageWidth(); _this.isWidthApply = false; });
            _this.heightNumericBox.element.addEventListener('blur', function () { _this.applyImageHeight(); _this.isHeightApply = false; });
        };
        this.onImageWidth = function (e) {
            if (e.keyCode === 13) {
                setTimeout(function () { _this.applyImageWidth(); _this.isWidthApply = false; }, 30);
            }
        };
        this.onImageHeight = function (e) {
            if (e.keyCode === 13) {
                setTimeout(function () { _this.applyImageHeight(); _this.isHeightApply = false; }, 30);
            }
        };
        this.applyImageWidth = function () {
            if (!_this.isMaintainAspectRatio) {
                // tslint:disable-next-line:max-line-length
                var width = _this.widthNumericBox.value;
                var height = _this.heightNumericBox.value;
                if (width > _this.widthNumericBox.max) {
                    width = _this.widthNumericBox.max;
                }
                if (height > _this.heightNumericBox.max) {
                    height = _this.heightNumericBox.max;
                }
                if (!(width === null || height === null)) {
                    _this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
            else if (_this.isMaintainAspectRatio) {
                // tslint:disable-next-line:max-line-length
                var width = _this.widthNumericBox.value;
                if (width > _this.widthNumericBox.max) {
                    width = _this.widthNumericBox.max;
                }
                var ratio = width / _this.documentEditor.selection.imageFormat.width;
                var height = _this.heightNumericBox.value * ratio;
                _this.heightNumericBox.value = height;
                if (!(width === null || height === null)) {
                    _this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
        };
        this.applyImageHeight = function () {
            if (!_this.isMaintainAspectRatio) {
                // tslint:disable-next-line:max-line-length
                var width = _this.widthNumericBox.value;
                var height = _this.heightNumericBox.value;
                if (!(width === null || height === null)) {
                    _this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
            else if (_this.isMaintainAspectRatio) {
                // tslint:disable-next-line:max-line-length
                var height = _this.heightNumericBox.value;
                var ratio = height / _this.documentEditor.selection.imageFormat.height;
                var width = _this.widthNumericBox.value * ratio;
                _this.widthNumericBox.value = width;
                if (!(width === null || height === null)) {
                    _this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
        };
        this.onAspectRatioBtnClick = function () {
            if (_this.isMaintainAspectRatio) {
                _this.isMaintainAspectRatio = false;
            }
            else {
                _this.isMaintainAspectRatio = true;
            }
        };
        this.container = container;
        this.elementId = this.documentEditor.element.id;
        this.isMaintainAspectRatio = false;
        this.isRtl = isRtl;
        this.initializeImageProperties();
    }
    Object.defineProperty(ImageProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ImageProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    ImageProperties.prototype.showImageProperties = function (isShow) {
        if (this.element.style.display === 'block') {
            this.updateImageProperties();
        }
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.documentEditor.resize();
    };
    ImageProperties.prototype.updateImageProperties = function () {
        this.widthNumericBox.value = this.documentEditor.selection.imageFormat.width;
        this.heightNumericBox.value = this.documentEditor.selection.imageFormat.height;
    };
    ImageProperties.prototype.destroy = function () {
        this.container = undefined;
        if (this.widthNumericBox) {
            this.widthNumericBox.destroy();
            this.widthNumericBox = undefined;
        }
        if (this.heightNumericBox) {
            this.heightNumericBox.destroy();
            this.heightNumericBox = undefined;
        }
    };
    return ImageProperties;
}());
export { ImageProperties };
