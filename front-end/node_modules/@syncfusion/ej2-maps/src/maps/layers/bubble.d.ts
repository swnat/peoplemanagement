import { Maps } from '../../index';
import { BubbleSettingsModel } from '../index';
import { LayerSettings } from '../index';
/**
 * Bubble module class
 */
export declare class Bubble {
    private maps;
    bubbleCollection: Object[];
    /**
     * Bubble Id for current layer
     */
    id: string;
    constructor(maps: Maps);
    /**
     * To render bubble
     */
    renderBubble(bubbleSettings: BubbleSettingsModel, shapeData: object, color: string, range: {
        min: number;
        max: number;
    }, bubbleIndex: number, dataIndex: number, layerIndex: number, layer: LayerSettings, group: Element, bubbleID?: string): void;
    private getPoints;
    /**
     * To check and trigger bubble click event
     */
    bubbleClick(e: PointerEvent): void;
    /**
     * To get bubble from target id
     */
    private getbubble;
    /**
     * To check and trigger bubble move event
     */
    bubbleMove(e: PointerEvent): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the bubble.
     * @return {void}
     * @private
     */
    destroy(maps: Maps): void;
}
