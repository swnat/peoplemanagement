import { L10n } from '@syncfusion/ej2-base';
import { LayoutViewer, WCharacterFormat, WParagraphFormat } from '../index';
/**
 * The Style dialog is used to create or modify styles.
 */
export declare class StyleDialog {
    private owner;
    private target;
    private styleType;
    private styleBasedOn;
    private styleParagraph;
    private onlyThisDocument;
    private template;
    private isEdit;
    private editStyleName;
    private style;
    private abstractList;
    private numberingBulletDialog;
    private okButton;
    private styleNameElement;
    private isUserNextParaUpdated;
    private fontFamily;
    private fontSize;
    private characterFormat;
    private paragraphFormat;
    private localObj;
    private bold;
    private italic;
    private underline;
    private fontColor;
    private leftAlign;
    private rightAlign;
    private centerAlign;
    private justify;
    private singleLineSpacing;
    private doubleLineSpacing;
    private onePointFiveLineSpacing;
    private styleDropdwn;
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
    initStyleDialog(localValue: L10n, isRtl?: boolean): void;
    private createFormatDropdown;
    private openDialog;
    private createFontOptions;
    private setBoldProperty;
    private setItalicProperty;
    private setUnderlineProperty;
    private fontButtonClicked;
    private fontSizeUpdate;
    private fontFamilyChanged;
    private fontColorUpdate;
    private createParagraphOptions;
    private setLeftAlignment;
    private setRightAlignment;
    private setCenterAlignment;
    private setJustifyAlignment;
    private createButtonElement;
    private increaseBeforeAfterSpacing;
    private decreaseBeforeAfterSpacing;
    private toggleDisable;
    /**
     * @private
     */
    updateNextStyle: (args: FocusEvent) => void;
    /**
     * @private
     */
    updateOkButton: () => void;
    /**
     * @private
     */
    styleTypeChange: (args: any) => void;
    private styleBasedOnChange;
    /**
     * @private
     */
    styleParagraphChange: (args: any) => void;
    /**
     * @private
     */
    showFontDialog: () => void;
    /**
     * @private
     */
    showParagraphDialog: () => void;
    /**
     * @private
     */
    showNumberingBulletDialog: () => void;
    /**
     * @private
     */
    show(styleName?: string, header?: string): void;
    /**
     * @private
     */
    onOkButtonClick: () => void;
    private updateList;
    private createLinkStyle;
    private loadStyleDialog;
    /**
     * @private
     */
    updateCharacterFormat(characterFormat?: WCharacterFormat): void;
    /**
     * @private
     */
    updateParagraphFormat(paragraphFOrmat?: WParagraphFormat): void;
    private enableOrDisableOkButton;
    private getTypeValue;
    private updateStyleNames;
    private getStyle;
    /**
     * @private
     */
    onCancelButtonClick: () => void;
    /**
     * @private
     */
    closeStyleDialog: () => void;
    /**
     * @private
     */
    destroy(): void;
}
