import { Container } from './container';
import { Orientation } from '../../enum/enum';
import { Size } from '../../primitives/size';
/**
 * StackPanel module is used to arrange its children in a line
 */
export declare class StackPanel extends Container {
    /**
     * Gets/Sets the orientation of the stack panel
     */
    orientation: Orientation;
    /**
     * Not applicable for canvas
     * to avoid the child size updation with respect to parent ser true
     * @private
     */
    measureChildren: boolean;
    /**
     * Measures the minimum space that the panel needs
     * @param availableSize
     */
    measure(availableSize: Size): Size;
    /**
     * Arranges the child elements of the stack panel
     * @param desiredSize
     */
    arrange(desiredSize: Size): Size;
    /**
     * Measures the minimum space that the panel needs
     * @param availableSize
     */
    private measureStackPanel;
    private arrangeStackPanel;
    private updateHorizontalStack;
    private updateVerticalStack;
    private arrangeHorizontalStack;
    private arrangeVerticalStack;
    protected stretchChildren(size: Size): void;
    private applyChildMargin;
}
