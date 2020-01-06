import { Query, DataManager } from '@syncfusion/ej2-data';
/**
 * data module is used to generate query and dataSource
 */
var Data = /** @class */ (function () {
    /**
     * Constructor for data module
     * @private
     */
    function Data(dataSource, query) {
        this.initDataManager(dataSource, query);
    }
    /**
     * The function used to initialize dataManager and query
     * @return {void}
     * @private
     */
    Data.prototype.initDataManager = function (dataSource, query) {
        this.dataManager = dataSource instanceof DataManager ? dataSource : new DataManager(dataSource);
        this.query = query instanceof Query ? query : new Query();
    };
    /**
     * The function used to generate updated Query from chart model
     * @return {void}
     * @private
     */
    Data.prototype.generateQuery = function () {
        var query = this.query.clone();
        return query;
    };
    /**
     * The function used to get dataSource by executing given Query
     * @param  {Query} query - A Query that specifies to generate dataSource
     * @return {void}
     * @private
     */
    Data.prototype.getData = function (query) {
        return this.dataManager.executeQuery(query);
    };
    return Data;
}());
export { Data };
