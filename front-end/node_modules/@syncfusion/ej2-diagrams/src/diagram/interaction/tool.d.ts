import { PointModel } from '../primitives/point-model';
import { Node } from '../objects/node';
import { Connector, BezierSegment } from '../objects/connector';
import { NodeModel } from '../objects/node-model';
import { IElement } from '../objects/interface/IElement';
import { IDoubleClickEventArgs, IClickEventArgs } from '../objects/interface/IElement';
import { CommandHandler } from './command-manager';
import { Rect } from '../primitives/rect';
import { ObjectTypes } from './../enum/enum';
import { SelectorModel } from '../objects/node-model';
import { MouseEventArgs } from './event-handlers';
import { Actions } from './actions';
/**
 * Defines the interactive tools
 */
export declare class ToolBase {
    /**
     * Initializes the tool
     * @param command Command that is corresponding to the current action
     */
    constructor(command: CommandHandler, protectChange?: boolean);
    /**
     * Command that is corresponding to the current action
     */
    protected commandHandler: CommandHandler;
    /**
     * Sets/Gets whether the interaction is being done
     */
    protected inAction: boolean;
    /**
     * Sets/Gets the protect change
     */
    protected isProtectChange: boolean;
    /**
     * Sets/Gets the current mouse position
     */
    protected currentPosition: PointModel;
    /**
     * Sets/Gets the previous mouse position
     */
    prevPosition: PointModel;
    /**
     * Sets/Gets the initial mouse position
     */
    protected startPosition: PointModel;
    /**
     * Sets/Gets the current element that is under mouse
     */
    protected currentElement: IElement;
    /**   @private  */
    blocked: boolean;
    protected isTooltipVisible: boolean;
    /** @private */
    childTable: {};
    /**
     * Sets/Gets the previous object when mouse down
     */
    protected undoElement: SelectorModel;
    private checkProperty;
    protected undoParentElement: SelectorModel;
    protected startAction(currentElement: IElement): void;
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    checkPropertyValue(): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    protected endAction(): void;
    /**   @private  */
    mouseWheel(args: MouseEventArgs): void;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
    protected updateSize(shape: SelectorModel | NodeModel, startPoint: PointModel, endPoint: PointModel, corner: string, initialBounds: Rect, angle?: number): Rect;
    protected getPivot(corner: string): PointModel;
}
/**
 * Helps to select the objects
 */
export declare class SelectTool extends ToolBase {
    private action;
    constructor(commandHandler: CommandHandler, protectChange: boolean, action?: Actions);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
}
/**
 * Helps to edit the selected connectors
 */
export declare class ConnectTool extends ToolBase {
    protected endPoint: string;
    /** @private */
    selectedSegment: BezierSegment;
    constructor(commandHandler: CommandHandler, endPoint: string);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
    private getTooltipContent;
    private checkConnect;
    /**   @private  */
    endAction(): void;
}
/**
 * Drags the selected objects
 */
export declare class MoveTool extends ToolBase {
    /**
     * Sets/Gets the previous mouse position
     */
    prevPosition: PointModel;
    private initialOffset;
    /**   @private  */
    currentTarget: IElement;
    private objectType;
    private portId;
    private source;
    constructor(commandHandler: CommandHandler, objType?: ObjectTypes);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseUp(args: MouseEventArgs, isPreventHistory?: boolean): void;
    private getBlazorPositionChangeEventArgs;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    private getTooltipContent;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Rotates the selected objects
 */
export declare class RotateTool extends ToolBase {
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    private getTooltipContent;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Scales the selected objects
 */
export declare class ResizeTool extends ToolBase {
    /**
     * Sets/Gets the previous mouse position
     */
    prevPosition: PointModel;
    private corner;
    /**   @private  */
    initialOffset: PointModel;
    /**   @private  */
    initialBounds: Rect;
    constructor(commandHandler: CommandHandler, corner: string);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseUp(args: MouseEventArgs, isPreventHistory?: boolean): boolean;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
    private getTooltipContent;
    private getChanges;
    /**
     * Updates the size with delta width and delta height using scaling.
     */
    /**
     * Aspect ratio used to resize the width or height based on resizing the height or width
     */
    private scaleObjects;
}
/**
 * Draws a node that is defined by the user
 */
export declare class NodeDrawingTool extends ToolBase {
    /** @private */
    drawingObject: Node | Connector;
    /** @private */
    sourceObject: Node | Connector;
    constructor(commandHandler: CommandHandler, sourceObject: Node | Connector);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
}
/**
 * Draws a connector that is defined by the user
 */
export declare class ConnectorDrawingTool extends ConnectTool {
    /** @private */
    drawingObject: Node | Connector;
    /** @private */
    sourceObject: Node | Connector;
    constructor(commandHandler: CommandHandler, endPoint: string, sourceObject: Node | Connector);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
}
export declare class TextDrawingTool extends ToolBase {
    /**   @private  */
    drawingNode: Node | Connector;
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Pans the diagram control on drag
 */
export declare class ZoomPanTool extends ToolBase {
    private zooming;
    constructor(commandHandler: CommandHandler, zoom: boolean);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
    private getDistance;
    private updateTouch;
}
/**
 * Animate the layout during expand and collapse
 */
export declare class ExpandTool extends ToolBase {
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
}
/**
 * Opens the annotation hypeLink at mouse up
 */
export declare class LabelTool extends ToolBase {
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
}
/**
 * Draws a Polygon shape node dynamically using polygon Tool
 */
export declare class PolygonDrawingTool extends ToolBase {
    /** @private */
    drawingObject: Node | Connector;
    startPoint: PointModel;
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs, dblClickArgs?: IDoubleClickEventArgs | IClickEventArgs): void;
    /**   @private  */
    mouseWheel(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Draws a PolyLine Connector dynamically using PolyLine Drawing Tool
 */
export declare class PolyLineDrawingTool extends ToolBase {
    /** @private */
    drawingObject: Node | Connector;
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseWheel(args: MouseEventArgs): void;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
export declare class LabelDragTool extends ToolBase {
    private annotationId;
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
}
export declare class LabelResizeTool extends ToolBase {
    private corner;
    private annotationId;
    private initialBounds;
    constructor(commandHandler: CommandHandler, corner: Actions);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
    /**   @private  */
    resizeObject(args: MouseEventArgs): void;
}
export declare class LabelRotateTool extends ToolBase {
    private annotationId;
    constructor(commandHandler: CommandHandler);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    mouseLeave(args: MouseEventArgs): void;
}
