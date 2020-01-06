import { Dialog } from '@syncfusion/ej2-popups';
import { L10n } from '@syncfusion/ej2-base';
import { LayoutViewer } from '../index';
import { WList } from '../list/list';
import { WListLevel } from '../list/list-level';
/**
 * The List dialog is used to create or modify lists.
 */
export declare class ListDialog {
    /**
     * @private
     */
    dialog: Dialog;
    private target;
    /**
     * @private
     */
    owner: LayoutViewer;
    private viewModel;
    private startAt;
    private textIndent;
    private alignedAt;
    private listLevelElement;
    private followNumberWith;
    private numberStyle;
    private numberFormat;
    private restartBy;
    private formatInfoToolTip;
    private numberFormatDiv;
    /**
     * @private
     */
    isListCharacterFormat: boolean;
    /**
     * @private
     */
    readonly listLevel: WListLevel;
    /**
     * @private
     */
    readonly list: WList;
    /**
     * @private
     */
    readonly levelNumber: number;
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
    showListDialog(): void;
    /**
     * Shows the table properties dialog
     * @private
     */
    initListDialog(locale: L10n, isRtl?: boolean): void;
    private wireAndBindEvent;
    private onTextIndentChanged;
    private onStartValueChanged;
    private onListLevelValueChanged;
    private onNumberFormatChanged;
    private onAlignedAtValueChanged;
    private updateRestartLevelBox;
    private onFollowCharacterValueChanged;
    private onLevelPatternValueChanged;
    private listPatternConverter;
    private followCharacterConverter;
    private loadListDialog;
    private updateDialogValues;
    private showFontDialog;
    private onApplyList;
    private onCancelButtonClick;
    private closeListDialog;
    private disposeBindingForListUI;
    /**
     * @private
     */
    destroy(): void;
}
