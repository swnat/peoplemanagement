import { Gantt } from '../base/gantt';
import { Tooltip } from '@syncfusion/ej2-popups';
import { TaskbarEdit } from '../actions/taskbar-edit';
/**
 * File for handling taskbar editing tooltip in Gantt.
 */
export declare class EditTooltip {
    parent: Gantt;
    toolTipObj: Tooltip;
    taskbarTooltipContainer: HTMLElement;
    taskbarTooltipDiv: HTMLElement;
    private taskbarEdit;
    constructor(gantt: Gantt, taskbarEdit: TaskbarEdit);
    /**
     * To create tooltip.
     * @return {void}
     * @private
     */
    createTooltip(opensOn: string, mouseTrail: boolean, target?: string): void;
    /**
     * To show/hide taskbar edit tooltip.
     * @return {void}
     * @private
     */
    showHideTaskbarEditTooltip(bool: boolean): void;
    /**
     * To update tooltip content and position.
     * @return {void}
     * @private
     */
    updateTooltip(): void;
    /**
     * To get updated tooltip text.
     * @return {void}
     * @private
     */
    private getTooltipText;
}
