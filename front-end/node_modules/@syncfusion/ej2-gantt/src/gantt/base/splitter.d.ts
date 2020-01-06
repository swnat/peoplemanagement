import { Gantt } from '../base/gantt';
import { Splitter as SplitterLayout } from '@syncfusion/ej2-layouts';
import { SplitterSettingsModel } from '../models/models';
/**
 * Splitter module is used to define the splitter position in Gantt layout.
 */
export declare class Splitter {
    private parent;
    splitterObject: SplitterLayout;
    splitterPreviousPositionGrid: string;
    splitterPreviousPositionChart: string;
    constructor(ganttObj?: Gantt);
    /**
     * @private
     */
    renderSplitter(): void;
    /**
     * @private
     */
    calculateSplitterPosition(splitter: SplitterSettingsModel, isDynamic?: boolean): string;
    /**
     *
     */
    private getSpliterPositionInPercentage;
    /**
     *
     */
    private getTotalColumnWidthByIndex;
    /**
     * @private
     */
    updateSplitterPosition(): void;
    /**
     * @private
     */
    triggerCustomResizedEvent(): void;
    private destroy;
}
