import { CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { FontModel, BorderModel, PaletteCollectionModel } from '../model/base-model';
import { HeatMap } from '../heatmap';
import { RgbColor } from '../utils/colorMapping';
import { BubbleTooltipData } from '../model/base';
/**
 * Helper method for heatmap
 */
/** @private */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Function to measure the height and width of the text.
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/** @private */
export declare class TextElement {
    ['font-size']: string;
    ['font-style']: string;
    ['font-family']: string;
    ['font-weight']: string;
    fill: string;
    constructor(fontModel: FontModel, fontColor?: string);
}
export declare function titlePositionX(width: number, leftPadding: number, rightPadding: number, titleStyle: FontModel): number;
/**
 * Internal class size for height and width
 * @private
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
    constructor(id: string, fill: string, width: number, color?: string, opacity?: number, dashArray?: string, d?: string);
}
/**
 * Class to define currentRect private property.
 * @private
 */
export declare class CurrentRect {
    x: number;
    y: number;
    width: number;
    height: number;
    value: number | BubbleTooltipData[];
    id: string;
    xIndex: number;
    yIndex: number;
    xValue: number;
    yValue: number;
    visible: boolean;
    displayText: string;
    textId: string;
    allowCollection: boolean;
    constructor(x: number, y: number, width: number, height: number, value: number | BubbleTooltipData[], id: string, xIndex: number, yIndex: number, xValue: number, yValue: number, visible: boolean, displayText: string, textId: string, allowCollection: boolean);
}
/**
 * Class to define the details of selected cell.
 * @private
 */
export declare class SelectedCellDetails {
    value: number | BubbleTooltipData[];
    xLabel: string;
    yLabel: string;
    xValue: string | number | Date;
    yValue: string | number | Date;
    cellElement: Element;
    /** @private */
    xPosition: number;
    /** @private */
    yPosition: number;
    /** @private */
    width: number;
    /** @private */
    height: number;
    /** @private */
    x: number;
    /** @private */
    y: number;
    constructor(value: number | BubbleTooltipData[], xLabel: string, yLabel: string, xValue: number, yValue: number, cellElement: Element, xPosition: number, yPosition: number, width: number, height: number, x: number, y: number);
}
/**
 * Class to define property to draw rectangle.
 * @private
 */
export declare class RectOption extends PathOption {
    x: number;
    y: number;
    height: number;
    width: number;
    rx: number;
    ry: number;
    transform: string;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect, borderColor?: string, rx?: number, ry?: number, transform?: string, dashArray?: string);
}
/**
 * Class to define property to draw circle.
 * @private
 */
export declare class CircleOption extends PathOption {
    cx: number;
    cy: number;
    r: number;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, borderColor?: string, cx?: number, cy?: number, r?: number);
}
/**
 * Helper Class to define property to draw rectangle.
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
 * Class to define property to draw text.
 * @private
 */
export declare class TextOption extends TextElement {
    id: string;
    ['text-anchor']: string;
    text: string | string[];
    transform: string;
    x: number;
    y: number;
    ['dominant-baseline']: string;
    labelRotation: number;
    baseline: string;
    dy: string;
    constructor(id: string, basic: TextBasic, element: FontModel, fontColor?: string);
}
/**
 * Helper Class to define property to draw text.
 * @private
 */
export declare class TextBasic {
    ['text-anchor']: string;
    text: string | string[];
    transform: string;
    x: number;
    y: number;
    ['dominant-baseline']: string;
    labelRotation: number;
    baseline: string;
    dy: string;
    constructor(x?: number, y?: number, anchor?: string, text?: string | string[], labelRotation?: number, transform?: string, baseLine?: string, dy?: string);
}
/**
 * Class to define property to draw line.
 * @private
 */
export declare class Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(x1: number, y1: number, x2: number, y2: number);
}
/**
 * Class to define property to draw line.
 * @private
 */
export declare class LineOption extends PathOption {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(id: string, line: Line, stroke: string, strokewidth: number, opacity?: number, dasharray?: string);
}
/**
 * Properties required to render path.
 * @private
 */
export declare class PathAttributes extends PathOption {
    d: string;
    x: number;
    y: number;
    constructor(id: string, path: Path, fill: string, border: BorderModel, borderWidth: number, opacity: number, borderColor?: string);
}
/**
 * Helper Class to define property to path.
 * @private
 */
export declare class Path {
    d: string;
    innerR: boolean;
    cx: number;
    cy: number;
    x: number;
    y: number;
    x1: number;
    y1: number;
    start: number;
    end: number;
    radius: number;
    counterClockWise: boolean;
    constructor(d: string, innerR: boolean, x: number, y: number, x1: number, y1: number, cx: number, cy: number, start: number, end: number, radius: number, counterClockWise: boolean);
}
/** @private */
export declare function sum(values: number[]): number;
/** @private */
export declare function titlePositionY(heatmapSize: Size, topPadding: number, bottomPadding: number, titleStyle: FontModel): number;
/** @private */
export declare function rotateTextSize(font: FontModel, text: string, angle: number): Size;
/**
 * Class to draw SVG and Canvas Rectangle & Text.
 * @private
 */
export declare class DrawSvgCanvas {
    private heatMap;
    constructor(heatmap?: HeatMap);
    drawRectangle(properties: RectOption, parentElement: Element, isFromSeries?: Boolean): void;
    drawCircle(properties: CircleOption, parentElement: Element): void;
    drawPath(properties: PathAttributes, options: Path, parentElement: Element): void;
    createText(properties: TextOption, parentElement: Element, text: string | string[]): void;
    createWrapText(options: TextOption, font: FontModel, parentElement: Element): void;
    drawLine(properties: LineOption, parentElement: Element): void;
    canvasDrawText(options: TextOption, label: string, translateX?: number, translateY?: number): void;
    private getOptionValue;
    private setAttributes;
    drawCanvasRectangle(canvas: CanvasRenderer, options: RectOption, isFromSeries?: Boolean): void;
    private drawCornerRadius;
    drawCanvasCircle(canvas: CanvasRenderer, options: CircleOption): void;
    drawCanvasPath(canvas: CanvasRenderer, properties: PathAttributes, options: Path): void;
}
export declare function getTitle(title: string, style: FontModel, width: number): string[];
export declare function textWrap(currentLabel: string, maximumWidth: number, font: FontModel): string[];
/** @private */
export declare function textTrim(maxWidth: number, text: string, font: FontModel): string;
/** @private */
export declare function textNone(maxWidth: number, text: string, font: FontModel): string;
/** @private */
export declare class Gradient {
    id: string;
    x1: string;
    x2: string;
    y1: string;
    y2: string;
    constructor(x: string, x1: string, x2: string, y1: string, y2: string);
}
export declare class GradientColor {
    color: string;
    colorStop: string;
    constructor(color: string, colorStop: string);
}
/** @private */
export declare function showTooltip(text: string, x: number, y: number, areaWidth: number, id: string, element: Element, isTouch?: boolean, heatmap?: HeatMap): void;
/** @private */
export declare function removeElement(id: string): void;
/** @private */
export declare function getElement(id: string): Element;
/** @private */
export declare function increaseDateTimeInterval(value: number, interval: number, intervalType: string, increment: number): Date;
export declare class CanvasTooltip {
    text: string;
    region: Rect;
    constructor(text: string, rect: Rect);
}
export declare function getTooltipText(tooltipCollection: CanvasTooltip[], xPosition: number, yPosition: number): string;
/**
 * @private
 */
export declare class PaletterColor {
    isCompact: boolean;
    isLabel: boolean;
    offsets: PaletteCollectionModel[];
}
/**
 * @private
 */
export declare class GradientPointer {
    pathX1: number;
    pathY1: number;
    pathX2: number;
    pathY2: number;
    pathX3: number;
    pathY3: number;
    constructor(pathX1: number, pathY1: number, pathX2: number, pathY2: number, pathX3: number, pathY3: number);
}
/**
 * Class to define currentRect private property.
 * @private
 */
export declare class CurrentLegendRect {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    id: string;
    constructor(x: number, y: number, width: number, height: number, label: string, id: string);
}
/** @private */
export declare class LegendRange {
    x: number;
    y: number;
    width: number;
    height: number;
    value: number;
    visible: boolean;
    currentPage: number;
    constructor(x: number, y: number, width: number, height: number, value: number, visible: boolean, currentPage: number);
}
/** @private */
export declare class ToggleVisibility {
    visible: boolean;
    value: number;
    startValue: number;
    endValue: number;
    constructor(visible: boolean, value: number, startValue: number, endValue: number);
}
/** @private */
export declare function colorNameToHex(color: string): string;
/** @private */
export declare function convertToHexCode(value: RgbColor): string;
/** @private */
export declare function componentToHex(value: number): string;
/** @private */
export declare function convertHexToColor(hex: string): RgbColor;
/** @private */
export declare function formatValue(isCustom: boolean, format: string, tempInterval: number, formatFun: Function): string;
/** @private */
export declare class MultiLevelPosition {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
