import { IRichTextEditor, IRenderer } from './../base/interface';
import { ServiceLocator } from './../services/service-locator';
/**
 * `Link` module is used to handle undo actions.
 */
export declare class Link {
    private rteID;
    private i10n;
    private parent;
    contentModule: IRenderer;
    private dialogObj;
    private checkBoxObj;
    serviceLocator: ServiceLocator;
    private rendererFactory;
    private quickToolObj;
    private dialogRenderObj;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    protected addEventListener(): void;
    private onToolbarAction;
    protected removeEventListener(): void;
    private onIframeMouseDown;
    private showLinkQuickToolbar;
    private hideLinkQuickToolbar;
    private editAreaClickHandler;
    private onKeyDown;
    private linkDialog;
    private insertlink;
    private isUrl;
    private checkUrl;
    private removeLink;
    private openLink;
    private getAnchorNode;
    private editLink;
    private cancelDialog;
    private onDocumentClick;
    /**
     * Destroys the ToolBar.
     * @method destroy
     * @return {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
}
