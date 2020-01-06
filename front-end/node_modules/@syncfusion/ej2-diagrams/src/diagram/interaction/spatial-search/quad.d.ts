import { IGroupable, SpatialSearch } from './spatial-search';
import { Rect } from '../../primitives/rect';
/**
 * Quad helps to maintain a set of objects that are contained within the particular region
 */
/** @private */
export declare class Quad {
    /** @private */
    objects: IGroupable[];
    /** @private */
    left: number;
    /** @private */
    top: number;
    /** @private */
    width: number;
    /** @private */
    height: number;
    /** @private */
    first: Quad;
    /** @private */
    second: Quad;
    /** @private */
    third: Quad;
    /** @private */
    fourth: Quad;
    /** @private */
    parent: Quad;
    private spatialSearch;
    /** @private */
    constructor(left: number, top: number, width: number, height: number, spatialSearching: SpatialSearch);
    /** @private */
    findQuads(currentViewPort: Rect, quads: Quad[]): void;
    private isIntersect;
    /** @private */
    selectQuad(): Quad;
    private getQuad;
    /** @private */
    isContained(): boolean;
    /** @private */
    addIntoAQuad(node: IGroupable): Quad;
    private add;
}
/** @private */
export interface QuadSet {
    target?: Quad;
    source?: Quad;
}
/** @private */
export interface QuadAddition {
    quad?: Quad;
    isAdded?: boolean;
}
