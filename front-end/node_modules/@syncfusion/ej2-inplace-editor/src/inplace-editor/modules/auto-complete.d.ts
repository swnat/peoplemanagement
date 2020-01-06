import { AutoComplete as EJ2AutoComplete } from '@syncfusion/ej2-dropdowns';
import { InPlaceEditor } from '../base/inplace-editor';
import { NotifyParams, IComponent } from '../base/interface';
/**
 * The `AutoComplete` module is used configure the properties of Auto complete type editor.
 */
export declare class AutoComplete implements IComponent {
    private base;
    protected parent: InPlaceEditor;
    compObj: EJ2AutoComplete;
    constructor(parent?: InPlaceEditor);
    render(e: NotifyParams): void;
    /**
     * @hidden
     */
    showPopup(): void;
    focus(): void;
    updateValue(e: NotifyParams): void;
    /**
     * Destroys the module.
     * @method destroy
     * @return {void}
     * @hidden
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
}
