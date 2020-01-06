import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
/**
 * The Styles dialog is used to create or modify styles.
 */
export declare class StylesDialog {
    /**
     * @private
     */
    owner: LayoutViewer;
    private target;
    private listviewInstance;
    private styleName;
    private localValue;
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
    initStylesDialog(localValue: L10n, styles: string[], isRtl?: boolean): void;
    /**
     * @private
     */
    show(): void;
    private updateStyleNames;
    private defaultStyleName;
    private modifyStyles;
    private selectHandler;
    private hideObjects;
    private addNewStyles;
    /**
     * @private
     */
    destroy(): void;
}
