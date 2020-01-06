/**
 * IncrementalSearch module file
 */
var queryString = '';
var prevString = '';
var matches = [];
var activeClass = 'e-active';
/**
 * Search and focus the list item based on key code matches with list text content
 * @param  { number } keyCode - Specifies the key code which pressed on keyboard events.
 * @param  { HTMLElement[]] } items - Specifies an array of HTMLElement, from which matches find has done.
 * @param { number } selectedIndex - Specifies the selected item in list item, so that search will happen
 * after selected item otherwise it will do from initial.
 * @param  { boolean } ignoreCase - Specifies the case consideration when search has done.
 */
export function incrementalSearch(keyCode, items, selectedIndex, ignoreCase) {
    queryString += String.fromCharCode(keyCode);
    setTimeout(function () { queryString = ''; }, 1000);
    var index;
    queryString = ignoreCase ? queryString.toLowerCase() : queryString;
    if (prevString === queryString) {
        for (var i = 0; i < matches.length; i++) {
            if (matches[i].classList.contains(activeClass)) {
                index = i;
                break;
            }
        }
        index = index + 1;
        return matches[index];
    }
    else {
        var listItems = items;
        var strLength = queryString.length;
        var text = void 0;
        var item = void 0;
        selectedIndex = selectedIndex ? selectedIndex + 1 : 0;
        var i = selectedIndex;
        matches = [];
        do {
            if (i === listItems.length) {
                i = -1;
            }
            i === -1 ? index = 0 : index = i;
            item = listItems[index];
            text = ignoreCase ? item.innerText.toLowerCase() : item.innerText;
            if (text.substr(0, strLength) === queryString) {
                matches.push(listItems[index]);
            }
            i++;
        } while (i !== selectedIndex);
        prevString = queryString;
        return matches[0];
    }
}
export function Search(inputVal, items, searchType, ignoreCase) {
    var listItems = items;
    ignoreCase = ignoreCase !== undefined && ignoreCase !== null ? ignoreCase : true;
    var itemData = { item: null, index: null };
    if (inputVal && inputVal.length) {
        var strLength = inputVal.length;
        var queryStr = ignoreCase ? inputVal.toLocaleLowerCase() : inputVal;
        for (var i = 0, itemsData = listItems; i < itemsData.length; i++) {
            var item = itemsData[i];
            var text = (ignoreCase ? item.textContent.toLocaleLowerCase() : item.textContent).replace(/^\s+|\s+$/g, '');
            if ((searchType === 'Equal' && text === queryStr) || (searchType === 'StartsWith' && text.substr(0, strLength) === queryStr)) {
                itemData.item = item;
                itemData.index = i;
                return { item: item, index: i };
            }
        }
        return itemData;
    }
    return itemData;
}
