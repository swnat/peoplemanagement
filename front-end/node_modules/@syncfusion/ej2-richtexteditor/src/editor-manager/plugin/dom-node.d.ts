import { NodeSelection } from './../../selection/index';
export declare const markerClassName: {
    [key: string]: string;
};
/**
 * DOMNode internal plugin
 * @hidden
 * @deprecated
 */
export declare class DOMNode {
    private parent;
    private currentDocument;
    private nodeSelection;
    /**
     * Constructor for creating the DOMNode plugin
     * @hidden
     * @deprecated
     */
    constructor(parent: Element, currentDocument: Document);
    /**
     * contents method
     * @hidden
     * @deprecated
     */
    contents(element: Element): Node[];
    /**
     * isBlockNode method
     * @hidden
     * @deprecated
     */
    isBlockNode(element: Element): boolean;
    /**
     * isLink method
     * @hidden
     * @deprecated
     */
    isLink(element: Element): boolean;
    /**
     * blockParentNode method
     * @hidden
     * @deprecated
     */
    blockParentNode(element: Element): Element;
    /**
     * rawAttributes method
     * @hidden
     * @deprecated
     */
    rawAttributes(element: Element): {
        [key: string]: string;
    };
    /**
     * attributes method
     * @hidden
     * @deprecated
     */
    attributes(element?: Element): string;
    /**
     * clearAttributes method
     * @hidden
     * @deprecated
     */
    clearAttributes(element: Element): void;
    /**
     * openTagString method
     * @hidden
     * @deprecated
     */
    openTagString(element: Element): string;
    /**
     * closeTagString method
     * @hidden
     * @deprecated
     */
    closeTagString(element: Element): string;
    /**
     * createTagString method
     * @hidden
     * @deprecated
     */
    createTagString(tagName: string, relativeElement: Element, innerHTML: string): string;
    /**
     * isList method
     * @hidden
     * @deprecated
     */
    isList(element: Element): boolean;
    /**
     * isElement method
     * @hidden
     * @deprecated
     */
    isElement(element: Element): boolean;
    /**
     * isEditable method
     * @hidden
     * @deprecated
     */
    isEditable(element: Element): boolean;
    /**
     * hasClass method
     * @hidden
     * @deprecated
     */
    hasClass(element: Element, className: string): boolean;
    /**
     * replaceWith method
     * @hidden
     * @deprecated
     */
    replaceWith(element: Element, value: string): void;
    /**
     * parseHTMLFragment method
     * @hidden
     * @deprecated
     */
    parseHTMLFragment(value: string): Element;
    /**
     * wrap method
     * @hidden
     * @deprecated
     */
    wrap(element: Element, wrapper: Element): Element;
    /**
     * insertAfter method
     * @hidden
     * @deprecated
     */
    insertAfter(newNode: Element, referenceNode: Element): void;
    /**
     * wrapInner method
     * @hidden
     * @deprecated
     */
    wrapInner(parent: Element, wrapper: Element): Element;
    /**
     * unWrap method
     * @hidden
     * @deprecated
     */
    unWrap(element: Element): Element[];
    /**
     * getSelectedNode method
     * @hidden
     * @deprecated
     */
    getSelectedNode(element: Element, index: number): Element;
    /**
     * nodeFinds method
     * @hidden
     * @deprecated
     */
    nodeFinds(element: Element, elements: Element[]): Element[];
    /**
     * isEditorArea method
     * @hidden
     * @deprecated
     */
    isEditorArea(): boolean;
    /**
     * getRangePoint method
     * @hidden
     * @deprecated
     */
    getRangePoint(point?: number): Range | Range[];
    getSelection(): Selection;
    /**
     * getPreviousNode method
     * @hidden
     * @deprecated
     */
    getPreviousNode(element: Element): Element;
    /**
     * encode method
     * @hidden
     * @deprecated
     */
    encode(value: string): string;
    /**
     * saveMarker method
     * @hidden
     * @deprecated
     */
    saveMarker(save: NodeSelection, action?: string): NodeSelection;
    private marker;
    /**
     * setMarker method
     * @hidden
     * @deprecated
     */
    setMarker(save: NodeSelection): void;
    /**
     * ensureSelfClosingTag method
     * @hidden
     * @deprecated
     */
    ensureSelfClosingTag(start: Element, className: string, range: Range): void;
    /**
     * createTempNode method
     * @hidden
     * @deprecated
     */
    createTempNode(element: Element): Element;
    /**
     * getImageTagInSelection method
     * @hidden
     * @deprecated
     */
    getImageTagInSelection(): NodeListOf<HTMLImageElement>;
    /**
     * blockNodes method
     * @hidden
     * @deprecated
     */
    blockNodes(): Node[];
    private ignoreTableTag;
}
