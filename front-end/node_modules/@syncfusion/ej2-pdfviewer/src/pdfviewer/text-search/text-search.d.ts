import { PdfViewer, PdfViewerBase } from '../index';
/**
 * TextSearch module
 */
export declare class TextSearch {
    /**
     * @private
     */
    isTextSearch: boolean;
    /**
     * @private
     */
    searchBtn: HTMLElement;
    /**
     * @private
     */
    searchInput: HTMLElement;
    private pdfViewer;
    private pdfViewerBase;
    private searchBox;
    private nextSearchBtn;
    private prevSearchBtn;
    private checkBox;
    private searchIndex;
    private currentSearchIndex;
    private searchPageIndex;
    private searchString;
    private isMatchCase;
    private searchRequestHandler;
    private textContents;
    private searchMatches;
    private searchCollection;
    private searchedPages;
    private isPrevSearch;
    private tempElementStorage;
    /**
     * @private
     */
    isMessagePopupOpened: boolean;
    /**
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     */
    createTextSearchBox(): void;
    /**
     * @private
     */
    textSearchBoxOnResize(): void;
    /**
     * @private
     */
    showSearchBox(isShow: boolean): void;
    /**
     * @private
     */
    searchAfterSelection(): void;
    private initiateTextSearch;
    /**
     * @private
     */
    initiateSearch(inputString: string): void;
    private textSearch;
    private nextSearch;
    private prevSearch;
    private initSearch;
    private getPossibleMatches;
    private getSearchPage;
    private highlightSearchedTexts;
    private addDivForSearch;
    private addDivElement;
    private createSearchTextDiv;
    private isClassAvailable;
    private getScrollElement;
    private scrollToSearchStr;
    /**
     * @private
     */
    resizeSearchElements(pageIndex: number): void;
    /**
     * @private
     */
    highlightOtherOccurrences(pageNumber: number): void;
    private highlightOthers;
    /**
     * @private
     */
    clearAllOccurrences(): void;
    /**
     * @private
     */
    getIndexes(): any;
    private applyTextSelection;
    /**
     * @private
     */
    resetTextSearch(): void;
    private onTextSearchClose;
    private createRequestForSearch;
    private createSearchBoxButtons;
    private enablePrevButton;
    private enableNextButton;
    private checkBoxOnChange;
    /**
     * @private
     */
    resetVariables(): void;
    private searchKeypressHandler;
    private searchClickHandler;
    /**
     * @private
     */
    searchButtonClick(element: HTMLElement, inputElement: HTMLElement): void;
    private updateSearchInputIcon;
    private nextButtonOnClick;
    private prevButtonOnClick;
    private onMessageBoxOpen;
    /**
     * Searches the target text in the PDF document and highlights the occurrences in the pages
     * @param  {string} searchText - Specifies the searchText content
     * @param  {boolean} isMatchCase - If set true , its highlights the MatchCase content
     * @returns void
     */
    searchText(searchText: string, isMatchCase: boolean): void;
    /**
     * Searches the next occurrence of the searched text from the current occurrence of the PdfViewer.
     * @returns void
     */
    searchNext(): void;
    /**
     * Searches the previous occurrence of the searched text from the current occurrence of the PdfViewer.
     * @returns void
     */
    searchPrevious(): void;
    /**
     * Cancels the text search of the PdfViewer.
     * @returns void
     */
    cancelTextSearch(): void;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
}
