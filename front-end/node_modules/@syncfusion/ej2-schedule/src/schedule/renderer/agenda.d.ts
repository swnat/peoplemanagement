import { IRenderer } from '../base/interface';
import { AgendaBase } from '../event-renderer/agenda-base';
import { Schedule } from '../base/schedule';
import { ViewBase } from './view-base';
/**
 * agenda view
 */
export declare class Agenda extends ViewBase implements IRenderer {
    viewClass: string;
    isInverseTableSelect: boolean;
    agendaDates: {
        [key: string]: Date;
    };
    virtualScrollTop: number;
    agendaBase: AgendaBase;
    dataSource: Object[];
    /**
     * Constructor for agenda view
     */
    constructor(parent: Schedule);
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    renderLayout(): void;
    private eventLoad;
    private refreshEvent;
    private renderInitialContent;
    renderContent(tBody: Element, agendaDate: Date, lastDate: Date): void;
    private agendaScrolling;
    private virtualScrolling;
    private getElementFromScrollerPosition;
    private updateHeaderText;
    private getPreviousNextDate;
    private appointmentFiltering;
    getStartDateFromEndDate(endDate: Date): Date;
    getEndDateFromStartDate(startDate: Date): Date;
    getNextPreviousDate(type: string): Date;
    startDate(): Date;
    endDate(): Date;
    getDateRangeText(date?: Date): string;
    dayNavigationClick(e: Event): void;
    private wireEvents;
    private unWireEvents;
    addEventListener(): void;
    removeEventListener(): void;
    private onAgendaScrollUiUpdate;
    /**
     * To destroy the agenda.
     * @return {void}
     * @private
     */
    destroy(): void;
}
