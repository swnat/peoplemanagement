import { DiagramElement } from '../core/elements/diagram-element';
import { Rect } from '../primitives/rect';
import { Size } from '../primitives/size';
import { PointModel } from '../primitives/point-model';
import { TextAlign, TextWrap, WhiteSpace, TextDecoration } from '../enum/enum';
import { TextAttributes } from '../rendering/canvas-interface';
/**
 * Implements the basic functionalities
 */
/** @private */
export declare function randomId(): string;
/** @private */
export declare function cornersPointsBeforeRotation(ele: DiagramElement): Rect;
/** @private */
export declare function getBounds(element: DiagramElement): Rect;
/** @private */
export declare function cloneObject(obj: Object, additionalProp?: Function | string, key?: string): Object;
/** @private */
export declare function getInternalProperties(propName: string): string[];
/** @private */
export declare function cloneArray(sourceArray: Object[], additionalProp?: Function | string, key?: string): Object[];
/** @private */
export declare function extendObject(options: Object, childObject: Object): Object;
/** @private */
export declare function extendArray(sourceArray: Object[], childArray: Object[]): Object[];
/** @private */
export declare function textAlignToString(value: TextAlign): string;
/** @private */
export declare function wordBreakToString(value: TextWrap | TextDecoration): string;
export declare function bBoxText(textContent: string, options: TextAttributes): number;
/** @private */
export declare function middleElement(i: number, j: number): number;
/** @private */
export declare function overFlow(text: string, options: TextAttributes): string;
/** @private */
export declare function whiteSpaceToString(value: WhiteSpace, wrap: TextWrap): string;
/** @private */
export declare function rotateSize(size: Size, angle: number): Size;
/** @private */
export declare function rotatePoint(angle: number, pivotX: number, pivotY: number, point: PointModel): PointModel;
/** @private */
export declare function getOffset(topLeft: PointModel, obj: DiagramElement): PointModel;
/**
 * Get function
 */
export declare function getFunction(value: Function | string): Function;
