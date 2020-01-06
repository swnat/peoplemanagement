import { INode, Layout } from './layout-base';
import { PointModel } from '../primitives/point-model';
/**
 * Connects diagram objects with layout algorithm
 */
export declare class ComplexHierarchicalTree {
    /**
     * Constructor for the hierarchical tree layout module
     * @private
     */
    constructor();
    /**
     * To destroy the hierarchical tree module
     * @return {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**   @private  */
    doLayout(nodes: INode[], nameTable: {}, layout: Layout, viewPort: PointModel): void;
    getLayoutNodesCollection(nodes: INode[]): INode[];
}
/**
 * Defines the properties of layout
 * @private
 */
export interface LayoutProp {
    orientation?: string;
    horizontalSpacing?: number;
    verticalSpacing?: number;
    marginX: number;
    marginY: number;
}
