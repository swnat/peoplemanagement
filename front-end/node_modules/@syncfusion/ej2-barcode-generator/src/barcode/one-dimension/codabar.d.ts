import { OneDimension } from '../one-dimension';
/**
 * codabar used to calculate the barcode of type codabar
 */
export declare class CodaBar extends OneDimension {
    /** @private */
    validateInput(char: string): string;
    private getCodeValue;
    private appendStartStopCharacters;
    private getPatternCollection;
    /** @private */
    draw(canvas: HTMLElement): void;
}
