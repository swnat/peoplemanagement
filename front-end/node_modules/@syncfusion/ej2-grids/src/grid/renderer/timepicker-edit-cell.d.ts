import { Column } from '../models/column';
import { IEditCell, IGrid } from '../base/interface';
/**
 * `TimePickerEditCell` is used to handle Timepicker cell type editing.
 * @hidden
 */
export declare class TimePickerEditCell implements IEditCell {
    private parent;
    private obj;
    constructor(grid?: IGrid);
    create(args: {
        column: Column;
        value: string;
        type: string;
    }): Element;
    read(element: Element): Date | string;
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
