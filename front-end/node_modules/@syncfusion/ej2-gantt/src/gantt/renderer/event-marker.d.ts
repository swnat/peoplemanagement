/**
 * To render and update event markers in Gantt
 */
import { Gantt } from '../base/gantt';
export declare class EventMarker {
    parent: Gantt;
    eventMarkersContainer: HTMLElement;
    constructor(gantt: Gantt);
    /**
     * @private
     */
    renderEventMarkers(): void;
    /**
     * @private
     */
    removeContainer(): void;
    /**
     * Method to get event markers as html string
     */
    private getEventMarkersElements;
    /**
     * @private
     */
    updateContainerHeight(): void;
}
