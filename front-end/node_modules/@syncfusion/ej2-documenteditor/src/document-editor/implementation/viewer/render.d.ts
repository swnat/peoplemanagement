import { Page, LineWidget, TextElementBox, TableRowWidget, TableWidget } from './page';
import { BaselineAlignment, Underline } from '../../index';
import { LayoutViewer } from './viewer';
import { Point } from '../editor/editor-helper';
import { SpellChecker } from '../spell-check/spell-checker';
/**
 * @private
 */
export declare class Renderer {
    isPrinting: boolean;
    private pageLeft;
    private pageTop;
    private viewer;
    private pageIndex;
    private pageCanvasIn;
    private isFieldCode;
    private leftPosition;
    private topPosition;
    /**
     * Gets page canvas.
     * @private
     */
    readonly pageCanvas: HTMLCanvasElement;
    /**
     * Gets the spell checker
     * @private
     */
    readonly spellChecker: SpellChecker;
    /**
     * Gets selection canvas.
     */
    private readonly selectionCanvas;
    /**
     * Gets page context.
     */
    private readonly pageContext;
    /**
     * Gets selection context.
     */
    private readonly selectionContext;
    constructor(viewer: LayoutViewer);
    /**
     * Gets the color.
     * @private
     */
    getColor(color: string): string;
    /**
     * Renders widgets.
     * @param {Page} page
     * @param {number} left
     * @param {number} top
     * @param {number} width
     * @param {number} height
     * @private
     */
    renderWidgets(page: Page, left: number, top: number, width: number, height: number): void;
    /**
     * Sets page size.
     * @param {Page} page
     */
    private setPageSize;
    /**
     * Renders header footer widget.
     * @param {Page} page
     * @param {HeaderFooterWidget} headFootWidget
     */
    private renderHFWidgets;
    private renderHeaderSeparator;
    private getHeaderFooterType;
    /**
     * @private
     */
    renderDashLine(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, fillStyle: string, isSmallDash: boolean): void;
    private renderHeaderFooterMark;
    private renderHeaderFooterMarkText;
    /**
     * Renders body widget.
     * @param {Page} page
     * @param {BodyWidget} bodyWidget
     */
    private render;
    /**
     * Renders block widget.
     * @param {Page} page
     * @param {Widget} widget
     */
    private renderWidget;
    /**
     * Renders header.
     * @param {Page} page
     * @param {TableWidget} widget
     * @param {WRow} header
     * @private
     */
    renderHeader(page: Page, widget: TableWidget, header: TableRowWidget): void;
    /**
     * Renders paragraph widget.
     * @param {Page} page
     * @param {ParagraphWidget} paraWidget
     */
    private renderParagraphWidget;
    /**
     * Renders table widget.
     * @param {Page} page
     * @param {TableWidget} tableWidget
     */
    private renderTableWidget;
    /**
     * Renders table row widget.
     * @param {Page} page
     * @param {Widget} rowWidget
     */
    private renderTableRowWidget;
    /**
     * Renders table cell widget.
     * @param {Page} page
     * @param {TableCellWidget} cellWidget
     */
    private renderTableCellWidget;
    /**
     * Renders line widget.
     * @param {LineWidget} lineWidget
     * @param {Page} page
     * @param {number} left
     * @param {number} top
     */
    private renderLine;
    private toSkipFieldCode;
    /**
     * Gets underline y position.
     * @param {LineWidget} lineWidget
     * @private
     */
    getUnderlineYPosition(lineWidget: LineWidget): number;
    /**
     * Renders list element box
     * @param {ListTextElementBox} elementBox
     * @param {number} left
     * @param {number} top
     * @param {number} underlineY
     */
    private renderListTextElementBox;
    /**
     * Renders text element box.
     * @param {TextElementBox} elementBox
     * @param {number} left
     * @param {number} top
     * @param {number} underlineY
     */
    private renderTextElementBox;
    /**
     * Method to handle spell check for modified or newly added elements
     * @param {TextElementBox} elementBox
     * @param {number} underlineY
     * @param {number} left
     * @param {number} top
     * @param {number} baselineAlignment
     */
    private handleChangeDetectedElements;
    /**
     * Method to handle spell check combine and splitted text elements
     * @param {string} currentText
     * @param {TextElementBox} elementBox
     * @param {number} underlineY
     * @param {number} iteration
     * @private
     */
    handleUnorderdElements(currentText: string, elementBox: TextElementBox, underlineY: number, iteration: number, markindex: number, isLastItem?: boolean, beforeIndex?: number): void;
    /**
     * Render Wavy Line
     * @param {ElementBox} elementBox
     * @param {number} left
     * @param {number} top
     * @param {number} underlineY
     * @param {string} color
     * @param {Underline} underline
     * @param {BaselineAlignment} baselineAlignment
     * @private
     */
    renderWavyline(elementBox: TextElementBox, left: number, top: number, underlineY: number, color: string, underline: Underline, baselineAlignment: BaselineAlignment, backgroundColor?: string): void;
    /**
     * Draw wavy line
     * @param {Point} from
     * @param {Point} to
     * @param {Number} frequency
     * @param {Number} amplitude
     * @param {Number} step
     * @param {string} color
     * @param {Number} negative
     * @private
     */
    drawWavy(from: Point, to: Point, frequency: number, amplitude: number, step: number, color: string, height: number, backColor: string, negative?: number): void;
    /**
     * Returns tab leader
     */
    private getTabLeader;
    /**
     * Returns tab leader string.
     */
    private getTabLeaderString;
    /**
     * Clips the rectangle with specified position.
     * @param {number} xPos
     * @param {number} yPos
     * @param {number} width
     * @param {number} height
     */
    private clipRect;
    /**
     * Renders underline.
     * @param {ElementBox} elementBox
     * @param {number} left
     * @param {number} top
     * @param {number} underlineY
     * @param {string} color
     * @param {Underline} underline
     * @param {BaselineAlignment} baselineAlignment
     */
    private renderUnderline;
    /**
     * Renders strike through.
     * @param {ElementBox} elementBox
     * @param {number} left
     * @param {number} top
     * @param {Strikethrough} strikethrough
     * @param {string} color
     * @param {BaselineAlignment} baselineAlignment
     */
    private renderStrikeThrough;
    /**
     * Renders image element box.
     * @param {ImageElementBox} elementBox
     * @param {number} left
     * @param {number} top
     * @param {number} underlineY
     */
    private renderImageElementBox;
    /**
     * Renders table outline.
     * @param {TableWidget} tableWidget
     */
    private renderTableOutline;
    /**
     * Renders table cell outline.
     * @param {LayoutViewer} viewer
     * @param {TableCellWidget} cellWidget
     */
    private renderTableCellOutline;
    /**
     * Renders cell background.
     * @param {number} height
     * @param {TableCellWidget} cellWidget
     */
    private renderCellBackground;
    /**
     * Renders single border.
     * @param {WBorder} border
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} lineWidth
     */
    private renderSingleBorder;
    /**
     * Gets scaled value.
     * @param {number} value
     * @param {number} type
     * @private
     */
    getScaledValue(value: number, type?: number): number;
    /**
     * Destroys the internal objects which is maintained.
     */
    destroy(): void;
}
