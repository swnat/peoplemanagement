import { Effect } from '@syncfusion/ej2-base';
import { Index } from '../../common/model/base';
import { PathAttributes, RectAttributes, CircleAttributes, BaseAttibutes } from '@syncfusion/ej2-svg-base';
import { FontModel, BorderModel, MarginModel } from '../model/base-model';
import { VisibleRangeModel } from '../../chart/axis/axis';
import { Series, Points } from '../../chart/series/chart-series';
import { Axis } from '../../chart/axis/axis';
import { Chart } from '../../chart/chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { RangeNavigator } from '../../range-navigator/range-navigator';
import { AccumulationSeries, AccPoints } from '../../accumulation-chart/model/acc-base';
import { IShapes } from '../model/interface';
import { StockChart } from '../../stock-chart/stock-chart';
import { Rect, TextOption, Size, PathOption, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
/**
 * Function to sort the dataSource, by default it sort the data in ascending order.
 * @param  {Object} data
 * @param  {string} fields
 * @param  {boolean} isDescending
 * @returns Object
 */
export declare function sort(data: Object[], fields: string[], isDescending?: boolean): Object[];
/** @private */
export declare function isBreakLabel(label: string): boolean;
/** @private */
export declare function rotateTextSize(font: FontModel, text: string, angle: number, chart: Chart): Size;
/** @private */
export declare function removeElement(id: string | Element): void;
/** @private */
export declare function logBase(value: number, base: number): number;
/** @private */
export declare function showTooltip(text: string, x: number, y: number, areaWidth: number, id: string, element: Element, isTouch?: boolean): void;
/** @private */
export declare function inside(value: number, range: VisibleRangeModel): boolean;
/** @private */
export declare function withIn(value: number, range: VisibleRangeModel): boolean;
/** @private */
export declare function logWithIn(value: number, axis: Axis): number;
/** @private */
export declare function withInRange(previousPoint: Points, currentPoint: Points, nextPoint: Points, series: Series): boolean;
/** @private */
export declare function sum(values: number[]): number;
/** @private */
export declare function subArraySum(values: Object[], first: number, last: number, index: number[], series: Series): number;
/** @private */
export declare function subtractThickness(rect: Rect, thickness: Thickness): Rect;
/** @private */
export declare function subtractRect(rect: Rect, thickness: Rect): Rect;
/** @private */
export declare function degreeToLocation(degree: number, radius: number, center: ChartLocation): ChartLocation;
/** @private */
export declare function getAngle(center: ChartLocation, point: ChartLocation): number;
/** @private */
export declare function subArray(values: number[], index: number): number[];
/** @private */
export declare function valueToCoefficient(value: number, axis: Axis): number;
/** @private */
export declare function TransformToVisible(x: number, y: number, xAxis: Axis, yAxis: Axis, isInverted?: boolean, series?: Series): ChartLocation;
/**
 * method to find series, point index by element id
 * @private
 */
export declare function indexFinder(id: string, isPoint?: boolean): Index;
/** @private */
export declare function CoefficientToVector(coefficient: number, startAngle: number): ChartLocation;
/** @private */
export declare function valueToPolarCoefficient(value: number, axis: Axis): number;
/** @private */
export declare class Mean {
    verticalStandardMean: number;
    horizontalStandardMean: number;
    verticalSquareRoot: number;
    horizontalSquareRoot: number;
    verticalMean: number;
    horizontalMean: number;
    constructor(verticalStandardMean: number, verticalSquareRoot: number, horizontalStandardMean: number, horizontalSquareRoot: number, verticalMean: number, horizontalMean: number);
}
/** @private */
export declare class PolarArc {
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    radius: number;
    currentXPosition: number;
    constructor(startAngle?: number, endAngle?: number, innerRadius?: number, radius?: number, currentXPosition?: number);
}
/** @private */
export declare function createTooltip(id: string, text: string, top: number, left: number, fontSize: string): void;
/** @private */
export declare function createZoomingLabels(chart: Chart, axis: Axis, parent: Element, index: number, isVertical: boolean, rect: Rect): Element;
/** @private */
export declare function withInBounds(x: number, y: number, bounds: Rect, width?: number, height?: number): boolean;
/** @private */
export declare function getValueXByPoint(value: number, size: number, axis: Axis): number;
/** @private */
export declare function getValueYByPoint(value: number, size: number, axis: Axis): number;
/** @private */
export declare function findClipRect(series: Series): void;
/** @private */
export declare function firstToLowerCase(str: string): string;
/** @private */
export declare function getTransform(xAxis: Axis, yAxis: Axis, invertedAxis: boolean): Rect;
/** @private */
export declare function getMinPointsDelta(axis: Axis, seriesCollection: Series[]): number;
/** @private */
export declare function getAnimationFunction(effect: string): Function;
/**
 * Animation Effect Calculation Started Here
 * @param currentTime
 * @param startValue
 * @param endValue
 * @param duration
 * @private
 */
export declare function linear(currentTime: number, startValue: number, endValue: number, duration: number): number;
/**
 * Animation Effect Calculation End
 * @private
 */
export declare function markerAnimate(element: Element, delay: number, duration: number, series: Series | AccumulationSeries, pointIndex: number, point: ChartLocation, isLabel: boolean): void;
/**
 * Animate the rect element
 */
export declare function animateRectElement(element: Element, delay: number, duration: number, currentRect: Rect, previousRect: Rect): void;
/**
 * Animation after legend click a path
 * @param element element to be animated
 * @param direction current direction of the path
 * @param previousDirection previous direction of the path
 */
export declare function pathAnimation(element: Element, direction: string, redraw: boolean, previousDirection?: string, animateDuration?: number): void;
/**
 * To append the clip rect element
 * @param redraw
 * @param options
 * @param renderer
 * @param clipPath
 */
export declare function appendClipElement(redraw: boolean, options: BaseAttibutes, renderer: SvgRenderer, clipPath?: string): Element;
/**
 * Triggers the event.
 * @return {void}
 * @private
 */
export declare function triggerLabelRender(chart: Chart | RangeNavigator, tempInterval: number, text: string, labelStyle: FontModel, axis: Axis): void;
/**
 * The function used to find whether the range is set.
 * @return {boolean}
 * @private
 */
export declare function setRange(axis: Axis): boolean;
/**
 * Calculate desired interval for the axis.
 * @return {void}
 * @private
 */
export declare function getActualDesiredIntervalsCount(availableSize: Size, axis: Axis): number;
/**
 * Animation for template
 * @private
 */
export declare function templateAnimate(element: Element, delay: number, duration: number, name: Effect, isRemove?: boolean): void;
/** @private */
export declare function drawSymbol(location: ChartLocation, shape: string, size: Size, url: string, options: PathOption, label: string, renderer?: SvgRenderer | CanvasRenderer, clipRect?: Rect): Element;
/** @private */
export declare function calculateShapes(location: ChartLocation, size: Size, shape: string, options: PathOption, url: string): IShapes;
/** @private */
export declare function getRectLocation(startLocation: ChartLocation, endLocation: ChartLocation, outerRect: Rect): Rect;
/** @private */
export declare function minMax(value: number, min: number, max: number): number;
/** @private */
export declare function getElement(id: string): Element;
/** @private */
export declare function getTemplateFunction(template: string): Function;
/** @private */
export declare function createTemplate(childElement: HTMLElement, pointIndex: number, content: string, chart: Chart | AccumulationChart | RangeNavigator, point?: Points | AccPoints, series?: Series | AccumulationSeries, dataLabelId?: string): HTMLElement;
/** @private */
export declare function getFontStyle(font: FontModel): string;
/** @private */
export declare function measureElementRect(element: HTMLElement, redraw?: boolean): ClientRect;
/** @private */
export declare function findlElement(elements: NodeList, id: string): Element;
/** @private */
export declare function getPoint(x: number, y: number, xAxis: Axis, yAxis: Axis, isInverted?: boolean, series?: Series): ChartLocation;
/** @private */
export declare function appendElement(child: Element, parent: Element, redraw?: boolean, animate?: boolean, x?: string, y?: string): void;
/**
 * Method to append child element
 * @param parent
 * @param childElement
 * @param isReplace
 */
export declare function appendChildElement(isCanvas: boolean, parent: Element | HTMLElement, childElement: Element | HTMLElement, redraw?: boolean, isAnimate?: boolean, x?: string, y?: string, start?: ChartLocation, direction?: string, forceAnimate?: boolean, isRect?: boolean, previousRect?: Rect, animateDuration?: number): void;
/** @private */
export declare function getDraggedRectLocation(x1: number, y1: number, x2: number, y2: number, outerRect: Rect): Rect;
/** @private */
export declare function checkBounds(start: number, size: number, min: number, max: number): number;
/** @private */
export declare function getLabelText(currentPoint: Points, series: Series, chart: Chart): string[];
/** @private */
export declare function stopTimer(timer: number): void;
/** @private */
export declare function isCollide(rect: Rect, collections: Rect[], clipRect: Rect): boolean;
/** @private */
export declare function isOverlap(currentRect: Rect, rect: Rect): boolean;
/** @private */
export declare function containsRect(currentRect: Rect, rect: Rect): boolean;
/** @private */
export declare function calculateRect(location: ChartLocation, textSize: Size, margin: MarginModel): Rect;
/** @private */
export declare function convertToHexCode(value: ColorValue): string;
/** @private */
export declare function componentToHex(value: number): string;
/** @private */
export declare function convertHexToColor(hex: string): ColorValue;
/** @private */
export declare function colorNameToHex(color: string): string;
/** @private */
export declare function getSaturationColor(color: string, factor: number): string;
/** @private */
export declare function getMedian(values: number[]): number;
/** @private */
export declare function calculateLegendShapes(location: ChartLocation, size: Size, shape: string, options: PathOption): IShapes;
/** @private */
export declare function textTrim(maxWidth: number, text: string, font: FontModel): string;
/**
 * To trim the line break label
 * @param maxWidth
 * @param text
 * @param font
 */
export declare function lineBreakLabelTrim(maxWidth: number, text: string, font: FontModel): string[];
/** @private */
export declare function stringToNumber(value: string, containerSize: number): number;
/** @private */
export declare function redrawElement(redraw: boolean, id: string, options?: PathAttributes | RectAttributes | CircleAttributes, renderer?: SvgRenderer | CanvasRenderer): Element;
/** @private */
export declare function animateRedrawElement(element: Element | HTMLElement, duration: number, start: ChartLocation, end: ChartLocation, x?: string, y?: string): void;
/** @private */
export declare function textElement(renderer: SvgRenderer | CanvasRenderer, option: TextOption, font: FontModel, color: string, parent: HTMLElement | Element, isMinus?: boolean, redraw?: boolean, isAnimate?: boolean, forceAnimate?: boolean, animateDuration?: number, seriesClipRect?: Rect): Element;
/**
 * Method to calculate the width and height of the chart
 */
export declare function calculateSize(chart: Chart | AccumulationChart | RangeNavigator | StockChart): void;
export declare function createSvg(chart: Chart | AccumulationChart | RangeNavigator): void;
/**
 * To calculate chart title and height
 * @param title
 * @param style
 * @param width
 */
export declare function getTitle(title: string, style: FontModel, width: number): string[];
/**
 * Method to calculate x position of title
 */
export declare function titlePositionX(rect: Rect, titleStyle: FontModel): number;
/**
 * Method to find new text and element size based on textOverflow
 */
export declare function textWrap(currentLabel: string, maximumWidth: number, font: FontModel): string[];
/**
 * Method to reset the blazor templates
 */
export declare function blazorTemplatesReset(control: Chart | AccumulationChart): void;
/** @private */
export declare class CustomizeOption {
    id: string;
    constructor(id?: string);
}
/** @private */
export declare class StackValues {
    startValues?: number[];
    endValues?: number[];
    constructor(startValue?: number[], endValue?: number[]);
}
/** @private */
export declare class RectOption extends PathOption {
    x: number;
    y: number;
    height: number;
    width: number;
    rx: number;
    ry: number;
    transform: string;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect, rx?: number, ry?: number, transform?: string, dashArray?: string);
}
/** @private */
export declare class ImageOption {
    height: number;
    width: number;
    href: string;
    x: number;
    y: number;
    id: string;
    visibility: string;
    preserveAspectRatio: string;
    constructor(height: number, width: number, href: string, x: number, y: number, id: string, visibility: string, preserveAspectRatio: string);
}
/** @private */
export declare class CircleOption extends PathOption {
    cy: number;
    cx: number;
    r: number;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, cx: number, cy: number, r: number);
}
/** @private */
export declare class PolygonOption {
    id: string;
    points: string;
    fill: string;
    constructor(id: string, points: string, fill: string);
}
/** @private */
export declare class ChartLocation {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
/** @private */
export declare class Thickness {
    left: number;
    right: number;
    top: number;
    bottom: number;
    constructor(left: number, right: number, top: number, bottom: number);
}
/** @private */
export declare class ColorValue {
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
}
/** @private */
export declare class PointData {
    point: Points;
    series: Series;
    lierIndex: number;
    constructor(point: Points, series: Series, index?: number);
}
/** @private */
export declare class AccPointData {
    point: AccPoints;
    series: AccumulationSeries;
    constructor(point: AccPoints, series: AccumulationSeries, index?: number);
}
/** @private */
export declare class ControlPoints {
    controlPoint1: ChartLocation;
    controlPoint2: ChartLocation;
    constructor(controlPoint1: ChartLocation, controlPoint2: ChartLocation);
}
/** @private */
export interface IHistogramValues {
    sDValue?: number;
    mean?: number;
    binWidth?: number;
    yValues?: number[];
}
