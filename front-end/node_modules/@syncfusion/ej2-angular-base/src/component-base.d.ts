import { ElementRef } from '@angular/core';
export interface IComponentBase {
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
export declare class ComponentBase<T> {
    element: HTMLElement;
    tags: string[];
    private ngAttr;
    private srenderer;
    protected isProtectedOnChange: boolean;
    private isAngular;
    protected oldProperties: {
        [key: string]: Object;
    };
    protected changedProperties: {
        [key: string]: Object;
    };
    protected finalUpdate: Function;
    protected isUpdated: boolean;
    ngEle: ElementRef;
    private tagObjects;
    onPropertyChanged: (newProp: Object, oldProp: Object) => void;
    appendTo: (ele: string | HTMLElement) => void;
    setProperties: (obj: Object, muteOnChange: boolean) => void;
    properties: Object;
    dataBind: Function;
    private createElement;
    protected saveChanges(key: string, newValue: Object, oldValue: Object): void;
    destroy: Function;
    private registeredTemplate;
    private complexTemplate;
    private ngBoundedEvents;
    ngOnInit(): void;
    getAngularAttr(ele: Element): string;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    clearTemplate(templateNames?: string[], index?: any): void;
    ngAfterContentChecked(): void;
    protected registerEvents(eventList: string[]): void;
    protected twoWaySetter(newVal: Object, prop: string): void;
    protected addTwoWay(propList: string[]): void;
    addEventListener(eventName: string, handler: Function): void;
    removeEventListener(eventName: string, handler: Function): void;
    trigger(eventName: string, eventArgs: Object, success?: Function): void;
}
