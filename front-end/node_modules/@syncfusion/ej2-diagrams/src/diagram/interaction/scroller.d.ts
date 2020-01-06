import { Diagram } from '../diagram';
import { Rect } from '../primitives/rect';
import { PointModel } from '../primitives/point-model';
import { DiagramRegions } from '../enum/enum';
import { IFitOptions } from '../objects/interface/interfaces';
/**
 */
export declare class DiagramScroller {
    /** @private */
    transform: TransformFactor;
    /**   @private  */
    oldCollectionObjects: string[];
    /**   @private  */
    removeCollection: string[];
    private diagram;
    private objects;
    private vPortWidth;
    private vPortHeight;
    private currentZoomFActor;
    private hOffset;
    private vOffset;
    private scrolled;
    /** @private */
    /** @private */
    viewPortHeight: number;
    /** @private */
    /** @private */
    currentZoom: number;
    /** @private */
    /** @private */
    viewPortWidth: number;
    /** @private */
    /** @private */
    horizontalOffset: number;
    /** @private */
    /** @private */
    verticalOffset: number;
    private diagramWidth;
    private diagramHeight;
    /** @private */
    scrollerWidth: number;
    private hScrollSize;
    private vScrollSize;
    constructor(diagram: Diagram);
    /** @private */
    updateScrollOffsets(hOffset?: number, vOffset?: number): void;
    /** @private */
    setScrollOffset(hOffset: number, vOffset: number): void;
    /** @private */
    getObjects(coll1: string[], coll2: string[]): string[];
    /**   @private  */
    virtualizeElements(): void;
    /** @private */
    setSize(): void;
    /** @private */
    setViewPortSize(width: number, height: number): void;
    /**
     * To get page pageBounds
     * @private
     */
    getPageBounds(boundingRect?: boolean, region?: DiagramRegions, hasPadding?: boolean): Rect;
    /**
     * To get page break when PageBreak is set as true
     * @private
     */
    getPageBreak(pageBounds: Rect): Segment[];
    /** @private */
    zoom(factor: number, deltaX?: number, deltaY?: number, focusPoint?: PointModel): void;
    /** @private */
    fitToPage(options?: IFitOptions): void;
    /** @private */
    bringIntoView(rect: Rect): void;
    /** @private */
    bringToCenter(bounds: Rect): void;
    private applyScrollLimit;
}
/** @private */
export interface TransformFactor {
    tx: number;
    ty: number;
    scale: number;
}
export interface Segment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
