import { IFontMapping, IThemeStyle } from './interface';
import { GaugeTheme } from '../utils/enum';
/**
 * Specifies gauge Themes
 */
export declare namespace Theme {
    /** @private */
    let axisLabelFont: IFontMapping;
    let legendLabelFont: IFontMapping;
}
/** @private */
export declare function getRangePalette(theme: string): string[];
/** @private */
export declare function getThemeStyle(theme: GaugeTheme): IThemeStyle;
