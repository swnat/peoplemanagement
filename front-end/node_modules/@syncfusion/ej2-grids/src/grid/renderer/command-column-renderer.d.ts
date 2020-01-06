import { Column } from '../models/column';
import { Cell } from '../models/cell';
import { ServiceLocator } from '../services/service-locator';
import { IGrid, ICellRenderer } from '../base/interface';
import { CellRenderer } from './cell-renderer';
/**
 * `CommandColumn` used to render command column in grid
 * @hidden
 */
export declare class CommandColumnRenderer extends CellRenderer implements ICellRenderer<Column> {
    private buttonElement;
    private unbounDiv;
    element: HTMLElement;
    constructor(parent: IGrid, locator?: ServiceLocator);
    /**
     * Function to render the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {{[x:string]:Object}} attributes?
     * @param  {Element}
     */
    render(cell: Cell<Column>, data: Object, attributes?: {
        [x: string]: Object;
    }): Element;
    private renderButton;
}
