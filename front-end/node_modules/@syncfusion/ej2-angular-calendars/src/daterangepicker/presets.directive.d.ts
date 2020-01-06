import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * 'e-presets' directive represent a presets of angular daterangepicker
 * It must be contained in a daterangepicker component(`ej-daterangepicker`).
 * ```html
 * <ejs-daterangepicker id='range'>
 *   <e-presets>
 *    <e-preset label='Last Week' [start]=new Date('06/07/2018') [end]= new Date('06/01/2018')></e-preset>
 *    <e-preset label='Last Month' [start]=new Date('06/07/2018') [end]= new Date('05/07/2018')></e-preset>
 *   </e-presets>
 * </ejs-daterangepicker>
 * ```
 */
export declare class PresetDirective extends ComplexBase<PresetDirective> {
    private viewContainerRef;
    /**
     * Defines the end date of the preset range
     */
    end: any;
    /**
     * Defines the label string of the preset range.
     */
    label: any;
    /**
     * Defines the start date of the preset range.
     */
    start: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Preset Array Directive
 * @private
 */
export declare class PresetsDirective extends ArrayBase<PresetsDirective> {
    constructor();
}
