/**
 * Maps Themes doc
 */
import { IFontMapping, IThemeStyle } from '../model/interface';
import { TreeMapTheme } from '../utils/enum';
export declare namespace Theme {
    /** @private */
    let mapsTitleFont: IFontMapping;
}
/**
 * @private
 * To get the theme style based on treemap theme.
 */
export declare function getThemeStyle(theme: TreeMapTheme): IThemeStyle;
