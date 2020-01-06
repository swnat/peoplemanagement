import { OneDimension } from '../one-dimension';
/**
 * code128 used to calculate the barcode of type 128
 */
export declare class Code128 extends OneDimension {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(char: string): string;
    private getCodeValue;
    private getBytes;
    private appendStartStopCharacters;
    private check128C;
    private check128A;
    private check128B;
    private clipAB;
    private code128Clip;
    private clipC;
    /** @private */
    draw(canvas: HTMLElement): void;
    /** @private */
    code128(canvas: HTMLElement): void;
    private encodeData;
    private swap;
    private encode;
    private correctIndex;
    private getCodes;
}
