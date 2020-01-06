import { IRichTextEditor } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
/**
 * `Count` module is used to handle Count actions.
 */
export declare class Count {
    protected parent: IRichTextEditor;
    protected maxLength: number;
    protected htmlLength: number;
    protected locator: ServiceLocator;
    protected renderFactory: RendererFactory;
    private editPanel;
    private contentModule;
    private contentRenderer;
    private args;
    private element;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private initializeInstance;
    /**
     * renderCount method
     * @hidden
     * @deprecated
     */
    renderCount(): void;
    private appendCount;
    private charCountBackground;
    /**
     * @hidden
     * @deprecated
     */
    refresh(): void;
    /**
     * Destroys the Count.
     * @method destroy
     * @return {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    private toggle;
    protected addEventListener(): void;
    protected removeEventListener(): void;
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
}
