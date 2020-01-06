import { Schedule } from '../base/schedule';
import { TimelineEvent } from './timeline-view';
/**
 * Year view events render
 */
export declare class YearEvent extends TimelineEvent {
    cellHeader: number;
    /**
     * Constructor for year events
     */
    constructor(parent: Schedule);
    renderAppointments(): void;
    private yearViewEvents;
    private timelineYearViewEvents;
    private renderEvent;
    private renderMoreIndicatior;
    private createEventElement;
    private isSpannedEvent;
    getOverlapEvents(date: Date, appointments: {
        [key: string]: Object;
    }[]): Object[];
}
