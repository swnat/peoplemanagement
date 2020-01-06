import { IFontMapping, IThemeStyle } from './interface';
import { HeatMapTheme } from '../utils/enum';
/**
 * Specifies HeatMaps Themes
 */
export declare namespace Theme {
    /** @private */
    let heatMapTitleFont: IFontMapping;
    /** @private */
    let titleFont: IFontMapping;
    /** @private */
    let axisTitleFont: IFontMapping;
    /** @private */
    let axisLabelFont: IFontMapping;
    /** @private */
    let legendLabelFont: IFontMapping;
    /** @private */
    let rectLabelFont: IFontMapping;
    /** @private */
    let tooltipFont: IFontMapping;
}
/** @private */
export declare function getThemeColor(theme: HeatMapTheme): IThemeStyle;
