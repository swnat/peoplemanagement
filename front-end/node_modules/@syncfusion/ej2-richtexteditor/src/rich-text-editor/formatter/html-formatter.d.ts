import { Formatter } from './formatter';
import { IEditorModel, IHtmlFormatterModel } from './../base/interface';
/**
 * HTML adapter
 * @hidden
 * @deprecated
 */
export declare class HTMLFormatter extends Formatter {
    keyConfig: {
        [key: string]: string;
    };
    currentDocument: Document;
    element: Element;
    editorManager: IEditorModel;
    private toolbarUpdate;
    constructor(options?: IHtmlFormatterModel);
    private initialize;
    /**
     * Update the formatter of RichTextEditor
     * @param  {Element} editElement
     * @param  {Document} doc
     * @hidden
     * @deprecated
     */
    updateFormatter(editElement: Element, doc?: Document, options?: {
        [key: string]: number;
    }): void;
}
