import { DocumentEditor, ContextType } from '../../document-editor/index';
import { L10n } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Toolbar } from '../tool-bar';
import { DocumentEditorContainer } from '../document-editor-container';
/**
 * TOC Properties pane
 * @private
 */
export declare class TocProperties {
    private container;
    element: HTMLElement;
    private elementId;
    private template1Div;
    private showPageNumber;
    private rightalignPageNumber;
    private hyperlink;
    private borderBtn;
    private updateBtn;
    private cancelBtn;
    private borderLevelStyle;
    headerDiv: HTMLElement;
    private closeButton;
    private prevContext;
    localObj: L10n;
    private isRtl;
    /**
     * @private
     */
    readonly documentEditor: DocumentEditor;
    /**
     * @private
     */
    readonly toolbar: Toolbar;
    constructor(container: DocumentEditorContainer, isRtl?: boolean);
    /**
     * @private
     */
    enableDisableElements(enable: boolean): void;
    private initializeTocPane;
    private updateTocProperties;
    private wireEvents;
    private onClose;
    private tocHeaderDiv;
    private initTemplates;
    private template1;
    private tocOptionsDiv;
    private createDropdownOption;
    createDropDownButton(id: string, parentDiv: HTMLElement, iconCss: string, content: string[], selectedIndex: number): DropDownList;
    private contentStylesDropdown;
    private checkboxContent;
    private buttonDiv;
    showTocPane: (isShow: boolean, previousContextType?: ContextType) => void;
    private onInsertToc;
    destroy(): void;
}
