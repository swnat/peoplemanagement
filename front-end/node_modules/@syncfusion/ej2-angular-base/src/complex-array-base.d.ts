import { QueryList, SimpleChanges } from '@angular/core';
/**
 * Complex Array Base module
 */
export interface IChildChange {
    index: number;
    change: Object;
}
export declare class ComplexBase<T> {
    isUpdated: boolean;
    hasChanges?: boolean;
    index?: number;
    propCollection?: {
        [key: string]: Object;
    };
    property?: string;
    tags?: string[];
    private tagObjects?;
    private registeredTemplate;
    ngOnInit(): void;
    protected registerEvents(eventList: string[]): void;
    ngOnChanges(changes: SimpleChanges): void;
    clearTemplate(templateNames: string[]): void;
    getProperties(): {
        [key: string]: Object;
    };
    isChanged(): boolean;
    ngAfterContentChecked(): void;
    ngAfterViewChecked(): void;
}
export declare class ArrayBase<T> {
    isInitChanges: boolean;
    list: T[] & ComplexBase<T>[];
    children: QueryList<T>;
    hasChanges: boolean;
    private propertyName;
    hasNewChildren: boolean;
    constructor(propertyName: string);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    getProperties(): Object[];
    isChanged(): boolean;
    clearTemplate(templateNames: string[]): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
}
