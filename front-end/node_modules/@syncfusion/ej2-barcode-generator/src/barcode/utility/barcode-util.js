/**
 * Barcode util
 */
import { BarcodeRenderer } from './../../barcode/rendering/renderer';
import { BarcodeCanvasRenderer } from './../../barcode/rendering/canvas-renderer';
/** @private */
export function removeChildElements(newProp, barcodeCanvas, mode, id) {
    var barCodeSVG = barcodeCanvas;
    if (mode === 'SVG' && !newProp.mode) {
        barCodeSVG.innerHTML = '';
    }
    else if (newProp.mode) {
        barCodeSVG.parentNode.removeChild(barCodeSVG);
    }
    return new BarcodeRenderer(id, mode === 'SVG');
}
/** @private */
export function getBaseAttributes(width, height, offSetX, offsetY, color, strokeColor) {
    var options = {
        width: width, height: height, x: offSetX, y: offsetY, color: color, strokeColor: strokeColor
    };
    return options;
}
/** @private */
export function clearCanvas(view, barcodeCanvas) {
    var width;
    var height;
    width = view.element.offsetWidth * 1.5;
    height = view.element.offsetHeight * 1.5;
    var ctx = BarcodeCanvasRenderer.getContext(barcodeCanvas);
    ctx.clearRect(0, 0, width, height);
}
/** @private */
export function refreshCanvasBarcode(qrCodeGenerator, barcodeCanvas) {
    clearCanvas(qrCodeGenerator, barcodeCanvas);
}
