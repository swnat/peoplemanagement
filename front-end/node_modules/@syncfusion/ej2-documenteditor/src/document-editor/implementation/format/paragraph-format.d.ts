import { LineSpacingType, TextAlignment, OutlineLevel, TabJustification, TabLeader } from '../../base/types';
import { WUniqueFormat } from '../../base/unique-format';
import { WListFormat } from './list-format';
import { WStyle } from './style';
/**
 * @private
 */
export declare class WTabStop {
    private positionIn;
    private deletePositionIn;
    private justification;
    private leader;
    position: number;
    deletePosition: number;
    tabJustification: TabJustification;
    tabLeader: TabLeader;
    destroy(): void;
}
/**
 * @private
 */
export declare class WParagraphFormat {
    uniqueParagraphFormat: WUniqueFormat;
    private static uniqueParagraphFormats;
    private static uniqueFormatType;
    listFormat: WListFormat;
    ownerBase: Object;
    baseStyle: WStyle;
    tabs: WTabStop[];
    getUpdatedTabs(): WTabStop[];
    private hasTabStop;
    leftIndent: number;
    rightIndent: number;
    firstLineIndent: number;
    beforeSpacing: number;
    afterSpacing: number;
    lineSpacing: number;
    lineSpacingType: LineSpacingType;
    textAlignment: TextAlignment;
    outlineLevel: OutlineLevel;
    bidi: boolean;
    contextualSpacing: boolean;
    constructor(node?: Object);
    private getListFormatParagraphFormat;
    private getListPargaraphFormat;
    getPropertyValue(property: string): Object;
    private getDefaultValue;
    private documentParagraphFormat;
    private setPropertyValue;
    private initializeUniqueParagraphFormat;
    private addUniqueParaFormat;
    private static getPropertyDefaultValue;
    clearFormat(): void;
    destroy(): void;
    copyFormat(format: WParagraphFormat): void;
    updateUniqueParagraphFormat(format: WParagraphFormat): void;
    cloneFormat(): WParagraphFormat;
    private hasValue;
    static clear(): void;
    ApplyStyle(baseStyle: WStyle): void;
    /**
     * For internal use
     * @private
     */
    getValue(property: string): Object;
    /**
     * For internal use
     * @private
     */
    mergeFormat(format: WParagraphFormat, isStyle?: boolean): void;
}
