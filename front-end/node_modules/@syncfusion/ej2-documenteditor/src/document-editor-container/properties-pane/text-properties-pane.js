import { createElement, classList } from '@syncfusion/ej2-base';
import { Text } from './text-properties';
import { Paragraph } from './paragraph-properties';
/**
 * Text Properties pane
 * @private
 */
var TextProperties = /** @class */ (function () {
    function TextProperties(container, id, isTableProperties, isRtl) {
        var _this = this;
        this.isInitial = true;
        this.showTextProperties = function (isShow) {
            if (isShow) {
                _this.onSelectionChange();
            }
            if (!isShow && _this.element.style.display === 'none' || (isShow && _this.element.style.display === 'block')) {
                return;
            }
            _this.element.style.display = isShow ? 'block' : 'none';
            _this.documentEditor.resize();
        };
        this.generateUniqueID = function () {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };
        this.container = container;
        this.text = new Text(container, isRtl);
        this.paragraph = new Paragraph(container);
        this.initializeTextProperties(id, isTableProperties, isRtl);
        this.wireEvents();
    }
    Object.defineProperty(TextProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    TextProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    TextProperties.prototype.updateStyles = function () {
        this.paragraph.updateStyleNames();
    };
    Object.defineProperty(TextProperties.prototype, "appliedHighlightColor", {
        get: function () {
            return this.text.appliedHighlightColor;
        },
        set: function (value) {
            this.text.appliedHighlightColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "appliedBulletStyle", {
        get: function () {
            return this.paragraph.appliedBulletStyle;
        },
        set: function (value) {
            this.paragraph.appliedBulletStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "appliedNumberingStyle", {
        get: function () {
            return this.paragraph.appliedNumberingStyle;
        },
        set: function (value) {
            this.paragraph.appliedNumberingStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    TextProperties.prototype.initializeTextProperties = function (id, isTableProperties, isRtl) {
        /* tslint:disable-next-line:max-line-length */
        this.element = createElement('div', { id: id + 'id_' + this.generateUniqueID(), className: 'e-de-prop-pane' });
        this.text.initializeTextPropertiesDiv(this.element, isRtl);
        this.paragraph.initializeParagraphPropertiesDiv(this.element, isRtl);
        this.paragraph.updateStyleNames();
        if (!isTableProperties) {
            this.container.propertiesPaneContainer.appendChild(this.element);
        }
    };
    TextProperties.prototype.wireEvents = function () {
        this.text.wireEvent();
        this.paragraph.wireEvent();
    };
    TextProperties.prototype.onSelectionChange = function () {
        this.text.onSelectionChange();
        this.paragraph.onSelectionChange();
    };
    TextProperties.prototype.destroy = function () {
        if (this.text) {
            this.text.destroy();
            this.text = undefined;
        }
        if (this.paragraph) {
            this.paragraph.destroy();
            this.paragraph = undefined;
        }
    };
    return TextProperties;
}());
export { TextProperties };
