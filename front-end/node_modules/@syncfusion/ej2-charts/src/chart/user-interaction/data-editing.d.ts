import { Chart } from '../chart';
/**
 * `DataEditing` module handles data editing
 */
export declare class DataEditing {
    private chart;
    private seriesIndex;
    private pointIndex;
    /**
     * @private
     * It is used to identify point is dragging for data editing in other modules.
     */
    isPointDragging: boolean;
    /**
     * Constructor for DataEditing module.
     * @private.
     */
    constructor(chart: Chart);
    /**
     * Point drag start here
     */
    pointMouseDown(): void;
    /**
     * Point dragging
     */
    pointMouseMove(event: PointerEvent | TouchEvent): void;
    /**
     * Get cursor style
     */
    private getCursorStyle;
    /**
     * Dragging calculation
     */
    private pointDragging;
    /**
     * Point drag ends here
     */
    pointMouseUp(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the DataEditing.
     * @return {void}
     * @private
     */
    destroy(chart: Chart): void;
}
