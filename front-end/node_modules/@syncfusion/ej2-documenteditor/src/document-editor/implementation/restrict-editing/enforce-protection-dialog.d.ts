import { LayoutViewer } from '../viewer';
import { L10n } from '@syncfusion/ej2-base';
import { RestrictEditing } from './restrict-editing-pane';
/**
 * @private
 */
export declare class EnforceProtectionDialog {
    private viewer;
    private target;
    private passwordTextBox;
    private confirmPasswordTextBox;
    private localeValue;
    private owner;
    /**
     * @private
     */
    password: string;
    constructor(viewer: LayoutViewer, owner: RestrictEditing);
    /**
     * @private
     */
    initDialog(localValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     */
    show: () => void;
    hideDialog: () => void;
    /**
     * @private
     */
    okButtonClick: () => void;
}
/**
 * @private
 */
export declare class UnProtectDocumentDialog {
    private viewer;
    private target;
    private passwordTextBox;
    private owner;
    private localObj;
    private currentHashValue;
    private currentSaltValue;
    constructor(viewer: LayoutViewer, owner: RestrictEditing);
    /**
     * @private
     */
    initDialog(localValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     */
    show: () => void;
    /**
     * @private
     */
    okButtonClick: () => void;
    /**
     * @private
     */
    hideDialog: () => void;
}
