import { ChartLocation } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { SelectionMode } from '../utils/enum';
import { Chart } from '../chart';
import { Points } from '../series/chart-series';
import { Indexes } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * `Selection` module handles the selection for chart.
 * @private
 */
export declare class Selection extends BaseSelection {
    private renderer;
    private isSeriesMode;
    private isdrawRect;
    private resizing;
    /** @private */
    rectPoints: Rect;
    private closeIconId;
    private closeIcon;
    private draggedRectGroup;
    private multiRectGroup;
    private draggedRect;
    private lassoPath;
    /** @private */
    selectedDataIndexes: Indexes[];
    multiDataIndexes: Points[][];
    pathIndex: number;
    seriesIndex: number;
    private series;
    private dragging;
    private count;
    private isMultiDrag;
    private targetIndex;
    private dragRect;
    private dragRectArray;
    filterArray: Rect[];
    private totalSelectedPoints;
    private rectGrabbing;
    private path;
    private resizeMode;
    private chart;
    /**
     * Constructor for selection module.
     * @private.
     */
    constructor(chart: Chart);
    /**
     * Binding events for selection module.
     */
    private addEventListener;
    /**
     * Chart mouse down
     */
    private mousedown;
    /**
     * UnBinding events for selection module.
     */
    private removeEventListener;
    /**
     * To find private variable values
     */
    private initPrivateVariables;
    /**
     * Method to select the point and series.
     * @return {void}
     */
    invokeSelection(chart: Chart): void;
    private generateStyle;
    private selectDataIndex;
    private getElementByIndex;
    private getClusterElements;
    private findElements;
    /**
     * To find the selected element.
     * @return {void}
     * @private
     */
    calculateSelectedElements(event: Event): void;
    private performSelection;
    private selectionComplete;
    private selection;
    private clusterSelection;
    private removeMultiSelectEelments;
    private blurEffect;
    private checkSelectionElements;
    private applyStyles;
    private getSelectionClass;
    private removeStyles;
    private addOrRemoveIndex;
    private toEquals;
    /**
     * To redraw the selected points.
     * @return {void}
     * @private
     */
    redrawSelection(chart: Chart, oldMode: SelectionMode): void;
    /** @private */
    legendSelection(chart: Chart, series: number): void;
    private getSeriesElements;
    private indexFinder;
    /**
     * Drag selection that returns the selected data.
     * @return {void}
     * @private
     */
    calculateDragSelectedElements(chart: Chart, dragRect: Rect, isClose?: boolean): void;
    private removeOffset;
    private isPointSelect;
    /**
     * Method to draw dragging rect.
     * @return {void}
     * @private
     */
    drawDraggingRect(chart: Chart, dragRect: Rect, target?: Element): void;
    /**
     * To get drag selected group element index from its id
     * @param id
     */
    private getIndex;
    private createCloseButton;
    /**
     * Method to remove dragged element.
     * @return {void}
     * @private
     */
    removeDraggedElements(chart: Chart, event: Event): void;
    /**
     * Method to resize the drag rect.
     * @return {void}
     * @private
     */
    resizingSelectionRect(chart: Chart, location: ChartLocation, tapped?: boolean, target?: Element): void;
    private findResizeMode;
    private changeCursorStyle;
    private removeSelectedElements;
    private setAttributes;
    /**
     * Method to move the dragged rect.
     * @return {void}
     * @private
     */
    draggedRectMoved(chart: Chart, grabbedPoint: Rect, doDrawing?: boolean, target?: Element): void;
    /**
     * To complete the selection.
     * @return {void}
     * @private
     */
    completeSelection(e: Event): void;
    private getDragRect;
    /** @private */
    dragStart(chart: Chart, seriesClipRect: Rect, mouseDownX: number, mouseDownY: number, event: Event): void;
    private isDragRect;
    /** @private */
    mouseMove(event: PointerEvent | TouchEvent): void;
    private getPath;
    private pointChecking;
    /**
     * Get module name.
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the selection.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
