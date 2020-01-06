import { OneDimension } from '../one-dimension';
/**
 * This class is  used to calculate the barcode of type Universal Product Code barcode
 */
export declare class UpcA extends OneDimension {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(value: string): string;
    private checkSumData;
    private getBinaries;
    /** @private */
    draw(canvas: HTMLElement): void;
    private leftValue;
}
