import { Schedule } from '../base/schedule';
import { VerticalView } from './vertical-view';
import { TdData, TimeSlotData } from '../base/interface';
/**
 * timeline view
 */
export declare class TimelineViews extends VerticalView {
    constructor(parent: Schedule);
    getLeftPanelElement(): HTMLElement;
    scrollTopPanel(target: HTMLElement): void;
    scrollToWorkHour(): void;
    scrollToHour(hour: string): void;
    generateColumnLevels(): TdData[][];
    private generateTimeSlots;
    changeCurrentTimePosition(): void;
    private getLeftFromDateTime;
    private getWorkCellWidth;
    renderHeader(): void;
    createAllDayRow(table: Element, tdData: TdData[]): void;
    getCurrentTimeIndicatorIndex(): number[];
    renderContent(): void;
    private getRowCount;
    private getResourceTdData;
    renderContentTable(table: Element): void;
    getContentRows(): Element[];
    getContentTdClass(r: TimeSlotData): string[];
    renderEvents(): void;
    protected getModuleName(): string;
}
