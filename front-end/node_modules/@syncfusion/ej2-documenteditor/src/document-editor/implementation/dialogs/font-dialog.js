import { createElement, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { DropDownList, ComboBox } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { WCharacterFormat } from '../format/character-format';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * The Font dialog is used to modify formatting of selected text.
 */
/* tslint:disable:no-any */
var FontDialog = /** @class */ (function () {
    /**
     * @private
     */
    function FontDialog(layoutViewer) {
        var _this = this;
        this.fontStyleInternal = undefined;
        this.fontNameList = undefined;
        this.fontStyleText = undefined;
        this.fontSizeText = undefined;
        this.colorPicker = undefined;
        this.underlineDrop = undefined;
        this.strikethroughBox = undefined;
        this.doublestrikethrough = undefined;
        this.superscript = undefined;
        this.subscript = undefined;
        //Character Format Property
        this.bold = undefined;
        this.italic = undefined;
        this.underline = undefined;
        this.strikethrough = undefined;
        this.baselineAlignment = undefined;
        this.fontSize = undefined;
        this.fontFamily = undefined;
        this.fontColor = undefined;
        /**
         * @private
         */
        this.characterFormat = undefined;
        /**
         * @private
         */
        this.loadFontDialog = function () {
            _this.owner.updateFocus();
            var characterFormat;
            if (_this.characterFormat) {
                characterFormat = _this.characterFormat;
            }
            else {
                characterFormat = _this.owner.owner.selection.characterFormat;
            }
            _this.fontNameList.value = characterFormat.fontFamily;
            if (!characterFormat.bold && !characterFormat.italic) {
                _this.fontStyleText.value = _this.fontSizeText.value;
                _this.fontStyleText.index = 0;
            }
            else if (characterFormat.bold && !characterFormat.italic) {
                _this.fontStyleText.value = _this.fontSizeText.value;
                _this.fontStyleText.index = 1;
            }
            else if (!characterFormat.bold && characterFormat.italic) {
                _this.fontStyleText.value = _this.fontSizeText.value;
                _this.fontStyleText.index = 2;
            }
            else if (characterFormat.bold && characterFormat.italic) {
                _this.fontStyleText.value = _this.fontSizeText.value;
                _this.fontStyleText.index = 3;
            }
            if (!isNullOrUndefined(characterFormat.fontSize)) {
                for (var i = 0; i <= 15; i++) {
                    var items = _this.fontSizeText.getItems();
                    if (characterFormat.fontSize.toString() === items[i].innerHTML) {
                        _this.fontSizeText.value = characterFormat.fontSize;
                        _this.fontSizeText.index = i;
                        break;
                    }
                }
            }
            if (!isNullOrUndefined(characterFormat.fontColor)) {
                _this.colorPicker.value = characterFormat.fontColor;
            }
            else {
                _this.colorPicker.value = '#000000';
            }
            if (characterFormat.underline === 'None') {
                _this.underlineDrop.index = 0;
            }
            else if (characterFormat.underline === 'Single') {
                _this.underlineDrop.index = 1;
            }
            if (characterFormat.strikethrough === 'SingleStrike') {
                _this.strikethroughBox.checked = true;
            }
            else if (characterFormat.strikethrough === 'DoubleStrike') {
                _this.doublestrikethrough.checked = true;
            }
            else {
                _this.strikethroughBox.checked = false;
                _this.doublestrikethrough.checked = false;
            }
            if (characterFormat.baselineAlignment === 'Superscript') {
                _this.superscript.checked = true;
            }
            else if (characterFormat.baselineAlignment === 'Subscript') {
                _this.subscript.checked = true;
            }
            else {
                _this.superscript.checked = false;
                _this.subscript.checked = false;
            }
            if (_this.owner.selection.caret.style.display !== 'none') {
                _this.owner.selection.caret.style.display = 'none';
            }
        };
        /**
         * @private
         */
        this.closeFontDialog = function () {
            _this.unWireEventsAndBindings();
            _this.owner.updateFocus();
        };
        /**
         * @private
         */
        this.onCancelButtonClick = function () {
            _this.owner.dialog.hide();
            _this.unWireEventsAndBindings();
        };
        /**
         * @private
         */
        this.onInsertFontFormat = function () {
            var format;
            if (_this.characterFormat) {
                format = _this.characterFormat;
            }
            else {
                format = new WCharacterFormat(undefined);
            }
            if (!isNullOrUndefined(_this.bold)) {
                format.bold = _this.bold;
            }
            if (!isNullOrUndefined(_this.italic)) {
                format.italic = _this.italic;
            }
            if (!isNullOrUndefined(_this.fontSize) && _this.fontSize > 0) {
                format.fontSize = _this.fontSize;
            }
            if (!isNullOrUndefined(_this.fontColor)) {
                format.fontColor = _this.fontColor;
            }
            if (!isNullOrUndefined(_this.baselineAlignment)) {
                format.baselineAlignment = _this.baselineAlignment;
            }
            if (!isNullOrUndefined(_this.strikethrough)) {
                format.strikethrough = _this.strikethrough;
            }
            if (!isNullOrUndefined(_this.underline)) {
                format.underline = _this.underline;
            }
            if (!isNullOrUndefined(_this.fontFamily)) {
                format.fontFamily = _this.fontFamily;
            }
            if (!_this.characterFormat) {
                _this.onCharacterFormat(_this.owner.selection, format);
            }
            else {
                _this.owner.owner.styleDialogModule.updateCharacterFormat();
            }
            _this.owner.dialog.hide();
        };
        this.fontSizeUpdate = function (args) {
            _this.fontSize = args.value;
        };
        this.fontStyleUpdate = function (args) {
            _this.fontStyle = args.value;
        };
        this.fontFamilyUpdate = function (args) {
            _this.fontFamily = args.value;
        };
        this.underlineUpdate = function (args) {
            _this.underline = args.value;
        };
        this.fontColorUpdate = function (args) {
            if (!isNullOrUndefined(args.currentValue)) {
                _this.fontColor = args.currentValue.hex;
            }
        };
        this.singleStrikeUpdate = function (args) {
            _this.enableCheckBoxProperty(args);
            if (args.checked) {
                _this.strikethrough = 'SingleStrike';
            }
            else {
                _this.strikethrough = 'None';
            }
        };
        this.doubleStrikeUpdate = function (args) {
            _this.enableCheckBoxProperty(args);
            if (args.checked) {
                _this.strikethrough = 'DoubleStrike';
            }
            else {
                _this.strikethrough = 'None';
            }
        };
        this.superscriptUpdate = function (args) {
            _this.enableCheckBoxProperty(args);
            if (args.checked) {
                _this.baselineAlignment = 'Superscript';
            }
            else {
                _this.baselineAlignment = 'Normal';
            }
        };
        this.subscriptUpdate = function (args) {
            _this.enableCheckBoxProperty(args);
            if (args.checked) {
                _this.baselineAlignment = 'Subscript';
            }
            else {
                _this.baselineAlignment = 'Normal';
            }
        };
        this.owner = layoutViewer;
    }
    Object.defineProperty(FontDialog.prototype, "fontStyle", {
        /**
         * @private
         */
        get: function () {
            return this.fontStyleInternal;
        },
        /**
         * @private
         */
        set: function (value) {
            this.fontStyleInternal = value;
            switch (this.fontStyle) {
                case 'Bold':
                    this.bold = true;
                    this.italic = false;
                    break;
                case 'Italic':
                    this.bold = false;
                    this.italic = true;
                    break;
                case 'BoldItalic':
                    this.bold = true;
                    this.italic = true;
                    break;
                case 'Regular':
                    this.bold = false;
                    this.italic = false;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    FontDialog.prototype.getModuleName = function () {
        return 'FontDialog';
    };
    FontDialog.prototype.createInputElement = function (type, id, className) {
        var element = createElement('input', {
            attrs: { type: type },
            id: id,
            className: className
        });
        return element;
    };
    /**
     * @private
     */
    FontDialog.prototype.initFontDialog = function (locale, isRtl) {
        var instance = this;
        var effectLabel;
        var strikeThroughElement;
        var superScriptElement;
        var subScriptElement;
        var doubleStrikeThroughElement;
        var id = this.owner.owner.containerId;
        this.target = createElement('div', { id: id + '_insertFontDialog', className: 'e-de-font-dlg' });
        var fontDiv = this.getFontDiv(locale, isRtl);
        this.target.appendChild(fontDiv);
        var sizeDiv = this.getFontSizeDiv(locale, isRtl);
        this.target.appendChild(sizeDiv);
        var colorDiv = createElement('div', { id: id + '_fontColor', styles: 'margin-top:14px;' });
        this.fontColorDiv = createElement('div', { id: id + '_fontColorDiv', className: 'e-de-font-dlg-display' });
        var fontColorLabel = createElement('label', {
            className: 'e-de-font-dlg-header-font-color e-de-font-color-margin',
            innerHTML: locale.getConstant('Font color'), styles: 'width:63px'
        });
        if (isRtl) {
            fontColorLabel.classList.add('e-de-rtl');
        }
        this.fontColorDiv.appendChild(fontColorLabel);
        var fontColorElement = this.createInputElement('color', this.target.id + '_ColorDiv', 'e-de-font-dlg-color');
        this.fontColorDiv.appendChild(fontColorElement);
        colorDiv.appendChild(this.fontColorDiv);
        this.target.appendChild(colorDiv);
        var fontEffectsDiv = createElement('div', { id: id + '_fontEffectsDiv' });
        var fontEffectSubDiv1 = createElement('div', {
            className: 'e-de-font-color-label e-de-font-dlg-display',
            id: this.target.id + '_fontEffectsSubDiv1'
        });
        effectLabel = createElement('label', {
            className: 'e-de-font-dlg-header-effects',
            innerHTML: locale.getConstant('Effects'), styles: 'width:58px'
        });
        fontEffectSubDiv1.appendChild(effectLabel);
        strikeThroughElement = this.createInputElement('checkbox', this.target.id + '_strikeThrough', '');
        fontEffectSubDiv1.appendChild(strikeThroughElement);
        superScriptElement = this.createInputElement('checkbox', this.target.id + '_superScript', '');
        fontEffectSubDiv1.appendChild(superScriptElement);
        fontEffectsDiv.appendChild(fontEffectSubDiv1);
        var fontEffectSubDiv2 = createElement('div', { className: 'e-de-font-checkbox', id: id + '_fontEffectsSubDiv2' });
        subScriptElement = this.createInputElement('checkbox', this.target.id + '_subScript', '');
        fontEffectSubDiv2.appendChild(subScriptElement);
        doubleStrikeThroughElement = this.createInputElement('checkbox', this.target.id + '_doubleStrikeThrough', '');
        fontEffectSubDiv2.appendChild(doubleStrikeThroughElement);
        fontEffectsDiv.appendChild(fontEffectSubDiv2);
        this.target.appendChild(fontEffectsDiv);
        this.colorPicker = new ColorPicker({
            change: this.fontColorUpdate, value: '#000000', enableRtl: isRtl, locale: this.owner.owner.locale
        });
        this.colorPicker.appendTo(fontColorElement);
        this.strikethroughBox = new CheckBox({
            change: this.singleStrikeUpdate,
            cssClass: 'e-de-font-content-label',
            label: locale.getConstant('Strikethrough'),
            enableRtl: isRtl
        });
        this.strikethroughBox.appendTo(strikeThroughElement);
        this.doublestrikethrough = new CheckBox({
            change: this.doubleStrikeUpdate,
            cssClass: 'e-de-font-content-checkbox-label',
            label: locale.getConstant('Double strikethrough'),
            enableRtl: isRtl
        });
        this.doublestrikethrough.appendTo(doubleStrikeThroughElement);
        this.subscript = new CheckBox({
            label: locale.getConstant('Subscript'),
            cssClass: 'e-de-font-content-label-width',
            change: this.subscriptUpdate,
            enableRtl: isRtl
        });
        this.subscript.appendTo(subScriptElement);
        this.superscript = new CheckBox({
            label: locale.getConstant('Superscript'),
            cssClass: 'e-de-font-content-label', change: this.superscriptUpdate,
            enableRtl: isRtl
        });
        this.superscript.appendTo(superScriptElement);
        if (isRtl) {
            fontEffectSubDiv2.classList.add('e-de-rtl');
            this.doublestrikethrough.cssClass = 'e-de-font-content-checkbox-label-rtl';
        }
    };
    FontDialog.prototype.getFontSizeDiv = function (locale, isRtl) {
        var fontSize;
        var sizeDiv;
        var id = this.owner.owner.containerId;
        sizeDiv = createElement('div', { id: id + '_fontSizeAndUnderlineDiv', className: 'e-de-font-dlg-padding e-de-font-dlg-display' });
        var sizeSubDiv1 = createElement('div', { id: id + '_fontSizeAndUnderlineSubDiv1' });
        var sizeLabel = createElement('label', { className: 'e-de-font-dlg-header', innerHTML: locale.getConstant('Size') });
        var styles = 'font-family:Roboto;font-size:14px;opacity:0.8;';
        fontSize = createElement('select', { id: this.target.id + '_fontSize', styles: styles });
        fontSize.innerHTML = '<option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>' +
            '<option>14</option><option>16</option><option>18</option><option>20</option><option>24</option><option>26</option>' +
            '<option>28</option><option>36</option><option>48</option><option>72</option><option>96</option>';
        sizeSubDiv1.appendChild(sizeLabel);
        sizeSubDiv1.appendChild(fontSize);
        sizeDiv.appendChild(sizeSubDiv1);
        var sizeSubDiv2 = createElement('div', {
            className: 'e-de-font-dlg-cb-right',
            id: id + '_fontSizeAndUnderlineSubDiv2'
        });
        if (isRtl) {
            sizeSubDiv2.classList.add('e-de-rtl');
        }
        var html = locale.getConstant('Underline style');
        var underlineLabel = createElement('label', { className: 'e-de-font-dlg-header', innerHTML: html });
        var underlineElement;
        underlineElement = createElement('select', { id: this.target.id + '_underLine', styles: styles });
        underlineElement.innerHTML = '<option>' + locale.getConstant('None') + '</option><option>________</option>';
        sizeSubDiv2.appendChild(underlineLabel);
        sizeSubDiv2.appendChild(underlineElement);
        sizeDiv.appendChild(sizeSubDiv2);
        this.fontSizeText = new ComboBox({ change: this.fontSizeUpdate, popupHeight: '170px', width: '170px', enableRtl: isRtl });
        this.fontSizeText.showClearButton = false;
        this.fontSizeText.appendTo(fontSize);
        this.underlineDrop = new DropDownList({ change: this.underlineUpdate, popupHeight: '100px', width: '170px', enableRtl: isRtl });
        this.underlineDrop.appendTo(underlineElement);
        return sizeDiv;
    };
    FontDialog.prototype.getFontDiv = function (locale, isRtl) {
        var id = this.owner.owner.containerId;
        var fontDiv = createElement('div', { id: id + '_fontDiv', className: 'e-de-font-dlg-display' });
        var fontSubDiv1 = createElement('div', { id: id + '_fontSubDiv1' });
        var fontNameLabel = createElement('label', {
            className: 'e-de-font-dlg-header',
            innerHTML: locale.getConstant('Font')
        });
        var fontNameValues = createElement('select', { id: this.target.id + '_fontName' });
        fontNameValues.innerHTML = '<option>Arial</option><option>Calibri</option><option>Candara</option><option>Comic Sans MS</option>' +
            '<option>Consolas</option><option>Constantia</option><option>Corbel</option>' +
            '<option>Courier New</option><option>Ebrima</option><option>Franklin Gothic</option>' +
            '<option>Gabriola</option><option>Gadugi</option><option>Georgia</option><option>Impact</option>' +
            '<option>Javanese Text</option><option>Microsoft Sans Serif</option><option>MS Gothic</option><option>MS UI Gothic</option>' +
            '<option>Segoe Print</option><option>Times New Roman</option><option>Verdana</option><option>Segoe UI</option>' +
            '<option>Algerian</option><option>Cambria</option><option>Georgia</option><option>Consolas</option>';
        fontSubDiv1.appendChild(fontNameLabel);
        fontSubDiv1.appendChild(fontNameValues);
        fontDiv.appendChild(fontSubDiv1);
        var fontSubDiv2;
        var fontStyleLabel;
        var fontStyleValues;
        fontSubDiv2 = createElement('div', { className: 'e-de-font-dlg-cb-right', id: id + '_fontSubDiv2', styles: 'float:right;' });
        if (isRtl) {
            fontSubDiv2.classList.add('e-de-rtl');
        }
        fontStyleLabel = createElement('label', { className: 'e-de-font-dlg-header', innerHTML: locale.getConstant('Font style') });
        var fontStyle = 'font-family:Roboto;font-size:14px;opacity:0.8;';
        fontStyleValues = createElement('select', { id: this.target.id + '_fontStyle', styles: fontStyle });
        fontStyleValues.innerHTML = '<option>' +
            locale.getConstant('Regular') + '</option><option>' + locale.getConstant('Bold') + '</option><option>' +
            locale.getConstant('Italic') + '</option><option>' + locale.getConstant('Bold') + locale.getConstant('Italic') + '</option>';
        fontSubDiv2.appendChild(fontStyleLabel);
        fontSubDiv2.appendChild(fontStyleValues);
        fontDiv.appendChild(fontSubDiv2);
        this.fontNameList = new ComboBox({ change: this.fontFamilyUpdate, popupHeight: '200px', width: '170px', enableRtl: isRtl });
        this.fontNameList.showClearButton = false;
        this.fontNameList.appendTo(fontNameValues);
        this.fontStyleText = new DropDownList({ change: this.fontStyleUpdate, popupHeight: '170px', width: '170px', enableRtl: isRtl });
        this.fontStyleText.appendTo(fontStyleValues);
        return fontDiv;
    };
    /**
     * @private
     */
    FontDialog.prototype.showFontDialog = function (characterFormat) {
        if (characterFormat) {
            this.characterFormat = characterFormat;
        }
        var locale = new L10n('documenteditor', this.owner.owner.defaultLocale);
        locale.setLocale(this.owner.owner.locale);
        if (!this.target) {
            this.initFontDialog(locale, this.owner.owner.enableRtl);
        }
        this.owner.dialog.header = locale.getConstant('Font');
        this.owner.dialog.width = 'auto';
        this.owner.dialog.height = 'auto';
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = this.loadFontDialog;
        this.owner.dialog.close = this.closeFontDialog;
        this.owner.dialog.buttons = [{
                click: this.onInsertFontFormat,
                buttonModel: { content: locale.getConstant('Ok'), cssClass: 'e-flat e-font-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: locale.getConstant('Cancel'), cssClass: 'e-flat e-font-cancel' }
            }];
        this.owner.dialog.dataBind();
        this.owner.dialog.show();
    };
    /**
     * Applies character format
     * @param  {Selection} selection
     * @param  {WCharacterFormat} format
     * @private
     */
    FontDialog.prototype.onCharacterFormat = function (selection, format) {
        this.owner.owner.editorModule.initHistory('CharacterFormat');
        if (selection.isEmpty) {
            if (selection.start.offset === selection.getParagraphLength(selection.start.paragraph)) {
                // tslint:disable-next-line:max-line-length
                this.owner.owner.editorModule.applyCharFormatValueInternal(selection, selection.start.paragraph.characterFormat, undefined, format);
                this.owner.owner.editorModule.reLayout(selection);
            }
            this.owner.updateFocus();
            return;
        }
        else {
            //Iterate and update formating.
            this.owner.owner.editorModule.setOffsetValue(this.owner.selection);
            this.owner.owner.editorModule.updateSelectionCharacterFormatting('CharacterFormat', format, false);
        }
    };
    /**
     * @private
     */
    FontDialog.prototype.enableCheckBoxProperty = function (args) {
        if (this.strikethroughBox.checked && this.doublestrikethrough.checked) {
            this.strikethroughBox.checked = false;
            this.doublestrikethrough.checked = false;
            if (args.event.currentTarget.id === this.target.id + '_doubleStrikeThrough') {
                this.doublestrikethrough.checked = true;
            }
            else {
                this.strikethroughBox.checked = true;
            }
        }
        if (this.superscript.checked && this.subscript.checked) {
            this.subscript.checked = false;
            this.superscript.checked = false;
            if (args.event.currentTarget.id === this.target.id + '_subScript') {
                this.subscript.checked = true;
            }
            else {
                this.superscript.checked = true;
            }
        }
    };
    /**
     * @private
     */
    FontDialog.prototype.unWireEventsAndBindings = function () {
        this.fontNameList.value = '';
        this.fontSizeText.value = '';
        this.fontStyleText.value = '';
        this.strikethroughBox.checked = false;
        this.doublestrikethrough.checked = false;
        this.superscript.checked = false;
        this.subscript.checked = false;
        this.bold = undefined;
        this.italic = undefined;
        this.underline = undefined;
        this.strikethrough = undefined;
        this.baselineAlignment = undefined;
        this.fontColor = undefined;
        this.fontSize = undefined;
        this.fontFamily = undefined;
    };
    /**
     * @private
     */
    FontDialog.prototype.destroy = function () {
        this.owner = undefined;
        if (this.characterFormat) {
            this.characterFormat.destroy();
            this.characterFormat = undefined;
        }
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var m = 0; m < this.target.childNodes.length; m++) {
                this.target.removeChild(this.target.childNodes[m]);
                m--;
            }
            this.target = undefined;
        }
        if (this.fontNameList) {
            this.fontNameList.destroy();
        }
        this.fontNameList = undefined;
        if (this.fontStyleText) {
            this.fontStyleText.destroy();
        }
        this.fontStyleText = undefined;
        if (this.fontSizeText) {
            this.fontSizeText.destroy();
        }
        this.fontSizeText = undefined;
        if (this.colorPicker) {
            this.colorPicker.destroy();
        }
        this.colorPicker = undefined;
        if (this.underlineDrop) {
            this.underlineDrop.destroy();
        }
        this.underlineDrop = undefined;
        if (this.strikethroughBox) {
            this.strikethroughBox.destroy();
        }
        this.strikethroughBox = undefined;
        if (this.doublestrikethrough) {
            this.doublestrikethrough.destroy();
        }
        this.doublestrikethrough = undefined;
        if (this.superscript) {
            this.superscript.destroy();
        }
        this.superscript = undefined;
        if (this.subscript) {
            this.subscript.destroy();
        }
        this.subscript = undefined;
    };
    return FontDialog;
}());
export { FontDialog };
/* tslint:enable:no-any */ 
