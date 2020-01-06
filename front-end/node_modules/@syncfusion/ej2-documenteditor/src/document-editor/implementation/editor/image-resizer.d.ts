import { LayoutViewer } from '../index';
import { Dictionary } from '../../base/dictionary';
import { DocumentEditor } from '../../document-editor';
import { IWidget, ImageElementBox, Page } from '../viewer/page';
import { Point, ImagePointInfo } from './editor-helper';
import { BaseHistoryInfo } from '../editor-history/base-history-info';
/**
 * Image resizer implementation.
 */
export declare class ImageResizer {
    /**
     * @private
     */
    owner: DocumentEditor;
    private currentImageElementBoxIn;
    /**
     * @private
     */
    resizeContainerDiv: HTMLDivElement;
    /**
     * @private
     */
    topLeftRect: HTMLDivElement;
    /**
     * @private
     */
    topMiddleRect: HTMLDivElement;
    /**
     * @private
     */
    topRightRect: HTMLDivElement;
    /**
     * @private
     */
    bottomLeftRect: HTMLDivElement;
    /**
     * @private
     */
    bottomMiddleRect: HTMLDivElement;
    /**
     * @private
     */
    bottomRightRect: HTMLDivElement;
    /**
     * @private
     */
    leftMiddleRect: HTMLDivElement;
    /**
     * @private
     */
    rightMiddleRect: HTMLDivElement;
    /**
     * @private
     */
    topLeftRectParent: HTMLDivElement;
    /**
     * @private
     */
    topMiddleRectParent: HTMLDivElement;
    /**
     * @private
     */
    topRightRectParent: HTMLDivElement;
    /**
     * @private
     */
    bottomLeftRectParent: HTMLDivElement;
    /**
     * @private
     */
    bottomMiddleRectParent: HTMLDivElement;
    /**
     * @private
     */
    bottomRightRectParent: HTMLDivElement;
    /**
     * @private
     */
    leftMiddleRectParent: HTMLDivElement;
    /**
     * @private
     */
    rightMiddleRectParent: HTMLDivElement;
    /**
     * @private
     */
    resizeMarkSizeIn: number;
    /**
     * @private
     */
    selectedImageWidget: Dictionary<IWidget, SelectedImageInfo>;
    /**
     * @private
     */
    baseHistoryInfo: BaseHistoryInfo;
    private imageResizerDiv;
    /**
     * @private
     */
    isImageResizing: boolean;
    /**
     * @private
     */
    isImageResizerVisible: boolean;
    private viewer;
    /**
     * @private
     */
    currentPage: Page;
    /**
     * @private
     */
    isImageMoveToNextPage: boolean;
    /**
     * @private
     */
    imageResizerDivElement: HTMLDivElement;
    /**
     * @private
     */
    imageResizerPoints: ImageResizingPoints;
    /**
     * @private
     */
    selectedResizeElement: HTMLElement;
    /**
     * @private
     */
    topValue: number;
    /**
     * @private
     */
    leftValue: number;
    /**
     * Gets or Sets the current image element box.
     * @private
     */
    /**
    * @private
    */
    currentImageElementBox: ImageElementBox;
    /**
     * Gets or Sets the resize mark size.
     * @private
     */
    /**
    * @private
    */
    resizeMarkSize: number;
    /**
     * Constructor for image resizer module.
     * @param {DocumentEditor} node
     * @param {LayoutViewer} viewer
     * @private
     */
    constructor(node: DocumentEditor, viewer: LayoutViewer);
    /**
     * Gets module name.
     */
    private getModuleName;
    /**
     * Sets image resizer position.
     * @param {number} x - Specifies for image resizer left value.
     * @param {number} y - Specifies for image resizer top value.
     * @param {number} width - Specifies for image resizer width value.
     * @param {number} height - Specifies for image resizer height value.
     * @private
     */
    setImageResizerPositions(x: number, y: number, width: number, height: number): void;
    /**
     * Creates image resizer DOM element.
     * @private
     */
    initializeImageResizer(): void;
    /**
     * Position an image resizer
     * @param {ImageElementBox} elementBox - Specifies the image position.
     * @private
     */
    positionImageResizer(elementBox: ImageElementBox): void;
    /**
     * Shows the image resizer.
     * @private
     */
    showImageResizer(): void;
    /**
     * Hides the image resizer.
     * @private
     */
    hideImageResizer(): void;
    /**
     * Initialize the resize marks.
     * @param {HTMLElement} resizeDiv - Specifies to appending resizer container div element.
     * @param {ImageResizer} imageResizer - Specifies to creating div element of each position.
     * @private
     */
    initResizeMarks(resizeDiv: HTMLElement, imageResizer: ImageResizer): HTMLDivElement;
    /**
     * Sets the image resizer position.
     * @param {number} left - Specifies for image resizer left value.
     * @param {number} top - Specifies for image resizer top value.
     * @param {number} width - Specifies for image resizer width value.
     * @param {number} height - Specifies for image resizer height value.
     * @param {ImageResizer} imageResizer - Specifies for image resizer.
     * @private
     */
    setImageResizerPosition(left: number, top: number, width: number, height: number, imageResizer: ImageResizer): void;
    /**
     * Sets the image resizing points.
     * @param {ImageResizer} imageResizer - Specifies for position of each resizing elements.
     * @private
     */
    setImageResizingPoints(imageResizer: ImageResizer): void;
    /**
     * Initialize the resize container div element.
     * @param {ImageResizer} imageResizer - Specifies for creating resize container div element.
     * @private
     */
    initResizeContainerDiv(imageResizer: ImageResizer): void;
    /**
     * Apply the properties of each resize rectangle element.
     * @param {HTMLDivElement} resizeRectElement - Specifies for applying properties to resize rectangle element.
     * @private
     */
    applyProperties(resizeRectElement: HTMLDivElement): void;
    /**
     * Handles an image resizing.
     * @param {number} x  - Specifies for left value while resizing.
     * @param {number} y - Specifies for top value while resizing.
     */
    private handleImageResizing;
    /**
     * Handles image resizing on mouse.
     * @param {MouseEvent} event - Specifies for image resizing using mouse event.
     * @private
     */
    handleImageResizingOnMouse(event: MouseEvent): void;
    private topMiddleResizing;
    private leftMiddleResizing;
    private topRightResizing;
    private topLeftResizing;
    private bottomRightResizing;
    private bottomLeftResizing;
    private getOuterResizingPoint;
    private getInnerResizingPoint;
    /**
     * Handles image resizing on touch.
     * @param {TouchEvent} touchEvent - Specifies for image resizing using touch event.
     * @private
     */
    handleImageResizingOnTouch(touchEvent: TouchEvent): void;
    /**
     * Gets the image point of mouse.
     * @param {Point} touchPoint - Specifies for resizer cursor position.
     * @private
     */
    getImagePoint(touchPoint: Point): ImagePointInfo;
    private applyPropertiesForMouse;
    /**
     * Gets the image point of touch.
     * @param {Point} touchPoints - Specifies for resizer cursor position.
     * @private
     */
    getImagePointOnTouch(touchPoints: Point): ImagePointInfo;
    private applyPropertiesForTouch;
    /**
     * @private
     */
    mouseUpInternal(): void;
    /**
     * Initialize history for image resizer.
     * @param {ImageResizer} imageResizer - Specifies for image resizer.
     * @param {WImage} imageContainer - Specifies for an image.
     * @private
     */
    initHistoryForImageResizer(imageContainer: ImageElementBox): void;
    /**
     * Updates histroy for image resizer.
     * @private
     */
    updateHistoryForImageResizer(): void;
    /**
     * Updates image resize container when applying zooming
     * @private
     */
    updateImageResizerPosition(): void;
    /**
     * Dispose the internal objects which are maintained.
     * @private
     */
    destroy(): void;
}
/**
 * @private
 */
export declare class ImageResizingPoints {
    /**
     * @private
     */ resizeContainerDiv: Point;
    /**
     * @private
     */
    topLeftRectParent: Point;
    /**
     * @private
     */
    topMiddleRectParent: Point;
    /**
     * @private
     */
    topRightRectParent: Point;
    /**
     * @private
     */
    bottomLeftRectParent: Point;
    /**
     * @private
     */
    bottomMiddleRectParent: Point;
    /**
     * @private
     */
    bottomRightRectParent: Point;
    /**
     * @private
     */
    leftMiddleRectParent: Point;
    /**
     * @private
     */
    rightMiddleRectParent: Point;
    /**
     * Constructor for image resizing points class.
     */
    constructor();
}
/**
 * @private
 */
export declare class SelectedImageInfo {
    private heightIn;
    private widthIn;
    /**
     * Gets or Sets the height value.
     * @private
     */
    /**
    * @private
    */
    height: number;
    /**
     * Gets or Sets the width value.
     * @private
     */
    /**
    * @private
    */
    width: number;
    /**
     * Constructor for selected image info class.
     * @param {number} height - Specifies for height value.
     * @param {number} width - Specifies for width value.
     */
    constructor(height: number, width: number);
}
/**
 * @private
 */
export interface LeftTopInfo {
    left: number;
    top: number;
}
