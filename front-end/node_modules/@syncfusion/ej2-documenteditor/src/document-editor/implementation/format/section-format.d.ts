import { EditorHistory } from '../editor-history/editor-history';
/**
 * @private
 */
export declare class WSectionFormat {
    private uniqueSectionFormat;
    private static uniqueSectionFormats;
    private static uniqueFormatType;
    ownerBase: Object;
    headerDistance: number;
    footerDistance: number;
    differentFirstPage: boolean;
    differentOddAndEvenPages: boolean;
    pageHeight: number;
    rightMargin: number;
    pageWidth: number;
    leftMargin: number;
    bottomMargin: number;
    topMargin: number;
    bidi: boolean;
    restartPageNumbering: boolean;
    pageStartingNumber: number;
    constructor(node?: Object);
    destroy(): void;
    private hasValue;
    private static getPropertyDefaultValue;
    getPropertyValue(property: string): Object;
    private setPropertyValue;
    private initializeUniqueSectionFormat;
    private addUniqueSectionFormat;
    copyFormat(format: WSectionFormat, history?: EditorHistory): void;
    updateUniqueSectionFormat(format: WSectionFormat): void;
    cloneFormat(): WSectionFormat;
    static clear(): void;
}
