import { Code128 } from './code128';
/**
 * code128C used to calculate the barcode of type 128C barcode
 */
export declare class Code128C extends Code128 {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(char: string): string;
    /** @private */
    draw(canvas: HTMLElement): void;
}
