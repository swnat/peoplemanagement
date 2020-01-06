import { IToolbarStatus } from './../../common/interface';
/**
 * Update Toolbar Status
 * @hidden
 * @deprecated
 */
export declare const statusCollection: IToolbarStatus;
export declare class ToolbarStatus {
    /**
     * get method
     * @hidden
     * @deprecated
     */
    static get(docElement: Document, targetNode: Node, formatNode?: string[], fontSize?: string[], fontName?: string[], documentNode?: Node): IToolbarStatus;
    private static getFormatParent;
    private static isFormattedNode;
    private static isFontColor;
    private static isLink;
    private static isBackgroundColor;
    private static isFontSize;
    private static isFontName;
    private static isOrderedList;
    private static isUnorderedList;
    private static isAlignment;
    private static isFormats;
    private static getComputedStyle;
}
