import { IBarcodeRenderer } from './IRenderer';
/**
 * Renderer
 */
/**
 * Renderer module is used to render basic barcode elements
 */
/** @private */
export declare class BarcodeRenderer {
    /**   @private  */
    renderer: IBarcodeRenderer;
    isSvgMode: Boolean;
    constructor(name: string, isSvgMode: Boolean);
    /**   @private  */
    renderRootElement(attribute: Object, backGroundColor: string, width: number, height: number): HTMLElement;
    /**   @private  */
    renderRectElement(canvas: HTMLCanvasElement, attribute: Object): HTMLElement;
    /**   @private  */
    renderTextElement(canvas: HTMLCanvasElement, attribute: Object): HTMLElement;
}
