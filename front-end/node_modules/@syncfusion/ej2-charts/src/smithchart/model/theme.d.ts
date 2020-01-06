/**
 *
 */
import { ISmithchartThemeStyle, ISmithchartFontMapping } from '../model/interface';
import { SmithchartTheme } from '../utils/enum';
export declare namespace Theme {
    /** @private */
    let axisLabelFont: ISmithchartFontMapping;
    /** @private */
    let smithchartTitleFont: ISmithchartFontMapping;
    /** @private */
    let smithchartSubtitleFont: ISmithchartFontMapping;
    /** @private */
    let dataLabelFont: ISmithchartFontMapping;
    /** @private */
    let legendLabelFont: ISmithchartFontMapping;
}
/** @private */
export declare function getSeriesColor(theme: SmithchartTheme): string[];
/** @private */
export declare function getThemeColor(theme: SmithchartTheme): ISmithchartThemeStyle;
