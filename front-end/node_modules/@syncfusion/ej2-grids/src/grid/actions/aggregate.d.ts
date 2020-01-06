import { IAction, IGrid, NotifyArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { AggregateRowModel } from '../models/models';
/**
 * Summary Action controller.
 */
export declare class Aggregate implements IAction {
    private parent;
    private locator;
    private footerRenderer;
    constructor(parent: IGrid, locator?: ServiceLocator);
    getModuleName(): string;
    private initiateRender;
    /**
     * @hidden
     */
    prepareSummaryInfo(): void;
    private getFormatFromType;
    onPropertyChanged(e: NotifyArgs): void;
    addEventListener(): void;
    removeEventListener(): void;
    destroy(): void;
    refresh(data: Object): void;
}
/**
 * @private
 */
export declare function summaryIterator(aggregates: AggregateRowModel[], callback: Function): void;
