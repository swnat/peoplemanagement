/**
 * Represent the common codes for calculate
 */
var CalculateCommon = /** @class */ (function () {
    function CalculateCommon(parent) {
        this.parent = parent;
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    CalculateCommon.prototype.getModuleName = function () {
        return 'calc-common';
    };
    return CalculateCommon;
}());
export { CalculateCommon };
/**
 * To check whether the object is undefined.
 * @param {Object} value - To check the object is undefined
 * @return {boolean}
 * @private
 */
export function isUndefined(value) {
    return ('undefined' === typeof value);
}
