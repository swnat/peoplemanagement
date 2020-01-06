import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
/**
 * The Borders and Shading dialog is used to modify borders and shading options for selected table or cells.
 */
export declare class BordersAndShadingDialog {
    private owner;
    private dialog;
    private target;
    private tableFormatIn;
    private cellFormatIn;
    private applyTo;
    private cellFormat;
    private tableFormat;
    private borderStyle;
    private borderColorPicker;
    private noneDiv;
    private boxDiv;
    private allDiv;
    private customDiv;
    private noneDivTransparent;
    private boxDivTransparent;
    private allDivTransparent;
    private customDivTransparent;
    private previewDiv;
    private previewRightDiagonalDiv;
    private previewLeftDiagonalDiv;
    private previewVerticalDiv;
    private previewHorizontalDiv;
    private previewDivTopTopContainer;
    private previewDivTopTop;
    private previewDivTopCenterContainer;
    private previewDivTopCenter;
    private previewDivTopBottomContainer;
    private previewDivTopBottom;
    private previewDivLeftDiagonalContainer;
    private previewDivLeftDiagonal;
    private previewDivBottomLeftContainer;
    private previewDivBottomLeft;
    private previewDivBottomcenterContainer;
    private previewDivBottomcenter;
    private previewDivBottomRightContainer;
    private previewDivBottomRight;
    private previewDivDiagonalRightContainer;
    private previewDivDiagonalRight;
    private previewDivTopTopTransParent;
    private previewDivTopCenterTransParent;
    private previewDivTopBottomTransParent;
    private previewDivLeftDiagonalTransParent;
    private previewDivBottomLeftTransparent;
    private previewDivBottomcenterTransparent;
    private previewDivBottomRightTransparent;
    private previewDivDiagonalRightTransparent;
    private shadingContiner;
    private shadingColorPicker;
    private ulelementShading;
    private borderWidth;
    private isShadingChanged;
    /**
     * @private
     */
    constructor(viewer: LayoutViewer);
    private getModuleName;
    /**
     * @private
     */
    initBordersAndShadingsDialog(localeValue: L10n, isRtl?: boolean): void;
    private applyBordersShadingsProperties;
    private applyFormat;
    private getBorder;
    private checkClassName;
    /**
     * @private
     */
    closeDialog: () => void;
    private closeBordersShadingsDialog;
    /**
     * @private
     */
    show(): void;
    private handleSettingCheckBoxAction;
    private updateClassForSettingDivElements;
    private setSettingPreviewDivElement;
    private isShowHidePreviewTableElements;
    private handlePreviewCheckBoxAction;
    private handlePreviewCheckBoxShowHide;
    private showHidePreviewDivElements;
    private setPropertyPreviewDivElement;
    private applyTableCellPreviewBoxes;
    private applyPreviewTableBackgroundColor;
    private applyPreviewTableBorderColor;
    private loadBordersShadingsPropertiesDialog;
    private cloneBorders;
    private getLineStyle;
    /**
     * @private
     */
    destroy(): void;
}
