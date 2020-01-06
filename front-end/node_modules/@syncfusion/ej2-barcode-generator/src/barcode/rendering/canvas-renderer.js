import { createHtmlElement } from '../utility/dom-util';
/**
 * canvas renderer
 */
/** @private */
var BarcodeCanvasRenderer = /** @class */ (function () {
    function BarcodeCanvasRenderer() {
    }
    /**   @private  */
    BarcodeCanvasRenderer.getContext = function (canvas) {
        return canvas.getContext('2d');
    };
    /**   @private  */
    BarcodeCanvasRenderer.prototype.renderRootElement = function (attribute, backGroundColor, width, height) {
        var canvasObj = createHtmlElement('canvas', attribute);
        var ctx = canvasObj.getContext('2d');
        ctx.fillStyle = backGroundColor;
        ctx.fillRect(0, 0, width, height);
        return canvasObj;
    };
    /**   @private  */
    BarcodeCanvasRenderer.prototype.renderRect = function (canvas, attribute) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = attribute.color;
        ctx.fillRect(attribute.x, attribute.y, attribute.width, attribute.height);
        return canvas;
    };
    BarcodeCanvasRenderer.prototype.renderText = function (canvas, attribute) {
        var ctx = canvas.getContext('2d');
        ctx.save();
        ctx.font = (attribute.stringSize) + 'px ' + attribute.fontStyle;
        ctx.fillStyle = attribute.color;
        ctx.fillText(attribute.string, attribute.x, attribute.y);
        return canvas;
    };
    return BarcodeCanvasRenderer;
}());
export { BarcodeCanvasRenderer };
