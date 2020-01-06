import { Workbook } from '../base/index';
import { SaveWorker } from '../workers/save-worker';
/**
 * @hidden
 * The `WorkbookSave` module is used to handle the save action in Workbook library.
 */
export declare class WorkbookSave extends SaveWorker {
    private isProcessCompleted;
    private saveSettings;
    private saveJSON;
    private isFullPost;
    private needBlobData;
    private customParams;
    /**
     * Constructor for WorkbookSave module in Workbook library.
     * @private
     */
    constructor(parent: Workbook);
    /**
     * Get the module name.
     * @returns string
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the WorkbookSave module.
     * @return {void}
     * @hidden
     */
    destroy(): void;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * Initiate save process.
     * @hidden
     */
    private initiateSave;
    /**
     * Update save JSON with basic settings.
     * @hidden
     */
    private updateBasicSettings;
    /**
     * Process sheets properties.
     * @hidden
     */
    private processSheets;
    /**
     * Update processed sheet data.
     * @hidden
     */
    private updateSheet;
    private getSheetLength;
    /**
     * Save process.
     * @hidden
     */
    private save;
    /**
     * Update final save data.
     * @hidden
     */
    private updateSaveResult;
    private ClientFileDownload;
    private initiateFullPostSave;
    /**
     * Get stringified workbook object.
     * @hidden
     */
    private getStringifyObject;
    private getFileNameWithExtension;
    private getFileExtension;
}
