/**
 * svg renderer
 */
import { createHtmlElement } from '../utility/dom-util';
/** @private */
var BarcodeSVGRenderer = /** @class */ (function () {
    function BarcodeSVGRenderer() {
    }
    /**   @private  */
    BarcodeSVGRenderer.prototype.renderRootElement = function (attribute) {
        var canvasObj = createHtmlElement('canvase', attribute);
        return canvasObj;
    };
    /**   @private  */
    BarcodeSVGRenderer.prototype.renderRect = function (canvas, attribute) {
        var canvasObj = createHtmlElement('canvase', attribute);
        return canvasObj;
    };
    /**   @private  */
    BarcodeSVGRenderer.prototype.renderLine = function (canvas, attribute) {
        var canvasObj = createHtmlElement('canvase', attribute);
        return canvasObj;
    };
    /**   @private  */
    BarcodeSVGRenderer.prototype.renderText = function (canvas, attribute) {
        var canvasObj = createHtmlElement('canvase', attribute);
        return canvasObj;
    };
    return BarcodeSVGRenderer;
}());
export { BarcodeSVGRenderer };
