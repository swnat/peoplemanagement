import { DiagramElement } from './diagram-element';
import { AnnotationConstraints } from '../../enum/enum';
/**
 * HTMLElement defines the basic html elements
 */
export declare class DiagramHtmlElement extends DiagramElement {
    /**
     * set the id for each element
     */
    constructor(nodeId: string, diagramId: string, annotationId?: string);
    private data;
    /**
     * Gets the node id for the element
     */
    nodeId: string;
    /**
     * defines the id of the annotation on rendering template on label.
     * @private
     */
    annotationId: string;
    /**
     * defines the constraints of the annotation on rendering template on label.
     * @private
     */
    constraints: AnnotationConstraints;
    /**
     * Gets the diagram id for the html element
     */
    diagramId: string;
    /**
     * Gets or sets the geometry of the html element
     */
    /**
    * Gets or sets the value of the html element
    */
    content: string | HTMLElement;
    /**
     * defines geometry of the html element
     * @private
     */
    template: HTMLElement;
}
