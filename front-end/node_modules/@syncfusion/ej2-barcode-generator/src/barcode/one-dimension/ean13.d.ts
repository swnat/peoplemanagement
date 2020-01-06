import { OneDimension } from '../one-dimension';
/**
 * EAN13 class is  used to calculate the barcode of type EAN13 barcode
 */
export declare class Ean13 extends OneDimension {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(value: string): string;
    private checkSumData;
    private getStructure;
    private getBinaries;
    /** @private */
    draw(canvas: HTMLElement): void;
    private leftValue;
}
