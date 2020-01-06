import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { IRichTextEditor, IRenderer, IDropDownRenderArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
export declare class DropDownButtons {
    formatDropDown: DropDownButton;
    fontNameDropDown: DropDownButton;
    fontSizeDropDown: DropDownButton;
    alignDropDown: DropDownButton;
    imageAlignDropDown: DropDownButton;
    displayDropDown: DropDownButton;
    tableRowsDropDown: DropDownButton;
    tableColumnsDropDown: DropDownButton;
    tableCellVerticalAlignDropDown: DropDownButton;
    protected parent: IRichTextEditor;
    protected locator: ServiceLocator;
    protected toolbarRenderer: IRenderer;
    protected renderFactory: RendererFactory;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private initializeInstance;
    private beforeRender;
    private dropdownContent;
    /**
     * renderDropDowns method
     * @hidden
     * @deprecated
     */
    renderDropDowns(args: IDropDownRenderArgs): void;
    private getUpdateItems;
    private onPropertyChanged;
    private getEditNode;
    private rowDropDown;
    private columnDropDown;
    private verticalAlignDropDown;
    private imageDisplayDropDown;
    private imageAlignmentDropDown;
    private tableStylesDropDown;
    private removeDropDownClasses;
    /**
     * destroyDropDowns method
     * @hidden
     * @deprecated
     */
    destroyDropDowns(): void;
    private setRtl;
    protected addEventListener(): void;
    private onIframeMouseDown;
    protected removeEventListener(): void;
}
