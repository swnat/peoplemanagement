import { IGrid } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * Edit render module is used to render grid edit row.
 * @hidden
 */
export declare class EditRender {
    private editType;
    protected parent: IGrid;
    private renderer;
    protected serviceLocator: ServiceLocator;
    private focus;
    /**
     * Constructor for render module
     */
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    addNew(args: Object): void;
    update(args: Object): void;
    private convertWidget;
    private focusElement;
    private getEditElements;
    destroy(): void;
}
