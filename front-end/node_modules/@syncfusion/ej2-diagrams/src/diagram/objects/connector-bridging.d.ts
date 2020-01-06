import { PointModel } from '../primitives/point-model';
import { BridgeDirection } from '../enum/enum';
import { Diagram } from '../diagram';
import { BridgeSegment } from '../utility/connector';
import { ArcSegment } from '../utility/connector';
import { Connector } from './connector';
/**
 * ConnectorBridging defines the bridging behavior
 */
/** @private */
export declare class ConnectorBridging {
    /** @private */
    updateBridging(conn: Connector, diagram: Diagram): void;
    /** @private */
    firstBridge(bridgeList: BridgeSegment[], connector: Connector, bridgeSpacing: number): void;
    /** @private */
    createSegment(st: PointModel, end: PointModel, angle: number, direction: BridgeDirection, index: number, conn: Connector, diagram: Diagram): ArcSegment;
    /** @private */
    createBridgeSegment(startPt: PointModel, endPt: PointModel, angle: number, bridgeSpace: number, sweep: number): string;
    /** @private */
    sweepDirection(angle: number, bridgeDirection: BridgeDirection, connector: Connector, diagram: Diagram): number;
    /** @private */
    getPointAtLength(length: number, pts: PointModel[]): PointModel;
    /** @private */
    protected getPoints(connector: Connector): PointModel[];
    private intersectsRect;
    /** @private */
    intersect(points1: PointModel[], points2: PointModel[], self: boolean, bridgeDirection: BridgeDirection, zOrder: boolean): PointModel[];
    /** @private */
    inter1(startPt: PointModel, endPt: PointModel, pts: PointModel[], zOrder: boolean, bridgeDirection: BridgeDirection): PointModel[];
    private checkForHorizontalLine;
    private isEmptyPoint;
    private getLengthAtFractionPoint;
    private getSlope;
    /** @private */
    angleCalculation(startPt: PointModel, endPt: PointModel): number;
    private lengthCalculation;
    /**
     * Constructor for the bridging module
     * @private
     */
    constructor();
    /**
     * To destroy the bridging module
     * @return {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
