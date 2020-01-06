import { DiagramElement } from '../core/elements/diagram-element';
import { PathElement } from '../core/elements/path-element';
import { ImageElement } from '../core/elements/image-element';
import { TextElement } from '../core/elements/text-element';
import { Container } from '../core/containers/container';
import { PointModel } from '../primitives/point-model';
import { ConnectorModel } from '../objects/connector-model';
import { SnapSettingsModel } from '../../diagram/diagram/grid-lines-model';
import { BackgroundModel } from '../../diagram/diagram/page-settings-model';
import { PathAttributes, LineAttributes } from './canvas-interface';
import { RectAttributes, BaseAttributes } from './canvas-interface';
import { RendererAction, FlipDirection } from '../enum/enum';
import { ThumbsConstraints, SelectorConstraints } from '../enum/enum';
import { TransformFactor as Transforms } from '../interaction/scroller';
import { SelectorModel } from '../objects/node-model';
import { IRenderer } from './../rendering/IRenderer';
import { OrthogonalSegment } from '../objects/connector';
import { RulerSettingsModel } from '../diagram/ruler-settings-model';
import { RulerModel } from '../../ruler';
/**
 * Renderer module is used to render basic diagram elements
 */
/** @private */
export declare class DiagramRenderer {
    /**   @private  */
    renderer: IRenderer;
    private diagramId;
    /** @private */
    isSvgMode: Boolean;
    private svgRenderer;
    private nativeSvgLayer;
    private diagramSvgLayer;
    private iconSvgLayer;
    /** @private */
    adornerSvgLayer: SVGSVGElement;
    /** @private */
    rendererActions: RendererAction;
    private groupElement;
    private element;
    private transform;
    constructor(name: string, svgRender: IRenderer, isSvgMode: Boolean);
    /**   @private  */
    setCursor(canvas: HTMLElement, cursor: string): void;
    /** @private */
    setLayers(): void;
    private getAdornerLayer;
    private getParentSvg;
    private getParentElement;
    private getGroupElement;
    /**   @private  */
    renderElement(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, htmlLayer: HTMLElement, transform?: Transforms, parentSvg?: SVGSVGElement, createParent?: boolean, fromPalette?: boolean, indexValue?: number): void;
    /**   @private  */
    drawSelectionRectangle(x: number, y: number, w: number, h: number, canvas: HTMLCanvasElement | SVGElement, t: Transforms): void;
    /**
     * @private
     */
    renderHighlighter(element: DiagramElement, canvas: SVGElement, transform: Transforms): void;
    /**
     * @private
     */
    renderStackHighlighter(element: DiagramElement, canvas: SVGElement, transform: Transforms, isVertical: Boolean, position: PointModel, isUml?: boolean, isSwimlane?: boolean): void;
    /**   @private  */
    drawLine(canvas: SVGElement, options: LineAttributes): void;
    /**   @private  */
    drawPath(canvas: SVGElement, options: PathAttributes): void;
    /**   @private  */
    renderResizeHandle(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, constraints: ThumbsConstraints, currentZoom: number, selectorConstraints?: SelectorConstraints, transform?: Transforms, canMask?: boolean, enableNode?: number, nodeConstraints?: boolean, isSwimlane?: boolean): void;
    /**   @private  */
    renderEndPointHandle(selector: ConnectorModel, canvas: HTMLCanvasElement | SVGElement, constraints: ThumbsConstraints, selectorConstraints: SelectorConstraints, transform: Transforms, connectedSource: boolean, connectedTarget?: boolean, isSegmentEditing?: boolean): void;
    /**   @private  */
    renderOrthogonalThumbs(id: string, selector: DiagramElement, segment: OrthogonalSegment, canvas: HTMLCanvasElement | SVGElement, visibility: boolean, t: Transforms): void;
    /**   @private  */
    renderOrthogonalThumb(id: string, selector: DiagramElement, x: number, y: number, canvas: HTMLCanvasElement | SVGElement, visible: boolean, orientation: string, t: Transforms): void;
    /**   @private  */
    renderPivotLine(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, selectorConstraints?: SelectorConstraints, canMask?: boolean): void;
    /**   @private  */
    renderBezierLine(id: string, wrapper: DiagramElement, canvas: HTMLCanvasElement | SVGElement, start: PointModel, end: PointModel, transform?: Transforms): void;
    /**   @private  */
    renderCircularHandle(id: string, selector: DiagramElement, cx: number, cy: number, canvas: HTMLCanvasElement | SVGElement, visible: boolean, enableSelector?: number, t?: Transforms, connected?: boolean, canMask?: boolean, ariaLabel?: Object, count?: number, className?: string): void;
    /**   @private  */
    renderBorder(selector: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, enableNode?: number, isBorderTickness?: boolean, isSwimlane?: boolean): void;
    /**   @private  */
    renderUserHandler(selectorItem: SelectorModel, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms): void;
    /**   @private  */
    renderRotateThumb(wrapper: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, selectorConstraints?: SelectorConstraints, canMask?: boolean): void;
    /**   @private  */
    renderPathElement(element: PathElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement, fromPalette?: boolean): void;
    /**   @private  */
    renderSvgGridlines(snapSettings: SnapSettingsModel, gridSvg: SVGElement, t: Transforms, rulerSettings: RulerSettingsModel, hRuler: RulerModel, vRuler: RulerModel): void;
    private horizontalSvgGridlines;
    private verticalSvgGridlines;
    /**   @private  */
    updateGrid(snapSettings: SnapSettingsModel, svgGrid: SVGSVGElement, transform: Transforms, rulerSettings: RulerSettingsModel, hRuler: RulerModel, vRuler: RulerModel): void;
    private updateLineIntervals;
    private scaleSnapInterval;
    /**   @private  */
    renderTextElement(element: TextElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement, fromPalette?: boolean): void;
    private renderNativeElement;
    private renderHTMLElement;
    /**   @private  */
    renderImageElement(element: ImageElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement, fromPalette?: boolean): void;
    /**   @private  */
    renderContainer(group: Container, canvas: HTMLCanvasElement | SVGElement, htmlLayer: HTMLElement, transform?: Transforms, parentSvg?: SVGSVGElement, createParent?: boolean, fromPalette?: boolean, indexValue?: number): void;
    renderFlipElement(element: DiagramElement, canvas: SVGElement | HTMLCanvasElement, flip: FlipDirection): void;
    /**   @private  */
    hasNativeParent(children: DiagramElement[], count?: number): DiagramElement;
    /**   @private  */
    renderRect(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement): void;
    /**   @private  */
    drawRect(canvas: SVGElement, options: RectAttributes): void;
    /**   @private  */
    getBaseAttributes(element: DiagramElement, transform?: Transforms): BaseAttributes;
    /**   @private  */
    static renderSvgBackGroundImage(background: BackgroundModel, diagramElement: HTMLElement, x: number, y: number, width: number, height: number): void;
    /**   @private  */
    transformLayers(transform: Transforms, svgMode: boolean): boolean;
    /** @private */
    updateNode(element: DiagramElement, diagramElementsLayer: HTMLCanvasElement, htmlLayer: HTMLElement, transform?: Transforms, insertIndex?: number): void;
}
