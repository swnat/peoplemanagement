import { BarcodeCanvasRenderer } from './canvas-renderer';
import { BarcodeSVGRenderering } from './svg-renderer';
/**
 * Renderer
 */
/**
 * Renderer module is used to render basic barcode elements
 */
/** @private */
var BarcodeRenderer = /** @class */ (function () {
    function BarcodeRenderer(name, isSvgMode) {
        /**   @private  */
        this.renderer = null;
        this.isSvgMode = null;
        this.isSvgMode = isSvgMode;
        this.renderer = isSvgMode ? new BarcodeSVGRenderering() : new BarcodeCanvasRenderer();
    }
    /**   @private  */
    BarcodeRenderer.prototype.renderRootElement = function (attribute, backGroundColor, width, height) {
        var canvasObj = this.renderer.renderRootElement(attribute, backGroundColor, width, height);
        return canvasObj;
    };
    /**   @private  */
    BarcodeRenderer.prototype.renderRectElement = function (canvas, attribute) {
        var canvasObj = this.renderer.renderRect(canvas, attribute);
        return canvasObj;
    };
    /**   @private  */
    BarcodeRenderer.prototype.renderTextElement = function (canvas, attribute) {
        var canvasObj = this.renderer.renderText(canvas, attribute);
        return canvasObj;
    };
    return BarcodeRenderer;
}());
export { BarcodeRenderer };
