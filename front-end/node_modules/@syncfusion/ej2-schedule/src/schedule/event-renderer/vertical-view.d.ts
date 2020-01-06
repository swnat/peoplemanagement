import { EventFieldsMapping } from '../base/interface';
import { Schedule } from '../base/schedule';
import { EventBase } from './event-base';
/**
 * Vertical view appointment rendering
 */
export declare class VerticalEvent extends EventBase {
    dateRender: Date[][];
    private renderedEvents;
    private renderedAllDayEvents;
    private overlapEvents;
    private moreEvents;
    private overlapList;
    private allDayEvents;
    private slotCount;
    private interval;
    private allDayLevel;
    private startHour;
    private endHour;
    private element;
    private allDayElement;
    private animation;
    fields: EventFieldsMapping;
    private cellHeight;
    private resources;
    /**
     * Constructor for vertical view
     */
    constructor(parent: Schedule);
    renderAppointments(): void;
    initializeValues(): void;
    private isValidEvent;
    getHeight(start: Date, end: Date): number;
    private appendEvent;
    private processBlockEvents;
    private renderBlockEvents;
    private renderEvents;
    private setValues;
    private getResourceList;
    private createAppointmentElement;
    private createMoreIndicator;
    private renderSpannedIcon;
    isSpannedEvent(record: {
        [key: string]: Object;
    }, day: number, resource: number): {
        [key: string]: Object;
    };
    private renderAllDayEvents;
    private renderNormalEvents;
    private getEventWidth;
    private getEventLeft;
    getTopValue(date: Date, day: number, resource: number): number;
    private getOverlapIndex;
    private adjustOverlapElements;
    private setAllDayRowHeight;
    private addOrRemoveClass;
    private getEventHeight;
    private rowExpandCollapse;
    private animationUiUpdate;
}
