import { Component, ModuleDeclaration, L10n, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { PagerModel } from './pager-model';
import { PagerDropDown } from './pager-dropdown';
import { NumericContainer } from './numeric-container';
import { PagerMessage } from './pager-message';
import { ExternalMessage } from './external-message';
/** @hidden */
export interface IRender {
    render(): void;
    refresh(): void;
}
/**
 * Represents the `Pager` component.
 * ```html
 * <div id="pager"/>
 * ```
 * ```typescript
 * <script>
 *   var pagerObj = new Pager({ totalRecordsCount: 50, pageSize:10 });
 *   pagerObj.appendTo("#pager");
 * </script>
 * ```
 */
export declare class Pager extends Component<HTMLElement> implements INotifyPropertyChanged {
    /*** @hidden */
    totalPages: number;
    private templateFn;
    /*** @hidden */
    previousPageNo: number;
    private defaultConstants;
    /*** @hidden */
    localeObj: L10n;
    /**
     * `containerModule` is used to manipulate numeric container behavior of Pager.
     */
    containerModule: NumericContainer;
    /**
     * `pagerMessageModule` is used to manipulate pager message of Pager.
     */
    pagerMessageModule: PagerMessage;
    /**
     * `externalMessageModule` is used to manipulate external message of Pager.
     */
    externalMessageModule: ExternalMessage;
    /**
     * @hidden
     * `pagerdropdownModule` is used to manipulate pageSizes of Pager.
     */
    pagerdropdownModule: PagerDropDown;
    /**
     * If `enableQueryString` set to true,
     * then it pass current page information as a query string along with the URL while navigating to other page.
     * @default false
     */
    enableQueryString: boolean;
    /**
     * If `enableExternalMessage` set to true, then it adds the message to Pager.
     * @default false
     */
    enableExternalMessage: boolean;
    /**
     * If `enablePagerMessage` set to true, then it adds the pager information.
     * @default true
     */
    enablePagerMessage: boolean;
    /**
     * Defines the records count of visible page.
     * @default 12
     */
    pageSize: number;
    /**
     * Defines the number of pages to display in pager container.
     * @default 10
     */
    pageCount: number;
    /**
     * Defines the current page number of pager.
     * @default 1
     */
    currentPage: number;
    /**
     * Gets or Sets the total records count which is used to render numeric container.
     * @default null
     */
    totalRecordsCount: number;
    /**
     * Defines the external message of Pager.
     * @default null
     */
    externalMessage: string;
    /**
     * If `pageSizes` set to true or Array of values,
     * It renders DropDownList in the pager which allow us to select pageSize from DropDownList.
     * @default false
     */
    pageSizes: boolean | (number | string)[];
    /**
     *  Defines the template as string or HTML element ID which renders customized elements in pager instead of default elements.
     * @default null
     */
    template: string;
    /**
     * Defines the customized text to append with numeric items.
     * @default null
     */
    customText: string;
    /**
     * Triggers when click on the numeric items.
     * @default null
     */
    click: EmitType<Object>;
    /**
     * Triggers after pageSize is selected in DropDownList.
     * @default null
     */
    dropDownChanged: EmitType<Object>;
    /**
     * Triggers when Pager is created.
     * @default null
     */
    created: EmitType<Object>;
    /**
     * Constructor for creating the component.
     * @hidden
     */
    constructor(options?: PagerModel, element?: string | HTMLElement);
    /**
     * To provide the array of modules needed for component rendering
     * @hidden
     */
    protected requiredModules(): ModuleDeclaration[];
    /**
     * Initialize the event handler
     * @hidden
     */
    protected preRender(): void;
    /**
     * To Initialize the component rendering
     */
    protected render(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     * @hidden
     */
    getPersistData(): string;
    /**
     * To destroy the Pager component.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * Called internally if any of the property value changed.
     * @hidden
     */
    onPropertyChanged(newProp: PagerModel, oldProp: PagerModel): void;
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    getLocalizedLabel(key: string): string;
    /**
     * Navigate to target page by given number.
     * @param  {number} pageNo - Defines page number.
     * @return {void}
     */
    goToPage(pageNo: number): void;
    /**
     * @hidden
     */
    setPageSize(pageSize: number): void;
    private checkpagesizes;
    private checkGoToPage;
    private currentPageChanged;
    private pagerTemplate;
    /** @hidden */
    updateTotalPages(): void;
    /** @hidden */
    getPagerTemplate(): Function;
    private compile;
    /**
     * Refreshes page count, pager information and external message.
     * @return {void}
     */
    refresh(): void;
    private updateRTL;
    private initLocalization;
    private updateQueryString;
    private getUpdatedURL;
    private renderFirstPrevDivForDevice;
    private renderNextLastDivForDevice;
    private addAriaLabel;
}
