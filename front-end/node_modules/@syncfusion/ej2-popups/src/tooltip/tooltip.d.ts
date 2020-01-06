import { Component, ChildProperty, BaseEventArgs } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { TooltipModel, AnimationModel } from './tooltip-model';
/**
 * Set of open modes available for Tooltip.
 */
export declare type OpenMode = 'Auto' | 'Hover' | 'Click' | 'Focus' | 'Custom';
/**
 * Applicable positions where the Tooltip can be displayed over specific target elements.
 */
export declare type Position = 'TopLeft' | 'TopCenter' | 'TopRight' | 'BottomLeft' | 'BottomCenter' | 'BottomRight' | 'LeftTop' | 'LeftCenter' | 'LeftBottom' | 'RightTop' | 'RightCenter' | 'RightBottom';
/**
 * Applicable tip positions attached to the Tooltip.
 */
export declare type TipPointerPosition = 'Auto' | 'Start' | 'Middle' | 'End';
/**
 * Animation effects that are applicable for Tooltip.
 */
export declare type Effect = 'FadeIn' | 'FadeOut' | 'FadeZoomIn' | 'FadeZoomOut' | 'FlipXDownIn' | 'FlipXDownOut' | 'FlipXUpIn' | 'FlipXUpOut' | 'FlipYLeftIn' | 'FlipYLeftOut' | 'FlipYRightIn' | 'FlipYRightOut' | 'ZoomIn' | 'ZoomOut' | 'None';
/**
 * Interface for Tooltip event arguments.
 */
export interface TooltipEventArgs extends BaseEventArgs {
    /**
     * It is used to denote the type of the triggered event.
     */
    type: String;
    /**
     * It illustrates whether the current action needs to be prevented or not.
     */
    cancel: boolean;
    /**
     * It is used to specify the current event object.
     */
    event: Event;
    /**
     * It is used to denote the current target element where the Tooltip is to be displayed.
     */
    target: HTMLElement;
    /**
     * It is used to denote the Tooltip element
     */
    element: HTMLElement;
    /**
     * It is used to denote the Collided Tooltip position
     */
    collidedPosition?: string;
}
/**
 * Animation options that are common for both open and close actions of the Tooltip.
 */
export interface TooltipAnimationSettings {
    /**
     * It is used to apply the Animation effect on the Tooltip, during open and close actions.
     */
    effect?: Effect;
    /**
     * It is used to denote the duration of the animation that is completed per animation cycle.
     */
    duration?: number;
    /**
     * It is used to denote the delay value in milliseconds and indicating the waiting time before animation begins.
     */
    delay?: number;
}
export declare class Animation extends ChildProperty<Animation> {
    /**
     * Animation settings to be applied on the Tooltip, while it is being shown over the target.
     */
    open: TooltipAnimationSettings;
    /**
     * Animation settings to be applied on the Tooltip, when it is closed.
     */
    close: TooltipAnimationSettings;
}
/**
 * Represents the Tooltip component that displays a piece of information about the target element on mouse hover.
 * ```html
 * <div id="tooltip">Show Tooltip</div>
 * ```
 * ```typescript
 * <script>
 *   var tooltipObj = new Tooltip({ content: 'Tooltip text' });
 *   tooltipObj.appendTo("#tooltip");
 * </script>
 * ```
 */
export declare class Tooltip extends Component<HTMLElement> implements INotifyPropertyChanged {
    private popupObj;
    private tooltipEle;
    private ctrlId;
    private tipClass;
    private tooltipPositionX;
    private tooltipPositionY;
    private tooltipEventArgs;
    private isHidden;
    private showTimer;
    private hideTimer;
    private tipWidth;
    private touchModule;
    private tipHeight;
    private autoCloseTimer;
    private isBlazorTemplate;
    private isBlazorTooltip;
    private contentTargetValue;
    private contentEvent;
    private contentAnimation;
    /**
     * It is used to set the width of Tooltip component which accepts both string and number values.
     * When set to auto, the Tooltip width gets auto adjusted to display its content within the viewable screen.
     * @default 'auto'
     */
    width: string | number;
    /**
     * It is used to set the height of Tooltip component which accepts both string and number values.
     * When Tooltip content gets overflow due to height value then the scroll mode will be enabled.
     * Refer the documentation [here](https://ej2.syncfusion.com/documentation/tooltip/setting-dimension.html?lang=typescript)
     *  to know more about this property with demo.
     * @default 'auto'
     */
    height: string | number;
    /**
     * It is used to display the content of Tooltip which can be both string and HTML Elements.
     * Refer the documentation [here](https://ej2.syncfusion.com/documentation/tooltip/content.html?lang=typescript)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="tooltip/content-api/index.ts" %}{% endcodeBlock %}
     * @blazorType object
     */
    content: string | HTMLElement;
    /**
     * It is used to denote the target selector where the Tooltip need to be displayed.
     * The target element is considered as parent container.
     *
     * {% codeBlock src="tooltip/target-api/index.ts" %}{% endcodeBlock %}
     */
    target: string;
    /**
     * It is used to set the position of Tooltip element, with respect to Target element.
     *
     * {% codeBlock src="tooltip/position-api/index.ts" %}{% endcodeBlock %}
     * @default 'TopCenter'
     */
    position: Position;
    /**
     * It sets the space between the target and Tooltip element in X axis.
     *
     * {% codeBlock src="tooltip/offsetX-api/index.ts" %}{% endcodeBlock %}
     * @default 0
     */
    offsetX: number;
    /**
     * It sets the space between the target and Tooltip element in Y axis.
     *
     * {% codeBlock src="tooltip/offsetX-api/index.ts" %}{% endcodeBlock %}
     * @default 0
     */
    offsetY: number;
    /**
     * It is used to show or hide the tip pointer of Tooltip.
     *
     * {% codeBlock src="tooltip/offsetX-api/index.ts" %}{% endcodeBlock %}
     * @default true
     */
    showTipPointer: boolean;
    /**
     * It is used to set the position of tip pointer on tooltip.
     * When it sets to auto, the tip pointer auto adjusts within the space of target's length
     *  and does not point outside.
     * Refer the documentation
     *  [here](https://ej2.syncfusion.com/documentation/tooltip/position.html?lang=typescript#tip-pointer-positioning)
     *  to know more about this property with demo.
     * @default 'Auto'
     */
    tipPointerPosition: TipPointerPosition;
    /**
     * It is used to determine the device mode to display the Tooltip content.
     * If it is in desktop, it will show the Tooltip content when hovering on the target element.
     * If it is in touch device, it will show the Tooltip content when tap and holding on the target element.
     *
     * {% codeBlock src="tooltip/opensOn-api/index.ts" %}{% endcodeBlock %}
     * @default 'Auto'
     */
    opensOn: string;
    /**
     * It allows the Tooltip to follow the mouse pointer movement over the specified target element.
     * Refer the documentation [here](https://ej2.syncfusion.com/documentation/tooltip/position.html?lang=typescript#mouse-trailing)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="tooltip/offsetX-api/index.ts" %}{% endcodeBlock %}
     * @default false
     */
    mouseTrail: boolean;
    /**
     * It is used to display the Tooltip in an open state until closed by manually.
     * Refer the documentation [here](https://ej2.syncfusion.com/documentation/tooltip/open-mode.html?lang=typescript#sticky-mode)
     *  to know more about this property with demo.
     * @default false
     */
    isSticky: boolean;
    /**
     * We can set the same or different animation option to Tooltip while it is in open or close state.
     * Refer the documentation [here](https://ej2.syncfusion.com/documentation/tooltip/animation.html?lang=typescript)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="tooltip/animation-api/index.ts" %}{% endcodeBlock %}
     * @default { open: { effect: 'FadeIn', duration: 150, delay: 0 }, close: { effect: 'FadeOut', duration: 150, delay: 0 } }
     */
    animation: AnimationModel;
    /**
     * It is used to open the Tooltip after the specified delay in milliseconds.
     * @default 0
     */
    openDelay: number;
    /**
     * It is used to close the Tooltip after a specified delay in milliseconds.
     * @default 0
     */
    closeDelay: number;
    /**
     * It is used to customize the Tooltip which accepts custom CSS class names that
     *  defines specific user-defined styles and themes to be applied on the Tooltip element.
     * @default null
     */
    cssClass: string;
    /**
     * Defines whether to allow the cross-scripting site or not.
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * We can trigger `beforeRender` event before the Tooltip and its contents are added to the DOM.
     * When one of its arguments `cancel` is set to true, the Tooltip can be prevented from rendering on the page.
     * This event is mainly used for the purpose of customizing the Tooltip before it shows up on the screen.
     * For example, to load the AJAX content or to set new animation effects on the Tooltip, this event can be opted.
     * Refer the documentation
     *  [here](https://ej2.syncfusion.com/documentation/tooltip/content.html?lang=typescript#dynamic-content-via-ajax)
     *  to know more about this property with demo.
     * @event
     * @blazorProperty 'OnRender'
     */
    beforeRender: EmitType<TooltipEventArgs>;
    /**
     * We can trigger `beforeOpen` event before the Tooltip is displayed over the target element.
     * When one of its arguments `cancel` is set to true, the Tooltip display can be prevented.
     * This event is mainly used for the purpose of refreshing the Tooltip positions dynamically or to
     *  set customized styles in it and so on.
     * @event
     * @blazorProperty 'OnOpen'
     */
    beforeOpen: EmitType<TooltipEventArgs>;
    /**
     * We can trigger `afterOpen` event after the Tooltip Component gets opened.
     * @event
     * @blazorProperty 'Opened'
     */
    afterOpen: EmitType<TooltipEventArgs>;
    /**
     * We can trigger `beforeClose` event before the Tooltip hides from the screen. If returned false, then the Tooltip is no more hidden.
     * @event
     * @blazorProperty 'OnClose'
     */
    beforeClose: EmitType<TooltipEventArgs>;
    /**
     * We can trigger `afterClose` event when the Tooltip Component gets closed.
     * @event
     * @blazorProperty 'Closed'
     */
    afterClose: EmitType<TooltipEventArgs>;
    /**
     * We can trigger `beforeCollision` event for every collision fit calculation.
     * @event
     * @blazorProperty 'OnCollision'
     */
    beforeCollision: EmitType<TooltipEventArgs>;
    /**
     * We can trigger `created` event after the Tooltip component is created.
     * @event
     * @blazorProperty 'Created'
     */
    created: EmitType<Object>;
    /**
     * We can trigger `destroyed` event when the Tooltip component is destroyed.
     * @event
     * @blazorProperty 'Destroyed'
     */
    destroyed: EmitType<Object>;
    /**
     * Constructor for creating the Tooltip Component
     */
    constructor(options?: TooltipModel, element?: string | HTMLElement);
    private initialize;
    private formatPosition;
    private renderArrow;
    private setTipClass;
    private renderPopup;
    private getTooltipPosition;
    private reposition;
    private openPopupHandler;
    private closePopupHandler;
    private calculateTooltipOffset;
    private updateTipPosition;
    private adjustArrow;
    private renderContent;
    private renderCloseIcon;
    private addDescribedBy;
    private removeDescribedBy;
    private tapHoldHandler;
    private touchEndHandler;
    private targetClick;
    private targetHover;
    private showTooltip;
    private beforeRenderCallback;
    private contentUpdated;
    private beforeRenderBlazor;
    private afterRenderBlazor;
    private beforeOpenCallback;
    private needTemplateReposition;
    private checkCollision;
    private collisionFlipFit;
    private hideTooltip;
    private restoreElement;
    private clear;
    private onMouseOut;
    private tooltipElementMouseOut;
    private onStickyClose;
    private onMouseMove;
    private keyDown;
    private touchEnd;
    private scrollHandler;
    /**
     * Core method that initializes the control rendering.
     * @private
     */
    render(): void;
    /**
     * Initializes the values of private members.
     * @private
     */
    protected preRender(): void;
    /**
     * Binding events to the Tooltip element.
     * @hidden
     */
    private wireEvents;
    private getTriggerList;
    private wireFocusEvents;
    private wireMouseEvents;
    /**
     * Unbinding events from the element on widget destroy.
     * @hidden
     */
    private unwireEvents;
    private unwireFocusEvents;
    private unwireMouseEvents;
    private findTarget;
    /**
     * Core method to return the component name.
     * @private
     */
    getModuleName(): string;
    /**
     * Returns the properties to be maintained in the persisted state.
     * @private
     */
    protected getPersistData(): string;
    /**
     * Called internally, if any of the property value changed.
     * @private
     */
    onPropertyChanged(newProp: TooltipModel, oldProp: TooltipModel): void;
    /**
     * It is used to show the Tooltip on the specified target with specific animation settings.
     * @param element Target element where the Tooltip is to be displayed.
     * @param animation Sets the specific animation, while showing the Tooltip on the screen.
     * @return {void}
     */
    open(element: HTMLElement, animation?: TooltipAnimationSettings): void;
    /**
     * It is used to hide the Tooltip with specific animation effect.
     * @param animation Sets the specific animation when hiding Tooltip from the screen.
     * @return {void}
     */
    close(animation?: TooltipAnimationSettings): void;
    /**
     * It is used to refresh the Tooltip content and its position.
     * @param target Target element where the Tooltip content or position needs to be refreshed.
     * @return {void}
     */
    refresh(target?: HTMLElement): void;
    /**
     * It is used to destroy the Tooltip component.
     * @method destroy
     * @return {void}
     * @memberof Tooltip
     */
    destroy(): void;
}
