import { ItemModel, Toolbar as tool } from '@syncfusion/ej2-navigations';
import { IRichTextEditor, IRenderer, IToolbarRenderOptions, IToolbarItems } from '../base/interface';
import { IToolbarItemModel } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
export declare class BaseToolbar {
    toolbarObj: tool;
    protected parent: IRichTextEditor;
    protected locator: ServiceLocator;
    protected toolbarRenderer: IRenderer;
    protected renderFactory: RendererFactory;
    private tools;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private addEventListener;
    private removeEventListener;
    private setRtl;
    private getTemplateObject;
    /**
     * getObject method
     * @hidden
     * @deprecated
     */
    getObject(item: string, container: string): IToolbarItemModel;
    /**
     * @hidden
     * @deprecated
     */
    getItems(tbItems: (string | IToolbarItems)[], container: string): ItemModel[];
    private getToolbarOptions;
    /**
     * render method
     * @hidden
     * @deprecated
     */
    render(args: IToolbarRenderOptions): void;
}
