import { PdfViewer, PdfViewerBase, AnnotationToolbar } from '../index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ToolbarItem } from '../base/types';
/**
 * Toolbar module
 */
export declare class Toolbar {
    private toolbar;
    private pdfViewer;
    private pdfViewerBase;
    private currentPageBox;
    private zoomDropDown;
    private currentPageBoxElement;
    /**
     * @private
     */
    uploadedDocumentName: string;
    private toolbarElement;
    private itemsContainer;
    private openDocumentItem;
    private firstPageItem;
    private previousPageItem;
    private nextPageItem;
    private lastPageItem;
    private zoomInItem;
    private zoomOutItem;
    private totalPageItem;
    private downloadItem;
    private zoomDropdownItem;
    private fileInputElement;
    private textSelectItem;
    private panItem;
    private printItem;
    private textSearchItem;
    private undoItem;
    private redoItem;
    private commentItem;
    /**
     * @private
     */
    annotationItem: HTMLElement;
    private moreOptionItem;
    /**
     * @private
     */
    annotationToolbarModule: AnnotationToolbar;
    /**
     * @private
     */
    moreDropDown: DropDownButton;
    private isPageNavigationToolDisabled;
    private isMagnificationToolDisabled;
    private isSelectionToolDisabled;
    private isScrollingToolDisabled;
    private isOpenBtnVisible;
    private isNavigationToolVisible;
    private isMagnificationToolVisible;
    private isSelectionBtnVisible;
    private isScrollingBtnVisible;
    private isDownloadBtnVisible;
    private isPrintBtnVisible;
    private isSearchBtnVisible;
    private isTextSearchBoxDisplayed;
    private isUndoRedoBtnsVisible;
    private isAnnotationEditBtnVisible;
    private isCommentBtnVisible;
    /**
     * @private
     */
    isCommentIconAdded: boolean;
    /**
     * @private
     */
    isAddComment: boolean;
    /**
     * @private
     */
    constructor(viewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @private
     */
    intializeToolbar(width: string): HTMLElement;
    /**
     * Shows /hides the toolbar in the PdfViewer
     * @param  {boolean} enableToolbar - If set true , its show the Toolbar
     * @returns void
     */
    showToolbar(enableToolbar: boolean): void;
    /**
     * Shows/hides the Navigation toolbar in the PdfViewer
     * @param  {boolean} enableNavigationToolbar - If set true , its show the Navigation Toolbar
     * @returns void
     */
    showNavigationToolbar(enableNavigationToolbar: boolean): void;
    /**
     * Shows /hides the the toolbar items in the PdfViewer
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isVisible - If set true, then its show the toolbar Items
     * @returns void
     */
    showToolbarItem(items: ToolbarItem[], isVisible: boolean): void;
    /**
     * Enables /disables the the toolbar items in the PdfViewer
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isEnable - If set true, then its Enable the toolbar Items
     * @returns void
     */
    enableToolbarItem(items: ToolbarItem[], isEnable: boolean): void;
    private showOpenOption;
    private showPageNavigationTool;
    private showMagnificationTool;
    private showSelectionTool;
    private showScrollingTool;
    private showDownloadOption;
    private showPrintOption;
    private showSearchOption;
    private showUndoRedoTool;
    private showCommentOption;
    private showAnnotationEditTool;
    private enableOpenOption;
    private enablePageNavigationTool;
    private enableMagnificationTool;
    private enableSelectionTool;
    private enableScrollingTool;
    private enableDownloadOption;
    private enablePrintOption;
    private enableSearchOption;
    private enableUndoRedoTool;
    private enableAnnotationEditTool;
    private enableCommentsTool;
    /**
     * @private
     */
    resetToolbar(): void;
    /**
     * @private
     */
    updateToolbarItems(): void;
    /**
     * @private
     */
    updateNavigationButtons(): void;
    /**
     * @private
     */
    updateZoomButtons(): void;
    /**
     * @private
     */
    updateUndoRedoButtons(): void;
    private enableCollectionAvailable;
    private disableUndoRedoButtons;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    updateCurrentPage(pageIndex: number): void;
    /**
     * @private
     */
    updateTotalPage(): void;
    /**
     * @private
     */
    openFileDialogBox(event: Event): void;
    private createToolbar;
    private createToolbarItems;
    private afterToolbarCreation;
    /**
     * @private
     */
    addClassToolbarItem(idString: string, className: string, tooltipText: string): HTMLElement;
    private addPropertiesToolItemContainer;
    private createZoomDropdownElement;
    private createZoomDropdown;
    private createCurrentPageInputTemplate;
    private createTotalPageTemplate;
    private createNumericTextBox;
    private onToolbarKeydown;
    private createToolbarItemsForMobile;
    private createMoreOption;
    private createToolbarItem;
    /**
     * @private
     */
    createTooltip(toolbarItem: HTMLElement, tooltipText: string): void;
    private onTooltipBeforeOpen;
    private createFileElement;
    private wireEvent;
    private unWireEvent;
    /**
     * @private
     */
    onToolbarResize(viewerWidth: number): void;
    private toolbarOnMouseup;
    private applyHideToToolbar;
    private toolbarClickHandler;
    private handleOpenIconClick;
    private handleToolbarBtnClick;
    private addComments;
    private loadDocument;
    private navigateToPage;
    private textBoxFocusOut;
    private onZoomDropDownInput;
    private onZoomDropDownInputClick;
    private zoomPercentSelect;
    private zoomDropDownChange;
    /**
     * @private
     */
    updateZoomPercentage(zoomFactor: number): void;
    private updateInteractionItems;
    /**
     * @private
     */
    textSearchButtonHandler(): void;
    private initiateAnnotationMode;
    /**
     * @private
     */
    DisableInteractionTools(): void;
    /**
     * @private
     */
    selectItem(element: HTMLElement): void;
    /**
     * @private
     */
    deSelectItem(element: HTMLElement): void;
    /**
     * @private
     */
    updateInteractionTools(isTextSelect: boolean): void;
    private initialEnableItems;
    private showSeparator;
    private applyToolbarSettings;
    private getStampMode;
    /**
     * @private
     */
    getModuleName(): string;
}
