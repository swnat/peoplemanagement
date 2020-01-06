import { Internationalization } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
export declare function toFraction(val: number): string;
/**
 * @hidden
 */
export declare function getGcd(a: string | number, b: string | number): number;
/**
 * @hidden
 */
export declare function intToDate(val: number): Date;
/**
 * @hidden
 */
export declare function dateToInt(val: any, isTime?: boolean): number;
/**
 * @hidden
 */
export declare function isDateTime(date: any): boolean;
/**
 * @hidden
 */
export declare function isNumber(val: string | number): boolean;
/**
 * @hidden
 */
export declare function toDate(text: Date | string | number, intl: Internationalization): ToDateArgs;
export interface ToDateArgs {
    dateObj: Date;
    type: string;
    isCustom: boolean;
}
