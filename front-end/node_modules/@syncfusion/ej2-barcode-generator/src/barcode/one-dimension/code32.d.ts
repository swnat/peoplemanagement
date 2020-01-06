import { OneDimension } from '../one-dimension';
/**
 * code39 used to calculate the barcode of type 39
 */
export declare class Code32 extends OneDimension {
    /** @private */
    validateInput(char: string): string;
    /**
     * get the code value to check
     */
    private getCodeValue;
    private getPatternCollection;
    /** @private */
    draw(canvas: HTMLElement): void;
}
