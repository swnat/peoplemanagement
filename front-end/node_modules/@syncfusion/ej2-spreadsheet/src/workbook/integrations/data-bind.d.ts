import { Workbook } from '../base/index';
/**
 * Data binding module
 */
export declare class DataBind {
    private parent;
    constructor(parent: Workbook);
    private addEventListener;
    /**
     * Destroys the Data binding module.
     * @return {void}
     */
    destroy(): void;
    private removeEventListener;
    /**
     * Update given data source to sheet.
     */
    private updateSheetFromDataSourceHandler;
    private getCellDataFromProp;
    private checkDataForFormat;
    private getLoadedInfo;
    private getMaxCount;
    private initRangeInfo;
    /**
     * Remove old data from sheet.
     */
    private dataSourceChangedHandler;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
}
