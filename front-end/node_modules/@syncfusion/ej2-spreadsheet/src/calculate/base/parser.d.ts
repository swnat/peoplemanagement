import { Calculate } from './index';
export declare class Parser {
    private parent;
    constructor(parent?: Calculate);
    private emptyStr;
    private storedStringText;
    private sheetToken;
    /** @hidden */
    tokenAdd: string;
    /** @hidden */
    tokenSubtract: string;
    /** @hidden */
    tokenMultiply: string;
    /** @hidden */
    tokenDivide: string;
    /** @hidden */
    tokenLess: string;
    private charEm;
    private charEp;
    /** @hidden */
    tokenGreater: string;
    /** @hidden */
    tokenEqual: string;
    /** @hidden */
    tokenLessEq: string;
    /** @hidden */
    tokenGreaterEq: string;
    /** @hidden */
    tokenNotEqual: string;
    /** @hidden */
    tokenAnd: string;
    private tokenEm;
    private tokenEp;
    /** @hidden */
    tokenOr: string;
    private charAnd;
    private charLess;
    private charGreater;
    private charEqual;
    private charLessEq;
    private charGreaterEq;
    private charNoEqual;
    private stringGreaterEq;
    private stringLessEq;
    private stringNoEqual;
    private stringAnd;
    private stringOr;
    private charOr;
    private charAdd;
    private charSubtract;
    private charMultiply;
    private charDivide;
    private fixedReference;
    private spaceString;
    private ignoreBracet;
    /** @hidden */
    isError: boolean;
    /** @hidden */
    isFormulaParsed: boolean;
    private findNamedRange;
    private stringsColl;
    private tokens;
    private charNOTop;
    private specialSym;
    private isFailureTriggered;
    /** @hidden */
    parse(text: string, fkey?: string): string;
    private exceptionArgs;
    private formulaAutoCorrection;
    private checkScopedRange;
    private storeStrings;
    private setStrings;
    /** @hidden */
    parseSimple(formulaText: string): string;
    /** @hidden */
    parseSimpleOperators(formulaText: string, markers: string[], operators: string[]): string;
    /** @hidden */
    indexOfAny(text: string, operators: string[]): number;
    /** @hidden */
    findLeftMarker(text: string): number;
    /** @hidden */
    findRightMarker(text: string): number;
    /** @hidden */
    parseFormula(formula: string, fKey?: string): string;
    /** @hidden */
    markLibraryFormulas(formula: string): string;
    /** @hidden */
    swapInnerParens(fSubstr: string): string;
    /** @hidden */
    addParensToArgs(fSubstr: string): string;
    /** @hidden */
    private lastIndexOfAny;
    /** @hidden */
    markNamedRanges(formula: string): string;
    /** @hidden */
    checkForNamedRangeAndKeyValue(text: string): string;
    private getTableRange;
    private findNextEndIndex;
}
