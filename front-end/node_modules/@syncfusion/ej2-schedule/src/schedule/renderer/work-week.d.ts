import { Schedule } from '../base/schedule';
import { VerticalView } from './vertical-view';
/**
 * work week view
 */
export declare class WorkWeek extends VerticalView {
    viewClass: string;
    /**
     * Constructor for work week view
     */
    constructor(par: Schedule);
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
