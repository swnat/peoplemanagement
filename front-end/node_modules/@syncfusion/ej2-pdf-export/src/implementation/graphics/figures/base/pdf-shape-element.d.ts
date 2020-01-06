/**
 * PdfShapeElement.ts class for EJ2-PDF
 * @private
 */
import { PdfLayoutResult, PdfLayoutParams } from './element-layouter';
import { RectangleF } from './../../../drawing/pdf-drawing';
import { PdfLayoutElement } from './../layout-element';
/**
 * Base class for the main shapes.
 * @private
 */
export declare abstract class PdfShapeElement extends PdfLayoutElement {
    /**
     * Gets the bounds.
     * @private
     */
    getBounds(): RectangleF;
    /**
     * Returns a rectangle that bounds this element.
     * @private
     */
    protected abstract getBoundsInternal(): RectangleF;
    /**
     * Layouts the element.
     * @private
     */
    protected layout(param: PdfLayoutParams): PdfLayoutResult;
}
