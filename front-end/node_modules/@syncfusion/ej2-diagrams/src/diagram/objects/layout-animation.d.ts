import { Diagram } from '../diagram';
import { Node } from '../objects/node';
import { ILayout } from '../layout/layout-base';
import { NodeModel } from '../objects/node-model';
/**
 * Layout Animation function to enable or disable layout animation
 */
export declare class LayoutAnimation {
    private protectChange;
    /**
     * Layout expand function for animation of expand and collapse
     */
    expand(animation: boolean, objects: ILayout, node: Node, diagram: Diagram): void;
    /**
     * Setinterval and Clear interval for layout animation
     */
    /** @private */
    layoutAnimation(objValue: ILayout, layoutTimer: Object, stop: boolean, diagram: Diagram, node?: NodeModel): void;
    /**
     * update the node opacity for the node and connector once the layout animation starts
     */
    updateOpacity(source: Node, value: number, diagram: Diagram): void;
    /**
     * To destroy the  LayoutAnimate module
     * @return {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
