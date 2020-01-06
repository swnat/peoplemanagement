import { L10n } from '@syncfusion/ej2-base';
import { Column } from '../models/column';
import { Cell } from '../models/cell';
import { ICellRenderer, IValueFormatter, IGrid } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * CellRenderer class which responsible for building cell content.
 * @hidden
 */
export declare class CellRenderer implements ICellRenderer<Column> {
    element: HTMLElement;
    private rowChkBox;
    protected localizer: L10n;
    protected formatter: IValueFormatter;
    protected parent: IGrid;
    constructor(parent: IGrid, locator?: ServiceLocator);
    /**
     * Function to return the wrapper for the TD content
     * @returns string
     */
    getGui(): string | Element;
    /**
     * Function to format the cell value.
     * @param  {Column} column
     * @param  {Object} value
     * @param  {Object} data
     */
    format(column: Column, value: Object, data?: Object): string;
    evaluate(node: Element, cell: Cell<Column>, data: Object, attributes?: Object, fData?: Object, isEdit?: boolean): boolean;
    /**
     * Function to invoke the custom formatter available in the column object.
     * @param  {Column} column
     * @param  {Object} value
     * @param  {Object} data
     */
    invokeFormatter(column: Column, value: Object, data: Object): Object;
    /**
     * Function to render the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {{[x:string]:Object}} attributes?
     * @param  {Element}
     */
    render(cell: Cell<Column>, data: Object, attributes?: {
        [x: string]: Object;
    }, isExpand?: boolean, isEdit?: boolean): Element;
    /**
     * Function to refresh the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {{[x:string]:Object}} attributes?
     * @param  {Element}
     */
    refreshTD(td: Element, cell: Cell<Column>, data: Object, attributes?: {
        [x: string]: Object;
    }): void;
    private refreshCell;
    /**
     * Function to specifies how the result content to be placed in the cell.
     * @param  {Element} node
     * @param  {string|Element} innerHtml
     * @returns Element
     */
    appendHtml(node: Element, innerHtml: string | Element, property?: string): Element;
    /**
     * @hidden
     */
    setAttributes(node: HTMLElement, cell: Cell<Column>, attributes?: {
        [x: string]: Object;
    }): void;
    buildAttributeFromCell<Column>(node: HTMLElement, cell: Cell<Column>, isCheckBoxType?: boolean): void;
    getValue(field: string, data: Object, column: Column): Object;
}
