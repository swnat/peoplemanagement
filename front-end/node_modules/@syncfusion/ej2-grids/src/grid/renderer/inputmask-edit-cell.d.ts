import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
/**
 * `MaskedTextBoxCellEdit` is used to handle masked input cell type editing.
 * @hidden
 */
export declare class MaskedTextBoxCellEdit implements IEditCell {
    private parent;
    private obj;
    private column;
    constructor(parentInstance?: IGrid);
    create(args: {
        column: Column;
        value: string;
    }): Element;
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        row: HTMLElement;
        requestType: string;
    }): void;
    read(element: Element): string;
    destroy(): void;
}
