import { IEditCell, IGrid } from '../base/interface';
import { Column } from '../models/column';
/**
 * `ToggleEditCell` is used to handle boolean cell type editing.
 * @hidden
 */
export declare class ToggleEditCell implements IEditCell {
    private parent;
    private obj;
    private editRow;
    private editType;
    private activeClasses;
    constructor(parentObject?: IGrid);
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
    private switchModeChange;
    destroy(): void;
}
