import { Schedule } from '../base/schedule';
/**
 * Tooltip for Schedule
 */
export declare class EventTooltip {
    private parent;
    private tooltipObj;
    constructor(parent: Schedule);
    private getTargets;
    private onBeforeOpen;
    private onBeforeClose;
    private onBeforeRender;
    private setContent;
    close(): void;
    /**
     * To destroy the event tooltip.
     * @return {void}
     * @private
     */
    destroy(): void;
}
