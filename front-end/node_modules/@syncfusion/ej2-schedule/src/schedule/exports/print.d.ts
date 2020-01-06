import { Schedule } from '../base/schedule';
/**
 * Print Module
 */
export declare class Print {
    private parent;
    constructor(parent: Schedule);
    printScheduler(): void;
    private getScrollableElement;
    private print;
    private scrolledScheduler;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    destroy(): void;
}
