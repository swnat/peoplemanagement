import { OneDimension } from '../one-dimension';
/**
 * EAN8 class is  used to calculate the barcode of type EAN8 barcode
 */
export declare class Ean8 extends OneDimension {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(value: string): string;
    private getCodeValueRight;
    private checkSumData;
    /** @private */
    draw(canvas: HTMLElement): void;
    private leftValue;
}
