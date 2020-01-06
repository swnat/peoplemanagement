import { LayoutViewer } from '../viewer';
import { L10n } from '@syncfusion/ej2-base';
import { RestrictEditing } from './restrict-editing-pane';
/**
 * @private
 */
export declare class AddUserDialog {
    private viewer;
    private target;
    private textBoxInput;
    private userList;
    private addButton;
    private owner;
    constructor(viewer: LayoutViewer, owner: RestrictEditing);
    /**
     * @private
     */
    initUserDialog(localValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     */
    show: () => void;
    loadUserDetails: () => void;
    /**
     * @private
     */
    okButtonClick: () => void;
    /**
     * @private
     */
    hideDialog: () => void;
    /**
     * @private
     */
    onKeyUpOnDisplayBox: () => void;
    addButtonClick: () => void;
    validateUserName(value: string): boolean;
    deleteButtonClick: () => void;
}
