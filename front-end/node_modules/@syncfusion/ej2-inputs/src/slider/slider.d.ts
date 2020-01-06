import { Component, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ChildProperty } from '@syncfusion/ej2-base';
import { SliderModel, TicksDataModel, TooltipDataModel, LimitDataModel, ColorRangeDataModel } from './slider-model';
/**
 * Configures the ticks data of the Slider.
 */
export declare class TicksData extends ChildProperty<TicksData> {
    /**
     * It is used to denote the position of the ticks in the Slider. The available options are:
     *
     *  * before - Ticks are placed in the top of the horizontal slider bar or at the left of the vertical slider bar.
     *  * after - Ticks are placed in the bottom of the horizontal slider bar or at the right of the vertical slider bar.
     *  * both - Ticks are placed on the both side of the Slider bar.
     *  * none - Ticks are not shown.
     *
     * @default 'None'
     */
    placement: Placement;
    /**
     * It is used to denote the distance between two major (large) ticks from the scale of the Slider.
     * @default 10
     */
    largeStep: number;
    /**
     * It is used to denote the distance between two minor (small) ticks from the scale of the Slider.
     * @default 1
     */
    smallStep: number;
    /**
     * We can show or hide the small ticks in the Slider, which will be appeared in between the largeTicks.
     * @default false
     */
    showSmallTicks: boolean;
    /**
     * It is used to customize the Slider scale value to the desired format using Internationalization or events(custom formatting).
     */
    format: string;
}
/**
 * It is used to denote the TooltipChange Event arguments.
 */
export interface SliderTooltipEventArgs {
    /**
     * It is used to get the value of the Slider.
     * @isGenericType true
     */
    value: number | number[];
    /**
     * It is used to get the text shown in the Slider tooltip.
     */
    text: string;
}
/**
 * It is used to denote the Slider Change/Changed Event arguments.
 */
export interface SliderChangeEventArgs {
    /**
     * It is used to get the current value of the Slider.
     * @isGenericType true
     */
    value: number | number[];
    /**
     * It is used to get the previous value of the Slider.
     * @isGenericType true
     */
    previousValue: number | number[];
    /**
     * It is used to get the current text or formatted text of the Slider, which is placed in tooltip.
     */
    text?: string;
    /**
     * It is used to get the action applied on the Slider.
     */
    action: string;
}
/**
 * It is used to denote the TicksRender Event arguments.
 */
export interface SliderTickEventArgs {
    /**
     * It is used to get the value of the tick.
     */
    value: number;
    /**
     * It is used to get the label text of the tick.
     */
    text: string;
    /**
     * It is used to get the current tick element.
     */
    tickElement: Element;
}
/**
 * It is used t denote the ticks rendered Event arguments.
 */
export interface SliderTickRenderedEventArgs {
    /**
     * It returns the wrapper of the ticks element.
     */
    ticksWrapper: HTMLElement;
    /**
     * It returns the collection of tick elements.
     */
    tickElements: HTMLElement[];
}
/**
 * It illustrates the color track data in slider.
 */
export declare class ColorRangeData extends ChildProperty<ColorRangeData> {
    /**
     * It is used to set the color in the slider bar.
     * @default ''
     */
    color: string;
    /**
     * It is used to get the starting value for applying color.
     * @default null
     */
    start: number;
    /**
     * It is used to get the end value for applying color.
     * @default null
     */
    end: number;
}
/**
 * It illustrates the limit data in slider.
 */
export declare class LimitData extends ChildProperty<LimitData> {
    /**
     * It is used to enable the limit in the slider.
     * @default false
     */
    enabled: boolean;
    /**
     * It is used to set the minimum start limit value.
     * @default null
     */
    minStart: number;
    /**
     * It is used to set the minimum end limit value.
     * @default null
     */
    minEnd: number;
    /**
     * It is used to set the maximum start limit value.
     * @default null
     */
    maxStart: number;
    /**
     * It is used to set the maximum end limit value.
     * @default null
     */
    maxEnd: number;
    /**
     * It is used to lock the first handle.
     * @default false
     */
    startHandleFixed: boolean;
    /**
     * It is used to lock the second handle.
     * @default false
     */
    endHandleFixed: boolean;
}
/**
 * It illustrates the tooltip data in slider.
 */
export declare class TooltipData extends ChildProperty<TooltipData> {
    /**
     * It is used to customize the Tooltip which accepts custom CSS class names that define
     *  specific user-defined styles and themes to be applied on the Tooltip element.
     * @default ''
     */
    cssClass: string;
    /**
     * It is used to denote the position for the tooltip element in the Slider. The available options are:
     *
     *  * Before - Tooltip is shown in the top of the horizontal slider bar or at the left of the vertical slider bar.
     *  * After - Tooltip is shown in the bottom of the horizontal slider bar or at the right of the vertical slider bar.
     */
    placement: TooltipPlacement;
    /**
     * It is used to determine the device mode to show the Tooltip.
     * If it is in desktop, it will show the Tooltip content when hovering on the target element.
     * If it is in touch device. It will show the Tooltip content when tap and holding on the target element.
     * @default 'Auto'
     */
    showOn: TooltipShowOn;
    /**
     * It is used to show or hide the Tooltip of Slider Component.
     */
    isVisible: boolean;
    /**
     * It is used to customize the Tooltip content to the desired format
     *  using internationalization or events (custom formatting).
     */
    format: string;
}
/**
 * Ticks Placement.
 */
export declare type Placement = 'Before' | 'After' | 'Both' | 'None';
/**
 * Tooltip Placement.
 */
export declare type TooltipPlacement = 'Before' | 'After';
/**
 * Tooltip ShowOn.
 */
export declare type TooltipShowOn = 'Focus' | 'Hover' | 'Always' | 'Auto';
/**
 * Slider type.
 */
export declare type SliderType = 'Default' | 'MinRange' | 'Range';
/**
 * Slider orientation.
 */
export declare type SliderOrientation = 'Horizontal' | 'Vertical';
/**
 * The Slider component allows the user to select a value or range
 * of values in-between a min and max range, by dragging the handle over the slider bar.
 * ```html
 * <div id='slider'></div>
 * ```
 * ```typescript
 * <script>
 *   var sliderObj = new Slider({ value: 10 });
 *   sliderObj.appendTo('#slider');
 * </script>
 * ```
 */
export declare class Slider extends Component<HTMLElement> implements INotifyPropertyChanged {
    private hiddenInput;
    private firstHandle;
    private sliderContainer;
    private secondHandle;
    private rangeBar;
    private onresize;
    private isElementFocused;
    private handlePos1;
    private handlePos2;
    private rtl;
    private preHandlePos1;
    private preHandlePos2;
    private handleVal1;
    private handleVal2;
    private val;
    private activeHandle;
    private sliderTrack;
    private materialHandle;
    private firstBtn;
    private tooltipObj;
    private tooltipElement;
    private isMaterialTooltip;
    private secondBtn;
    private ul;
    private firstChild;
    private tooltipCollidedPosition;
    private tooltipTarget;
    private lastChild;
    private previousTooltipClass;
    private horDir;
    private verDir;
    private transition;
    private transitionOnMaterialTooltip;
    private scaleTransform;
    private previousVal;
    private previousChanged;
    private repeatInterval;
    private isMaterial;
    private isBootstrap;
    private isBootstrap4;
    private zIndex;
    private l10n;
    private internationalization;
    private tooltipFormatInfo;
    private ticksFormatInfo;
    private customAriaText;
    private noOfDecimals;
    private tickElementCollection;
    private limitBarFirst;
    private limitBarSecond;
    private firstPartRemain;
    private secondPartRemain;
    private minDiff;
    private drag;
    private isForm;
    private formElement;
    private formResetValue;
    /**
     * It is used to denote the current value of the Slider.
     * The value should be specified in array of number when render Slider type as range.
     *
     * {% codeBlock src="slider/value-api/index.ts" %}{% endcodeBlock %}
     * @default null
     * @isGenericType true
     */
    value: number | number[];
    /**
     * It is used to denote own array of slider values.
     * The value should be specified in array of number or string.The min,max and step value is not considered
     * @default null
     */
    customValues: string[] | number[];
    /**
     * It is used to denote the step value of Slider component which is the amount of Slider value change
     *  when increase / decrease button is clicked or press arrow keys or drag the thumb.
     *  Refer the documentation [here](../../slider/ticks#step)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="slider/step-api/index.ts" %}{% endcodeBlock %}
     * @default 1
     */
    step: number;
    /**
     * It sets the minimum value of Slider Component
     *
     * {% codeBlock src="slider/min-max-api/index.ts" %}{% endcodeBlock %}
     * @default 0
     */
    min: number;
    /**
     * It sets the maximum value of Slider Component
     *
     * {% codeBlock src="slider/min-max-api/index.ts" %}{% endcodeBlock %}
     * @default 100
     */
    max: number;
    /**
     * It is used to render the Slider component in read-only mode.
     * The slider rendered with user defined values and can’t be interacted with user actions.
     * @default false
     */
    readonly: boolean;
    /**
     * It is used to denote the type of the Slider. The available options are:
     *  * default - Used to select a single value in the Slider.
     *  * minRange - Used to select a single value in the Slider. It displays shadow from the start value to the current value.
     *  * range - Used to select a range of values in the Slider. It displays shadow in-between the selection range.
     */
    type: SliderType;
    /**
     * It is used to render the color to the slider based on the given  value
     */
    colorRange: ColorRangeDataModel[];
    /**
     * It is used to render the slider ticks options such as placement and step values.
     * Refer the documentation [here](../../slider/ticks)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="slider/ticks-api/index.ts" %}{% endcodeBlock %}
     * @default { placement: 'before' }
     */
    ticks: TicksDataModel;
    /**
     * It is used to limit the slider movement within certain limits.
     * Refer the documentation [here](../../slider/limits)
     *  to know more about this property with demo
     *
     * {% codeBlock src="slider/limits-api/index.ts" %}{% endcodeBlock %}
     * @default { enabled: false }
     */
    limits: LimitDataModel;
    /**
     * It is used to enable or disable the slider.
     * @default true
     */
    enabled: boolean;
    /**
     * It is used to denote the slider tooltip and it's position.
     *
     * {% codeBlock src="slider/tooltip-api/index.ts" %}{% endcodeBlock %}
     * @default { placement: 'Before', isVisible: false, showOn: 'Focus', format: null }
     */
    tooltip: TooltipDataModel;
    /**
     * It is used to show or hide the increase and decrease button of Slider Component,
     *  which is used to change the slider value.
     * Refer the documentation [here](../../slider/getting-started#buttons)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="slider/showButtons-api/index.ts" %}{% endcodeBlock %}
     * @default false
     */
    showButtons: boolean;
    /**
     * It is used to enable or disable the Slider handle moving animation.
     * @default true
     */
    enableAnimation: boolean;
    /**
     * It is used to render Slider in either horizontal or vertical orientation.
     *  Refer the documentation [here](../../slider/getting-started#orientation)
     *  to know more about this property with demo.
     * @default 'Horizontal'
     */
    orientation: SliderOrientation;
    /**
     * This property sets the CSS classes to root element of the Slider
     *  which helps to customize the UI styles.
     * @default ''
     */
    cssClass: string;
    /**
     * Defines whether to allow the cross-scripting site or not.
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * We can trigger created event when the Slider is created.
     * @event
     * @blazorProperty 'Created'
     */
    created: EmitType<Object>;
    /**
     * We can trigger change event whenever Slider value is changed.
     *  In other term, this event will be triggered while drag the slider thumb.
     * @event
     * @blazorProperty 'OnChange'
     */
    change: EmitType<SliderChangeEventArgs>;
    /**
     * We can trigger changed event when Slider component action is completed while we change the Slider value.
     *  In other term, this event will be triggered, while drag the slider thumb completed.
     * @event
     * @blazorProperty 'ValueChange'
     */
    changed: EmitType<SliderChangeEventArgs>;
    /**
     * We can trigger renderingTicks event when the ticks rendered on Slider,
     *  which is used to customize the ticks labels dynamically.
     * @event
     * @blazorProperty 'TicksRendering'
     */
    renderingTicks: EmitType<SliderTickEventArgs>;
    /**
     * We can trigger renderedTicks event when the ticks are rendered on the Slider.
     * @event
     * @blazorProperty 'TicksRendered'
     */
    renderedTicks: EmitType<SliderTickRenderedEventArgs>;
    /**
     * We can trigger tooltipChange event when we change the Sider tooltip value.
     * @deprecated
     * @event
     * @blazorProperty 'OnTooltipChange'
     */
    tooltipChange: EmitType<SliderTooltipEventArgs>;
    constructor(options?: SliderModel, element?: string | HTMLElement);
    protected preRender(): void;
    private formChecker;
    private initCultureFunc;
    private initCultureInfo;
    private formatString;
    private formatNumber;
    private numberOfDecimals;
    private makeRoundNumber;
    private fractionalToInteger;
    /**
     * To Initialize the control rendering
     * @private
     */
    render(): void;
    private initialize;
    private setCSSClass;
    private setEnabled;
    private getTheme;
    /**
     * Initialize the rendering
     * @private
     */
    private initRender;
    private getThemeInitialization;
    private createRangeBar;
    private createLimitBar;
    private setOrientClass;
    private setAriaAttributes;
    private createSecondHandle;
    private createFirstHandle;
    private wireFirstHandleEvt;
    private wireSecondHandleEvt;
    private handleStart;
    private transitionEnd;
    private handleFocusOut;
    private handleFocus;
    private handleOver;
    private handleLeave;
    private setHandler;
    private setEnableRTL;
    private tooltipValue;
    private setTooltipContent;
    private formatContent;
    private addTooltipClass;
    private tooltipPlacement;
    private tooltipBeforeOpen;
    private tooltipCollision;
    private wireMaterialTooltipEvent;
    private tooltipPositionCalculation;
    private getTooltipTransformProperties;
    private openMaterialTooltip;
    private closeMaterialTooltip;
    private checkTooltipPosition;
    private setTooltipTransform;
    private renderTooltip;
    private initializeTooltipProps;
    private tooltipBeforeClose;
    private setButtons;
    private buttonTitle;
    private buttonFocusOut;
    private repeatButton;
    private repeatHandlerMouse;
    private materialChange;
    private repeatHandlerUp;
    private customTickCounter;
    private renderScale;
    private ticksAlignment;
    private createTick;
    private formatTicksValue;
    private scaleAlignment;
    private tickValuePosition;
    private setAriaAttrValue;
    private handleValueUpdate;
    private getLimitCorrectedValues;
    private focusSliderElement;
    private buttonClick;
    private tooltipToggle;
    private buttonUp;
    private setRangeBar;
    private checkValidValueAndPos;
    private setLimitBarPositions;
    private setLimitBar;
    private getLimitValueAndPosition;
    private setValue;
    private rangeValueUpdate;
    private validateRangeValue;
    private modifyZindex;
    private setHandlePosition;
    private getHandle;
    private setRangeValue;
    private changeEvent;
    private changeEventArgs;
    private setPreviousVal;
    private updateRangeValue;
    private checkHandlePosition;
    private checkHandleValue;
    /**
     * It is used to reposition slider.
     * @returns void
     */
    reposition(): void;
    private changeHandleValue;
    private tempStartEnd;
    private xyToPosition;
    private stepValueCalculation;
    private add;
    private positionToValue;
    private sliderBarClick;
    private sliderDown;
    private handleValueAdjust;
    private dragRangeBarMove;
    private sliderBarUp;
    private sliderBarMove;
    private dragRangeBarUp;
    private checkRepeatedValue;
    private refreshTooltip;
    private openTooltip;
    private closeTooltip;
    private keyDown;
    private wireButtonEvt;
    private wireEvents;
    private unwireEvents;
    private formResetHandler;
    private keyUp;
    private hover;
    private sliderFocusOut;
    private removeElement;
    private changeSliderType;
    private changeRtl;
    private changeOrientation;
    private updateConfig;
    private limitsPropertyChange;
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    protected getPersistData(): string;
    /**
     * Prepares the slider for safe removal from the DOM.
     * Detaches all event handlers, attributes, and classes to avoid memory leaks.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
    /**
     * Calls internally if any of the property value is changed.
     * @private
     */
    onPropertyChanged(newProp: SliderModel, oldProp: SliderModel): void;
    private setReadOnly;
    private setMinMaxValue;
    private setZindex;
    setTooltip(): void;
    private setBarColor;
    /**
     * Gets the component name
     * @private
     */
    getModuleName(): string;
}
