import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
/**
 * `DropDownEditCell` is used to handle dropdown cell type editing.
 * @hidden
 */
export declare class DropDownEditCell implements IEditCell {
    private parent;
    private obj;
    private column;
    private flag;
    constructor(parent?: IGrid);
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
    private dropdownCreated;
    private ddActionComplete;
    private dropDownOpen;
    destroy(): void;
}
