import { L10n } from '@syncfusion/ej2-base';
import { CalendarUtil, CalendarType } from '../common/calendar-util';
/**
 * Date Generator from Recurrence Rule
 */
export declare function generateSummary(rule: string, localeObject: L10n, locale: string, calendarType?: CalendarType): string;
export declare function generate(startDate: Date, rule: string, excludeDate: string, startDayOfWeek: number, maximumCount?: number, viewDate?: Date, calendarMode?: CalendarType, oldTimezone?: string, newTimezone?: string): number[];
export declare function getDateFromRecurrenceDateString(recDateString: string): Date;
export declare function extractObjectFromRule(rules: String): RecRule;
export declare function getCalendarUtil(calendarMode: CalendarType): CalendarUtil;
/** @hidden */
export interface RecRule {
    freq: FreqType;
    interval: number;
    count: Number;
    until: Date;
    day: string[];
    wkst: string;
    month: number[];
    weekNo: number[];
    monthDay: number[];
    yearDay: number[];
    setPosition: number;
    validRules: string[];
    recExceptionCount?: number;
}
/** @hidden */
export declare type FreqType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export declare function getRecurrenceStringFromDate(date: Date): string;
