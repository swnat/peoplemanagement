import { IGrid, ExcelExportProperties } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * @hidden
 * `ExcelExport` module is used to handle the Excel export action.
 */
export declare class ExcelExport {
    private parent;
    private isExporting;
    private theme;
    private book;
    private workSheet;
    private rows;
    private columns;
    private styles;
    private data;
    private rowLength;
    private footer;
    private expType;
    private includeHiddenColumn;
    private isCsvExport;
    private isBlob;
    private blobPromise;
    private exportValueFormatter;
    private isElementIdChanged;
    private helper;
    private foreignKeyData;
    private groupedColLength;
    private globalResolve;
    private gridPool;
    private locator;
    private l10n;
    /**
     * Constructor for the Grid Excel Export module.
     * @hidden
     */
    constructor(parent?: IGrid, locator?: ServiceLocator);
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
    private init;
    /**
     * Export Grid to Excel file.
     * @param  {exportProperties} exportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Defines is multiple Grid's are exported.
     * @param  {workbook} workbook - Defined the Workbook if multiple Grid is exported.
     * @param  {isCsv} isCsv - true if export to CSV.
     * @return {Promise<any>}
     */
    Map(grid: IGrid, exportProperties: ExcelExportProperties, isMultipleExport: boolean, workbook: any, isCsv: boolean, isBlob: boolean): Promise<any>;
    private exportingSuccess;
    private processRecords;
    private processInnerRecords;
    private organiseRows;
    private processGridExport;
    private processRecordContent;
    private processGroupedRows;
    private processRecordRows;
    private childGridCell;
    private processAggregates;
    private fillAggregates;
    private aggregateStyle;
    private getAggreateValue;
    private mergeOptions;
    private getColumnStyle;
    private processHeaderContent;
    private getHeaderThemeStyle;
    private updateThemeStyle;
    private getCaptionThemeStyle;
    private getRecordThemeStyle;
    private processExcelHeader;
    private updatedCellIndex;
    private processExcelFooter;
    private getIndex;
    private parseStyles;
    /**
     * To destroy the excel export
     * @return {void}
     * @hidden
     */
    destroy(): void;
}
