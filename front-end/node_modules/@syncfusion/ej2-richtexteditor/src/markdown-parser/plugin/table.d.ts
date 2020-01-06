import { IMDTable } from './../base/interface';
/**
 * Link internal component
 * @hidden
 * @deprecated
 */
export declare class MDTable {
    private parent;
    private selection;
    private syntaxTag;
    private element;
    private locale;
    /**
     * Constructor for creating the Formats plugin
     * @hidden
     * @deprecated
     */
    constructor(options: IMDTable);
    private addEventListener;
    private removeEventListener;
    /**
     * markdown destroy method
     * @hidden
     * @deprecated
     */
    destroy(): void;
    private onKeyDown;
    private createTable;
    private getTable;
    private tableHeader;
    private tableCell;
    private insertLine;
    private insertTable;
    private makeSelection;
    private getFormatTag;
    private ensureFormatApply;
    private ensureStartValid;
    private ensureEndValid;
    private updateValueWithFormat;
    private updateValue;
    private checkValid;
    private convertToLetters;
    private textNonEmpty;
    private isCursorBased;
    private isSelectionBased;
    private restore;
}
