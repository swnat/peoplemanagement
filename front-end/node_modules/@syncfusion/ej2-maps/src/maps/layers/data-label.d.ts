import { Maps } from '../../index';
import { LayerSettings } from '../index';
/**
 * DataLabel Module used to render the maps datalabel
 */
export declare class DataLabel {
    private maps;
    private dataLabelObject;
    /**
     * Datalabel collections
     * @private
     */
    dataLabelCollections: Object[];
    private value;
    constructor(maps: Maps);
    private getDataLabel;
    /**
     * To render label for maps
     * @param layer
     * @param layerIndex
     * @param shape
     * @param layerData
     * @param group
     * @param labelTemplateElement
     * @param index
     */
    renderLabel(layer: LayerSettings, layerIndex: number, shape: object, layerData: object[], group: Element, labelTemplateElement: HTMLElement, index: number, intersect: object[]): void;
    private getPoint;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the layers.
     * @return {void}
     * @private
     */
    destroy(maps: Maps): void;
}
