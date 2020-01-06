import { TreeGrid } from '../base/treegrid';
import { QueryOptions } from '@syncfusion/ej2-data';
/**
 * TreeGrid Aggregate module
 * @hidden
 */
export declare class Aggregate {
    private parent;
    private flatChildRecords;
    private summaryQuery;
    /**
     * Constructor for Aggregate module
     */
    constructor(parent?: TreeGrid);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    private getModuleName;
    removeEventListener(): void;
    /**
     * Function to calculate summary values
     *  @hidden
     */
    calculateSummaryValue(summaryQuery: QueryOptions[], filteredData: Object[], isSort: boolean): Object[];
    private getChildRecordsLength;
    private createSummaryItem;
    private getSummaryValues;
    private getFormatFromType;
    /**
     * To destroy the Aggregate module
     * @return {void}
     * @hidden
     */
    destroy(): void;
}
