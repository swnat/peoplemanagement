import { BorderModel, FontModel, ColorMappingModel } from '../model/base-model';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Alignment, LabelPosition } from '../utils/enum';
import { TreeMap } from '../treemap';
import { IShapes } from '../model/interface';
/**
 * Create the class for size
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
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Internal use of type rect
 * @private
 */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/**
 * Internal use of rectangle options
 * @private
 */
export declare class RectOption {
    id: string;
    fill: string;
    x: number;
    y: number;
    height: number;
    width: number;
    opacity: number;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect, dashArray?: string);
}
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
 * Function to measure the height and width of the text.
 * @param  {string} text
 * @param  {FontModel} font
 * @param  {string} id
 * @returns no
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/**
 * Internal use of text options
 * @private
 */
export declare class TextOption {
    anchor: string;
    id: string;
    transform: string;
    x: number;
    y: number;
    text: string | string[];
    baseLine: string;
    connectorText: string;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string | string[], transform?: string, baseLine?: string, connectorText?: string);
}
/**
 * @private
 * Trim the title text
 */
export declare function textTrim(maxWidth: number, text: string, font: FontModel): string;
/**
 * Map internal class for Point
 */
export declare class Location {
    /**
     * To calculate x value for location
     */
    x: number;
    /**
     * To calculate y value for location
     */
    y: number;
    constructor(x: number, y: number);
}
/**
 * Method to calculate x position of title
 */
export declare function findPosition(location: Rect, alignment: Alignment, textSize: Size, type: string): Location;
export declare function createTextStyle(renderer: SvgRenderer, renderOptions: Object, text: string): HTMLElement;
/**
 * Internal rendering of text
 * @private
 */
export declare function renderTextElement(options: TextOption, font: FontModel, color: string, parent: HTMLElement | Element, isMinus?: boolean): Element;
export declare function getElement(id: string): Element;
export declare function itemsToOrder(a: Object, b: Object): number;
export declare function isContainsData(source: string[], pathName: string, processData: Object, treemap: TreeMap): boolean;
export declare function findChildren(data: Object): Object;
export declare function findHightLightItems(data: Object, items: string[], mode: string, treeMap: TreeMap): string[];
/**
 * Function to compile the template function for maps.
 * @returns Function
 * @private
 */
export declare function getTemplateFunction(template: string): Function;
/**
 * @private
 */
export declare function convertElement(element: HTMLCollection, labelId: string, data: Object): HTMLElement;
export declare function findLabelLocation(rect: Rect, position: LabelPosition, labelSize: Size, type: string, treemap: TreeMap): Location;
export declare function measureElement(element: HTMLElement, parentElement: HTMLElement): Size;
export declare function getArea(rect: Rect): number;
export declare function getShortestEdge(input: Rect): number;
export declare function convertToContainer(rect: Rect): Rect;
export declare function convertToRect(container: Rect): Rect;
export declare function getMousePosition(pageX: number, pageY: number, element: Element): Location;
export declare function colorMap(colorMapping: ColorMappingModel[], equalValue: string, value: number | string, weightValuePath: number): object;
export declare function deSaturationColor(weightValuePath: number, colorMapping: ColorMappingModel, color: string, rangeValue: number): string;
export declare function colorCollections(colorMap: ColorMappingModel, value: number): string;
export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function getColorByValue(colorMap: ColorMappingModel, value: number): string;
export declare function getGradientColor(value: number, colorMap: ColorMappingModel): ColorValue;
export declare function getPercentageColor(percent: number, previous: string, next: string): ColorValue;
export declare function getPercentage(percent: number, previous: number, next: number): number;
export declare function wordWrap(maximumWidth: number, dataLabel: string, font: FontModel): string[];
export declare function textWrap(maxWidth: number, label: string, font: FontModel): string[];
/**
 * hide function
 */
export declare function hide(maxWidth: number, maxHeight: number, text: string, font: FontModel): string;
export declare function orderByArea(a: number, b: number): number;
export declare function removeClassNames(elements: HTMLCollection, type: string, treemap: TreeMap): void;
export declare function applyOptions(element: SVGPathElement, options: Object): void;
export declare function textFormatter(format: string, data: object, treemap: TreeMap): string;
export declare function formatValue(value: number, treemap: TreeMap): string | number;
/** @private */
export declare class ColorValue {
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
}
/** @private */
export declare function convertToHexCode(value: ColorValue): string;
/** @private */
export declare function componentToHex(value: number): string;
/** @private */
export declare function convertHexToColor(hex: string): ColorValue;
/** @private */
export declare function colorNameToHex(color: string): string;
/** @private */
export declare function drawSymbol(location: Location, shape: string, size: Size, url: string, options: PathOption, label: string): Element;
/** @private */
export declare function renderLegendShape(location: Location, size: Size, shape: string, options: PathOption, url: string): IShapes;
export declare function isParentItem(data: Object[], item: Object): boolean;
/**
 * Ajax support for treemap
 */
export declare class TreeMapAjax {
    /** options for data */
    dataOptions: string | Object;
    /** type of data */
    type: string;
    /** async value */
    async: boolean;
    /** type of the content */
    contentType: string;
    /** sending data */
    sendData: string | Object;
    constructor(options: string | Object, type?: string, async?: boolean, contentType?: string, sendData?: string | Object);
}
export declare function removeShape(collection: object[], value: string): void;
export declare function removeLegend(collection: object[], value: string): void;
export declare function setColor(element: Element, fill: string, opacity: string, borderColor: string, borderWidth: string): void;
export declare function removeSelectionWithHighlight(collection: object[], element: object[], treemap: TreeMap): void;
export declare function getLegendIndex(length: number, item: object, treemap: TreeMap): number;
export declare function pushCollection(collection: object[], index: number, number: number, legendElement: Element, shapeElement: Element, renderItems: object[], legendCollection: object[]): void;
