import { Schedule } from '../base/schedule';
import { VerticalView } from './vertical-view';
/**
 * week view
 */
export declare class Week extends VerticalView {
    viewClass: string;
    /**
     * Constructor for week view
     */
    constructor(parent: Schedule);
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
