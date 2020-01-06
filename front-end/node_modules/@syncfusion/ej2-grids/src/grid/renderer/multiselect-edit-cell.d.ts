import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
/**
 * `MultiSelectEditCell` is used to handle multiselect dropdown cell type editing.
 * @hidden
 */
export declare class MultiSelectEditCell implements IEditCell {
    private parent;
    private obj;
    private column;
    constructor(parentObj?: IGrid);
    create(args: {
        column: Column;
        value: string;
    }): Element;
    read(element: Element): string;
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        row: HTMLElement;
        requestType: string;
    }): void;
    destroy(): void;
}
