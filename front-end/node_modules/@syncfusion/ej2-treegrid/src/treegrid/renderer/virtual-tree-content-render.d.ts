import { Column, NotifyArgs, SentinelType } from '@syncfusion/ej2-grids';
import { Offsets, ServiceLocator, IGrid, IModelGenerator } from '@syncfusion/ej2-grids';
import { VirtualContentRenderer } from '@syncfusion/ej2-grids';
import { InterSectionObserver } from '@syncfusion/ej2-grids';
/**
 * Content renderer for TreeGrid
 */
export declare class VirtualTreeContentRenderer extends VirtualContentRenderer {
    getModelGenerator(): IModelGenerator<Column>;
    constructor(parent: IGrid, locator?: ServiceLocator);
    private isExpandCollapse;
    private observers;
    private translateY;
    private maxiPage;
    private startIndex;
    private endIndex;
    private totalRecords;
    private contents;
    getRowByIndex(index: number): Element;
    addEventListener(): void;
    private virtualOtherAction;
    private indexModifier;
    eventListener(action: string): void;
    protected onDataReady(e?: NotifyArgs): void;
    renderTable(): void;
    scrollListeners(scrollArgs: ScrollArg): void;
    appendContent(target: HTMLElement, newChild: DocumentFragment, e: NotifyArgs): void;
}
export declare class TreeInterSectionObserver extends InterSectionObserver {
    private isWheeling;
    private newPos;
    private lastPos;
    private timer;
    observes(callback: Function): void;
    private clear;
    private virtualScrollHandlers;
}
declare type ScrollArg = {
    direction: string;
    isWheel: boolean;
    sentinel: SentinelType;
    offset: Offsets;
    focusElement: HTMLElement;
};
export {};
