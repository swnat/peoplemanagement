import { PointModel } from './../primitives/point-model';
import { RectAttributes, PathAttributes, TextAttributes } from './canvas-interface';
import { ImageAttributes, StyleAttributes } from './canvas-interface';
import { BaseAttributes, LineAttributes, CircleAttributes, SubTextElement, TextBounds } from './canvas-interface';
import { LinearGradientModel, RadialGradientModel } from './../core/appearance-model';
import { IRenderer } from './../rendering/IRenderer';
import { DiagramNativeElement } from '../core/elements/native-element';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { TransformFactor as Transforms } from '../interaction/scroller';
import { Container } from '../core/containers/container';
/**
 * SVG Renderer
 */
/** @private */
export declare class SvgRenderer implements IRenderer {
    /**   @private  */
    renderShadow(options: BaseAttributes, canvas: SVGElement, collection?: Object[], parentSvg?: SVGSVGElement): void;
    /**   @private  */
    parseDashArray(dashArray: string): number[];
    /**   @private  */
    drawRectangle(svg: SVGElement, options: RectAttributes, diagramId: string, onlyRect?: boolean, isSelector?: Boolean, parentSvg?: SVGSVGElement, ariaLabel?: Object): void;
    /**   @private  */
    updateSelectionRegion(gElement: SVGElement, options: RectAttributes): void;
    /**   @private  */
    createGElement(elementType: string, attribute: Object): SVGGElement;
    /** @private */
    drawLine(gElement: SVGElement, options: LineAttributes): void;
    /** @private */
    drawCircle(gElement: SVGElement, options: CircleAttributes, enableSelector?: number, ariaLabel?: Object): void;
    /**   @private  */
    drawPath(svg: SVGElement, options: PathAttributes, diagramId: string, isSelector?: Boolean, parentSvg?: SVGSVGElement, ariaLabel?: Object): void;
    /**   @private  */
    renderPath(svg: SVGElement, options: PathAttributes, collection: Object[]): void;
    private setSvgFontStyle;
    /**   @private  */
    drawText(canvas: SVGElement, options: TextAttributes, parentSvg?: SVGSVGElement, ariaLabel?: Object, diagramId?: string, scaleValue?: number, parentNode?: Container): void;
    private setText;
    /**   @private  */
    drawImage(canvas: SVGElement | HTMLCanvasElement, obj: ImageAttributes, parentSvg?: SVGSVGElement, fromPalette?: boolean): void;
    /** @private */
    drawHTMLContent(element: DiagramHtmlElement, canvas: HTMLElement, transform?: Transforms, value?: boolean, indexValue?: number): void;
    /** @private */
    drawNativeContent(element: DiagramNativeElement, canvas: HTMLCanvasElement | SVGElement, height: number, width: number, parentSvg: SVGSVGElement): void;
    private setNativTransform;
    /**
     * used to crop the given native element into a rectangle of the given size
     * @private
     * @param node
     * @param group
     * @param height
     * @param width
     * @param parentSvg
     */
    drawClipPath(node: DiagramNativeElement, group: SVGElement, height: number, width: number, parentSvg: SVGSVGElement): SVGElement;
    /**   @private  */
    renderGradient(options: StyleAttributes, svg: SVGElement, diagramId?: string): SVGElement;
    /**   @private  */
    createLinearGradient(linear: LinearGradientModel): SVGElement;
    /**   @private  */
    createRadialGradient(radial: RadialGradientModel): SVGElement;
    /**   @private  */
    setSvgStyle(svg: SVGElement, style: StyleAttributes, diagramId?: string): void;
    /**   @private  */
    svgLabelAlign(text: TextAttributes, wrapBound: TextBounds, childNodes: SubTextElement[]): PointModel;
}
