import { IElement } from '../objects/interface/IElement';
import { Connector } from '../objects/connector';
import { Node } from '../objects/node';
import { PointModel } from '../primitives/point-model';
import { MouseEventArgs } from './event-handlers';
import { PointPortModel } from '../objects/port-model';
import { ConnectorModel, StraightSegmentModel, OrthogonalSegmentModel, BezierSegmentModel } from '../objects/connector-model';
import { NodeModel } from '../objects/node-model';
import { Rect } from '../primitives/rect';
import { Diagram } from '../../diagram/diagram';
import { DiagramElement } from './../core/elements/diagram-element';
import { SelectorModel } from '../objects/node-model';
import { Selector } from '../objects/node';
import { AlignmentOptions, DistributeOptions, SizingOptions, DiagramEvent, AlignmentMode } from '../enum/enum';
import { HistoryEntry } from '../diagram/history';
import { Snapping } from '../objects/snapping';
import { LayoutAnimation } from '../objects/layout-animation';
import { LayerModel } from '../diagram/layer-model';
import { ILayout } from '../layout/layout-base';
import { ShapeAnnotationModel, PathAnnotationModel } from '../objects/annotation-model';
import { ShapeAnnotation, PathAnnotation } from '../objects/annotation';
import { PointPort } from '../objects/port';
/**
 * Defines the behavior of commands
 */
export declare class CommandHandler {
    /**   @private  */
    clipboardData: ClipBoardObject;
    /**   @private  */
    connectorsTable: Object[];
    /**   @private  */
    processTable: {};
    /** @private */
    isContainer: boolean;
    private state;
    private diagram;
    private childTable;
    private parentTable;
    /**   @private  */
    readonly snappingModule: Snapping;
    /**   @private  */
    readonly layoutAnimateModule: LayoutAnimation;
    constructor(diagram: Diagram);
    /** @private */
    startTransaction(protectChange: boolean): void;
    /** @private */
    endTransaction(protectChange: boolean): void;
    /**
     * @private
     */
    showTooltip(node: IElement, position: PointModel, content: string | HTMLElement, toolName: string, isTooltipVisible: boolean): void;
    /**
     * @private
     */
    closeTooltip(): void;
    /**
     * @private
     */
    canEnableDefaultTooltip(): boolean;
    /**
     * @private
     */
    updateSelector(): void;
    /**
     * @private
     */
    triggerEvent(event: DiagramEvent, args: Object): void;
    /**
     * @private
     */
    dragOverElement(args: MouseEventArgs, currentPosition: PointModel): void;
    /**
     * @private
     */
    disConnect(obj: IElement, endPoint?: string): void;
    private connectionEventChange;
    /**
     * @private
     */
    findTarget(element: DiagramElement, argsTarget: IElement, source?: boolean, connection?: boolean): NodeModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel;
    /**
     * @private
     */
    canDisconnect(endPoint: string, args: MouseEventArgs, targetPortId: string, targetNodeId: string): boolean;
    /**
     * @private
     */
    changeAnnotationDrag(args: MouseEventArgs): void;
    /**
     * @private
     */
    connect(endPoint: string, args: MouseEventArgs): void;
    /** @private */
    cut(): void;
    /** @private */
    addLayer(layer: LayerModel, objects?: Object[]): void;
    /** @private */
    getObjectLayer(objectName: string): LayerModel;
    /** @private */
    getLayer(layerName: string): LayerModel;
    /** @private */
    removeLayer(layerId: string): void;
    /** @private */
    moveObjects(objects: string[], targetLayer?: string): void;
    /** @private */
    cloneLayer(layerName: string): void;
    /** @private */
    copy(): Object;
    /** @private */
    copyObjects(): Object[];
    private copyProcesses;
    /** @private */
    group(): void;
    /** @private */
    unGroup(obj?: NodeModel): void;
    /** @private */
    paste(obj: (NodeModel | ConnectorModel)[]): void;
    private getNewObject;
    private cloneConnector;
    private cloneNode;
    private getAnnotation;
    private cloneSubProcesses;
    private cloneGroup;
    /** @private */
    translateObject(obj: Node | Connector, groupnodeID?: string): void;
    /**
     * @private
     */
    drawObject(obj: Node | Connector): Node | Connector;
    /**
     * @private
     */
    addObjectToDiagram(obj: Node | Connector): void;
    /**
     * @private
     */
    addText(obj: Node | Connector, currentPosition: PointModel): void;
    private updateArgsObject;
    private updateSelectionChangeEventArgs;
    /** @private */
    selectObjects(obj: (NodeModel | ConnectorModel)[], multipleSelection?: boolean, oldValue?: (NodeModel | ConnectorModel)[]): void;
    /**
     * @private
     */
    findParent(node: Node): Node;
    private selectProcesses;
    private selectGroup;
    /**
     * @private
     */
    private selectBpmnSubProcesses;
    /**
     * @private
     */
    private hasProcesses;
    /** @private */
    select(obj: NodeModel | ConnectorModel, multipleSelection?: boolean, preventUpdate?: boolean): void;
    private getObjectCollectionId;
    private updateBlazorSelectorModel;
    /** @private */
    labelSelect(obj: NodeModel | ConnectorModel, textWrapper: DiagramElement): void;
    /** @private */
    unSelect(obj: NodeModel | ConnectorModel): void;
    /** @private */
    getChildElements(child: DiagramElement[]): string[];
    /** @private */
    moveSvgNode(nodeId: string, targetID: string): void;
    /** @private */
    sendLayerBackward(layerName: string): void;
    /** @private */
    bringLayerForward(layerName: string): void;
    /** @private */
    sendToBack(): void;
    /** @private */
    bringToFront(): void;
    /** @private */
    sortByZIndex(nodeArray: Object[], sortID?: string): Object[];
    /** @private */
    sendForward(): void;
    /** @private */
    sendBackward(): void;
    /**   @private  */
    updateNativeNodeIndex(nodeId: string, targetID?: string): void;
    /**   @private  */
    initSelectorWrapper(): void;
    /** @private */
    doRubberBandSelection(region: Rect): void;
    private clearSelectionRectangle;
    /** @private */
    dragConnectorEnds(endPoint: string, obj: IElement, point: PointModel, segment: BezierSegmentModel, target?: IElement, targetPortId?: string): boolean;
    /**   @private  */
    getSelectedObject(): (NodeModel | ConnectorModel)[];
    /** @private */
    clearSelection(triggerAction?: boolean): void;
    /** @private */
    clearSelectedItems(): void;
    /**
     * @private
     */
    removeStackHighlighter(): void;
    /**
     * @private
     */
    renderStackHighlighter(args: MouseEventArgs, target?: IElement): void;
    /** @private */
    drag(obj: NodeModel | ConnectorModel, tx: number, ty: number): void;
    /**   @private  */
    connectorSegmentChange(actualObject: Node, existingInnerBounds: Rect, isRotate: boolean): void;
    /** @private */
    updateEndPoint(connector: Connector, oldChanges?: Connector): void;
    /** @private */
    dragSourceEnd(obj: ConnectorModel, tx: number, ty: number, preventUpdate?: boolean, point?: PointModel, endPoint?: string, update?: boolean, target?: NodeModel, targetPortId?: string, isDragSource?: boolean, segment?: BezierSegmentModel): boolean;
    /**
     * Update Path Element offset
     */
    updatePathElementOffset(connector: ConnectorModel): void;
    /**
     * Upadte the connector segments when change the source node
     */
    private changeSegmentLength;
    /**
     * Change the connector endPoint to port
     */
    private changeSourceEndToPort;
    /**
     * @private
     * Remove terinal segment in initial
     */
    removeTerminalSegment(connector: Connector, changeTerminal?: boolean): void;
    /**
     * Change the connector endPoint from point to node
     */
    private changeSourceEndToNode;
    /**
     * Translate the bezier points during the interaction
     */
    private translateBezierPoints;
    /** @private */
    dragTargetEnd(obj: ConnectorModel, tx: number, ty: number, preventUpdate?: boolean, point?: PointModel, endPoint?: string, update?: boolean, segment?: OrthogonalSegmentModel | BezierSegmentModel | StraightSegmentModel): boolean;
    /** @private */
    dragControlPoint(obj: ConnectorModel, tx: number, ty: number, preventUpdate?: boolean, segmentNumber?: number): boolean;
    /** @private */
    rotateObjects(parent: NodeModel | SelectorModel, objects: (NodeModel | ConnectorModel)[], angle: number, pivot?: PointModel, includeParent?: boolean): void;
    /** @private */
    snapConnectorEnd(currentPosition: PointModel): PointModel;
    /**   @private  */
    snapAngle(angle: number): number;
    /**   @private  */
    rotatePoints(conn: Connector, angle: number, pivot: PointModel): void;
    private updateInnerParentProperties;
    /** @private */
    scale(obj: NodeModel | ConnectorModel, sw: number, sh: number, pivot: PointModel, refObject?: IElement): boolean;
    /** @private */
    getAllDescendants(node: NodeModel, nodes: (NodeModel | ConnectorModel)[], includeParent?: boolean, innerParent?: boolean): (NodeModel | ConnectorModel)[];
    /**   @private  */
    getChildren(node: NodeModel, nodes: (NodeModel | ConnectorModel)[]): (NodeModel | ConnectorModel)[];
    /** @private */
    cloneChild(id: string): NodeModel;
    /** @private */
    scaleObject(sw: number, sh: number, pivot: PointModel, obj: IElement, element: DiagramElement, refObject: IElement): void;
    private scaleConnector;
    /** @private */
    portDrag(obj: NodeModel | ConnectorModel, portElement: DiagramElement, tx: number, ty: number): void;
    /** @private */
    labelDrag(obj: NodeModel | ConnectorModel, textElement: DiagramElement, tx: number, ty: number): void;
    private updatePathAnnotationOffset;
    private getRelativeOffset;
    private dragLimitValue;
    private updateLabelMargin;
    private boundsInterSects;
    private intersect;
    private getPointAtLength;
    private getInterceptWithSegment;
    /** @private */
    getAnnotationChanges(object: NodeModel | ConnectorModel, label: ShapeAnnotation | PathAnnotation): Object;
    /** @private */
    getPortChanges(object: NodeModel | ConnectorModel, port: PointPort): Object;
    /** @private */
    labelRotate(object: NodeModel | ConnectorModel, label: ShapeAnnotation | PathAnnotation, currentPosition: PointModel, selector: Selector): void;
    /** @private */
    labelResize(node: NodeModel | ConnectorModel, label: ShapeAnnotation | PathAnnotationModel, deltaWidth: number, deltaHeight: number, pivot: PointModel, selector: Selector): void;
    /** @private */
    getSubProcess(source: IElement): SelectorModel;
    /**   @private  */
    checkBoundaryConstraints(tx: number, ty: number, nodeBounds?: Rect): boolean;
    /** @private */
    dragSelectedObjects(tx: number, ty: number): boolean;
    /** @private */
    scaleSelectedItems(sx: number, sy: number, pivot: PointModel): boolean;
    /** @private */
    rotateSelectedItems(angle: number): boolean;
    /** @private */
    hasSelection(): boolean;
    /** @private */
    isSelected(element: IElement): boolean;
    /**
     * initExpand is used for layout expand and collapse interaction
     */
    initExpand(args: MouseEventArgs): void;
    /** @private */
    expandNode(node: Node, diagram?: Diagram): ILayout;
    private getparentexpand;
    /**
     * Setinterval and Clear interval for layout animation
     */
    /** @private */
    expandCollapse(source: Node, visibility: boolean, diagram: Diagram): void;
    /**
     * @private
     */
    updateNodeDimension(obj: Node | Connector, rect?: Rect): void;
    /**
     * @private
     */
    updateConnectorPoints(obj: Node | Connector, rect?: Rect): void;
    /**
     * @private
     */
    updateSelectedNodeProperties(object?: NodeModel | ConnectorModel[]): void;
    /** @private */
    drawSelectionRectangle(x: number, y: number, width: number, height: number): void;
    /** @private */
    startGroupAction(): void;
    /** @private */
    endGroupAction(): void;
    /** @private */
    removeChildFromBPmn(child: IElement, newTarget: IElement, oldTarget: IElement): void;
    /** @private */
    isDroppable(source: IElement, targetNodes: IElement): boolean;
    /**
     * @private
     */
    renderHighlighter(args: MouseEventArgs, connectHighlighter?: boolean, source?: boolean): void;
    /** @private */
    mouseOver(source: IElement, target: IElement, position: PointModel): boolean;
    /**
     * @private
     */
    snapPoint(startPoint: PointModel, endPoint: PointModel, tx: number, ty: number): PointModel;
    /**
     * @private
     */
    removeSnap(): void;
    /** @private */
    dropAnnotation(source: IElement, target: IElement): void;
    /** @private */
    drop(source: IElement, target: IElement, position: PointModel): void;
    /** @private */
    addHistoryEntry(entry: HistoryEntry): void;
    /** @private */
    align(objects: (NodeModel | ConnectorModel)[], option: AlignmentOptions, type: AlignmentMode): void;
    /** @private */
    distribute(objects: (NodeModel | ConnectorModel)[], option: DistributeOptions): void;
    /** @private */
    sameSize(objects: (NodeModel | ConnectorModel)[], option: SizingOptions): void;
    private storeObject;
    /** @private */
    scroll(scrollX: number, scrollY: number, focusPoint?: PointModel): void;
    /**
     * @private
     */
    drawHighlighter(element: IElement): void;
    /**
     * @private
     */
    removeHighlighter(): void;
    /**
     * @private
     */
    renderContainerHelper(node: NodeModel | SelectorModel): NodeModel | ConnectorModel;
    /**
     * @private
     */
    isParentAsContainer(node: NodeModel, isChild?: boolean): boolean;
    /**
     * @private
     */
    dropChildToContainer(parent: NodeModel, node: NodeModel): void;
    /** @private */
    checkSelection(selector: SelectorModel, corner: string): void;
    /** @private */
    zoom(scale: number, scrollX: number, scrollY: number, focusPoint?: PointModel): void;
}
/** @private */
export interface TransactionState {
    element: SelectorModel;
    backup: ObjectState;
}
/** @private */
export interface ClipBoardObject {
    pasteIndex?: number;
    clipObject?: Object;
    childTable?: {};
    processTable?: {};
}
/** @private */
export interface ObjectState {
    offsetX?: number;
    offsetY?: number;
    width?: number;
    height?: number;
    pivot?: PointModel;
    angle?: number;
}
/** @private */
export interface Distance {
    minDistance?: number;
}
/** @private */
export interface IsDragArea {
    x?: boolean;
    y?: boolean;
}
