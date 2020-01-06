import { Column } from '../models/column';
import { Row } from '../models/row';
import { IRowRenderer, IGrid } from '../base/interface';
import { CellType } from '../base/enum';
import { ServiceLocator } from '../services/service-locator';
/**
 * RowRenderer class which responsible for building row content.
 * @hidden
 */
export declare class RowRenderer<T> implements IRowRenderer<T> {
    element: Element;
    private cellRenderer;
    private serviceLocator;
    private cellType;
    private isSpan;
    protected parent: IGrid;
    constructor(serviceLocator?: ServiceLocator, cellType?: CellType, parent?: IGrid);
    /**
     * Function to render the row content based on Column[] and data.
     * @param  {Column[]} columns
     * @param  {Object} data?
     * @param  {{[x:string]:Object}} attributes?
     * @param  {string} rowTemplate?
     */
    render(row: Row<T>, columns: Column[], attributes?: {
        [x: string]: Object;
    }, rowTemplate?: string, cloneNode?: Element): Element;
    /**
     * Function to refresh the row content based on Column[] and data.
     * @param  {Column[]} columns
     * @param  {Object} data?
     * @param  {{[x:string]:Object}} attributes?
     * @param  {string} rowTemplate?
     */
    refresh(row: Row<T>, columns: Column[], isChanged: boolean, attributes?: {
        [x: string]: Object;
    }, rowTemplate?: string): void;
    private refreshRow;
    private refreshMergeCells;
    /**
     * Function to check and add alternative row css class.
     * @param  {Element} tr
     * @param  {{[x:string]:Object}} attr
     */
    buildAttributeFromRow(tr: Element, row: Row<T>): void;
}
