import { CommandHandler } from './command-manager';
import { MouseEventArgs } from './event-handlers';
import { ToolBase } from './tool';
/**
 * Multiple segments editing for Connector
 */
export declare class ConnectorEditing extends ToolBase {
    private endPoint;
    private selectedSegment;
    private segmentIndex;
    constructor(commandHandler: CommandHandler, endPoint: string);
    /**   @private  */
    mouseDown(args: MouseEventArgs): void;
    /**   @private  */
    mouseMove(args: MouseEventArgs): boolean;
    /**   @private  */
    mouseUp(args: MouseEventArgs): void;
    private removePrevSegment;
    private findSegmentDirection;
    private removeNextSegment;
    private addOrRemoveSegment;
    private findIndex;
    private dragOrthogonalSegment;
    private addSegments;
    private insertFirstSegment;
    private updateAdjacentSegments;
    private addTerminalSegment;
    private updatePortSegment;
    private updatePreviousSegment;
    private changeSegmentDirection;
    private updateNextSegment;
    private updateFirstSegment;
    private updateLastSegment;
    /**
     * To destroy the connector editing module
     * @return {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
