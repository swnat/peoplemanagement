import { Underline, HighlightColor, BaselineAlignment, Strikethrough, BiDirectionalOverride } from '../../base/types';
import { WUniqueFormat } from '../../base/unique-format';
import { WStyle } from './style';
/**
 * @private
 */
export declare class WCharacterFormat {
    uniqueCharacterFormat: WUniqueFormat;
    private static uniqueCharacterFormats;
    private static uniqueFormatType;
    ownerBase: Object;
    baseCharStyle: WStyle;
    bold: boolean;
    italic: boolean;
    fontSize: number;
    fontFamily: string;
    underline: Underline;
    strikethrough: Strikethrough;
    baselineAlignment: BaselineAlignment;
    highlightColor: HighlightColor;
    fontColor: string;
    bidi: boolean;
    bdo: BiDirectionalOverride;
    boldBidi: boolean;
    italicBidi: boolean;
    fontSizeBidi: number;
    fontFamilyBidi: string;
    constructor(node?: Object);
    getPropertyValue(property: string): Object;
    private getDefaultValue;
    private documentCharacterFormat;
    private checkBaseStyle;
    private checkCharacterStyle;
    private setPropertyValue;
    private initializeUniqueCharacterFormat;
    private addUniqueCharacterFormat;
    private static getPropertyDefaultValue;
    isEqualFormat(format: WCharacterFormat): boolean;
    isSameFormat(format: WCharacterFormat): boolean;
    cloneFormat(): WCharacterFormat;
    /**
     * @private
     */
    hasValue(property: string): boolean;
    clearFormat(): void;
    destroy(): void;
    copyFormat(format: WCharacterFormat): void;
    updateUniqueCharacterFormat(format: WCharacterFormat): void;
    static clear(): void;
    ApplyStyle(baseCharStyle: WStyle): void;
    /**
     * For internal use
     * @private
     */
    getValue(property: string): Object;
    /**
     * For internal use
     * @private
     */
    mergeFormat(format: WCharacterFormat): void;
}
