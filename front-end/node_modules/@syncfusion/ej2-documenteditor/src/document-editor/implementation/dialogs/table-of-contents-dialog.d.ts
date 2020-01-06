import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
/**
 * The Table of contents dialog is used to insert or edit table of contents at selection.
 */
export declare class TableOfContentsDialog {
    private target;
    /**
     * @private
     */
    owner: LayoutViewer;
    private pageNumber;
    private rightAlign;
    private tabLeader;
    private showLevel;
    private hyperlink;
    private style;
    private heading1;
    private heading2;
    private heading3;
    private heading4;
    private heading5;
    private heading6;
    private heading7;
    private heading8;
    private heading9;
    private normal;
    private outline;
    private textBoxInput;
    private listViewInstance;
    /**
     * @private
     */
    constructor(viewer: LayoutViewer);
    private getModuleName;
    /**
     * @private
     */
    initTableOfContentDialog(locale: L10n, isRtl?: boolean): void;
    private styleLocaleValue;
    /**
     * @private
     */
    show(): void;
    /**
     * @private
     */
    loadTableofContentDialog: () => void;
    /**
     * @private
     */
    closeTableOfContentDialog: () => void;
    /**
     * @private
     */
    onCancelButtonClick: () => void;
    private selectHandler;
    private showStyleDialog;
    private changeShowLevelValue;
    private changeByValue;
    private reset;
    private changeStyle;
    private checkLevel;
    private getElementValue;
    private changeHeadingStyle;
    /**
     * @private
     */
    changePageNumberValue: (args: any) => void;
    /**
     * @private
     */
    changeRightAlignValue: (args: any) => void;
    /**
     * @private
     */
    changeStyleValue: (args: any) => void;
    private getHeadingLevel;
    private applyLevelSetting;
    /**
     * @private
     */
    applyTableOfContentProperties: () => void;
    /**
     * @private
     */
    unWireEventsAndBindings: () => void;
    /**
     * @private
     */
    destroy(): void;
}
