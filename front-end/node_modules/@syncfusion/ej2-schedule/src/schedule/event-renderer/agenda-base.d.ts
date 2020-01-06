import { ViewBase } from '../renderer/view-base';
import { Schedule } from '../base/schedule';
export declare class AgendaBase {
    parent: Schedule;
    viewBase: ViewBase;
    /**
     * Constructor for AgendaBase
     */
    constructor(parent: Schedule);
    createAgendaContentElement(type: string, listData: {
        [key: string]: Object;
    }[], aTd: Element, groupOrder?: string[], groupIndex?: number): Element;
    createAppointment(event: {
        [key: string]: Object;
    }): HTMLElement[];
    processAgendaEvents(events: Object[]): Object[];
    wireEventActions(): void;
    calculateResourceTableElement(tBody: Element, noOfDays: number, agendaDate: Date): void;
    private createResourceTableRow;
    createDateHeaderElement(date: Date): Element;
    renderEmptyContent(tBody: Element, agendaDate: Date): void;
    createTableRowElement(date: Date, type: string): Element;
}
