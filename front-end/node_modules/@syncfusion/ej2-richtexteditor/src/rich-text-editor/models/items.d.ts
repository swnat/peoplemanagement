/**
 * Export items model
 */
import { IToolsItems, IDropDownItemModel, IRichTextEditor } from '../base/interface';
export declare let templateItems: string[];
export declare let tools: {
    [key: string]: IToolsItems;
};
export declare let alignmentItems: IDropDownItemModel[];
export declare let imageAlignItems: IDropDownItemModel[];
export declare let imageDisplayItems: IDropDownItemModel[];
export declare let tableRowsItems: IDropDownItemModel[];
export declare let tableColumnsItems: IDropDownItemModel[];
export declare let TableCellVerticalAlignItems: IDropDownItemModel[];
export declare let TableStyleItems: IDropDownItemModel[];
export declare function updateDropDownLocale(self: IRichTextEditor): void;
