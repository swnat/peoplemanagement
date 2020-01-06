import { IFileManager, ReadArgs, FileDetails } from '../base/interface';
import { SelectedEventArgs } from '@syncfusion/ej2-inputs';
export declare function createDialog(parent: IFileManager, text: string, e?: ReadArgs | SelectedEventArgs, details?: FileDetails, replaceItems?: string[]): void;
export declare function createExtDialog(parent: IFileManager, text: string, replaceItems?: string[], newPath?: string): void;
export declare function createImageDialog(parent: IFileManager, header: string, imageUrl: string): void;
