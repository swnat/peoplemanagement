import { Schedule } from '../base/schedule';
import { CellClickEventArgs } from '../base/interface';
/**
 * Work cell interactions
 */
export declare class WorkCellInteraction {
    private parent;
    constructor(parent: Schedule);
    cellMouseDown(e: Event): void;
    cellClick(e: Event & MouseEvent): void;
    cellDblClick(e: Event): void;
    serializingData(clickArgs: CellClickEventArgs, e: Event): CellClickEventArgs;
    onHover(e: MouseEvent): void;
    private isPreventAction;
}
