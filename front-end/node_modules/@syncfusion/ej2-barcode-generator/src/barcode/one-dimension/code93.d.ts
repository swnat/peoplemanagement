import { OneDimension } from '../one-dimension';
/**
 * code39 used to calculate the barcode of type 39
 */
export declare class Code93 extends OneDimension {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(value: string): string;
    private getCharacterWeight;
    /**
     * get the code value to check
     */
    private getCodeValue;
    private getPatternCollection;
    private calculateCheckSum;
    /** @private */
    draw(canvas: HTMLElement): void;
}
