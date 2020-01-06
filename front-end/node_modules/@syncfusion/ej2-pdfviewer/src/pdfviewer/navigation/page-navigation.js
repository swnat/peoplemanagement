/**
 * Navigation module
 */
var Navigation = /** @class */ (function () {
    /**
     * @private
     */
    function Navigation(viewer, viewerBase) {
        this.pdfViewer = viewer;
        this.pdfViewerBase = viewerBase;
    }
    /**
     * Navigate to Next page of the PDF document
     * @returns void
     */
    Navigation.prototype.goToNextPage = function () {
        this.pageNumber = this.pdfViewerBase.currentPageNumber;
        this.pageNumber++;
        if (this.pageNumber <= this.pdfViewerBase.pageCount) {
            this.pdfViewerBase.updateScrollTop(this.pageNumber - 1);
        }
    };
    /**
     * Navigate to Previous page of the PDF document
     * @returns void
     */
    Navigation.prototype.goToPreviousPage = function () {
        this.pageNumber = this.pdfViewerBase.currentPageNumber;
        this.pageNumber--;
        if (this.pageNumber > 0) {
            this.pdfViewerBase.updateScrollTop(this.pageNumber - 1);
        }
    };
    /**
     * Navigate to given Page number
     * Note : In case if we have provided incorrect page number as argument it will retain the existing page
     * @param  {number} pageNumber - Defines the page number to navigate
     * @returns void
     */
    Navigation.prototype.goToPage = function (pageNumber) {
        if (pageNumber > 0 && pageNumber <= this.pdfViewerBase.pageCount && this.pdfViewerBase.currentPageNumber !== pageNumber) {
            this.pdfViewerBase.updateScrollTop(pageNumber - 1);
        }
    };
    /**
     * Navigate to First page of the PDF document
     * @returns void
     */
    Navigation.prototype.goToFirstPage = function () {
        this.pageNumber = 0;
        this.pdfViewerBase.updateScrollTop(this.pageNumber);
    };
    /**
     * Navigate to Last page of the PDF document
     * @returns void
     */
    Navigation.prototype.goToLastPage = function () {
        this.pageNumber = this.pdfViewerBase.pageCount - 1;
        this.pdfViewerBase.updateScrollTop(this.pageNumber);
    };
    /**
     * @private
     */
    Navigation.prototype.destroy = function () {
        this.pageNumber = 0;
    };
    /**
     * @private
     */
    Navigation.prototype.getModuleName = function () {
        return 'Navigation';
    };
    return Navigation;
}());
export { Navigation };
