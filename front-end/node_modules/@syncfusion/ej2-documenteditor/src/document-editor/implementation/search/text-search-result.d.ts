import { TextPosition } from '../selection/selection-helper';
import { LayoutViewer } from '../index';
import { DocumentEditor } from '../../document-editor';
/**
 * @private
 */
export declare class TextSearchResult {
    private startIn;
    private endIn;
    private owner;
    /**
     * @private
     */
    isHeader: boolean;
    /**
     * @private
     */
    isFooter: boolean;
    readonly viewer: LayoutViewer;
    start: TextPosition;
    end: TextPosition;
    readonly text: string;
    constructor(owner: DocumentEditor);
    destroy(): void;
}
