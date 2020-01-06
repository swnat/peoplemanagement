import { IFontMapping } from './interface';
import { AccumulationTheme } from '../../accumulation-chart/model/enum';
import { ChartTheme } from '../../chart/utils/enum';
import { IThemeStyle, IScrollbarThemeStyle } from '../../index';
/**
 * Specifies Chart Themes
 */
export declare namespace Theme {
    /** @private */
    let axisLabelFont: IFontMapping;
    /** @private */
    let axisTitleFont: IFontMapping;
    /** @private */
    let chartTitleFont: IFontMapping;
    /** @private */
    let chartSubTitleFont: IFontMapping;
    /** @private */
    let crosshairLabelFont: IFontMapping;
    /** @private */
    let tooltipLabelFont: IFontMapping;
    /** @private */
    let legendLabelFont: IFontMapping;
    /** @private */
    let stripLineLabelFont: IFontMapping;
    /** @private */
    let stockEventFont: IFontMapping;
}
/** @private */
export declare function getSeriesColor(theme: ChartTheme | AccumulationTheme): string[];
/** @private */
export declare function getThemeColor(theme: ChartTheme | AccumulationTheme): IThemeStyle;
/** @private */
export declare function getScrollbarThemeColor(theme: ChartTheme): IScrollbarThemeStyle;
