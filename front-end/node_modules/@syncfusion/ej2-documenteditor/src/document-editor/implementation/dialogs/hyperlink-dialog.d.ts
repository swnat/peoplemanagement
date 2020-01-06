import { L10n } from '@syncfusion/ej2-base';
import { LayoutViewer } from '../index';
/**
 * The Hyperlink dialog is used to insert or edit hyperlink at selection.
 */
export declare class HyperlinkDialog {
    private displayText;
    private navigationUrl;
    private displayTextBox;
    private addressText;
    private urlTextBox;
    private insertButton;
    private bookmarkDropdown;
    private bookmarkCheckbox;
    private bookmarkDiv;
    private target;
    /**
     * @private
     */
    owner: LayoutViewer;
    private bookmarks;
    private localObj;
    /**
     * @private
     */
    constructor(viewer: LayoutViewer);
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * @private
     */
    initHyperlinkDialog(localValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     */
    show(): void;
    /**
     * @private
     */
    hide(): void;
    /**
     * @private
     */
    onKeyUpOnUrlBox: (event: KeyboardEvent) => void;
    /**
     * @private
     */
    onKeyUpOnDisplayBox: () => void;
    private enableOrDisableInsertButton;
    /**
     * @private
     */
    onInsertButtonClick: () => void;
    /**
     * @private
     */
    onCancelButtonClick: () => void;
    /**
     * @private
     */
    loadHyperlinkDialog: () => void;
    /**
     * @private
     */
    closeHyperlinkDialog: () => void;
    /**
     * @private
     */
    onInsertHyperlink(): void;
    private onUseBookmarkChange;
    private onBookmarkchange;
    /**
     * @private
     */
    clearValue(): void;
    /**
     * @private
     */
    destroy(): void;
}
