import { Diagram } from '../diagram';
import { NodeModel, LaneModel, PhaseModel } from '../objects/node-model';
import { Node } from '../objects/node';
import { GridPanel, GridCell, RowDefinition, ColumnDefinition } from '../core/containers/grid';
import { Lane } from '../objects/node';
import { Container } from '../core/containers/container';
import { DiagramElement } from '../core/elements/diagram-element';
import { PointModel } from '../primitives/point-model';
import { Canvas } from '../core/containers/canvas';
import { Rect } from '../primitives/rect';
import { HistoryEntry } from '../diagram/history';
import { SelectorModel } from '../objects/node-model';
import { ClipBoardObject } from '../interaction/command-manager';
/**
 * SwimLane modules are used to rendering and interaction.
 */
/** @private */
export declare function initSwimLane(grid: GridPanel, diagram: Diagram, node: NodeModel): void;
/** @private */
export declare function addObjectToGrid(diagram: Diagram, grid: GridPanel, parent: NodeModel, object: NodeModel, isHeader?: boolean, isPhase?: boolean, isLane?: boolean, canvas?: string): Container;
/** @private */
export declare function headerDefine(grid: GridPanel, diagram: Diagram, object: NodeModel): void;
/** @private */
export declare function phaseDefine(grid: GridPanel, diagram: Diagram, object: NodeModel, indexValue: number, orientation: boolean, phaseIndex: number): void;
/** @private */
export declare function laneCollection(grid: GridPanel, diagram: Diagram, object: NodeModel, indexValue: number, laneIndex: number, orientation: boolean): void;
/** @private */
export declare function createRow(row: RowDefinition[], height: number): void;
/** @private */
export declare function createColumn(width: number): ColumnDefinition;
/** @private */
export declare function initGridRow(row: RowDefinition[], orientation: boolean, object: NodeModel): void;
/** @private */
export declare function initGridColumns(columns: ColumnDefinition[], orientation: boolean, object: NodeModel): void;
/** @private */
export declare function getConnectors(diagram: Diagram, grid: GridPanel, rowIndex: number, isRowUpdate: boolean): string[];
/** @private */
export declare function swimLaneMeasureAndArrange(obj: NodeModel): void;
/** @private */
export declare function ChangeLaneIndex(diagram: Diagram, obj: NodeModel, startRowIndex: number): void;
/** @private */
export declare function arrangeChildNodesInSwimLane(diagram: Diagram, obj: NodeModel): void;
/** @private */
export declare function updateChildOuterBounds(grid: GridPanel, obj: NodeModel): void;
/** @private */
export declare function checkLaneSize(obj: NodeModel): void;
/** @private */
export declare function checkPhaseOffset(obj: NodeModel, diagram: Diagram): void;
/** @private */
export declare function updateConnectorsProperties(connectors: string[], diagram: Diagram): void;
/** @private */
export declare function laneInterChanged(diagram: Diagram, obj: NodeModel, target: NodeModel, position?: PointModel): void;
/** @private */
export declare function updateSwimLaneObject(diagram: Diagram, obj: Node, swimLane: NodeModel, helperObject: NodeModel): void;
/** @private */
export declare function findLaneIndex(swimLane: NodeModel, laneObj: NodeModel): number;
/** @private */
export declare function findPhaseIndex(phase: NodeModel, swimLane: NodeModel): number;
/** @private */
export declare function findStartLaneIndex(swimLane: NodeModel): number;
/** @private */
export declare function updatePhaseMaxWidth(parent: NodeModel, diagram: Diagram, wrapper: Canvas, columnIndex: number): void;
/** @private */
export declare function updateHeaderMaxWidth(diagram: Diagram, swimLane: NodeModel): void;
/** @private */
export declare function addLane(diagram: Diagram, parent: NodeModel, lane: LaneModel, count?: number): void;
export declare function addPhase(diagram: Diagram, parent: NodeModel, newPhase: PhaseModel): void;
export declare function addLastPhase(phaseIndex: number, parent: NodeModel, entry: HistoryEntry, grid: GridPanel, orientation: boolean, newPhase: PhaseModel): void;
export declare function addHorizontalPhase(diagram: Diagram, node: NodeModel, grid: GridPanel, index: number, orientation: boolean): void;
export declare function addVerticalPhase(diagram: Diagram, node: NodeModel, grid: GridPanel, rowIndex: number, orientation: boolean): void;
export declare function arrangeChildInGrid(diagram: Diagram, nextCell: GridCell, gridCell: GridCell, rect: Rect, parentWrapper: Container, orientation: boolean, prevCell?: GridCell): void;
export declare function swimLaneSelection(diagram: Diagram, node: NodeModel, corner: string): void;
export declare function pasteSwimLane(swimLane: NodeModel, diagram: Diagram, clipboardData?: ClipBoardObject, laneNode?: NodeModel, isLane?: boolean, isUndo?: boolean): NodeModel;
export declare function gridSelection(diagram: Diagram, selectorModel: SelectorModel, id?: string, isSymbolDrag?: boolean): Canvas;
export declare function removeLaneChildNode(diagram: Diagram, swimLaneNode: NodeModel, currentObj: NodeModel, isChildNode?: NodeModel, laneIndex?: number): void;
export declare function getGridChildren(obj: DiagramElement): DiagramElement;
export declare function removeSwimLane(diagram: Diagram, obj: NodeModel): void;
export declare function removeLane(diagram: Diagram, lane: NodeModel, swimLane: NodeModel, lanes?: LaneModel): void;
export declare function removeChildren(diagram: Diagram, canvas: Canvas): void;
export declare function removePhase(diagram: Diagram, phase: NodeModel, swimLane: NodeModel, swimLanePhases?: PhaseModel): void;
export declare function removeHorizontalPhase(diagram: Diagram, grid: GridPanel, phase: NodeModel, phaseIndex?: number): void;
export declare function removeVerticalPhase(diagram: Diagram, grid: GridPanel, phase: NodeModel, phaseIndex: number, swimLane: NodeModel): void;
/**
 * @private
 */
export declare function considerSwimLanePadding(diagram: Diagram, node: NodeModel, padding: number): void;
/**
 * @private
 */
export declare function checkLaneChildrenOffset(swimLane: NodeModel): void;
export declare function findLane(laneNode: Node, diagram: Diagram): LaneModel;
export declare function canLaneInterchange(laneNode: Node, diagram: Diagram): boolean;
export declare function updateSwimLaneChildPosition(lanes: Lane[], diagram: Diagram): void;
