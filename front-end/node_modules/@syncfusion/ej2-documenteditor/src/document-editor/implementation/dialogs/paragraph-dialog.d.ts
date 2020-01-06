import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { WParagraphFormat } from '../index';
/**
 * The Paragraph dialog is used to modify formatting of selected paragraphs.
 */
export declare class ParagraphDialog {
    /**
     * @private
     */
    owner: LayoutViewer;
    private target;
    private alignment;
    private lineSpacing;
    private special;
    private leftIndentIn;
    private rightIndentIn;
    private byIn;
    private beforeSpacingIn;
    private afterSpacingIn;
    private atIn;
    private rtlButton;
    private ltrButton;
    private contextSpacing;
    private leftIndent;
    private rightIndent;
    private beforeSpacing;
    private afterSpacing;
    private textAlignment;
    private firstLineIndent;
    private lineSpacingIn;
    private lineSpacingType;
    private paragraphFormat;
    private bidi;
    private contextualSpacing;
    isStyleDialog: boolean;
    private directionDiv;
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
    initParagraphDialog(locale: L10n): void;
    /**
     * @private
     */
    keyUpParagraphSettings: (event: KeyboardEvent) => void;
    private changeBeforeSpacing;
    private changeAfterSpacing;
    private changeLeftIndent;
    private changeRightIndent;
    private changeLineSpacingValue;
    private changeFirstLineIndent;
    private changeByTextAlignment;
    private changeBidirectional;
    private changeContextualSpacing;
    private changeAlignmentByBidi;
    /**
     * @private
     */
    changeByValue: (event: ChangeEventArgs) => void;
    /**
     * @private
     */
    changeBySpacing: (event: ChangeEventArgs) => void;
    /**
     * @private
     */
    loadParagraphDialog: () => void;
    private getAlignmentValue;
    /**
     * @private
     */
    applyParagraphFormat: () => void;
    /**
     * Applies Paragraph Format
     * @param  {WParagraphFormat} paragraphFormat
     * @private
     */
    onParagraphFormat(paragraphFormat: WParagraphFormat): void;
    /**
     * @private
     */
    closeParagraphDialog: () => void;
    /**
     * @private
     */
    show(paragraphFormat?: WParagraphFormat): void;
    /**
     * @private
     */
    destroy(): void;
}
