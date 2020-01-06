import { DocumentEditorContainer } from '../document-editor-container';
import { DocumentEditor } from '../../document-editor/document-editor';
/**
 * Image Property pane
 * @private
 */
export declare class ImageProperties {
    private container;
    private elementId;
    element: HTMLElement;
    private widthElement;
    private heightElement;
    private widthNumericBox;
    private heightNumericBox;
    private aspectRatioBtn;
    private isMaintainAspectRatio;
    private isWidthApply;
    private isHeightApply;
    private isRtl;
    readonly documentEditor: DocumentEditor;
    constructor(container: DocumentEditorContainer, isRtl?: boolean);
    /**
     * @private
     */
    enableDisableElements(enable: boolean): void;
    private initializeImageProperties;
    private initImageProp;
    private createImagePropertiesDiv;
    wireEvents: () => void;
    private onImageWidth;
    private onImageHeight;
    private applyImageWidth;
    private applyImageHeight;
    private onAspectRatioBtnClick;
    showImageProperties(isShow: boolean): void;
    updateImageProperties(): void;
    destroy(): void;
}
