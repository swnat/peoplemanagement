import { Column } from '../models/column';
import { IEditCell, IGrid } from '../base/interface';
/**
 * `DatePickerEditCell` is used to handle datepicker cell type editing.
 * @hidden
 */
export declare class DatePickerEditCell implements IEditCell {
    private parent;
    private obj;
    constructor(parent?: IGrid);
    create(args: {
        column: Column;
        value: string;
        type: string;
    }): Element;
    read(element: Element): string | Date;
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        type: string;
        row: HTMLElement;
        requestType: string;
    }): void;
    destroy(): void;
}
