import { Diagram } from '../diagram';
import { PointModel } from '../primitives/point-model';
import { DiagramElement } from '../core/elements/diagram-element';
import { NodeModel } from './../objects/node-model';
import { ITouches } from '../objects/interface/interfaces';
import { PointPortModel } from './../objects/port-model';
import { ShapeAnnotationModel, PathAnnotationModel } from '../objects/annotation-model';
/**
 * Finds the action to be taken for the object under mouse
 *
 */
/** @private */
export declare function findToolToActivate(obj: Object, wrapper: DiagramElement, position: PointModel, diagram: Diagram, touchStart?: ITouches[] | TouchList, touchMove?: ITouches[] | TouchList, target?: NodeModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel): Actions;
/** @private */
export declare function findPortToolToActivate(diagram: Diagram, target?: NodeModel | PointPortModel, touchStart?: ITouches[] | TouchList, touchMove?: ITouches[] | TouchList): Actions;
/** @private */
export declare function contains(mousePosition: PointModel, corner: PointModel, padding: number): boolean;
/** @private */
export declare function hasSelection(diagram: Diagram): boolean;
/** @private */
export declare function hasSingleConnection(diagram: Diagram): boolean;
/** @private */
export declare function isSelected(diagram: Diagram, element: Object, firstLevel?: boolean, wrapper?: DiagramElement): boolean;
/** @private */
export declare type Actions = 'None' | 'Select' | 'Drag' | 'ResizeWest' | 'ConnectorSourceEnd' | 'ConnectorTargetEnd' | 'ResizeEast' | 'ResizeSouth' | 'ResizeNorth' | 'ResizeSouthEast' | 'ResizeSouthWest' | 'ResizeNorthEast' | 'ResizeNorthWest' | 'Rotate' | 'ConnectorEnd' | 'Custom' | 'Draw' | 'Pan' | 'BezierSourceThumb' | 'BezierTargetThumb' | 'LayoutAnimation' | 'PinchZoom' | 'Hyperlink' | 'SegmentEnd' | 'OrthoThumb' | 'PortDrag' | 'PortDraw' | 'LabelSelect' | 'LabelDrag' | 'LabelResizeSouthEast' | 'LabelResizeSouthWest' | 'LabelResizeNorthEast' | 'LabelResizeNorthWest' | 'LabelResizeSouth' | 'LabelResizeNorth' | 'LabelResizeWest' | 'LabelResizeEast' | 'LabelRotate';
/** @private */
export declare function getCursor(cursor: Actions, angle: number): string;
