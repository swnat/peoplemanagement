import { Diagram } from '../diagram';
import { NodeModel, UmlClassModel } from '../objects/node-model';
import { DiagramElement } from '../core/elements/diagram-element';
import { TextStyleModel } from '../core/appearance-model';
import { TextWrap } from '../enum/enum';
import { Node } from '../objects/node';
/**
 * These utility methods help to process the data and to convert it to desired dimensions
 */
/** @private */
export declare function getULMClassifierShapes(content: DiagramElement, node: NodeModel, diagram: Diagram): DiagramElement;
/** @private */
export declare function getClassNodes(node: Node, diagram: Diagram, classifier: UmlClassModel, textWrap: TextWrap): void;
/** @private */
export declare function getClassMembers(node: Node, diagram: Diagram, classifier: UmlClassModel, textWrap: TextWrap): void;
/** @private */
export declare function addSeparator(stack: Node, diagram: Diagram): void;
/** @private */
export declare function getStyle(stack: Node, node: UmlClassModel): TextStyleModel;
