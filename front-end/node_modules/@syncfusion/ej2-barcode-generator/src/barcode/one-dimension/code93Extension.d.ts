import { Code93 } from './code93';
/**
 * code39 used to calculate the barcode of type 39
 */
export declare class Code93Extension extends Code93 {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(text: string): string;
    private getValue;
    private barcodeSymbols;
    private getBars;
    private GetExtendedText;
    /** @private */
    drawCode93(canvas: HTMLElement): void;
    private extendedText;
    private GetCheckSumSymbols;
    private CalculateCheckDigit;
    private getArrayValue;
    private encoding;
}
