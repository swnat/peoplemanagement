import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
/**
 * `DefaultEditCell` is used to handle default cell type editing.
 * @hidden
 */
export declare class DefaultEditCell implements IEditCell {
    private parent;
    constructor(parent?: IGrid);
    create(args: {
        column: Column;
        value: string;
        requestType: string;
    }): Element;
    read(element: Element): string;
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        requestType: string;
    }): void;
}
