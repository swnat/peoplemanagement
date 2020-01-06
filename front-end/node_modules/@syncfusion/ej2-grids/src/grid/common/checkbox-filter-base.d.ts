import { L10n } from '@syncfusion/ej2-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { IFilterArgs, FilterSearchBeginEventArgs } from '../base/interface';
import { PredicateModel } from '../base/grid-model';
import { ValueFormatter } from '../services/value-formatter';
import { Column } from '../models/column';
import { Dialog } from '@syncfusion/ej2-popups';
import { IXLFilter } from '../common/filter-interface';
/**
 * @hidden
 * `CheckBoxFilterBase` module is used to handle filtering action.
 */
export declare class CheckBoxFilterBase {
    protected sBox: HTMLElement;
    protected isExcel: boolean;
    protected id: string;
    protected colType: string;
    protected fullData: Object[];
    protected filteredData: Object[];
    protected isFiltered: boolean | number;
    protected dlg: Element;
    protected dialogObj: Dialog;
    protected cBox: HTMLElement;
    protected spinner: HTMLElement;
    protected searchBox: Element;
    protected sInput: HTMLInputElement;
    protected sIcon: Element;
    protected options: IFilterArgs;
    protected existingPredicate: {
        [key: string]: PredicateModel[];
    };
    protected foreignKeyData: Object[];
    protected foreignKeyQuery: Query;
    protected filterState: boolean;
    protected values: Object;
    private cBoxTrue;
    private cBoxFalse;
    private itemsCnt;
    private result;
    protected renderEmpty: boolean;
    protected parent: IXLFilter;
    protected localeObj: L10n;
    protected valueFormatter: ValueFormatter;
    private searchHandler;
    /**
     * Constructor for checkbox filtering module
     * @hidden
     */
    constructor(parent?: IXLFilter);
    /**
     * To destroy the filter bar.
     * @return {void}
     * @hidden
     */
    destroy(): void;
    private wireEvents;
    private unWireEvents;
    protected foreignKeyFilter(args: Object, fColl?: Object[], mPredicate?: Predicate): void;
    private foreignFilter;
    private searchBoxClick;
    private searchBoxKeyUp;
    private updateSearchIcon;
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    getLocalizedLabel(key: string): string;
    private updateDataSource;
    protected updateModel(options: IFilterArgs): void;
    protected getAndSetChkElem(options: IFilterArgs): HTMLElement;
    protected showDialog(options: IFilterArgs): void;
    private dialogCreated;
    openDialog(options: IFilterArgs): void;
    closeDialog(): void;
    protected clearFilter(): void;
    private btnClick;
    private fltrBtnHandler;
    private initiateFilter;
    protected isForeignColumn(col: Column): boolean;
    private refreshCheckboxes;
    protected search(args: FilterSearchBeginEventArgs, query: Query): void;
    private getPredicateFromCols;
    protected getQuery(): Query;
    private getAllData;
    private addDistinct;
    private filterEvent;
    private eventPromise;
    getStateEventArgument(query: Query): Object;
    private processDataOperation;
    private dataSuccess;
    private processDataSource;
    private processSearch;
    private updateResult;
    private clickHandler;
    private updateAllCBoxes;
    private dialogOpen;
    private createCheckbox;
    private updateIndeterminatenBtn;
    private createFilterItems;
    private getCheckedState;
    static getDistinct(json: Object[], field: string, column?: Column, foreignKeyData?: Object[]): Object;
    static getPredicate(columns: PredicateModel[]): Predicate;
    private static generatePredicate;
    private static getCaseValue;
    private static updateDateFilter;
}
