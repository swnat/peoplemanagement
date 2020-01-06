import { OneDimension } from '../one-dimension';
/**
 * This class is  used to calculate the barcode of type Universal Product Code barcode
 */
export declare class UpcE extends OneDimension {
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    validateInput(value: string): string;
    private checkSum;
    private getStructure;
    private getValue;
    private getExpansion;
    private getUpcValue;
    private getBinaries;
    private encoding;
    /** @private */
    draw(canvas: HTMLElement): void;
}
