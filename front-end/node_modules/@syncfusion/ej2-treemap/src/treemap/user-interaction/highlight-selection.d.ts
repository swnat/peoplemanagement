import { TreeMap } from '../treemap';
/**
 * Performing treemap highlight
 */
export declare class TreeMapHighlight {
    private treemap;
    highLightId: string;
    private target;
    shapeTarget: string;
    private shapeElement;
    shapeHighlightCollection: object[];
    legendHighlightCollection: object[];
    currentElement: object[];
    constructor(treeMap: TreeMap);
    /**
     * Mouse down event in highlight
     */
    mouseMove(e: PointerEvent): boolean;
    /**
     * To bind events for highlight
     */
    private addEventListener;
    /**
     * To unbind events for highlight
     */
    private removeEventListener;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the hightlight.
     * @return {void}
     * @private
     */
    destroy(treeMap: TreeMap): void;
}
/**
 * Performing treemap selection
 */
export declare class TreeMapSelection {
    private treemap;
    selectionId: string;
    legendSelectId: string;
    shapeSelectId: string;
    shapeElement: Element;
    shapeSelectionCollection: object[];
    legendSelectionCollection: object[];
    shapeSelect: boolean;
    legendSelect: boolean;
    constructor(treeMap: TreeMap);
    /**
     * Mouse down event in selection
     */
    mouseDown(e: PointerEvent): void;
    /**
     * To bind events for selection
     */
    private addEventListener;
    /**
     * To unbind events for selection
     */
    private removeEventListener;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the selection.
     * @return {void}
     * @private
     */
    destroy(treeMap: TreeMap): void;
}
