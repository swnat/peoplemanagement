import { ActionBase } from '../actions/action-base';
/**
 * Schedule events resize actions
 */
export declare class Resize extends ActionBase {
    wireResizeEvent(element: HTMLElement): void;
    private resizeHelper;
    private resizeStart;
    private resizing;
    updateResizingDirection(e: MouseEvent & TouchEvent): void;
    private monthResizing;
    private resizeStop;
    private verticalResizing;
    private horizontalResizing;
    private getTopBottomStyles;
    private getLeftRightStyles;
    private resizeValidation;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
