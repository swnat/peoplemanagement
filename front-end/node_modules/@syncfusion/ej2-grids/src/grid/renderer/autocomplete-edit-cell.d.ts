import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
/**
 * `AutoCompleteEditCell` is used to handle autocomplete cell type editing.
 * @hidden
 */
export declare class AutoCompleteEditCell implements IEditCell {
    private parentObj;
    private object;
    private column;
    constructor(parent?: IGrid);
    create(args: {
        column: Column;
        values: string;
    }): Element;
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        rowElement: HTMLElement;
        requestType: string;
    }): void;
    read(element: Element): string;
    private selectedValues;
    destroy(): void;
}
