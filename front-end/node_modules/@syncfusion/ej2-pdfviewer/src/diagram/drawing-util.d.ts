import { PdfAnnotationBaseModel } from './pdf-annotation-model';
import { DrawingElement, PointModel, BaseAttributes } from '@syncfusion/ej2-drawings';
import { Transforms } from './drawing';
/**
 * @hidden
 */
export declare function isLineShapes(obj: PdfAnnotationBaseModel): boolean;
/**
 * @hidden
 */
export declare function setElementStype(obj: PdfAnnotationBaseModel, element: DrawingElement): void;
/**
 * @hidden
 */
export declare function findPointsLength(points: PointModel[]): number;
/**
 * @hidden
 */
export declare function findPerimeterLength(points: PointModel[]): number;
/**   @private  */
export declare function getBaseShapeAttributes(element: DrawingElement, transform?: Transforms): BaseAttributes;
/**
 * Get function
 * @private
 */
export declare function getFunction(value: Function | string): Function;
/** @private */
export declare function cloneObject(obj: any, additionalProp?: Function | string, key?: string): Object;
/** @private */
export declare function cloneArray(sourceArray: Object[], additionalProp?: Function | string, key?: string): Object[];
/** @private */
export declare function getInternalProperties(propName: string): string[];
/**
 * @hidden
 */
export declare function isLeader(obj: PdfAnnotationBaseModel, position: string): Leader;
/**
 * @hidden
 */
export interface Leader {
    leader: string;
    point: PointModel;
}
