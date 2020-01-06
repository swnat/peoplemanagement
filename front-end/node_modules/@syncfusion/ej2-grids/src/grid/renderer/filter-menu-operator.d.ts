import { Column } from '../models/column';
import { FilterSettings } from '../base/grid';
import { IGrid } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * `filter operators` render boolean column.
 * @hidden
 */
export declare class FlMenuOptrUI {
    private parent;
    private customFilterOperators;
    private serviceLocator;
    private filterSettings;
    private dropOptr;
    private customOptr;
    private optrData;
    private dialogObj;
    constructor(parent?: IGrid, customFltrOperators?: Object, serviceLocator?: ServiceLocator, filterSettings?: FilterSettings);
    /**
     * @hidden
     */
    renderOperatorUI(dlgConetntEle: Element, target: Element, column: Column, dlgObj: Dialog): void;
    private dropDownOpen;
    private dropSelectedVal;
    /**
     * @hidden
     */
    getFlOperator(): string;
}
