import { CircularGauge } from '../circular-gauge';
import { FontModel, BorderModel } from '../model/base-model';
import { Range } from '../axes/axis';
import { IVisiblePointer } from '../model/interface';
/**
 * Function to measure the height and width of the text.
 * @param  {string} text
 * @param  {FontModel} font
 * @param  {string} id
 * @returns Size
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/**
 * Function to find number from string
 * * @returns number
 * @private
 */
export declare function toPixel(value: string, maxDimension: number): number;
/**
 * Function to get the style from FontModel.
 * @returns string
 * @private
 */
export declare function getFontStyle(font: FontModel): string;
/**
 * Function to set style to the element.
 * @private
 */
export declare function setStyles(element: HTMLElement, fill: string, border: BorderModel): void;
/**
 * Function to measure the element rect.
 * @returns ClientRect
 * @private
 */
export declare function measureElementRect(element: HTMLElement): ClientRect;
/**
 * Function to convert the number from string.
 * @returns number
 * @private
 */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Function to create the text element.
 * @returns Element
 * @private
 */
export declare function textElement(options: TextOption, font: FontModel, color: string, parent: HTMLElement | Element, styles?: string): Element;
/**
 * Function to append the path to the element.
 * @returns Element
 * @private
 */
export declare function appendPath(options: PathOption, element: Element, gauge: CircularGauge, functionName?: string): Element;
/**
 * Function to calculate the sum of array values.
 * @returns number
 * @private
 */
export declare function calculateSum(from: number, to: number, values: number[]): number;
/**
 * Function to calculate the value for linear animation effect
 * @param currentTime
 * @param startValue
 * @param endValue
 * @param duration
 * @private
 */
export declare function linear(currentTime: number, startValue: number, endValue: number, duration: number): number;
/**
 * Function to get the angle from value for circular gauge.
 * @returns number
 * @private
 */
export declare function getAngleFromValue(value: number, maximumValue: number, minimumValue: number, startAngle: number, endAngle: number, isClockWise: boolean): number;
/**
 * Function to get the degree for circular gauge.
 * @returns number
 * @private
 */
export declare function getDegree(startAngle: number, endAngle: number): number;
/**
 * Function to get the value from angle for circular gauge.
 * @returns number
 * @private
 */
export declare function getValueFromAngle(angle: number, maximumValue: number, minimumValue: number, startAngle: number, endAngle: number, isClockWise: boolean): number;
/**
 * Function to check whether it's a complete circle for circular gauge.
 * @returns boolean
 * @private
 */
export declare function isCompleteAngle(startAngle: number, endAngle: number): boolean;
/**
 * Function to get angle from location for circular gauge.
 * @returns number
 * @private
 */
export declare function getAngleFromLocation(center: GaugeLocation, point: GaugeLocation): number;
/**
 * Function to get the location from angle for circular gauge.
 * @returns GaugeLocation
 * @private
 */
export declare function getLocationFromAngle(degree: number, radius: number, center: GaugeLocation): GaugeLocation;
/**
 * Function to get the path direction of the circular gauge.
 * @returns string
 * @private
 */
export declare function getPathArc(center: GaugeLocation, start: number, end: number, radius: number, startWidth?: number, endWidth?: number): string;
/**
 * Function to get the range path direction of the circular gauge.
 * @returns string
 * @private
 */
export declare function getRangePath(start: GaugeLocation, end: GaugeLocation, innerStart: GaugeLocation, innerEnd: GaugeLocation, radius: number, startRadius: number, endRadius: number, clockWise: number): string;
/**
 * Function to get the rounded path direction of the circular gauge.
 * @returns string
 * @private
 */
export declare function getRoundedPathArc(center: GaugeLocation, actualStart: number, actualEnd: number, oldStart: number, oldEnd: number, radius: number, startWidth?: number, endWidth?: number): string;
/**
 * Function to get the rounded range path direction of the circular gauge.
 * @returns string
 * @private
 */
export declare function getRoundedPath(start: GaugeLocation, end: GaugeLocation, outerOldEnd: GaugeLocation, innerOldEnd: GaugeLocation, outerOldStart: GaugeLocation, innerOldStart: GaugeLocation, innerStart: GaugeLocation, innerEnd: GaugeLocation, radius: number, startRadius: number, endRadius: number, clockWise: number): string;
/**
 * Function to calculate the complete path arc of the circular gauge.
 * @returns string
 * @private
 */
export declare function getCompleteArc(center: GaugeLocation, start: number, end: number, radius: number, innerRadius: number): string;
/**
 * Function to get the circular path direction of the circular gauge.
 * @returns string
 * @private
 */
export declare function getCirclePath(start: GaugeLocation, end: GaugeLocation, radius: number, clockWise: number): string;
/**
 * Function to get the complete path direction of the circular gauge.
 * @returns string
 * @private
 */
export declare function getCompletePath(center: GaugeLocation, start: GaugeLocation, end: GaugeLocation, radius: number, innerStart: GaugeLocation, innerEnd: GaugeLocation, innerRadius: number, clockWise: number): string;
/**
 * Function to get element from id.
 * @returns Element
 * @private
 */
export declare function getElement(id: string): Element;
/**
 * Function to compile the template function for circular gauge.
 * @returns Function
 * @private
 */
export declare function getTemplateFunction(template: string, gauge: CircularGauge): Function;
/**
 * Function to remove the element from id.
 * @private
 */
export declare function removeElement(id: string): void;
/**
 * Function to get current point for circular gauge using element id.
 * @returns IVisiblePointer
 * @private
 */
export declare function getPointer(targetId: string, gauge: CircularGauge): IVisiblePointer;
export declare function getElementSize(template: string, gauge: CircularGauge, parent: HTMLElement): Size;
/**
 * Function to get the mouse position
 * @param pageX
 * @param pageY
 * @param element
 */
export declare function getMousePosition(pageX: number, pageY: number, element: Element): GaugeLocation;
/**
 * Function to convert the label using format for cirular gauge.
 * @returns string
 * @private
 */
export declare function getLabelFormat(format: string): string;
/**
 * Function to calculate the marker shape for circular gauge.
 * @returns PathOption
 * @private
 */
export declare function calculateShapes(location: GaugeLocation, shape: string, size: Size, url: string, options: PathOption): PathOption;
/**
 * Function to get range color from value for circular gauge.
 * @returns string
 * @private
 */
export declare function getRangeColor(value: number, ranges: Range[], color: string): string;
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
    style: string;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string, transform?: string, style?: string);
}
/** @private */
export declare class RectOption extends CustomizeOption {
    x: number;
    y: number;
    height: number;
    width: number;
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect);
}
/**
 * Internal class size
 */
export declare class Size {
    /**
     * Specifies the height.
     */
    height: number;
    /**
     * Specifies the width.
     */
    width: number;
    constructor(width: number, height: number);
}
/**
 * Internal use of circular gauge location
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
/** @private */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/** @private */
export declare function textTrim(maxWidth: number, text: string, font: FontModel): string;
/** @private */
export declare function showTooltip(text: string, x: number, y: number, areaWidth: number, id: string, element: Element): void;
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
    constructor(text: string, value: number, size?: Size);
}
