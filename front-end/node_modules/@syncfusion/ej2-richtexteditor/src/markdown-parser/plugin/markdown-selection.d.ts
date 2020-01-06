/**
 * MarkdownSelection internal module
 * @hidden
 * @deprecated
 */
export declare class MarkdownSelection {
    selectionStart: number;
    selectionEnd: number;
    /**
     * markdown getLineNumber method
     * @hidden
     * @deprecated
     */
    getLineNumber(textarea: HTMLTextAreaElement, point: number): number;
    /**
     * markdown getSelectedText method
     * @hidden
     * @deprecated
     */
    getSelectedText(textarea: HTMLTextAreaElement): string;
    /**
     * markdown getAllParents method
     * @hidden
     * @deprecated
     */
    getAllParents(value: string): string[];
    /**
     * markdown getSelectedLine method
     * @hidden
     * @deprecated
     */
    getSelectedLine(textarea: HTMLTextAreaElement): string;
    /**
     * markdown getLine method
     * @hidden
     * @deprecated
     */
    getLine(textarea: HTMLTextAreaElement, index: number): string;
    /**
     * markdown getSelectedParentPoints method
     * @hidden
     * @deprecated
     */
    getSelectedParentPoints(textarea: HTMLTextAreaElement): {
        [key: string]: string | number;
    }[];
    /**
     * markdown setSelection method
     * @hidden
     * @deprecated
     */
    setSelection(textarea: HTMLTextAreaElement, start: number, end: number): void;
    /**
     * markdown save method
     * @hidden
     * @deprecated
     */
    save(start: number, end: number): void;
    /**
     * markdown restore method
     * @hidden
     * @deprecated
     */
    restore(textArea: HTMLTextAreaElement): void;
    /**
     * markdown isStartWith method
     * @hidden
     * @deprecated
     */
    isStartWith(line: string, command: string): boolean;
    /**
     * markdown replaceSpecialChar method
     * @hidden
     * @deprecated
     */
    replaceSpecialChar(value: string): string;
    /**
     * markdown isClear method
     * @hidden
     * @deprecated
     */
    isClear(parents: {
        [key: string]: string | number;
    }[], regex: string): boolean;
    /**
     * markdown getSelectedInlinePoints method
     * @hidden
     * @deprecated
     */
    getSelectedInlinePoints(textarea: HTMLTextAreaElement): {
        [key: string]: string | number;
    };
}
