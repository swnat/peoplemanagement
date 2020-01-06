import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
/**
 * The Bookmark dialog is used to add, navigate or delete bookmarks.
 */
export declare class BookmarkDialog {
    /**
     * @private
     */
    owner: LayoutViewer;
    private target;
    private listviewInstance;
    private textBoxInput;
    private addButton;
    private deleteButton;
    private gotoButton;
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
    initBookmarkDialog(localValue: L10n, bookmarks: string[], isRtl?: boolean): void;
    /**
     * @private
     */
    show(): void;
    /**
     * @private
     */
    onKeyUpOnTextBox: (event: KeyboardEvent) => void;
    private enableOrDisableButton;
    private addBookmark;
    private selectHandler;
    private focusTextBox;
    private removeObjects;
    private gotoBookmark;
    private deleteBookmark;
    /**
     * @private
     */
    destroy(): void;
}
