import { Maps, Annotation } from '../index';
/**
 * Represent the annotation rendering for map
 */
export declare class Annotations {
    private map;
    constructor(map: Maps);
    renderAnnotationElements(): void;
    /**
     * To create annotation elements
     */
    createAnnotationTemplate(parentElement: HTMLElement, annotation: Annotation, annotationIndex: number): void;
    protected getModuleName(): string;
    /**
     * To destroy the annotation.
     * @return {void}
     * @private
     */
    destroy(map: Maps): void;
}
