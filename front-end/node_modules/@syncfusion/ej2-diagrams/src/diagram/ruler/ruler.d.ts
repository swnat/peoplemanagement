import { Diagram } from '../../diagram';
import { Size } from '../primitives/size';
import { PointModel } from '../primitives/point-model';
/**
 * defines the helper methods for the ruler
 */
/**
 * @private
 */
export declare function renderOverlapElement(diagram: Diagram): void;
/**
 * @private
 */
export declare function renderRuler(diagram: Diagram, isHorizontal: Boolean): void;
/**
 * @private
 */
export declare function updateRuler(diagram: Diagram): void;
/**
 * @private
 */
export declare function removeRulerElements(diagram: Diagram): void;
/** @private */
export declare function getRulerSize(diagram: Diagram): Size;
/** @private */
export declare function getRulerGeometry(diagram: Diagram): Size;
/**
 * @private
 */
export declare function removeRulerMarkers(): void;
export declare function drawRulerMarkers(diagram: Diagram, currentPoint: PointModel): void;
