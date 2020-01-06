import { Selection } from '../index';
import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
import { WCharacterFormat } from '../format/character-format';
/**
 * The Font dialog is used to modify formatting of selected text.
 */
export declare class FontDialog {
    private fontStyleInternal;
    private owner;
    private target;
    private fontNameList;
    private fontStyleText;
    private fontSizeText;
    private colorPicker;
    private fontColorDiv;
    private underlineDrop;
    private strikethroughBox;
    private doublestrikethrough;
    private superscript;
    private subscript;
    private bold;
    private italic;
    private underline;
    private strikethrough;
    private baselineAlignment;
    private fontSize;
    private fontFamily;
    private fontColor;
    /**
     * @private
     */
    characterFormat: WCharacterFormat;
    /**
     * @private
     */
    /**
    * @private
    */
    fontStyle: string;
    /**
     * @private
     */
    constructor(layoutViewer: LayoutViewer);
    /**
     * @private
     */
    getModuleName(): string;
    private createInputElement;
    /**
     * @private
     */
    initFontDialog(locale: L10n, isRtl?: boolean): void;
    private getFontSizeDiv;
    private getFontDiv;
    /**
     * @private
     */
    showFontDialog(characterFormat?: WCharacterFormat): void;
    /**
     * @private
     */
    loadFontDialog: () => void;
    /**
     * @private
     */
    closeFontDialog: () => void;
    /**
     * @private
     */
    onCancelButtonClick: () => void;
    /**
     * @private
     */
    onInsertFontFormat: () => void;
    /**
     * Applies character format
     * @param  {Selection} selection
     * @param  {WCharacterFormat} format
     * @private
     */
    onCharacterFormat(selection: Selection, format: WCharacterFormat): void;
    /**
     * @private
     */
    enableCheckBoxProperty(args: any): void;
    private fontSizeUpdate;
    private fontStyleUpdate;
    private fontFamilyUpdate;
    private underlineUpdate;
    private fontColorUpdate;
    private singleStrikeUpdate;
    private doubleStrikeUpdate;
    private superscriptUpdate;
    private subscriptUpdate;
    /**
     * @private
     */
    unWireEventsAndBindings(): void;
    /**
     * @private
     */
    destroy(): void;
}
