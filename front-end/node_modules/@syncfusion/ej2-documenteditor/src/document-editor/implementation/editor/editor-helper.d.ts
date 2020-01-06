import { LineWidget, ElementBox, BodyWidget, ParagraphWidget, TextElementBox } from '../viewer/page';
import { WCharacterFormat, WCellFormat, TextPosition, TextSearchResults } from '../index';
import { HighlightColor } from '../../base/types';
import { Widget } from '../viewer/page';
import { Dictionary } from '../..';
/**
 * @private
 */
export declare class HelperMethods {
    /**
     * @private
     */
    static wordBefore: string;
    /**
     * @private
     */
    static wordAfter: string;
    /**
     * @private
     */
    static wordSplitCharacters: string[];
    /**
     * Inserts text at specified index in string.
     * @param {string} spanText
     * @param {number} index
     * @param {string} text
     * @private
     */
    static insert(spanText: string, index: number, text: string): string;
    /**
     * Removes text from specified index in string.
     * @param {string} text
     * @param {number} index
     * @param {number} length
     * @private
     */
    static remove(text: string, index: number, length: number): string;
    /**
     * Returns the index of word split character in a string.
     * @param {string} text
     * @param {string[]} wordSplitCharacter
     * @private
     */
    static indexOfAny(text: string, wordSplitCharacter: string[]): any;
    /**
     * Returns the last index of word split character in a string.
     * @param {string} text
     * @param {string[]} wordSplitCharacter
     * @private
     */
    static lastIndexOfAny(text: string, wordSplitCharacter: string[]): number;
    /**
     * Adds css styles to document header.
     * @param {string} css
     * @private
     */
    static addCssStyle(css: string): void;
    /**
     * Gets highlight color code.
     * @param {HighlightColor} highlightColor
     * @private
     */
    static getHighlightColorCode(highlightColor: HighlightColor): string;
    /**
     * Converts point to pixel.
     * @param {number} point
     * @private
     */
    static convertPointToPixel(point: number): number;
    /**
     * Converts pixel to point.
     * @param {number} pixel
     * @private
     */
    static convertPixelToPoint(pixel: number): number;
    /**
     * Return true if field linked
     * @private
     */
    static isLinkedFieldCharacter(inline: ElementBox): boolean;
    /**
     * Removes white space in a string.
     * @param {string} text
     * @private
     */
    static removeSpace(text: string): string;
    /**
     * Trims white space at start of the string.
     * @param {string} text
     * @private
     */
    static trimStart(text: string): string;
    /**
     * Trims white space at end of the string.
     * @param {string} text
     * @private
     */
    static trimEnd(text: string): string;
    /**
     * Checks whether string ends with whitespace.
     * @param {string} text
     * @private
     */
    static endsWith(text: string): boolean;
    /**
     * Return specified number of string count
     * @private
     */
    static addSpace(length: number): string;
    /**
     * @private
     * Write Characterformat
     * @param {any} characterFormat
     * @param {boolean} isInline
     * @param {WCharacterFormat} format
     */
    static writeCharacterFormat(characterFormat: any, isInline: boolean, format: WCharacterFormat): void;
    /**
     * Rounds the values with specified decimal digits.
     * @param {number} value
     * @param {number} decimalDigits
     * @private
     */
    static round(value: number, decimalDigits: number): number;
    static ReverseString(text: string): string;
    /**
     * @private
     */
    static formatClippedString(base64ImageString: string): ImageInfo;
    private static startsWith;
}
/**
 * @private
 */
export declare class Point {
    private xIn;
    private yIn;
    /**
     * Gets or sets x value.
     * @private
     */
    x: number;
    /**
     * Gets or sets y value.
     * @private
     */
    y: number;
    constructor(xPosition: number, yPosition: number);
    /**
     * @private
     */
    copy(point: Point): void;
    /**
     * Destroys the internal objects maintained.
     * @returns void
     */
    destroy(): void;
}
/**
 * @private
 */
export declare class Base64 {
    private keyStr;
    encodeString(input: string): string;
    private unicodeEncode;
    /**
     * @private
     */
    decodeString(input: string): Uint8Array;
}
/**
 * @private
 */
export interface SubWidthInfo {
    subWidth: number;
    spaceCount: number;
}
/**
 * @private
 */
export interface LineElementInfo {
    topMargin: number;
    bottomMargin: number;
    addSubWidth: boolean;
    whiteSpaceCount: number;
}
/**
 * @private
 */
export interface Color {
    r: number;
    g: number;
    b: number;
}
/**
 * @private
 */
export interface CaretHeightInfo {
    height: number;
    topMargin: number;
    isItalic?: boolean;
}
/**
 * @private
 */
export interface SizeInfo {
    width: number;
    height: number;
    topMargin: number;
    bottomMargin: number;
}
/**
 * @private
 */
export interface FirstElementInfo {
    element: ElementBox;
    left: number;
}
/**
 * @private
 */
export interface IndexInfo {
    index: string;
}
/**
 * @private
 */
export interface ImagePointInfo {
    selectedElement: HTMLElement;
    resizePosition: string;
}
/**
 * @private
 */
export interface HyperlinkTextInfo {
    displayText: string;
    isNestedField: boolean;
    format: WCharacterFormat;
}
/**
 * @private
 */
export interface BodyWidgetInfo {
    bodyWidget: BodyWidget;
    index: number;
}
/**
 * @private
 */
export interface ParagraphInfo {
    paragraph: ParagraphWidget;
    offset: number;
}
/**
 * @private
 */
export interface ErrorInfo {
    errorFound: boolean;
    elements: any[];
}
/**
 * @private
 */
export interface SpaceCharacterInfo {
    width: number;
    wordLength: number;
    isBeginning: boolean;
}
/**
 * @private
 */
export interface SpecialCharacterInfo {
    beginningWidth: number;
    endWidth: number;
    wordLength: number;
}
/**
 * @private
 */
export interface ContextElementInfo {
    element: ElementBox;
    text: string;
}
/**
 * @private
 */
export interface WordSpellInfo {
    hasSpellError: boolean;
    isElementPresent: boolean;
}
/**
 * @private
 */
export interface TextInLineInfo {
    elementsWithOffset: Dictionary<TextElementBox, number>;
    fullText: string;
}
/**
 * @private
 */
export interface CellInfo {
    start: number;
    end: number;
}
/**
 * @private
 */
export interface FieldCodeInfo {
    isNested: boolean;
    isParsed: boolean;
}
/**
 * @private
 */
export interface LineInfo {
    line: LineWidget;
    offset: number;
}
/**
 * @private
 */
export interface ElementInfo {
    element: ElementBox;
    index: number;
}
/**
 * @private
 */
export interface MatchResults {
    matches: RegExpExecArray[];
    elementInfo: Dictionary<TextElementBox, number>;
    textResults: TextSearchResults;
}
/**
 * @private
 */
export interface TextPositionInfo {
    element: ElementBox;
    index: number;
    caretPosition: Point;
    isImageSelected: boolean;
}
/**
 * @private
 */
export interface CellCountInfo {
    count: number;
    cellFormats: WCellFormat[];
}
/**
 * @private
 */
export interface BlockInfo {
    node: Widget;
    position: IndexInfo;
}
/**
 * @private
 */
export interface WidthInfo {
    minimumWordWidth: number;
    maximumWordWidth: number;
}
/**
 * @private
 */
export interface RtlInfo {
    isRtl: boolean;
    id: number;
}
/**
 * @private
 */
export interface ImageInfo {
    extension: string;
    formatClippedString: string;
}
/**
 * @private
 */
export interface PositionInfo {
    startPosition: TextPosition;
    endPosition: TextPosition;
}
