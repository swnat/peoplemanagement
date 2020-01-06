/**
 * Represents document editor header and footer.
 */
import { Toolbar } from '../tool-bar/tool-bar';
import { DocumentEditorContainer } from '../document-editor-container';
import { DocumentEditor } from '../../document-editor/document-editor';
/**
 * @private
 */
export declare class HeaderFooterProperties {
    element: HTMLElement;
    private container;
    private firstPage;
    private oddOrEven;
    private pageNumber;
    private pageCount;
    private headerFromTop;
    private footerFromTop;
    private isHeaderTopApply;
    private isFooterTopApply;
    private isRtl;
    /**
     * @private
     */
    readonly documentEditor: DocumentEditor;
    readonly toolbar: Toolbar;
    /**
     * @private
     */
    enableDisableElements(enable: boolean): void;
    constructor(container: DocumentEditorContainer, isRtl?: boolean);
    initHeaderFooterPane(): void;
    showHeaderFooterPane(isShow: boolean): void;
    private initializeHeaderFooter;
    private createDivTemplate;
    private wireEvents;
    private onClose;
    private changeFirstPageOptions;
    private changeoddOrEvenOptions;
    private changeHeaderValue;
    private onHeaderValue;
    private onFooterValue;
    private changeFooterValue;
    onSelectionChange(): void;
    destroy(): void;
}
