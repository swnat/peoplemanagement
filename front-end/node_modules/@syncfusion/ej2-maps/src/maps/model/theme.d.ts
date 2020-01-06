/**
 * Maps Themes doc
 */
import { IFontMapping, MapsTheme } from '../index';
import { IThemeStyle } from './interface';
/**
 * Specifies Maps Themes
 */
export declare namespace Theme {
    /** @private */
    let mapsTitleFont: IFontMapping;
    /** @private */
    let mapsSubTitleFont: IFontMapping;
    /** @private */
    let tooltipLabelFont: IFontMapping;
    /** @private */
    let legendTitleFont: IFontMapping;
    /** @private */
    let legendLabelFont: IFontMapping;
    /** @private */
    let dataLabelFont: IFontMapping;
}
export declare namespace FabricTheme {
    /** @private */
    let mapsTitleFont: IFontMapping;
    /** @private */
    let mapsSubTitleFont: IFontMapping;
    /** @private */
    let tooltipLabelFont: IFontMapping;
    /** @private */
    let legendTitleFont: IFontMapping;
    /** @private */
    let legendLabelFont: IFontMapping;
    /** @private */
    let dataLabelFont: IFontMapping;
}
export declare namespace BootstrapTheme {
    /** @private */
    let mapsTitleFont: IFontMapping;
    /** @private */
    let mapsSubTitleFont: IFontMapping;
    /** @private */
    let tooltipLabelFont: IFontMapping;
    /** @private */
    let legendTitleFont: IFontMapping;
    /** @private */
    let legendLabelFont: IFontMapping;
    /** @private */
    let dataLabelFont: IFontMapping;
}
/**
 * Internal use of Method to getting colors based on themes.
 * @private
 * @param theme
 */
export declare function getShapeColor(theme: MapsTheme): string[];
/**
 * HighContrast Theme configuration
 */
export declare namespace HighContrastTheme {
    /** @private */
    let mapsTitleFont: IFontMapping;
    /** @private */
    let mapsSubTitleFont: IFontMapping;
    /** @private */
    let tooltipLabelFont: IFontMapping;
    /** @private */
    let legendTitleFont: IFontMapping;
    /** @private */
    let legendLabelFont: IFontMapping;
    /** @private */
    let dataLabelFont: IFontMapping;
}
/**
 * Dark Theme configuration
 */
export declare namespace DarkTheme {
    /** @private */
    let mapsTitleFont: IFontMapping;
    /** @private */
    let mapsSubTitleFont: IFontMapping;
    /** @private */
    let tooltipLabelFont: IFontMapping;
    /** @private */
    let legendTitleFont: IFontMapping;
    /** @private */
    let legendLabelFont: IFontMapping;
}
export declare function getThemeStyle(theme: MapsTheme): IThemeStyle;
