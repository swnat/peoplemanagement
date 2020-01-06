import { LayoutViewer } from '../viewer';
import { L10n } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { EnforceProtectionDialog, UnProtectDocumentDialog } from './enforce-protection-dialog';
import { ProtectionType } from '../../base/types';
import { Base64 } from '../editor/editor-helper';
import { ListView } from '@syncfusion/ej2-lists';
/**
 * @private
 */
export declare class RestrictEditing {
    viewer: LayoutViewer;
    restrictPane: HTMLElement;
    allowFormatting: CheckBox;
    private addUser;
    private enforceProtection;
    private readonly;
    private allowFormat;
    private allowPrint;
    private allowCopy;
    private addUserDialog;
    enforceProtectionDialog: EnforceProtectionDialog;
    stopProtection: HTMLButtonElement;
    addRemove: boolean;
    /**
     * @private
     */
    unProtectDialog: UnProtectDocumentDialog;
    stopProtectionDiv: HTMLElement;
    restrictPaneWholeDiv: HTMLElement;
    private closeButton;
    protectionType: ProtectionType;
    restrictFormatting: boolean;
    private localObj;
    currentHashValue: string;
    currentSaltValue: string;
    isShowRestrictPane: boolean;
    base64: Base64;
    addedUser: ListView;
    stopReadOnlyOptions: HTMLElement;
    usersCollection: string[];
    highlightCheckBox: CheckBox;
    constructor(viewer: LayoutViewer);
    showHideRestrictPane(isShow: boolean): void;
    private initPane;
    initRestrictEditingPane(localObj: L10n): void;
    showStopProtectionPane(show: boolean): void;
    private closePane;
    private wireEvents;
    private enableFormatting;
    private readOnlyChanges;
    private selectHandler;
    highlightClicked: (args: any) => void;
    private protectDocument;
    createCheckBox(label: string, element: HTMLInputElement): CheckBox;
    loadPaneValue(): void;
    navigateNextRegion: () => void;
    addUserCollection(): void;
    showAllRegion: () => void;
    updateUserInformation(): void;
}
