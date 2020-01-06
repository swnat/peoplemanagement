import { Schedule } from '../base/schedule';
/**
 * Keyboard interaction
 */
export declare class KeyboardInteraction {
    /**
     * Constructor
     */
    private parent;
    private initialTarget;
    private selectedCells;
    private keyConfigs;
    private keyboardModule;
    constructor(parent: Schedule);
    private keyActionHandler;
    private addEventListener;
    private removeEventListener;
    private onCellMouseDown;
    onMouseSelection(e: MouseEvent): void;
    private getClosestCell;
    private onMoveup;
    private processEnter;
    private getSelectedElements;
    private getCells;
    private focusFirstCell;
    private isInverseTableSelect;
    /** @hidden */
    selectCells(isMultiple: boolean, targetCell: HTMLTableCellElement): void;
    private selectAppointment;
    private selectAppointmentElementFromWorkCell;
    private getAllDayCells;
    private getAppointmentElements;
    private getAppointmentElementsByGuid;
    private getUniqueAppointmentElements;
    private getWorkCellFromAppointmentElement;
    private processViewNavigation;
    private processUp;
    private processDown;
    private processLeftRight;
    private getQuickPopupElement;
    private isCancelLeftRightAction;
    private processRight;
    private processLeft;
    private calculateNextPrevDate;
    private getFocusableElements;
    private processTabOnPopup;
    private processTab;
    private processDelete;
    private processEscape;
    private isPreventAction;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the keyboard module.
     * @return {void}
     * @private
     */
    destroy(): void;
}
