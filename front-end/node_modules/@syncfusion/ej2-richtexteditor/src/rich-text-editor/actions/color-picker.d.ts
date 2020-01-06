import { IRichTextEditor, IRenderer, IColorPickerRenderArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
/**
 * `Color Picker` module is used to handle ColorPicker actions.
 */
export declare class ColorPickerInput {
    private fontColorPicker;
    private backgroundColorPicker;
    private fontColorDropDown;
    private backgroundColorDropDown;
    protected parent: IRichTextEditor;
    protected locator: ServiceLocator;
    protected toolbarRenderer: IRenderer;
    protected renderFactory: RendererFactory;
    private tools;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private initializeInstance;
    /**
     * renderColorPickerInput method
     * @hidden
     * @deprecated
     */
    renderColorPickerInput(args: IColorPickerRenderArgs): void;
    private destroy;
    /**
     * destroyColorPicker method
     * @hidden
     * @deprecated
     */
    destroyColorPicker(): void;
    private setRtl;
    protected addEventListener(): void;
    private onPropertyChanged;
    protected removeEventListener(): void;
}
