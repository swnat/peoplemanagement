import { Observer } from '@syncfusion/ej2-base';
import { MarkdownExecCommand } from './types';
import { MDLists } from './../plugin/lists';
import { MDFormats } from './../plugin/formats';
import { IMarkdownParserModel } from './../base/interface';
import { MDSelectionFormats } from './../plugin/md-selection-formats';
import { MarkdownSelection } from './../plugin/markdown-selection';
import { UndoRedoCommands } from './../plugin/undo';
import { MDLink } from './../plugin/link';
import { MDTable } from './../plugin/table';
import { ClearFormat } from './../plugin/clearformat';
/**
 * MarkdownParser internal component
 * @hidden
 * @deprecated
 */
export declare class MarkdownParser {
    observer: Observer;
    listObj: MDLists;
    formatObj: MDFormats;
    formatTags: {
        [key: string]: string;
    };
    listTags: {
        [key: string]: string;
    };
    selectionTags: {
        [key: string]: string;
    };
    element: Element;
    undoRedoManager: UndoRedoCommands;
    mdSelectionFormats: MDSelectionFormats;
    markdownSelection: MarkdownSelection;
    linkObj: MDLink;
    tableObj: MDTable;
    clearObj: ClearFormat;
    /**
     * Constructor for creating the component
     * @hidden
     * @deprecated
     */
    constructor(options: IMarkdownParserModel);
    private initialize;
    private wireEvents;
    private onPropertyChanged;
    private editorKeyDown;
    private editorKeyUp;
    /**
     * markdown execCommand method
     * @hidden
     * @deprecated
     */
    execCommand<T>(command: MarkdownExecCommand, value: T, event?: Event, callBack?: Function, text?: string, exeValue?: T): void;
}
