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
import { Property, ChildProperty } from '@syncfusion/ej2-base';
import { ToolbarType } from '../base/enum';
import { TableStyleItems } from '../models/items';
export var predefinedItems = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
    'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo'];
export var fontFamily = [
    { text: 'Segoe UI', value: 'Segoe UI', cssClass: 'e-segoe-ui' },
    { text: 'Arial', value: 'Arial,Helvetica,sans-serif', cssClass: 'e-arial' },
    { text: 'Georgia', value: 'Georgia,serif', cssClass: 'e-georgia' },
    { text: 'Impact', value: 'Impact,Charcoal,sans-serif', cssClass: 'e-impact' },
    { text: 'Tahoma', value: 'Tahoma,Geneva,sans-serif', cssClass: 'e-tahoma' },
    { text: 'Times New Roman', value: 'Times New Roman,Times,serif', cssClass: 'e-times-new-roman' },
    { text: 'Verdana', value: 'Verdana,Geneva,sans-serif', cssClass: 'e-verdana' }
];
export var fontSize = [
    { text: '8 pt', value: '8pt' },
    { text: '10 pt', value: '10pt' },
    { text: '12 pt', value: '12pt' },
    { text: '14 pt', value: '14pt' },
    { text: '18 pt', value: '18pt' },
    { text: '24 pt', value: '24pt' },
    { text: '36 pt', value: '36pt' }
];
export var formatItems = [
    { text: 'Paragraph', value: 'P', cssClass: 'e-paragraph' },
    { text: 'Code', value: 'Pre', cssClass: 'e-code' },
    { text: 'Quotation', value: 'BlockQuote', cssClass: 'e-quote' },
    { text: 'Heading 1', value: 'H1', cssClass: 'e-h1' },
    { text: 'Heading 2', value: 'H2', cssClass: 'e-h2' },
    { text: 'Heading 3', value: 'H3', cssClass: 'e-h3' },
    { text: 'Heading 4', value: 'H4', cssClass: 'e-h4' }
];
export var fontColor = {
    'Custom': [
        '', '#000000', '#e7e6e6', '#44546a', '#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#70ad47', '#ff0000',
        '#f2f2f2', '#808080', '#cfcdcd', '#d5dce4', '#d9e2f3', '#fbe4d5', '#ededed', '#fff2cc', '#e2efd9', '#ffcccc',
        '#d9d9d9', '#595959', '#aeaaaa', '#acb9ca', '#b4c6e7', '#f7caac', '#dbdbdb', '#ffe599', '#c5e0b3', '#ff8080',
        '#bfbfbf', '#404040', '#747070', '#8496b0', '#8eaadb', '#f4b083', '#c9c9c9', '#ffd966', '#a8d08d', '#ff3333',
        '#a6a6a6', '#262626', '#3b3838', '#323e4f', '#2f5496', '#c45911', '#7b7b7b', '#bf8f00', '#538135', '#b30000',
        '#7f7f7f', '#0d0d0d', '#161616', '#212934', '#1f3763', '#823b0b', '#525252', '#7f5f00', '#375623', '#660000'
    ]
};
export var backgroundColor = {
    'Custom': [
        '', '#000000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff0000', '#000080', '#800080', '#996633',
        '#f2f2f2', '#808080', '#ffffcc', '#b3ffb3', '#ccffff', '#ccccff', '#ffcccc', '#ccccff', '#ff80ff', '#f2e6d9',
        '#d9d9d9', '#595959', '#ffff80', '#80ff80', '#b3ffff', '#8080ff', '#ff8080', '#8080ff', '#ff00ff', '#dfbf9f',
        '#bfbfbf', '#404040', '#ffff33', '#33ff33', '#33ffff', '#3333ff', '#ff3333', '#0000b3', '#b300b3', '#c68c53',
        '#a6a6a6', '#262626', '#e6e600', '#00b300', '#009999', '#000099', '#b30000', '#000066', '#660066', '#86592d',
        '#7f7f7f', '#0d0d0d', '#999900', '#006600', '#006666', '#000066', '#660000', '#00004d', '#4d004d', '#734d26',
    ]
};
/**
 * Configures the toolbar settings of the RichTextEditor.
 */
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "enableFloating", void 0);
    __decorate([
        Property(ToolbarType.Expand)
    ], ToolbarSettings.prototype, "type", void 0);
    __decorate([
        Property(predefinedItems)
    ], ToolbarSettings.prototype, "items", void 0);
    __decorate([
        Property({})
    ], ToolbarSettings.prototype, "itemConfigs", void 0);
    return ToolbarSettings;
}(ChildProperty));
export { ToolbarSettings };
/**
 * Configures the image settings of the RichTextEditor.
 */
var ImageSettings = /** @class */ (function (_super) {
    __extends(ImageSettings, _super);
    function ImageSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(['.jpeg', '.jpg', '.png'])
    ], ImageSettings.prototype, "allowedTypes", void 0);
    __decorate([
        Property('inline')
    ], ImageSettings.prototype, "display", void 0);
    __decorate([
        Property('Blob')
    ], ImageSettings.prototype, "saveFormat", void 0);
    __decorate([
        Property('auto')
    ], ImageSettings.prototype, "width", void 0);
    __decorate([
        Property('auto')
    ], ImageSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "saveUrl", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "path", void 0);
    __decorate([
        Property(true)
    ], ImageSettings.prototype, "resize", void 0);
    __decorate([
        Property(0)
    ], ImageSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(0)
    ], ImageSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(false)
    ], ImageSettings.prototype, "resizeByPercent", void 0);
    return ImageSettings;
}(ChildProperty));
export { ImageSettings };
var TableSettings = /** @class */ (function (_super) {
    __extends(TableSettings, _super);
    function TableSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('100%')
    ], TableSettings.prototype, "width", void 0);
    __decorate([
        Property(TableStyleItems)
    ], TableSettings.prototype, "styles", void 0);
    __decorate([
        Property(true)
    ], TableSettings.prototype, "resize", void 0);
    __decorate([
        Property(0)
    ], TableSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(null)
    ], TableSettings.prototype, "maxWidth", void 0);
    return TableSettings;
}(ChildProperty));
export { TableSettings };
/**
 * Configures the quick toolbar settings of the RichTextEditor.
 */
var QuickToolbarSettings = /** @class */ (function (_super) {
    __extends(QuickToolbarSettings, _super);
    function QuickToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], QuickToolbarSettings.prototype, "enable", void 0);
    __decorate([
        Property(false)
    ], QuickToolbarSettings.prototype, "showOnRightClick", void 0);
    __decorate([
        Property('hide')
    ], QuickToolbarSettings.prototype, "actionOnScroll", void 0);
    __decorate([
        Property(['Open', 'Edit', 'UnLink'])
    ], QuickToolbarSettings.prototype, "link", void 0);
    __decorate([
        Property(['Replace', 'Align', 'Caption', 'Remove', '-', 'InsertLink', 'OpenImageLink', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'])
    ], QuickToolbarSettings.prototype, "image", void 0);
    __decorate([
        Property(['Cut', 'Copy', 'Paste'])
    ], QuickToolbarSettings.prototype, "text", void 0);
    __decorate([
        Property(['TableHeader', 'TableRows', 'TableColumns', 'BackgroundColor', '-', 'TableRemove', 'Alignments', 'TableCellVerticalAlign', 'Styles'])
    ], QuickToolbarSettings.prototype, "table", void 0);
    return QuickToolbarSettings;
}(ChildProperty));
export { QuickToolbarSettings };
/**
 * Configures the Paste Cleanup settings of the RichTextEditor.
 */
var PasteCleanupSettings = /** @class */ (function (_super) {
    __extends(PasteCleanupSettings, _super);
    function PasteCleanupSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], PasteCleanupSettings.prototype, "prompt", void 0);
    __decorate([
        Property(null)
    ], PasteCleanupSettings.prototype, "deniedAttrs", void 0);
    __decorate([
        Property(['background', 'background-color', 'border', 'border-bottom', 'border-left', 'border-radius', 'border-right', 'border-style', 'border-top', 'border-width', 'clear', 'color', 'cursor', 'direction', 'display', 'float', 'font', 'font-family', 'font-size', 'font-weight', 'font-style', 'height', 'left', 'line-height', 'margin', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'max-height', 'max-width', 'min-height', 'min-width', 'overflow', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'position', 'right', 'table-layout', 'text-align', 'text-decoration', 'text-indent', 'top', 'vertical-align', 'visibility', 'white-space', 'width'])
    ], PasteCleanupSettings.prototype, "allowedStyleProps", void 0);
    __decorate([
        Property(null)
    ], PasteCleanupSettings.prototype, "deniedTags", void 0);
    __decorate([
        Property(true)
    ], PasteCleanupSettings.prototype, "keepFormat", void 0);
    __decorate([
        Property(false)
    ], PasteCleanupSettings.prototype, "plainText", void 0);
    return PasteCleanupSettings;
}(ChildProperty));
export { PasteCleanupSettings };
/**
 * Configures the font family settings of the RichTextEditor.
 */
var FontFamily = /** @class */ (function (_super) {
    __extends(FontFamily, _super);
    function FontFamily() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], FontFamily.prototype, "default", void 0);
    __decorate([
        Property('65px')
    ], FontFamily.prototype, "width", void 0);
    __decorate([
        Property(fontFamily)
    ], FontFamily.prototype, "items", void 0);
    return FontFamily;
}(ChildProperty));
export { FontFamily };
/**
 * Configures the font size settings of the RichTextEditor.
 */
var FontSize = /** @class */ (function (_super) {
    __extends(FontSize, _super);
    function FontSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], FontSize.prototype, "default", void 0);
    __decorate([
        Property('35px')
    ], FontSize.prototype, "width", void 0);
    __decorate([
        Property(fontSize)
    ], FontSize.prototype, "items", void 0);
    return FontSize;
}(ChildProperty));
export { FontSize };
/**
 * Configures the format settings of the RichTextEditor.
 */
var Format = /** @class */ (function (_super) {
    __extends(Format, _super);
    function Format() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Format.prototype, "default", void 0);
    __decorate([
        Property('65px')
    ], Format.prototype, "width", void 0);
    __decorate([
        Property(formatItems)
    ], Format.prototype, "types", void 0);
    return Format;
}(ChildProperty));
export { Format };
/**
 * Configures the font Color settings of the RichTextEditor.
 */
var FontColor = /** @class */ (function (_super) {
    __extends(FontColor, _super);
    function FontColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#ff0000')
    ], FontColor.prototype, "default", void 0);
    __decorate([
        Property('Palette')
    ], FontColor.prototype, "mode", void 0);
    __decorate([
        Property(10)
    ], FontColor.prototype, "columns", void 0);
    __decorate([
        Property(fontColor)
    ], FontColor.prototype, "colorCode", void 0);
    __decorate([
        Property(false)
    ], FontColor.prototype, "modeSwitcher", void 0);
    return FontColor;
}(ChildProperty));
export { FontColor };
/**
 * Configures the background Color settings of the RichTextEditor.
 */
var BackgroundColor = /** @class */ (function (_super) {
    __extends(BackgroundColor, _super);
    function BackgroundColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#ffff00')
    ], BackgroundColor.prototype, "default", void 0);
    __decorate([
        Property('Palette')
    ], BackgroundColor.prototype, "mode", void 0);
    __decorate([
        Property(10)
    ], BackgroundColor.prototype, "columns", void 0);
    __decorate([
        Property(backgroundColor)
    ], BackgroundColor.prototype, "colorCode", void 0);
    __decorate([
        Property(false)
    ], BackgroundColor.prototype, "modeSwitcher", void 0);
    return BackgroundColor;
}(ChildProperty));
export { BackgroundColor };
