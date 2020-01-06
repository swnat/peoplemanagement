import { ITaskData, IGanttData } from './interface';
/** @hidden */
export declare function parentsUntil(elem: Element, selector: string, isID?: boolean): Element;
export declare function isScheduledTask(ganttProp: ITaskData): boolean;
export declare function getSwapKey(obj: Object): object;
export declare function isRemoteData(dataSource: object): boolean;
export declare function getTaskData(records: IGanttData[]): object[];
export declare function formatString(str: string, args: string[]): string;
export declare function getIndex(value: any, key1: string, collection: any, key2?: string): number;
