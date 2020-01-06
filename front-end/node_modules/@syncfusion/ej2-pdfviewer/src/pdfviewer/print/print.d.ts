import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
/**
 * Print module
 */
export declare class Print {
    private pdfViewer;
    private pdfViewerBase;
    private printViewerContainer;
    private printCanvas;
    private printRequestHandler;
    private frameDoc;
    private iframe;
    /**
     * @private
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * Print the PDF document being loaded in the ejPdfViewer control.
     * @returns void
     */
    print(): void;
    private createRequestForPrint;
    private renderFieldsForPrint;
    /**
     * @private
     */
    applyPosition(inputField: any, bounds: any, font: any, heightRatio: number, widthRatio: number): any;
    private printWindowOpen;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
}
