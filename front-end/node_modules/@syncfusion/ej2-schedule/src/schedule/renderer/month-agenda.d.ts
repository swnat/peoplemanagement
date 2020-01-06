import { CellClickEventArgs, NotifyEventArgs } from '../base/interface';
import { AgendaBase } from '../event-renderer/agenda-base';
import { Schedule } from '../base/schedule';
import { Month } from './month';
/**
 * month agenda view
 */
export declare class MonthAgenda extends Month {
    dayNameFormat: string;
    viewClass: string;
    agendaDates: {
        [key: string]: Date;
    };
    agendaBase: AgendaBase;
    private monthAgendaDate;
    /**
     * Constructor
     */
    constructor(parent: Schedule);
    renderAppointmentContainer(): void;
    getDayNameFormat(): string;
    private setEventWrapperHeight;
    onDataReady(args: NotifyEventArgs): void;
    onCellClick(event: CellClickEventArgs): void;
    private onEventRender;
    private appointmentFiltering;
    private clearElements;
    private appendAppContainer;
    getNextPreviousDate(type: string): Date;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
