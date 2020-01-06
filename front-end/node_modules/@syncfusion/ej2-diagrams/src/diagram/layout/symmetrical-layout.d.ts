import { Layout } from './layout-base';
import { Rect } from '../primitives/rect';
import { PointModel } from '../primitives/point-model';
import { INode, IConnector } from './layout-base';
export declare class GraphForceNode {
    /**
     * @private
     */
    velocityX: number;
    /**
     * @private
     */
    velocityY: number;
    /**
     * @private
     */
    location: PointModel;
    /**
     * @private
     */
    nodes: IGraphObject[];
    /**
     * @private
     */
    graphNode: IGraphObject;
    constructor(gnNode: IGraphObject);
    /**
     * @private
     */
    applyChanges(): void;
}
/**
 * SymmetricalLayout
 */
export declare class SymmetricLayout {
    private cdCOEF;
    private cfMAXVELOCITY;
    private cnMAXITERACTION;
    private cnSPRINGLENGTH;
    private mszMaxForceVelocity;
    /**
     * @private
     */
    springLength: number;
    /**
     * @private
     */
    springFactor: number;
    /**
     * @private
     */
    maxIteration: number;
    private selectedNode;
    constructor();
    /**
     * @private
     */
    destroy(): void;
    protected getModuleName(): string;
    private doGraphLayout;
    private preLayoutNodes;
    /**
     * @private
     */
    doLayout(graphLayoutManager: GraphLayoutManager): void;
    private makeSymmetricLayout;
    private appendForces;
    private resetGraphPosition;
    private convertGraphNodes;
    /**
     * @private
     */
    getForceNode(gnNode: IGraphObject): GraphForceNode;
    private updateNeigbour;
    private lineAngle;
    private pointDistance;
    private calcRelatesForce;
    /**
     * @private
     */
    updateLayout(nodeCollection: IGraphObject[], connectors: IGraphObject[], symmetricLayout: SymmetricLayout, nameTable: Object, layout: Layout, viewPort: PointModel): void;
    private calcNodesForce;
    private calcForce;
}
export declare class GraphLayoutManager {
    private mhelperSelectedNode;
    private visitedStack;
    private cycleEdgesCollection;
    private nameTable;
    /**
     * @private
     */
    nodes: IGraphObject[];
    private graphObjects;
    private connectors;
    private passedNodes;
    /**
     * @private
     */
    selectedNode: IGraphObject;
    /**
     * @private
     */
    updateLayout(nodeCollection: IGraphObject[], connectors: IGraphObject[], symmetricLayout: SymmetricLayout, nameTable: Object, layout: Layout, viewPort: PointModel): boolean;
    /**
     * @private
     */
    getModelBounds(lNodes: IGraphObject[]): Rect;
    private updateLayout1;
    private getNodesToPosition;
    private selectNodes;
    private selectConnectedNodes;
    private exploreRelatives;
    private exploreRelatives1;
    private getConnectedRelatives;
    private dictionaryContains;
    private dictionaryLength;
    private getConnectedChildren;
    private getConnectedParents;
    private setNode;
    private findNode;
    private addGraphNode;
    private isConnectedToAnotherNode;
    private searchEdgeCollection;
    private exploreGraphEdge;
    private addNode;
    private detectCyclesInGraph;
    private getUnVisitedChildNodes;
}
export interface ITreeInfo extends INode, IConnector {
    graphType?: GraphObjectType;
    parents?: IGraphObject[];
    children?: IGraphObject[];
    tag?: GraphForceNode;
    center?: PointModel;
    Added?: boolean;
    isCycleEdge: boolean;
    visible?: boolean;
    GraphNodes?: {};
    LeftMargin?: number;
    TopMargin?: number;
    location?: PointModel;
    Bounds?: Rect;
}
export interface IGraphObject extends INode, IConnector {
    treeInfo?: ITreeInfo;
}
export declare type GraphObjectType = 'Node' | 'Connector';
