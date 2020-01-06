import { IEditCell, IGrid } from '../base/interface';
import { Column } from '../models/column';
/**
 * `BooleanEditCell` is used to handle boolean cell type editing.
 * @hidden
 */
export declare class BooleanEditCell implements IEditCell {
    private parent;
    private obj;
    private editRow;
    private editType;
    private activeClasses;
    constructor(parent?: IGrid);
    create(args: {
        column: Column;
        value: string;
        type: string;
    }): Element;
    read(element: Element): boolean;
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        requestType: string;
        row: Element;
    }): void;
    private checkBoxChange;
    destroy(): void;
}
