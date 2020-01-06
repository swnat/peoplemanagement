import { L10n } from '@syncfusion/ej2-base';
import { DocumentEditor } from '../../document-editor/index';
import { DocumentEditorContainer } from '../document-editor-container';
/**
 * Text Properties
 * @private
 */
export declare class Text {
    private container;
    private textProperties;
    private bold;
    private italic;
    private underline;
    private strikethrough;
    private subscript;
    private superscript;
    private fontColor;
    private highlightColor;
    private highlightColorElement;
    private fontColorInputElement;
    private highlightColorInputElement;
    private clearFormat;
    private fontSize;
    private fontFamily;
    private isRetrieving;
    appliedHighlightColor: string;
    localObj: L10n;
    private isRtl;
    readonly documentEditor: DocumentEditor;
    constructor(container: DocumentEditorContainer, isRtl?: boolean);
    initializeTextPropertiesDiv(wholeDiv: HTMLElement, isRtl?: boolean): void;
    private createHighlightColorSplitButton;
    private openPopup;
    private closePopup;
    private initializeHighlightColorElement;
    private createHightlighColorPickerDiv;
    private onHighLightColor;
    private applyHighlightColorAsBackground;
    private removeSelectedColorDiv;
    private applyHighlightColor;
    private getHighLightColor;
    private createDiv;
    private createButtonTemplate;
    private createFontColorPicker;
    /**
     * Adds file colot elements to parent div.
     */
    private createColorTypeInput;
    private createDropDownListForSize;
    private createDropDownListForFamily;
    wireEvent(): void;
    unwireEvents(): void;
    private boldAction;
    private italicAction;
    private underlineAction;
    private strikethroughAction;
    private clearFormatAction;
    private subscriptAction;
    private superscriptAction;
    private changeFontColor;
    private changeFontFamily;
    private changeFontSize;
    onSelectionChange(): void;
    destroy(): void;
}
