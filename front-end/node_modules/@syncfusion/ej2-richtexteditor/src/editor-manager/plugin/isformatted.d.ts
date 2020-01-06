/**
 * Is formatted or not.
 * @hidden
 * @deprecated
 */
export declare class IsFormatted {
    static inlineTags: string[];
    /**
     * getFormattedNode method
     * @hidden
     * @deprecated
     */
    getFormattedNode(node: Node, format: string, endNode: Node): Node;
    private getFormatParent;
    private isFormattedNode;
    /**
     * isBold method
     * @hidden
     * @deprecated
     */
    static isBold(node: Node): boolean;
    /**
     * isItalic method
     * @hidden
     * @deprecated
     */
    static isItalic(node: Node): boolean;
    /**
     * isUnderline method
     * @hidden
     * @deprecated
     */
    static isUnderline(node: Node): boolean;
    /**
     * isStrikethrough method
     * @hidden
     * @deprecated
     */
    static isStrikethrough(node: Node): boolean;
    /**
     * isSuperscript method
     * @hidden
     * @deprecated
     */
    static isSuperscript(node: Node): boolean;
    /**
     * isSubscript method
     * @hidden
     * @deprecated
     */
    static isSubscript(node: Node): boolean;
    private isFontColor;
    private isBackgroundColor;
    private isFontSize;
    private isFontName;
}
