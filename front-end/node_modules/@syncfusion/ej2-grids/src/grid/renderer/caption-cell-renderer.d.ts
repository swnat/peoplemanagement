import { Column } from '../models/column';
import { Cell } from '../models/cell';
import { ICellRenderer } from '../base/interface';
import { CellRenderer } from './cell-renderer';
import { GroupedData } from '../services/group-model-generator';
/**
 * GroupCaptionCellRenderer class which responsible for building group caption cell.
 * @hidden
 */
export declare class GroupCaptionCellRenderer extends CellRenderer implements ICellRenderer<Column> {
    element: HTMLElement;
    /**
     * Function to render the cell content based on Column object.
     * @param  {Cell} cell
     * @param  {Object} data
     */
    render(cell: Cell<Column>, data: GroupedData): Element;
}
/**
 * GroupCaptionEmptyCellRenderer class which responsible for building group caption empty cell.
 * @hidden
 */
export declare class GroupCaptionEmptyCellRenderer extends CellRenderer implements ICellRenderer<Column> {
    element: HTMLElement;
    /**
     * Function to render the cell content based on Column object.
     * @param  {Cell} cell
     * @param  {Object} data
     */
    render(cell: Cell<Column>, data: {
        field: string;
        key: string;
        count: number;
    }): Element;
}
