import { Schedule } from '../base/schedule';
import { VerticalView } from './vertical-view';
/**
 * day view
 */
export declare class Day extends VerticalView {
    viewClass: string;
    /**
     * Constructor for day view
     */
    constructor(parent: Schedule);
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
