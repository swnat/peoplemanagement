import { PointModel } from '../primitives/point-model';
import { NodeModel } from './node-model';
import { Rect } from '../primitives/rect';
import { Diagram } from '../diagram';
import { DiagramElement } from '../core/elements/diagram-element';
import { SelectorModel } from '../objects/node-model';
/**
 * Snapping
 */
export declare class Snapping {
    private line;
    private diagram;
    private render;
    constructor(diagram: Diagram);
    /** @private */
    canSnap(): boolean;
    /**
     * Snap to object
     * @private
     */
    snapPoint(diagram: Diagram, selectedObject: SelectorModel, towardsLeft: boolean, towardsTop: boolean, delta: PointModel, startPoint: PointModel, endPoint: PointModel): PointModel;
    /**
     * @private
     */
    round(value: number, snapIntervals: number[], scale: number): number;
    /**
     * Snap to Object
     */
    private snapObject;
    /**
     * @private
     */
    snapConnectorEnd(point: PointModel): PointModel;
    private canBeTarget;
    private snapSize;
    /**
     * Snap to object on top
     * @private
     */
    snapTop(horizontalSnap: Snap, verticalSnap: Snap, snapLine: SVGElement, deltaX: number, deltaY: number, shape: SelectorModel, ended: boolean, initialBoundsT: Rect): number;
    /**
     * Snap to object on right
     * @private
     */
    snapRight(horizontalSnap: Snap, verticalSnap: Snap, snapLine: SVGElement, deltaX: number, deltaY: number, shape: SelectorModel, ended: boolean, initialBound: Rect): number;
    /**
     * Snap to object on left
     * @private
     */
    snapLeft(horizontalSnap: Snap, verticalSnap: Snap, snapLine: SVGElement, deltaX: number, deltaY: number, shape: SelectorModel, ended: boolean, initialBoundsB: Rect): number;
    /**
     * Snap to object on bottom
     * @private
     */
    snapBottom(horizontalSnap: Snap, verticalSnap: Snap, snapLine: SVGElement, deltaX: number, deltaY: number, shape: SelectorModel | DiagramElement, ended: boolean, initialRect: Rect): number;
    /**
     * To create the same width and same size lines
     */
    private createGuidelines;
    /**
     * To create the alignment lines
     */
    private renderAlignmentLines;
    /**
     * To create Horizontal spacing lines
     */
    private createHSpacingLines;
    /**
     * To create vertical spacing lines
     */
    private createVSpacingLines;
    /**
     * Add the Horizontal spacing lines
     */
    private addHSpacingLines;
    /**
     * Add the vertical spacing lines
     */
    private addVSpacingLines;
    /**
     * To add same width lines
     */
    private addSameWidthLines;
    /**
     * To add same height lines
     */
    private addSameHeightLines;
    /**
     * Render spacing lines
     */
    private renderSpacingLines;
    /**
     * To Create Snap object with position, initial bounds, and final bounds
     * @private
     */
    createSnapObject(targetBounds: Rect, bounds: Rect, snap: string): SnapObject;
    /**
     * Calculate the snap angle
     * @private
     */
    snapAngle(diagram: Diagram, angle: number): number;
    /**
     * Check whether the node to be snapped or not.
     */
    private canConsider;
    /**
     * Find the total number of nodes in diagram using SpatialSearch
     */
    private findNodes;
    private intersectsRect;
    private getAdornerLayerSvg;
    /**
     * To remove grid lines on mouse move and mouse up
     * @private
     */
    removeGuidelines(diagram: Diagram): void;
    /**
     * Sort the objects by its distance
     */
    private sortByDistance;
    /**
     * To find nodes that are equally placed at left of the selected node
     */
    private findEquallySpacedNodesAtLeft;
    /**
     * To find nodes that are equally placed at right of the selected node
     */
    private findEquallySpacedNodesAtRight;
    private findEquallySpacedNodesAtTop;
    /**
     * To find nodes that are equally placed at bottom of the selected node
     */
    private findEquallySpacedNodesAtBottom;
    /**
     * To get Adoner layer to draw snapLine
     * @private
     */
    getLayer(): SVGElement;
    /**
     * Constructor for the snapping module
     * @private
     */
    /**
     * To destroy the snapping module
     * @return {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
export interface Snap {
    snapped: boolean;
    offset: number;
    left?: boolean;
    bottom?: boolean;
    right?: boolean;
    top?: boolean;
}
/**
 * @private
 */
export interface SnapObject {
    start: PointModel;
    end: PointModel;
    offsetX: number;
    offsetY: number;
    type: string;
}
/**
 * @private
 */
export interface Objects {
    obj: DiagramElement;
    distance: number;
}
/**
 * @private
 */
export interface SnapSize {
    source: NodeModel;
    difference: number;
    offset: number;
}
