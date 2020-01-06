export declare class ClearFormat {
    private static BLOCK_TAGS;
    private static NONVALID_PARENT_TAGS;
    private static IGNORE_PARENT_TAGS;
    private static NONVALID_TAGS;
    /**
     * clear method
     * @hidden
     * @deprecated
     */
    static clear(docElement: Document, endNode: Node, selector?: string): void;
    private static reSelection;
    private static clearBlocks;
    private static spliceParent;
    private static removeChild;
    private static removeParent;
    private static unWrap;
    private static clearInlines;
    private static removeInlineParent;
}
