import { CircularGauge } from '../circular-gauge';
import { Axis } from '../axes/axis';
/**
 * Annotation Module handles the Annotation of the axis.
 */
export declare class Annotations {
    private gauge;
    private elementId;
    /**
     * Constructor for Annotation module.
     * @private.
     */
    constructor(gauge: CircularGauge);
    /**
     * Method to render the annotation for circular gauge.
     */
    renderAnnotation(axis: Axis, index: number): void;
    /**
     * Method to create annotation template for circular gauge.
     */
    createTemplate(element: HTMLElement, annotationIndex: number, axisIndex: number): void;
    /**
     * Method to update the annotation location for circular gauge.
     */
    private updateLocation;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the annotation.
     * @return {void}
     * @private
     */
    destroy(gauge: CircularGauge): void;
}
