import { QRCodeVersion, ErrorCorrectionLevel } from '../barcode/enum/enum';
/**
 * Qrcode used to calculate the Qrcode control
 */
export declare class ErrorCorrectionCodewords {
    /**
     * Holds the length
     */
    private mLength;
    /**
     * Holds the Error Correction Code Word
     */
    private eccw;
    /**
     * Holds the databits
     */
    private databits;
    /**
     * Holds the Data Code word
     */
    private mDataCodeWord;
    /**
     * Holds G(x)
     */
    private gx;
    /**
     * Holds all the values of Alpha
     */
    private alpha;
    /**
     * Holds the Decimal value
     */
    private decimalValue;
    /**
     * Holds the values of QR Barcode
     */
    private mQrBarcodeValues;
    /**
     * Sets and Gets the Data code word
     */
    /** @private */
    DC: string[];
    /**
     * Sets and Gets the DataBits
     */
    /** @private */
    DataBits: number;
    /**
     * Sets and Gets the Error Correction Code Words
     */
    /** @private */
    Eccw: number;
    /**
     * Initializes Error correction code word
     */
    constructor(version: QRCodeVersion, correctionLevel: ErrorCorrectionLevel);
    /**
     * Gets the Error correction code word
     */
    /** @private */
    getErcw(): string[];
    /**
     * Convert to decimal
     * @param inString - is a binary values.
     */
    private toDecimal;
    /**
     * Convert decimal to binary.
     */
    private toBinary;
    /**
     * Polynomial division
     */
    private divide;
    private xORPolynoms;
    private multiplyGeneratorPolynomByLeadterm;
    private convertToDecNotation;
    private convertToAlphaNotation;
    private findLargestExponent;
    private getIntValFromAlphaExp;
    /**
     * Find the element in the alpha
     */
    private findElement;
    /**
     * Gets g(x) of the element
     */
    private getElement;
}
