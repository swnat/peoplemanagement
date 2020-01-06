import { Chart } from '../../chart/chart';
import { Axis, IScrollbarThemeStyle, IScrollEventArgs, VisibleRangeModel } from '../../chart/index';
import { ScrollbarSettingsRangeModel } from '../../chart/model/chart-base-model';
/**
 * Scrollbar Base
 */
export declare class ScrollBar {
    axis: Axis;
    component: Chart;
    zoomFactor: number;
    zoomPosition: number;
    svgObject: Element;
    width: number;
    height: number;
    /** @private */
    elements: Element[];
    /** @private */
    isVertical: boolean;
    /** @private */
    isThumbDrag: boolean;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    /** @private */
    startX: number;
    /** @private */
    scrollX: number;
    /** @private */
    scrollY: number;
    /** @private */
    animateDuration: number;
    /** @private */
    browserName: string;
    /** @private */
    isPointer: Boolean;
    /** @private */
    isScrollUI: boolean;
    /** @private */
    scrollbarThemeStyle: IScrollbarThemeStyle;
    /** @private */
    actualRange: number;
    /** @private */
    scrollRange: VisibleRangeModel;
    /** @private */
    isLazyLoad: boolean;
    /** @private */
    previousStart: number;
    /** @private */
    previousEnd: number;
    private scrollElements;
    private isResizeLeft;
    private isResizeRight;
    private previousXY;
    private previousWidth;
    private previousRectX;
    private mouseMoveListener;
    private mouseUpListener;
    private valueType;
    axes: Axis[];
    private startZoomPosition;
    private startZoomFactor;
    private startRange;
    private scrollStarted;
    private isScrollEnd;
    private isCustomHeight;
    /**
     * Constructor for creating scrollbar
     * @param component
     * @param axis
     */
    constructor(component: Chart, axis?: Axis);
    /**
     * To Mouse x and y position
     * @param e
     */
    private getMouseXY;
    /**
     * Method to bind events for scrollbar svg object
     * @param element
     */
    private wireEvents;
    /**
     * Method to remove events for srcollbar svg object
     * @param element
     */
    private unWireEvents;
    /**
     * Handles the mouse down on scrollbar
     * @param e
     */
    scrollMouseDown(e: PointerEvent): void;
    /**
     * To check the matched string
     * @param id
     * @param match
     */
    private isExist;
    /**
     * To check current poisition is within scrollbar region
     * @param currentX
     */
    private isWithIn;
    /**
     * Method to find move length of thumb
     * @param mouseXY
     * @param thumbX
     * @param circleRadius
     */
    private moveLength;
    /**
     * Method to calculate zoom factor and position
     * @param currentX
     * @param currentWidth
     */
    private setZoomFactorPosition;
    /**
     * Handles the mouse move on scrollbar
     * @param e
     */
    scrollMouseMove(e: PointerEvent): void;
    /**
     * Handles the mouse wheel on scrollbar
     * @param e
     */
    scrollMouseWheel(e: WheelEvent): void;
    /**
     * Handles the mouse up on scrollbar
     * @param e
     */
    scrollMouseUp(e: PointerEvent): void;
    calculateMouseWheelRange(scrollThumbX: number, scrollThumbWidth: number): IScrollEventArgs;
    /**
     * Range calculation for lazy loading
     */
    calculateLazyRange(scrollThumbX: number, scrollThumbWidth: number, thumbMove?: string): IScrollEventArgs;
    /**
     * Get start and end values
     */
    private getStartEnd;
    /**
     * To render scroll bar
     * @private
     */
    render(isScrollExist: boolean): Element;
    /**
     * Theming for scrollabr
     */
    private getTheme;
    /**
     * Method to remove existing scrollbar
     */
    removeScrollSvg(): void;
    /**
     * Method to set cursor fpr scrollbar
     * @param target
     */
    private setCursor;
    /**
     * Method to set theme for sollbar
     * @param target
     */
    private setTheme;
    /**
     * To check current axis
     * @param target
     * @param ele
     */
    private isCurrentAxis;
    /**
     * Method to resize thumb
     * @param e
     */
    private resizeThumb;
    /**
     * Method to position the scrollbar thumb
     * @param currentX
     * @param currentWidth
     */
    private positionThumb;
    /**
     * Method to get default values
     */
    private getDefaults;
    /**
     * Lazy load default values
     */
    getLazyDefaults(axis: Axis): void;
    /**
     * Method to get log range
     */
    getLogRange(axis: Axis): ScrollbarSettingsRangeModel;
    /**
     * Method for injecting scrollbar module
     * @param axis
     * @param component
     */
    injectTo(axis: Axis, component: Chart): void;
    /**
     * Method to destroy scrollbar
     */
    destroy(): void;
    /**
     * Method to get scrollbar module name
     */
    getModuleName(): string;
    private getArgs;
}
