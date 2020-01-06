import { Diagram } from '../diagram';
import { NodeModel } from './../objects/node-model';
import { ConnectorModel } from './../objects/connector-model';
import { DiagramAction, RendererAction } from '../enum/enum';
import { Connector } from './../objects/connector';
import { AnnotationModel, PathAnnotationModel, ShapeAnnotationModel } from './../objects/annotation-model';
import { PointPortModel } from './../objects/port-model';
import { SelectorModel } from './../objects/node-model';
/**
 * constraints-util module contains the common constraints
 */
/** @private */
export declare function canSelect(node: ConnectorModel | NodeModel | PathAnnotationModel | ShapeAnnotationModel): number;
/** @private */
export declare function canMove(node: ConnectorModel | NodeModel | SelectorModel | ShapeAnnotationModel | PathAnnotationModel): number;
/** @private */
export declare function canEnablePointerEvents(node: ConnectorModel | NodeModel, diagram: Diagram): number;
/** @private */
export declare function canDelete(node: ConnectorModel | NodeModel): number;
/** @private */
export declare function canBridge(connector: Connector, diagram: Diagram): number;
/** @private */
export declare function canEnableRouting(connector: Connector, diagram: Diagram): number;
/** @private */
export declare function canDragSourceEnd(connector: Connector): number;
/** @private */
export declare function canDragTargetEnd(connector: Connector): number;
/** @private */
export declare function canDragSegmentThumb(connector: Connector): number;
/** @private */
export declare function canRotate(node: NodeModel | ShapeAnnotationModel | PathAnnotationModel): number;
/** @private */
export declare function canShadow(node: NodeModel): number;
/** @private */
export declare function canInConnect(node: NodeModel): number;
/** @private */
export declare function canPortInConnect(port: PointPortModel): number;
/** @private */
export declare function canOutConnect(node: NodeModel): number;
/** @private */
export declare function canPortOutConnect(port: PointPortModel): number;
/** @private */
export declare function canResize(node: NodeModel | ShapeAnnotationModel | PathAnnotationModel, direction?: string): number;
/** @private */
export declare function canAllowDrop(node: ConnectorModel | NodeModel): number;
/** @private */
export declare function canVitualize(diagram: Diagram): number;
/** @private */
export declare function canEnableToolTip(node: ConnectorModel | NodeModel, diagram: Diagram): number;
/** @private */
export declare function canSingleSelect(model: Diagram): number;
/** @private */
export declare function canMultiSelect(model: Diagram): number;
/** @private */
export declare function canZoomPan(model: Diagram): number;
/** @private */
export declare function canContinuousDraw(model: Diagram): number;
/** @private */
export declare function canDrawOnce(model: Diagram): number;
/** @private */
export declare function defaultTool(model: Diagram): number;
/** @private */
export declare function canZoom(model: Diagram): number;
/** @private */
export declare function canPan(model: Diagram): number;
/** @private */
export declare function canUserInteract(model: Diagram): number;
/** @private */
export declare function canApiInteract(model: Diagram): number;
/** @private */
export declare function canPanX(model: Diagram): number;
/** @private */
export declare function canPanY(model: Diagram): number;
/** @private */
export declare function canZoomTextEdit(diagram: Diagram): number;
/** @private */
export declare function canPageEditable(model: Diagram): number;
/** @private */
export declare function enableReadOnly(annotation: AnnotationModel, node: NodeModel | ConnectorModel): number;
/** @private */
export declare function canDraw(port: PointPortModel | NodeModel, diagram: Diagram): number;
/** @private */
export declare function canDrag(port: PointPortModel | NodeModel, diagram: Diagram): number;
/** @private */
export declare function canPreventClearSelection(diagramActions: DiagramAction): boolean;
/** @private */
export declare function canDrawThumbs(rendererActions: RendererAction): boolean;
/** @private */
export declare function avoidDrawSelector(rendererActions: RendererAction): boolean;
