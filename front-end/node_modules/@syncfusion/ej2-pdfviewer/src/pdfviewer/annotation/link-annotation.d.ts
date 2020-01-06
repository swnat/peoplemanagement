import { PdfViewer, PdfViewerBase } from '../index';
/**
 * The `LinkAnnotation` module is used to handle link annotation actions of PDF viewer.
 * @hidden
 */
export declare class LinkAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @private
     */
    renderHyperlinkContent(data: any, pageIndex: number): void;
    private renderWebLink;
    private triggerHyperlinkEvent;
    private renderDocumentLink;
    private setHyperlinkProperties;
    /**
     * @private
     */
    modifyZindexForTextSelection(pageNumber: number, isAdd: boolean): void;
    /**
     * @private
     */
    modifyZindexForHyperlink(element: HTMLElement, isAdd: boolean): void;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
}
