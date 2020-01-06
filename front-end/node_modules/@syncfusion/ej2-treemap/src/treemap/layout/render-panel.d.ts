import { TreeMap } from '../treemap';
import { Rect } from '../utils/helper';
/**
 * To calculate and render the shape layer
 */
export declare class LayoutPanel {
    private treemap;
    private currentRect;
    layoutGroup: Element;
    private renderer;
    renderItems: Object[];
    private parentData;
    constructor(treemap: TreeMap);
    processLayoutPanel(): void;
    private getDrilldownData;
    calculateLayoutItems(data: Object, rect: Rect): void;
    private computeSliceAndDiceDimensional;
    private sliceAndDiceProcess;
    private computeSquarifyDimensional;
    private calculateChildrenLayout;
    private performRowsLayout;
    private aspectRatio;
    private findMaxAspectRatio;
    private cutArea;
    private getCoordinates;
    private computeTotalArea;
    onDemandProcess(childItems: Object): void;
    renderLayoutItems(renderData: Object): void;
    private renderItemText;
    private getItemColor;
    /**
     * To find saturated color for datalabel
     */
    private getSaturatedColor;
    private renderTemplate;
    private labelInterSectAction;
}
