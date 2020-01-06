import { IGrid } from '../base/interface';
/**
 * Edit render module is used to render grid edit row.
 * @hidden
 */
export declare class InlineEditRender {
    private parent;
    private isEdit;
    /**
     * Constructor for render module
     */
    constructor(parent?: IGrid);
    addNew(elements: Object, args: {
        row?: Element;
        rowData?: Object;
    }): void;
    private renderMovableform;
    private updateFreezeEdit;
    private getFreezeRow;
    update(elements: Object, args: {
        row?: Element;
        rowData?: Object;
    }): void;
    private refreshFreezeEdit;
    private updateFrozenCont;
    private renderMovable;
    private getEditElement;
    removeEventListener(): void;
    private appendChildren;
}
