import { EditorManager } from './../base/editor-manager';
import { IHtmlSubCommands, IHtmlUndoRedoData } from './../base/interface';
import { IHtmlKeyboardEvent } from './../../editor-manager/base/interface';
import { IUndoCallBack } from '../../common/interface';
/**
 * `Undo` module is used to handle undo actions.
 */
export declare class UndoRedoManager {
    element: HTMLElement;
    private parent;
    steps: number;
    undoRedoStack: IHtmlUndoRedoData[];
    undoRedoSteps: number;
    undoRedoTimer: number;
    constructor(parent?: EditorManager, options?: {
        [key: string]: number;
    });
    protected addEventListener(): void;
    private onPropertyChanged;
    protected removeEventListener(): void;
    /**
     * onAction method
     * @hidden
     * @deprecated
     */
    onAction(e: IHtmlSubCommands): void;
    /**
     * Destroys the ToolBar.
     * @method destroy
     * @return {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    private keyDown;
    private keyUp;
    /**
     * RTE collection stored html format.
     * @method saveData
     * @return {void}
     * @hidden
     * @deprecated
     */
    saveData(e?: KeyboardEvent | MouseEvent | IUndoCallBack): void;
    /**
     * Undo the editable text.
     * @method undo
     * @return {void}
     * @hidden
     * @deprecated
     */
    undo(e?: IHtmlSubCommands | IHtmlKeyboardEvent): void;
    /**
     * Redo the editable text.
     * @method redo
     * @return {void}
     * @hidden
     * @deprecated
     */
    redo(e?: IHtmlSubCommands | IHtmlKeyboardEvent): void;
    /**
     * getUndoStatus method
     * @hidden
     * @deprecated
     */
    getUndoStatus(): {
        [key: string]: boolean;
    };
}
