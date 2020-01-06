/**
 * crud-actions.ts file
 */
import { ITreeData } from '../base/interface';
import { TreeGrid } from '../base';
export declare function editAction(details: {
    value: ITreeData;
    action: string;
}, control: TreeGrid, isSelfReference: boolean, addRowIndex: number, selectedIndex: number, columnName?: string, addRowRecord?: ITreeData): void;
export declare function addAction(details: {
    value: ITreeData;
    action: string;
}, treeData: Object[], control: TreeGrid, isSelfReference: boolean, addRowIndex: number, selectedIndex: number, addRowRecord: ITreeData): {
    value: Object;
    isSkip: boolean;
};
export declare function removeChildRecords(childRecords: ITreeData[], modifiedData: object, action: string, key: string, control: TreeGrid, isSelfReference: boolean, originalData?: ITreeData, columnName?: string): boolean;
export declare function updateParentRow(key: string, record: ITreeData, action: string, control: TreeGrid, isSelfReference: boolean, child?: ITreeData): void;
