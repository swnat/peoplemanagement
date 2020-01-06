import { BarcodeBase } from './barcode-base';
import { BaseAttributes } from './rendering/canvas-interface';
import { Rect } from './primitives/rect';
import { MarginModel } from './primitives/margin-model';
/**
 * onedimension class is used to render all type of one dimensional shapes
 */
export declare abstract class OneDimension extends BarcodeBase {
    private getInstance;
    /** @private */
    getDrawableSize(margin: MarginModel, w: number, h: number): Rect;
    private getBaseAttributes;
    private getBarLineRatio;
    private multipleWidth;
    private barCodeType;
    private checkStartValueCondition;
    private checkEndValueCondition;
    private getDisplayText;
    private checkExtraHeight;
    private getWidthValue;
    /** @private */
    calculateBarCodeAttributes(code: number[] | string[], canvas: HTMLElement, isUpcE?: string): void;
    private canIncrementCheck;
    private verticalTextMargin;
    private getAlignmentPosition;
    /** @private */
    drawImage(canvas: HTMLCanvasElement, options: BaseAttributes[]): void;
    private updateDisplayTextSize;
    private alignDisplayText;
    private updateOverlappedTextPosition;
    private drawText;
}
