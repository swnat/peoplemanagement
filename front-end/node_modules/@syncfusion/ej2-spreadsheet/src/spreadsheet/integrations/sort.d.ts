import { Spreadsheet } from '../index';
/**
 * `Sort` module is used to handle the sort action in Spreadsheet.
 */
export declare class Sort {
    private parent;
    /**
     * Constructor for sort module.
     */
    constructor(parent: Spreadsheet);
    /**
     * To destroy the sort module.
     * @return {void}
     */
    protected destroy(): void;
    private addEventListener;
    private removeEventListener;
    /**
     * Gets the module name.
     * @returns string
     */
    protected getModuleName(): string;
    /**
     * Validates the range and returns false when invalid.
     */
    private isValidSortRange;
    /**
     * Shows the range error alert dialog.
     * @param error - range error string.
     */
    private sortRangeAlertHandler;
    /**
     * Initiates sort process.
     */
    private beforeSortHandler;
    /**
     * Invoked when the sort action is completed.
     */
    private sortCompleteHandler;
    /**
     * Initiates the custom sort dialog.
     */
    private initiateCustomSortHandler;
    /**
     * Validates the errors of the sort criteria and displays the error.
     * @param json - listview datasource.
     * @param dialogElem - dialog content element.
     * @param errorElem - element to display error.
     */
    private validateError;
    /**
     * Creates all the elements and generates the dialog content element.
     */
    private customSortContent;
    /**
     * Gets the fields data from the selected range.
     */
    private getFields;
    /**
     * Creates the header tab for the custom sort dialog.
     * @param dialogElem - dialog content element.
     * @param listviewObj - listview instance.
     * @param fields - fields data.
     */
    private setHeaderTab;
    /**
     * Creates a listview instance.
     * @param listId - unique id of the list item.
     */
    private getCustomListview;
    /**
     * Triggers the click event for delete icon.
     * @param element - current list item element.
     * @param listviewObj - listview instance.
     */
    private deleteHandler;
    /**
     * Renders the dropdown and radio button components inside list item.
     * @param id - unique id of the list item.
     * @param listviewObj - listview instance.
     * @param containsHeader - data contains header.
     * @param fields - fields data.
     */
    private renderListItem;
    /**
     * Sets the new value of the radio button.
     * @param listviewObj - listview instance.
     * @param id - unique id of the list item.
     * @param value - new value.
     */
    private setRadioBtnValue;
    /**
     * Clears the error from the dialog.
     * @param dialogElem - dialog content element.
     */
    private clearError;
}
