import { Spreadsheet } from '../base/index';
/**
 * Represents keyboard navigation support for Spreadsheet.
 */
export declare class KeyboardNavigation {
    private parent;
    /**
     * Constructor for the Spreadsheet Keyboard Navigation module.
     * @private
     */
    constructor(parent: Spreadsheet);
    private addEventListener;
    private removeEventListener;
    private keyDownHandler;
    private scrollNavigation;
    private getBottomIdx;
    private getRightIdx;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    destroy(): void;
}
