import { Schedule } from '../base/schedule';
import { Year } from './year';
/**
 * timeline year view
 */
export declare class TimelineYear extends Year {
    viewClass: string;
    isInverseTableSelect: boolean;
    /**
     * Constructor for timeline year view
     */
    constructor(parent: Schedule);
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    renderHeader(headerWrapper: HTMLElement): void;
    renderContent(contentWrapper: HTMLElement): void;
}
