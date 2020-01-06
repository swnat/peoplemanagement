/**
 * IncrementalSearch module file
 */
export declare type SearchType = 'StartsWith' | 'Equal';
/**
 * Search and focus the list item based on key code matches with list text content
 * @param  { number } keyCode - Specifies the key code which pressed on keyboard events.
 * @param  { HTMLElement[]] } items - Specifies an array of HTMLElement, from which matches find has done.
 * @param { number } selectedIndex - Specifies the selected item in list item, so that search will happen
 * after selected item otherwise it will do from initial.
 * @param  { boolean } ignoreCase - Specifies the case consideration when search has done.
 */
export declare function incrementalSearch(keyCode: number, items: HTMLElement[], selectedIndex: number, ignoreCase: boolean): Element;
export declare function Search(inputVal: string, items: HTMLElement[], searchType: SearchType, ignoreCase?: boolean): {
    [key: string]: Element | number;
};
