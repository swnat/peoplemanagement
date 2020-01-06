import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
/**
 * `ComboBoxEditCell` is used to handle ComboBoxEdit cell type editing.
 * @hidden
 */
export declare class ComboboxEditCell implements IEditCell {
    private parent;
    private obj;
    private column;
    constructor(parentObject?: IGrid);
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
    read(inputEle: Element): string;
    private finalValue;
    destroy(): void;
}
