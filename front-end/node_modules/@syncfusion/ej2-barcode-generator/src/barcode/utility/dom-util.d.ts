/**
 * DOM util
 */
import { Size } from '../primitives/size';
import { BaseAttributes } from '../rendering/canvas-interface';
/** @private */
export declare function createHtmlElement(elementType: string, attribute?: Object): HTMLElement;
export declare function getChildNode(node: SVGElement): SVGElement[] | HTMLCollection;
export declare function measureText(textContent: BaseAttributes): Size;
/** @private */
export declare function setAttribute(element: HTMLElement | SVGElement, attributes: Object): void;
/** @private */
export declare function createSvgElement(elementType: string, attribute: Object): HTMLElement | SVGElement;
/** @private */
export declare function createMeasureElements(): void;
