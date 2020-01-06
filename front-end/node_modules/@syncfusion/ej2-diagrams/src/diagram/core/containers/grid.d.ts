import { DiagramElement } from '../elements/diagram-element';
import { Canvas } from './canvas';
import { Container } from './container';
import { Size } from '../../primitives/size';
import { ShapeStyleModel } from '../appearance-model';
/**
 * Grid panel is used to arrange the children in a table like structure
 */
export declare class GridPanel extends Container {
    private childTable;
    /** @private */
    rowDefinitions(): RowDefinition[];
    private rowDefns;
    /** @private */
    columnDefinitions(): ColumnDefinition[];
    private colDefns;
    /** @private */
    rows: GridRow[];
    cellStyle: ShapeStyleModel;
    private desiredRowHeight;
    private desiredCellWidth;
    addObject(obj: DiagramElement, rowId?: number, columnId?: number, rowSpan?: number, columnSpan?: number): void;
    private addObjectToCell;
    /** @private */
    updateProperties(offsetX: number, offsetY: number, width: number, height: number): void;
    /** @private */
    setDefinitions(rows: RowDefinition[], columns: ColumnDefinition[]): void;
    /** @private */
    private addCellInRow;
    /** @private */
    private calculateSize;
    /** @private */
    updateRowHeight(rowId: number, height: number, isConsiderChild: boolean, padding?: number): void;
    private setTextRefresh;
    /** @private */
    updateColumnWidth(colId: number, width: number, isConsiderChild: boolean, padding?: number): void;
    private calculateCellWidth;
    private calculateCellHeight;
    private calculateCellSizeBasedOnChildren;
    private calculateCellWidthBasedOnChildren;
    private calculateCellHeightBasedOnChildren;
    /** @private */
    addRow(rowId: number, rowDefn: RowDefinition, isMeasure: boolean): void;
    /** @private */
    addColumn(columnId: number, column: ColumnDefinition, isMeasure?: boolean): void;
    /** @private */
    removeRow(rowId: number): void;
    /** @private */
    removeColumn(columnId: number): void;
    /** @private */
    updateRowIndex(currentIndex: number, newIndex: number): void;
    /** @private */
    updateColumnIndex(startRowIndex: number, currentIndex: number, newIndex: number): void;
    /** @private */
    measure(availableSize: Size): Size;
    /** @private */
    arrange(desiredSize: Size, isChange?: boolean): Size;
}
/**
 * Defines the behavior of the RowDefinition of node
 */
export declare class RowDefinition {
    /** returns the height of node */
    height: number;
}
/**
 * Defines the behavior of the ColumnDefinition of node
 */
export declare class ColumnDefinition {
    /** returns the width of node */
    width: number;
}
/** @private */
export declare class GridRow {
    cells: GridCell[];
}
/** @private */
export declare class GridCell extends Canvas {
    columnSpan: number;
    rowSpan: number;
    desiredCellWidth: number;
    desiredCellHeight: number;
}
