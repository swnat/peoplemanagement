import { Diagram } from '../diagram';
import { Connector } from '../objects/connector';
/**
 * Line Routing
 */
export declare class LineRouting {
    private size;
    private startGrid;
    private noOfRows;
    private noOfCols;
    private width;
    private height;
    private diagramStartX;
    private diagramStartY;
    private intermediatePoints;
    private gridCollection;
    private startNode;
    private targetNode;
    private targetGrid;
    private startArray;
    private targetGridCollection;
    private sourceGridCollection;
    /** @private */
    lineRouting(diagram: Diagram): void;
    /** @private */
    renderVirtualRegion(diagram: Diagram, isUpdate?: boolean): void;
    private findNodes;
    private updateNodesInVirtualRegion;
    private intersectRect;
    private findEndPoint;
    /** @private */
    refreshConnectorSegments(diagram: Diagram, connector: Connector, isUpdate: boolean): void;
    private findEdgeBoundary;
    private checkObstacles;
    private getIntermediatePoints;
    private updateConnectorSegments;
    private findPath;
    private sorting;
    private octile;
    private manhattan;
    private findNearestNeigbours;
    private neigbour;
    private resetGridColl;
    private isWalkable;
    private findIntermediatePoints;
    /**
     * Constructor for the line routing module
     * @private
     */
    constructor();
    /**
     * To destroy the line routing module
     * @return {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
/** @private */
export interface VirtualBoundaries {
    x: number;
    y: number;
    width: number;
    height: number;
    gridX: number;
    gridY: number;
    walkable: boolean;
    tested: boolean;
    nodeId: string[];
    previousDistance?: number;
    afterDistance?: number;
    totalDistance?: number;
    parent?: VirtualBoundaries;
}
