import { Dictionary } from '../../base/dictionary';
import { FindOption } from '../../base/types';
import { TextPosition } from '../selection/selection-helper';
import { LineWidget, ElementBox, TextElementBox } from '../viewer/page';
import { TextInLineInfo } from '../editor/editor-helper';
import { TextSearchResult } from './text-search-result';
import { TextSearchResults } from './text-search-results';
import { DocumentEditor } from '../../document-editor';
import { LayoutViewer } from '../index';
/**
 * @private
 */
export declare class TextSearch {
    private wordBefore;
    private wordAfter;
    private owner;
    private isHeader;
    private isFooter;
    readonly viewer: LayoutViewer;
    constructor(owner: DocumentEditor);
    find(pattern: string | RegExp, findOption?: FindOption): TextSearchResult;
    findNext(pattern: string | RegExp, findOption?: FindOption, hierarchicalPosition?: string): TextSearchResult;
    stringToRegex(textToFind: string, option: FindOption): RegExp;
    isPatternEmpty(pattern: RegExp): boolean;
    findAll(pattern: string | RegExp, findOption?: FindOption, hierarchicalPosition?: string): TextSearchResults;
    /**
     * Method to retrieve text from a line widget
     * @param  {ElementBox} inlineElement
     * @param {number} indexInInline
     * @param {boolean} includeNextLine
     * @private
     */
    getElementInfo(inlineElement: ElementBox, indexInInline: number, includeNextLine?: boolean): TextInLineInfo;
    /**
     * Method to update location for matched text
     * @param {RegExpExecArray} matches
     * @param {TextSearchResults} results
     * @param {Dictionary<TextElementBox, number>} textInfo
     * @param {number}indexInInline
     * @param {boolean} isInline
     * @param {boolean}isFirstMatch
     * @param {TextPosition}selectionEnd
     */
    updateMatchedTextLocation(matches: RegExpExecArray[], results: TextSearchResults, textInfo: Dictionary<TextElementBox, number>, indexInInline: number, inlines: ElementBox, isFirstMatch: boolean, selectionEnd: TextPosition, startPosition?: number): void;
    private findDocument;
    private findInlineText;
    private findInline;
    /**
     * Method to get text position
     * @param {LineWidget} lineWidget
     * @param {string} hierarchicalIndex
     * @private
     */
    getTextPosition(lineWidget: LineWidget, hierarchicalIndex: string): TextPosition;
}
/**
 * @private
 */
export declare class SearchWidgetInfo {
    private leftInternal;
    private widthInternal;
    left: number;
    width: number;
    constructor(left: number, width: number);
}
