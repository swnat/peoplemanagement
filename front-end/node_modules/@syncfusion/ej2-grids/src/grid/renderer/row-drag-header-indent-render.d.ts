import { Cell } from '../models/cell';
import { ICellRenderer } from '../base/interface';
import { CellRenderer } from './cell-renderer';
import { Column } from '../models/column';
/**
 * DetailHeaderIndentCellRenderer class which responsible for building detail header indent cell.
 * @hidden
 */
export declare class RowDragDropHeaderRenderer extends CellRenderer implements ICellRenderer<Column> {
    element: HTMLElement;
    /**
     * Function to render the detail indent cell
     * @param  {Cell} cell
     * @param  {Object} data
     */
    render(cell: Cell<Column>, data: Object): Element;
}
