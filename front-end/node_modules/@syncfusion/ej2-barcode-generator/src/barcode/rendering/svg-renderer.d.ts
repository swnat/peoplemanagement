import { IBarcodeRenderer } from './IRenderer';
import { BaseAttributes } from './canvas-interface';
/**
 * svg renderer
 */
/** @private */
export declare class BarcodeSVGRenderering implements IBarcodeRenderer {
    /**   @private  */
    renderRootElement(attribute: Object, backGroundColor: string): HTMLElement;
    /**   @private  */
    renderRect(svg: HTMLElement, attribute: BaseAttributes): HTMLElement;
    /**   @private  */
    renderText(svg: HTMLElement, attribute: BaseAttributes): HTMLElement;
}
