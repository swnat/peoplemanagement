import { Rect } from '../../primitives/rect';
import { Quad } from './quad';
/**
 * Spatial search module helps to effectively find the objects over diagram
 */
export declare class SpatialSearch {
    private topElement;
    private bottomElement;
    private rightElement;
    private leftElement;
    private quadSize;
    private quadTable;
    private objectTable;
    /** @private */
    parentQuad: Quad;
    private pageLeft;
    private pageRight;
    private pageTop;
    private pageBottom;
    /** @private */
    childLeft: number;
    /** @private */
    childTop: number;
    /** @private */
    childRight: number;
    /** @private */
    childBottom: number;
    /** @private */
    childNode: IGroupable;
    /** @private */
    constructor(objectTable: Object);
    /** @private */
    removeFromAQuad(node: IGroupable): void;
    private update;
    private addIntoAQuad;
    /** @private */
    private objectIndex;
    /** @private */
    updateQuad(node: IGroupable): boolean;
    private isWithinPageBounds;
    /** @private */
    findQuads(region: Rect): Quad[];
    /** @private */
    findObjects(region: Rect): IGroupable[];
    /** @private */
    updateBounds(node: IGroupable): boolean;
    private findBottom;
    private findRight;
    private findLeft;
    private findTop;
    /** @private */
    setCurrentNode(node: IGroupable): void;
    /** @private */
    getPageBounds(originX?: number, originY?: number): Rect;
    /** @private */
    getQuad(node: IGroupable): Quad;
}
/** @private */
export interface IGroupable {
    id: string;
    outerBounds: Rect;
}
