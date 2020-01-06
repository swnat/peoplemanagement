import { TreeGrid } from '..';
import { QueryCellInfoEventArgs, RowDataBoundEventArgs } from '@syncfusion/ej2-grids';
/**
 * TreeGrid render module
 * @hidden
 */
export declare class Render {
    private parent;
    private templateResult;
    /**
     * Constructor for render module
     */
    constructor(parent?: TreeGrid);
    /**
     * Updated row elements for TreeGrid
     */
    RowModifier(args: RowDataBoundEventArgs): void;
    /**
     * cell renderer for tree column index cell
     */
    cellRender(args: QueryCellInfoEventArgs): void;
    private updateTreeCell;
    private columnTemplateResult;
    destroy(): void;
}
