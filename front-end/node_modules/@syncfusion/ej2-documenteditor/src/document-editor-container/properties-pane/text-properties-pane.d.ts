import { DocumentEditor } from '../../document-editor/index';
import { DocumentEditorContainer } from '../document-editor-container';
/**
 * Text Properties pane
 * @private
 */
export declare class TextProperties {
    element: HTMLElement;
    private container;
    private text;
    private paragraph;
    private isInitial;
    readonly documentEditor: DocumentEditor;
    constructor(container: DocumentEditorContainer, id: string, isTableProperties: boolean, isRtl?: boolean);
    enableDisableElements(enable: boolean): void;
    updateStyles(): void;
    appliedHighlightColor: string;
    appliedBulletStyle: string;
    appliedNumberingStyle: string;
    showTextProperties: (isShow: boolean) => void;
    private initializeTextProperties;
    private generateUniqueID;
    wireEvents(): void;
    onSelectionChange(): void;
    destroy(): void;
}
