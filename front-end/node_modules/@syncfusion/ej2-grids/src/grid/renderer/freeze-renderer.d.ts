import { IGrid, IRenderer, IModelGenerator } from '../base/interface';
import { Column } from '../models/column';
import { HeaderRender } from './header-renderer';
import { ContentRender } from './content-renderer';
import { ServiceLocator } from '../services/service-locator';
/**
 * Freeze module is used to render grid content with frozen rows and columns
 * @hidden
 */
export declare class FreezeContentRender extends ContentRender implements IRenderer {
    private frozenContent;
    private movableContent;
    constructor(parent?: IGrid, locator?: ServiceLocator);
    renderPanel(): void;
    renderEmpty(tbody: HTMLElement): void;
    private setFrozenContent;
    private setMovableContent;
    getFrozenContent(): Element;
    getMovableContent(): Element;
    getModelGenerator(): IModelGenerator<Column>;
    renderTable(): void;
}
export declare class FreezeRender extends HeaderRender implements IRenderer {
    private frozenHeader;
    private movableHeader;
    constructor(parent?: IGrid, locator?: ServiceLocator);
    addEventListener(): void;
    removeEventListener(): void;
    renderTable(): void;
    renderPanel(): void;
    refreshUI(): void;
    private rfshMovable;
    private addMovableFirstCls;
    private refreshFreeze;
    private enableAfterRender;
    private updateResizeHandler;
    private setWrapHeight;
    private setFrozenHeight;
    private refreshStackedHdrHgt;
    private getRowSpan;
    private updateStackedHdrRowHgt;
    private setFrozenHeader;
    private setMovableHeader;
    getFrozenHeader(): Element;
    getMovableHeader(): Element;
    /**
     * @hidden
     */
    updateColgroup(): void;
}
