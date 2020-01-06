import { Smithchart } from '../../smithchart/smithchart';
import { SmithchartFontModel, SmithchartBorderModel } from '../../smithchart/utils/utils-model';
import { Effect } from '@syncfusion/ej2-base';
import { SmithchartSize, SmithchartRect } from '../../smithchart/utils/utils';
export declare function createSvg(smithchart: Smithchart): void;
export declare function getElement(id: string): Element;
/**
 * @private
 * Trim the title text
 */
export declare function textTrim(maxwidth: number, text: string, font: SmithchartFontModel): string;
/**
 * Function     to compile the template function for maps.
 * @returns Function
 * @private
 */
export declare function getTemplateFunction(templateString: string): Function;
export declare function convertElementFromLabel(element: Element, labelId: string, data: object, index: number, smithchart: Smithchart): HTMLElement;
export declare function _getEpsilonValue(): number;
/**
 * Method to calculate the width and height of the smithchart
 */
export declare function calculateSize(smithchart: Smithchart): void;
/**
 * Animation for template
 * @private
 */
export declare function templateAnimate(smithchart: Smithchart, element: Element, delay: number, duration: number, name: Effect): void;
/** @private */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Internal use of path options
 * @private
 */
export declare class PathOption {
    id: string;
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    d: string;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string);
}
/**
 * Internal use of rectangle options
 * @private
 */
export declare class RectOption extends PathOption {
    x: number;
    y: number;
    height: number;
    width: number;
    transform: string;
    constructor(id: string, fill: string, border: SmithchartBorderModel, opacity: number, rect: SmithchartRect);
}
/**
 * Internal use of circle options
 * @private
 */
export declare class CircleOption extends PathOption {
    cy: number;
    cx: number;
    r: number;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: SmithchartBorderModel, opacity: number, cx: number, cy: number, r: number, dashArray: string);
}
export declare function measureText(text: string, font: SmithchartFontModel): SmithchartSize;
/**
 * Internal use of text options
 * @private
 */
export declare class TextOption {
    id: string;
    anchor: string;
    text: string;
    x: number;
    y: number;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string);
}
/**
 * To remove element by id
 */
export declare function removeElement(id: string): void;
/**
 * Animation Effect Calculation Started Here
 * @param currentTime
 * @param startValue
 * @param endValue
 * @param duration
 * @private
 */
export declare function linear(currentTime: number, startValue: number, endValue: number, duration: number): number;
export declare function reverselinear(currentTime: number, startValue: number, endValue: number, duration: number): number;
/** @private */
export declare function getAnimationFunction(effect: string): Function;
/**
 * Internal rendering of text
 * @private
 */
export declare function renderTextElement(options: TextOption, font: SmithchartFontModel, color: string, parent: HTMLElement | Element): Element;
