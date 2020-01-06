import { PageLayoutViewer } from './viewer';
import { Page } from './viewer/page';
/**
 * Print class
 */
export declare class Print {
    /**
     * Gets module name.
     */
    private getModuleName;
    /**
     * Prints the current viewer
     * @param viewer
     * @param printWindow
     * @private
     */
    print(viewer: PageLayoutViewer, printWindow?: Window): void;
    /**
     * Opens print window and displays current page to print.
     * @private
     */
    printWindow(viewer: PageLayoutViewer, browserUserAgent: string, printWindow?: Window): void;
    /**
     * Generates print content.
     * @private
     */
    generatePrintContent(viewer: PageLayoutViewer, element: HTMLDivElement): void;
    /**
     * Gets page width.
     * @param pages
     * @private
     */
    getPageWidth(pages: Page[]): number;
    /**
     *  Gets page height.
     * @private
     */
    getPageHeight(pages: Page[]): number;
    /**
     * @private
     */
    destroy(): void;
}
