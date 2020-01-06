import { Maps } from '../../index';
/**
 * Highlight module class
 */
export declare class Highlight {
    private maps;
    private highlightSettings;
    constructor(maps: Maps);
    /**
     * To bind events for highlight module
     */
    private addEventListener;
    /**
     * To unbind events for highlight module
     */
    private removeEventListener;
    /**
     * Public method for highlight module
     */
    addHighlight(layerIndex: number, name: string, enable: boolean): void;
    private mouseMove;
    private mapHighlight;
    private highlightMap;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the highlight.
     * @return {void}
     * @private
     */
    destroy(maps: Maps): void;
}
