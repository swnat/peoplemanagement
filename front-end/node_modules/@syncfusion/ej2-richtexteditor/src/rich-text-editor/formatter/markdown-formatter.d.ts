import { Formatter } from './formatter';
import { IEditorModel, IMarkdownFormatterModel } from './../base/interface';
/**
 * Markdown adapter
 * @hidden
 * @deprecated
 */
export declare class MarkdownFormatter extends Formatter {
    keyConfig: {
        [key: string]: string;
    };
    formatTags: {
        [key: string]: string;
    };
    listTags: {
        [key: string]: string;
    };
    selectionTags: {
        [key: string]: string;
    };
    editorManager: IEditorModel;
    private element;
    constructor(options?: IMarkdownFormatterModel);
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
