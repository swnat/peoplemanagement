import { MarginModel } from '../barcode/primitives/margin-model';
import { QRCodeVersion, ErrorCorrectionLevel } from '../barcode/enum/enum';
import { DisplayTextModel } from '../barcode/primitives/displaytext-model';
/**
 * Qrcode used to calculate the Qrcode control
 */
export declare class QRCode {
    private mVersion;
    private mInputMode;
    private validInput;
    /**
     * Total bits required in mixing mode.
     */
    private totalBits;
    /**
     * Holds the data of Function Pattern.
     */
    private mModuleValue;
    private mDataAllocationValues;
    private mQrBarcodeValues;
    /**
     * Set version for mixing mode.
     */
    private mixVersionERC;
    /**
     * Data to be currently encoded in Mixing Mode
     */
    private mixExecutablePart;
    /**
     * Count of mixing mode blocks.
     */
    private mixDataCount;
    /**
     * Holds the Number of Modules.
     */
    private mNoOfModules;
    /**
     * Check if User Mentioned Mode
     */
    private mIsUserMentionedMode;
    private chooseDefaultMode;
    /** @private */
    text: string;
    private mixRemainingPart;
    private isXdimension;
    private mXDimension;
    /** @private */
    /** @private */
    XDimension: number;
    private inputMode;
    /** @private */
    /** @private */
    version: QRCodeVersion;
    private mIsEci;
    /** @private */
    mIsUserMentionedErrorCorrectionLevel: boolean;
    private isSvgMode;
    private mEciAssignmentNumber;
    /** @private */
    mIsUserMentionedVersion: boolean;
    /** @private */
    mErrorCorrectionLevel: ErrorCorrectionLevel;
    private textList;
    private mode;
    private getBaseAttributes;
    private getInstance;
    private drawImage;
    /** @private */
    draw(char: string, canvas: HTMLElement, height: number, width: number, margin?: MarginModel, displayText?: DisplayTextModel, mode?: boolean, foreColor?: string): boolean;
    private drawText;
    private drawDisplayText;
    private generateValues;
    /**
     * Draw the PDP in the given location
     * @param x - The x co-ordinate.
     * @param y - The y co-ordinate.
     */
    private drawPDP;
    /**
     * Draw the Timing Pattern
     */
    private drawTimingPattern;
    private initialize;
    /**
     * Adds quietzone to the QR Barcode.
     */
    private addQuietZone;
    /**
     * Draw the Format Information
     */
    private drawFormatInformation;
    /**
     * Allocates the Encoded Data and then Mask
     * @param Data - Encoded Data
     */
    private dataAllocationAndMasking;
    /**
     * Allocates Format and Version Information
     */
    private allocateFormatAndVersionInformation;
    /**
     * Draw the Alignment Pattern in the given location
     * @param x - The x co-ordinate
     * @param y - The y co-ordinate
     */
    private drawAlignmentPattern;
    /**
     * Gets the Allignment pattern coordinates of the current version.
     */
    private getAlignmentPatternCoOrdinates;
    /**
     * Encode the Input Data
     */
    private encodeData;
    /**
     * Converts string value to Boolean
     * @param numberInString - The String value
     * @param noOfBits - Number of Bits
     */
    private stringToBoolArray;
    /**
     * Converts Integer value to Boolean
     * @param number - The Integer value
     * @param noOfBits - Number of Bits
     */
    private intToBoolArray;
    /**
     * Splits the Code words
     * @param ds - The Encoded value Blocks
     * @param blk - Index of Block Number
     * @param count - Length of the Block
     */
    private splitCodeWord;
    /**
     * Creates the Blocks
     * @param encodeData - The Encoded value.
     * @param noOfBlocks - Number of Blocks.
     */
    private createBlocks;
}
/** @private */
export declare class ModuleValue {
    isBlack: boolean;
    isFilled: boolean;
    isPdp: boolean;
    constructor();
}
