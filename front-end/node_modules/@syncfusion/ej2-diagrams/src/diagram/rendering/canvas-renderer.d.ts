import { PointModel } from './../primitives/point-model';
import { ImageAttributes, StyleAttributes, BaseAttributes } from './canvas-interface';
import { RectAttributes, PathAttributes, TextAttributes, SubTextElement, TextBounds } from './canvas-interface';
import { IRenderer } from './../rendering/IRenderer';
import { Container } from '../core/containers/container';
/**
 * Canvas Renderer
 */
/** @private */
export declare class CanvasRenderer implements IRenderer {
    /**   @private  */
    static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
    private static setCanvasSize;
    /**   @private  */
    renderGradient(options: StyleAttributes, ctx: CanvasRenderingContext2D, x?: number, y?: number): CanvasRenderingContext2D;
    /**   @private  */
    renderShadow(options: BaseAttributes, canvas: HTMLCanvasElement, collection?: Object[]): void;
    /**   @private  */
    static createCanvas(id: string, width: number, height: number): HTMLCanvasElement;
    private setStyle;
    private rotateContext;
    private setFontStyle;
    /**   @private  */
    parseDashArray(dashArray: string): number[];
    /**   @private  */
    drawRectangle(canvas: HTMLCanvasElement, options: RectAttributes): void;
    /**   @private  */
    drawPath(canvas: HTMLCanvasElement, options: PathAttributes): void;
    /**   @private  */
    renderPath(canvas: HTMLCanvasElement, options: PathAttributes, collection: Object[]): void;
    /**   @private  */
    drawText(canvas: HTMLCanvasElement, options: TextAttributes, parentSvg?: SVGSVGElement, ariaLabel?: Object, diagramId?: string, scaleValue?: number, parentNode?: Container): void;
    private loadImage;
    /**   @private  */
    drawImage(canvas: HTMLCanvasElement, obj: ImageAttributes, parentSvg?: SVGSVGElement, fromPalette?: boolean): void;
    private image;
    private getSliceOffset;
    private getMeetOffset;
    private m;
    private r;
    private a;
    /**   @private  */
    labelAlign(text: TextAttributes, wrapBounds: TextBounds, childNodes: SubTextElement[]): PointModel;
}
