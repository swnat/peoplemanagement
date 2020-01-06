import { IBarcodeRenderer } from './IRenderer';
import { BaseAttributes } from './canvas-interface';
/**
 * canvas renderer
 */
/** @private */
export declare class BarcodeCanvasRenderer implements IBarcodeRenderer {
    /**   @private  */
    static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
    /**   @private  */
    renderRootElement(attribute: Object, backGroundColor: string, width: number, height: number): HTMLElement;
    /**   @private  */
    renderRect(canvas: HTMLCanvasElement, attribute: BaseAttributes): HTMLElement;
    renderText(canvas: HTMLCanvasElement, attribute: BaseAttributes): HTMLElement;
}
