import { Diagram } from '../diagram';
import { HistoryEntry } from '../diagram/history';
/**
 * Undo redo function used for revert and restore the changes
 */
export declare class UndoRedo {
    private groupUndo;
    private childTable;
    private historyCount;
    private hasGroup;
    private groupCount;
    /** @private */
    initHistory(diagram: Diagram): void;
    /** @private */
    addHistoryEntry(entry: HistoryEntry, diagram: Diagram): void;
    /** @private */
    applyLimit(list: HistoryEntry, stackLimit: number, diagram: Diagram, limitHistory?: boolean): void;
    /** @private */
    clearHistory(diagram: Diagram): void;
    private setEntryLimit;
    private limitHistoryStack;
    private removeFromStack;
    /** @private */
    undo(diagram: Diagram): void;
    private getHistoryChangeEvent;
    private getHistoryList;
    private getHistroyObject;
    private undoGroupAction;
    private undoEntry;
    private checkNodeObject;
    private group;
    private unGroup;
    private ignoreProperty;
    private getProperty;
    private recordLaneOrPhaseCollectionChanged;
    private recordAnnotationChanged;
    private recordChildCollectionChanged;
    private recordStackPositionChanged;
    private recordGridSizeChanged;
    private recordLanePositionChanged;
    private recordPortChanged;
    private recordPropertyChanged;
    private recordSegmentChanged;
    private segmentChanged;
    private recordPositionChanged;
    private positionChanged;
    private recordSizeChanged;
    private sizeChanged;
    private recordRotationChanged;
    private rotationChanged;
    private recordConnectionChanged;
    private connectionChanged;
    private recordCollectionChanged;
    private recordLabelCollectionChanged;
    private recordPortCollectionChanged;
    /** @private */
    redo(diagram: Diagram): void;
    private redoGroupAction;
    private redoEntry;
    private getUndoEntry;
    private getRedoEntry;
    /**
     * Constructor for the undo redo module
     * @private
     */
    constructor();
    /**
     * To destroy the undo redo module
     * @return {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
