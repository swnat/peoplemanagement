/**
 * Open properties.
 */
import { Spreadsheet } from '../index';
export declare class Open {
    private parent;
    constructor(parent: Spreadsheet);
    /**
     * Adding event listener for success and failure
     */
    private addEventListener;
    /**
     * Removing event listener for success and failure
     */
    private removeEventListener;
    /**
     * Rendering upload component for importing files.
     */
    private renderFileUpload;
    /**
     * Process after select the excel and image file.
     * @param {Event} args - File select native event.
     */
    private fileSelect;
    /**
     * File open success event declaration.
     * @param {string} response - File open success response text.
     */
    private openSuccess;
    /**
     * File open failure event declaration.
     * @param {object} args - Open failure arguments.
     */
    private openFailed;
    /**
     * To Remove the event listeners.
     */
    destroy(): void;
    /**
     * Get the sheet open module name.
     */
    getModuleName(): string;
}
