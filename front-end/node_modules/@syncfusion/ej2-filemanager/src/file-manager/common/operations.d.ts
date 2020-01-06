import { IFileManager } from '../base/interface';
/**
 * Function to read the content from given path in File Manager.
 * @private
 */
export declare function read(parent: IFileManager, event: string, path: string): void;
/**
 * Function to create new folder in File Manager.
 * @private
 */
export declare function createFolder(parent: IFileManager, itemName: string): void;
/**
 * Function to filter the files in File Manager.
 * @private
 */
export declare function filter(parent: IFileManager, event: string): void;
/**
 * Function to rename the folder/file in File Manager.
 * @private
 */
export declare function rename(parent: IFileManager, path: string, itemNewName: string): void;
/**
 * Function to paste file's and folder's in File Manager.
 * @private
 */
export declare function paste(parent: IFileManager, path: string, names: string[], targetPath: string, pasteOperation: string, renameItems?: string[], actionRecords?: Object[]): void;
/**
 * Function to delete file's and folder's in File Manager.
 * @private
 */
export declare function Delete(parent: IFileManager, items: string[], path: string, operation: string): void;
/**
 * Function to get details of file's and folder's in File Manager.
 * @private
 */
export declare function GetDetails(parent: IFileManager, names: string[], path: string, operation: string): void;
export declare function Search(parent: IFileManager, event: string, path: string, searchString: string, showHiddenItems?: boolean, caseSensitive?: boolean): void;
export declare function Download(parent: IFileManager, path: string, items: string[]): void;
