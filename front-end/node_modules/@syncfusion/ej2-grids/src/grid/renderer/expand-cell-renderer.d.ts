import { Cell } from '../models/cell';
import { ICellRenderer } from '../base/interface';
import { IndentCellRenderer } from './indent-cell-renderer';
import { Column } from '../models/column';
/**
 * ExpandCellRenderer class which responsible for building group expand cell.
 * @hidden
 */
export declare class ExpandCellRenderer extends IndentCellRenderer implements ICellRenderer<Column> {
    /**
     * Function to render the expand cell
     * @param  {Cell} cell
     * @param  {Object} data
     * @param  {{ [x: string]: string }} attr
     * @param {boolean} isExpand
     */
    render(cell: Cell<Column>, data: {
        field: string;
        key: string;
    }, attr?: {
        [x: string]: string;
    }, isExpand?: boolean): Element;
}
