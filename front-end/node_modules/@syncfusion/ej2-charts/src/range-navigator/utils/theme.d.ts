import { ChartTheme, IFontMapping } from '../../index';
import { IRangeStyle } from '../model/range-navigator-interface';
import { RangeNavigator } from '../index';
/**
 *
 */
export declare namespace RangeNavigatorTheme {
    /** @private */
    let axisLabelFont: IFontMapping;
    /** @private */
    let tooltipLabelFont: IFontMapping;
}
/** @private */
export declare function getRangeThemeColor(theme: ChartTheme, range: RangeNavigator): IRangeStyle;
