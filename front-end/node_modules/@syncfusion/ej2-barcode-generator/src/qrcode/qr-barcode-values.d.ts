import { QRCodeVersion, ErrorCorrectionLevel } from '../barcode/enum/enum';
/**
 * Qrcode used to calculate the Qrcode control
 */
export declare class PdfQRBarcodeValues {
    /**
     * Holds the Version Information.
     */
    private mVersion;
    /**
     * Holds the Error Correction Level.
     */
    private mErrorCorrectionLevel;
    /**
     * Holds the Number of Data code word.
     */
    private mNumberOfDataCodeWord;
    /**
     * Holds the Number of Error correcting code words.
     */
    private mNumberOfErrorCorrectingCodeWords;
    /**
     * Holds the Number of Error correction Blocks.
     */
    private mNumberOfErrorCorrectionBlocks;
    /**
     * Holds the End value of the version.
     */
    private mEnd;
    /**
     * Holds the Data copacity of the version.
     */
    private mDataCapacity;
    /**
     * Holds the Format Information.
     */
    private mFormatInformation;
    /**
     * Holds the Version Information.
     */
    private mVersionInformation;
    /**
     * Holds all the values of Error correcting code words.
     */
    private numberOfErrorCorrectingCodeWords;
    /**
     * Hexadecimal values of CP437 characters
     */
    private cp437CharSet;
    /**
     * Hexadecimal values of ISO8859_2 characters
     */
    private iso88592CharSet;
    /**
     * Hexadecimal values of ISO8859_3 characters
     */
    private iso88593CharSet;
    /**
     * Hexadecimal values of ISO8859_4 characters
     */
    private iso88594CharSet;
    /**
     * Hexadecimal values of Windows1250 characters
     */
    private windows1250CharSet;
    /**
     * Hexadecimal values of Windows1251 characters
     */
    private windows1251CharSet;
    /**
     * Hexadecimal values of Windows1252 characters
     */
    private windows1252CharSet;
    /**
     * Hexadecimal values of Windows1256 characters
     */
    private windows1256CharSet;
    /**
     * Equivalent values of CP437 characters
     */
    private cp437ReplaceNumber;
    /**
     * Equivalent values of ISO8859_2 characters
     */
    private iso88592ReplaceNumber;
    /**
     * Equivalent values of ISO8859_3 characters
     */
    private iso88593ReplaceNumber;
    /**
     * Equivalent values of ISO8859_4 characters
     */
    private iso88594ReplaceNumber;
    /**
     * Equivalent values of Windows1250 characters
     */
    private windows1250ReplaceNumber;
    /**
     * Equivalent values of Windows1251 characters
     */
    private windows1251ReplaceNumber;
    /**
     * Equivalent values of Windows1252 characters
     */
    private windows1252ReplaceNumber;
    /**
     * Equivalent values of Windows1256 characters
     */
    private windows1256ReplaceNumber;
    /**
     * Holds all the end values.
     */
    /** @private */
    endValues: number[];
    /**
     * Holds all the Data capacity values.
     */
    /** @private */
    dataCapacityValues: number[];
    /**
     * Holds all  the Numeric Data capacity of the Error correction level Low.
     */
    /** @private */
    numericDataCapacityLow: number[];
    /**
     * Holds all  the Numeric Data capacity of the Error correction level Medium.
     */
    /** @private */
    numericDataCapacityMedium: number[];
    /**
     * Holds all  the Numeric Data capacity of the Error correction level Quartile.
     */
    /** @private */
    numericDataCapacityQuartile: number[];
    /**
     * Holds all  the Numeric Data capacity of the Error correction level High.
     */
    /** @private */
    numericDataCapacityHigh: number[];
    /**
     * Holds all  the Alpha numeric Data capacity of the Error correction level Low.
     */
    /** @private */
    alphanumericDataCapacityLow: number[];
    /**
     * Holds all  the Alpha numeric Data capacity of the Error correction level Medium.
     */
    /** @private */
    alphanumericDataCapacityMedium: number[];
    /**
     * Holds all  the Alpha numeric Data capacity of the Error correction level Quartile.
     */
    /** @private */
    alphanumericDataCapacityQuartile: number[];
    /**
     * Holds all  the Alpha numeric Data capacity of the Error correction level High.
     */
    /** @private */
    alphanumericDataCapacityHigh: number[];
    /**
     * Holds all  the Binary Data capacity of the Error correction level Low.
     */
    /** @private */
    binaryDataCapacityLow: number[];
    /**
     * Holds all  the Binary Data capacity of the Error correction level Medium.
     */
    /** @private */
    binaryDataCapacityMedium: number[];
    /**
     * Holds all  the Binary Data capacity of the Error correction level Quartile.
     */
    /** @private */
    binaryDataCapacityQuartile: number[];
    /**
     * Holds all  the Binary Data capacity of the Error correction level High.
     */
    /** @private */
    binaryDataCapacityHigh: number[];
    /**
     * Holds all  the Mixed Data capacity of the Error correction level Low.
     */
    private mixedDataCapacityLow;
    /**
     * Holds all  the Mixed Data capacity of the Error correction level Medium.
     */
    private mixedDataCapacityMedium;
    /**
     * Holds all  the Mixed Data capacity of the Error correction level Quartile.
     */
    private mixedDataCapacityQuartile;
    /**
     * Holds all  the Mixed Data capacity of the Error correction level High.
     */
    private mixedDataCapacityHigh;
    /**
     * Get or public set the Number of Data code words.
     */
    /** @private */
    /** @private */
    NumberOfDataCodeWord: number;
    /**
     * Get or Private set the Number of Error correction code words.
     */
    /** @private */
    /** @private */
    NumberOfErrorCorrectingCodeWords: number;
    /**
     * Get or Private set the Number of Error correction Blocks.
     */
    /** @private */
    /** @private */
    NumberOfErrorCorrectionBlocks: number[];
    /**
     * Set the End value of the Current Version.
     */
    private End;
    /**
     * Get or Private set the Data capacity.
     */
    private DataCapacity;
    /**
     * Get or Private set the Format Information.
     */
    /** @private */
    /** @private */
    FormatInformation: number[];
    /**
     * Get or Private set the Version Information.
     */
    /** @private */
    /** @private */
    VersionInformation: number[];
    /**
     * Initializes the values
     * @param version - version of the qr code
     * @param errorCorrectionLevel - defines the level of error correction.
     */
    constructor(version: QRCodeVersion, errorCorrectionLevel: ErrorCorrectionLevel);
    /**
     * Gets the Alphanumeric values.
     */
    /** @private */
    getAlphaNumericValues(value: string): number;
    /**
     * Gets number of data code words.
     */
    private obtainNumberOfDataCodeWord;
    /**
     * Get number of Error correction code words.
     */
    private obtainNumberOfErrorCorrectingCodeWords;
    /**
     * Gets number of Error correction Blocks.
     */
    private obtainNumberOfErrorCorrectionBlocks;
    /**
     * Gets the End of the version.
     */
    private obtainEnd;
    /**
     * Gets Data capacity
     */
    private obtainDataCapacity;
    /**
     * Gets format information
     */
    private obtainFormatInformation;
    /**
     * Gets version information
     */
    private obtainVersionInformation;
    /**
     * Gets Numeric Data capacity.
     */
    /** @private */
    getNumericDataCapacity(version: QRCodeVersion, errorCorrectionLevel: ErrorCorrectionLevel): number;
    /**
     * Gets Alphanumeric data capacity.
     */
    /** @private */
    getAlphanumericDataCapacity(version: QRCodeVersion, errorCorrectionLevel: ErrorCorrectionLevel): number;
    /** @private */
    getBinaryDataCapacity(version: QRCodeVersion, errorCorrectionLevel: ErrorCorrectionLevel): number;
}
