import { DocumentEditor } from '../../document-editor';
import { BaseHistoryInfo } from './base-history-info';
import { EditRangeStartElementBox } from '../viewer/page';
/**
 * EditorHistory preservation class
 */
/**
 * @private
 */
export declare class HistoryInfo extends BaseHistoryInfo {
    /**
     * @private
     */
    modifiedActions: BaseHistoryInfo[];
    private isChildHistoryInfo;
    editRangeStart: EditRangeStartElementBox;
    /**
     * @private
     */
    readonly hasAction: boolean;
    constructor(node: DocumentEditor, isChild: boolean);
    /**
     * Adds the modified actions
     * @param  {BaseHistoryInfo} baseHistoryInfo
     * @private
     */
    addModifiedAction(baseHistoryInfo: BaseHistoryInfo): void;
    /**
     * Reverts this instance
     * @private
     */
    revert(): void;
    /**
     * @private
     */
    destroy(): void;
}
