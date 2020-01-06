/**
 * Time zone
 */
export declare class Timezone {
    offset(date: Date, timezone: string): number;
    convert(date: Date, fromOffset: number & string, toOffset: number & string): Date;
    add(date: Date, timezone: string): Date;
    remove(date: Date, timezone: string): Date;
    removeLocalOffset(date: Date): Date;
    getLocalTimezoneName(): string;
}
export declare let timezoneData: {
    [key: string]: Object;
}[];
