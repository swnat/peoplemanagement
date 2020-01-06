import { PointModel } from './../primitives/point-model';
import { Connector } from '../objects/connector';
import { Rect } from './../primitives/rect';
import { DiagramElement, Corners } from './../core/elements/diagram-element';
import { Direction, LayoutOrientation } from '../enum/enum';
import { MarginModel } from '../core/appearance-model';
import { Segment } from '../interaction/scroller';
/**
 * Connector modules are used to dock and update the connectors
 */
/** @private */
export declare function findConnectorPoints(element: Connector, layoutOrientation?: LayoutOrientation): PointModel[];
/** @private */
export declare function swapBounds(object: DiagramElement, bounds: Corners, outerBounds: Rect): Corners;
/** @private */
export declare function findAngle(s: PointModel, e: PointModel): number;
/** @private */
export declare function findPoint(cor: Corners, direction: string): PointModel;
/** @private */
export declare function getIntersection(ele: Connector, bounds: DiagramElement, sPt: PointModel, tPt: PointModel, isTar: boolean): PointModel;
/** @private */
export declare function getIntersectionPoints(thisSegment: Segment, pts: Object[], minimal: boolean, point: PointModel): PointModel;
/** @private */
export declare function orthoConnection2Segment(source: End, target: End): PointModel[];
export declare function getPortDirection(point: PointModel, corner: Corners, bounds: Rect, closeEdge: boolean): Direction;
/** @private */
export declare function getOuterBounds(obj: Connector): Rect;
export declare function getOppositeDirection(direction: string): string;
/** @private */
export interface Intersection {
    enabled: boolean;
    intersectPt: PointModel;
}
/** @private */
export interface LengthFraction {
    lengthFractionIndex: number;
    fullLength: number;
    segmentIndex: number;
    pointIndex: number;
}
/** @private */
export interface BridgeSegment {
    bridgeStartPoint: PointModel[];
    bridges: Bridge[];
    segmentIndex: number;
}
/** @private */
export interface ArcSegment {
    angle: number;
    endPoint: PointModel;
    path: string;
    segmentPointIndex: number;
    startPoint: PointModel;
    sweep: number;
    target: string;
    rendered: boolean;
}
/** @private */
export interface Bridge {
    angle: number;
    endPoint: PointModel;
    path: string;
    segmentPointIndex: number;
    startPoint: PointModel;
    sweep: number;
    target: string;
    rendered: boolean;
}
/** @private */
export interface End {
    corners: Corners;
    point: PointModel;
    direction: Direction;
    margin: MarginModel;
}
