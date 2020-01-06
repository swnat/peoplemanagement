import { NodeModel } from '../objects/node-model';
import { Node } from '../objects/node';
import { Diagram } from '../diagram';
import { ConnectorModel } from '../objects/connector-model';
import { PointModel } from '../primitives/point-model';
import { SelectorModel } from '../objects/node-model';
import { Rect } from '../primitives/rect';
import { DiagramElement } from '../core/elements/diagram-element';
import { Actions } from './actions';
/**
 * Interaction for Container
 */
/** @private */
export declare function updateCanvasBounds(diagram: Diagram, obj: NodeModel | ConnectorModel, position: PointModel, isBoundsUpdate: boolean): boolean;
export declare function removeChildInContainer(diagram: Diagram, obj: NodeModel | ConnectorModel, position: PointModel, isBoundsUpdate: boolean): void;
/** @private */
export declare function findBounds(obj: NodeModel, columnIndex: number, isHeader: boolean): Rect;
/** @private */
export declare function createHelper(diagram: Diagram, obj: Node): Node;
/** @private */
export declare function renderContainerHelper(diagram: Diagram, obj: SelectorModel | NodeModel): NodeModel | ConnectorModel;
/** @private */
export declare function checkParentAsContainer(diagram: Diagram, obj: NodeModel | ConnectorModel, isChild?: boolean): boolean;
/** @private */
export declare function checkChildNodeInContainer(diagram: Diagram, obj: NodeModel): void;
/**
 * @private
 */
export declare function addChildToContainer(diagram: Diagram, parent: NodeModel, node: NodeModel, isUndo?: boolean, historyAction?: boolean): void;
export declare function updateLaneBoundsAfterAddChild(container: NodeModel, swimLane: NodeModel, node: NodeModel, diagram: Diagram, isBoundsUpdate?: boolean): boolean;
/** @private */
export declare function renderStackHighlighter(element: DiagramElement, isVertical: Boolean, position: PointModel, diagram: Diagram, isUml?: boolean, isSwimlane?: boolean): void;
/** @private */
export declare function moveChildInStack(sourceNode: Node, target: Node, diagram: Diagram, action: Actions): void;
