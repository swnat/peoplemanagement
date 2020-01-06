import { Code39 } from './code39';
/**
 * code39 used to calculate the barcode of type 39
 */
export declare class Code39Extension extends Code39 {
    private code39ExtensionValues;
    /**
     * Validate the given input to check whether the input is valid one or not
     *
     */
    /** @private */
    validateInput(char: string): string;
    private checkText;
    private code39Extension;
    /** @private */
    drawCode39(canvas: HTMLElement): void;
}
