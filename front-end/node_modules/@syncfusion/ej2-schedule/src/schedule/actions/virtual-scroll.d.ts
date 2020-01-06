import { TdData } from '../base/interface';
import { Schedule } from '../base/schedule';
/**
 * Virtual Scroll
 */
export declare class VirtualScroll {
    private parent;
    private translateY;
    private itemSize;
    private bufferCount;
    private renderedLength;
    private averageRowHeight;
    constructor(parent: Schedule);
    private addEventListener;
    private removeEventListener;
    getRenderedCount(): number;
    renderVirtualTrack(contentWrap: Element): void;
    updateVirtualScrollHeight(): void;
    updateVirtualTrackHeight(wrap: HTMLElement): void;
    setItemSize(): void;
    private virtualScrolling;
    private upScroll;
    private downScroll;
    updateContent(resWrap: HTMLElement, conWrap: HTMLElement, eventWrap: HTMLElement, resCollection: TdData[]): void;
    private getBufferCollection;
    private setTranslate;
    destroy(): void;
}
