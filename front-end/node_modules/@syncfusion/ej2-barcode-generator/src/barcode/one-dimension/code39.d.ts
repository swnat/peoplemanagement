import { OneDimension } from '../one-dimension';
/**
 * code39 used to calculate the barcode of type 39
 */
export declare class Code39 extends OneDimension {
    /**
     * get the code value to check
     */
    private getCodeValue;
    /**
     * get the characters to check
     */
    private getCharacter;
    /**
     * Check sum method for the code 39 bar code
     */
    private checkSum;
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(char: string): string;
    private getPatternCollection;
    private appendStartStopCharacters;
    /** @private */
    drawCode39Extension(canvas: HTMLElement, encodedCharacter: string): void;
    /** @private */
    draw(canvas: HTMLElement, encodedCharacter?: string): void;
}
