import { FontModel, BorderModel } from '../model/base-model';
import { AxisModel } from '../axes/axis-model';
import { IVisiblePointer } from '../model/interface';
import { Axis, Pointer, Range } from '../axes/axis';
import { Orientation, MarkerType } from './enum';
import { LinearGauge } from '../../linear-gauge';
/**
 * Specifies Linear-Gauge Helper methods
 */
/** @private */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Function to measure the height and width of the text.
 * @param  {string} text
 * @param  {FontModel} font
 * @param  {string} id
 * @returns no
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/** @private */
export declare function withInRange(value: number, start: number, end: number, max: number, min: number, type: string): boolean;
export declare function convertPixelToValue(parentElement: HTMLElement, pointerElement: Element, orientation: Orientation, axis: Axis, type: string, location: GaugeLocation): number;
export declare function getPathToRect(path: SVGPathElement, size: Size, parentElement: HTMLElement): Rect;
/** @private */
export declare function getElement(id: string): HTMLElement;
/** @private */
export declare function removeElement(id: string): void;
/** @private */
export declare function isPointerDrag(axes: AxisModel[]): boolean;
/** @private */
export declare function valueToCoefficient(value: number, axis: Axis, orientation: Orientation, range: VisibleRange): number;
export declare function getFontStyle(font: FontModel): string;
export declare function textFormatter(format: string, data: object, gauge: LinearGauge): string;
export declare function formatValue(value: number, gauge: LinearGauge): string | number;
/** @private */
export declare function getLabelFormat(format: string): string;
/** @private */
export declare function getTemplateFunction(template: string): Function;
/** @private */
export declare function getElementOffset(childElement: HTMLElement, parentElement: HTMLElement): Size;
/** @private */
export declare class VisibleRange {
    min?: number;
    max?: number;
    interval?: number;
    delta?: number;
    constructor(min: number, max: number, interval: number, delta: number);
}
/**
 * Internal use of gauge location
 */
export declare class GaugeLocation {
    /**
     * To specify x value
     */
    x: number;
    /**
     * To specify y value
     */
    y: number;
    constructor(x: number, y: number);
}
/**
 * Internal class size for height and width
 */
export declare class Size {
    /**
     * height of the size
     */
    height: number;
    /**
     * width of the size
     */
    width: number;
    constructor(width: number, height: number);
}
/** @private */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/** @private */
export declare class CustomizeOption {
    id: string;
    constructor(id?: string);
}
/** @private */
export declare class PathOption extends CustomizeOption {
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    d: string;
    transform: string;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string, transform?: string);
}
/** @private */
export declare class RectOption {
    x: number;
    y: number;
    id: string;
    height: number;
    width: number;
    rx: number;
    ry: number;
    opacity: number;
    transform: string;
    stroke: string;
    fill: string;
    ['stroke-width']: number;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect, transform?: string, dashArray?: string);
}
/** @private */
export declare class TextOption extends CustomizeOption {
    anchor: string;
    text: string;
    transform: string;
    x: number;
    y: number;
    baseLine: string;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string, transform?: string, baseLine?: string);
}
/** @private */
export declare class VisibleLabels {
    text: string;
    value: number;
    size: Size;
    angle: number;
    constructor(text: string, value: number, size: Size);
}
/** @private */
export declare class Align {
    axisIndex: number;
    align: string;
    constructor(axisIndex: number, align: string);
}
/** @private */
export declare function textElement(options: TextOption, font: FontModel, color: string, parent: HTMLElement | Element): Element;
export declare function calculateNiceInterval(min: number, max: number, size: number, orientation: Orientation): number;
export declare function getActualDesiredIntervalsCount(size: number, orientation: Orientation): number;
/** @private */
export declare function getPointer(target: HTMLElement, gauge: LinearGauge): IVisiblePointer;
/** @private */
export declare function getRangeColor(value: number, ranges: Range[]): string;
/** @private */
export declare function getRangePalette(): string[];
/** @private */
export declare function calculateShapes(location: Rect, shape: MarkerType, size: Size, url: string, options: PathOption, orientation: Orientation, axis: Axis, pointer: Pointer): PathOption;
/** @private */
export declare function getBox(location: Rect, boxName: string, orientation: Orientation, size: Size, type: string, containerWidth: number, axis: Axis, cornerRadius: number): string;
