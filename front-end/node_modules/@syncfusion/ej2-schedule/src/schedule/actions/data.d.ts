import { Query, DataManager } from '@syncfusion/ej2-data';
/**
 * data module is used to generate query and data source.
 * @hidden
 */
export declare class Data {
    dataManager: DataManager;
    private query;
    /**
     * Constructor for data module
     * @private
     */
    constructor(dataSource?: Object | DataManager, query?: Query);
    /**
     * The function used to initialize dataManager and query
     * @return {void}
     * @private
     */
    initDataManager(dataSource: Object | DataManager, query: Query): void;
    /**
     * The function used to generate updated Query from schedule model
     * @return {void}
     * @private
     */
    generateQuery(startDate?: Date, endDate?: Date): Query;
    /**
     * The function used to get dataSource by executing given Query
     * @param  {Query} query - A Query that specifies to generate dataSource
     * @return {void}
     * @private
     */
    getData(query: Query): Promise<Object>;
}
