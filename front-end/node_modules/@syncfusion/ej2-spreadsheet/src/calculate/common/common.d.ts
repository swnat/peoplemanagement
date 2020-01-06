import { Calculate } from '../base';
/**
 * Represent the common codes for calculate
 */
export declare class CalculateCommon {
    private parent;
    constructor(parent: Calculate);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
}
/**
 * To check whether the object is undefined.
 * @param {Object} value - To check the object is undefined
 * @return {boolean}
 * @private
 */
export declare function isUndefined(value: Object): boolean;
