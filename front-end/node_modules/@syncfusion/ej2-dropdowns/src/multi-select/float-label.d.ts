import { FloatLabelType } from '@syncfusion/ej2-inputs';
/**
 * Function to create Float Label element.
 * @param overAllWrapper - overall wrapper of multiselect.
 * @param element - the given html element.
 * @param inputElement - specify the input wrapper.
 * @param value - Value of the MultiSelect.
 * @param floatLabelType - Specify the FloatLabel Type.
 * @param placeholder - Specify the PlaceHolder text.
 */
export declare function createFloatLabel(overAllWrapper: HTMLDivElement, searchWrapper: HTMLElement, element: HTMLElement, inputElement: HTMLInputElement, value: number[] | string[] | boolean[], floatLabelType: FloatLabelType, placeholder: string): void;
/**
 * Function to update status of the Float Label element.
 * @param value - Value of the MultiSelect.
 * @param label - float label element.
 */
export declare function updateFloatLabelState(value: string[] | number[] | boolean[], label: HTMLElement): void;
/**
 * Function to remove Float Label element.
 * @param overAllWrapper - overall wrapper of multiselect.
 * @param componentWrapper - wrapper element of multiselect.
 * @param searchWrapper - search wrapper of multiselect.
 * @param inputElement - specify the input wrapper.
 * @param value - Value of the MultiSelect.
 * @param floatLabelType - Specify the FloatLabel Type.
 * @param placeholder - Specify the PlaceHolder text.
 */
export declare function removeFloating(overAllWrapper: HTMLDivElement, componentWrapper: HTMLDivElement, searchWrapper: HTMLElement, inputElement: HTMLInputElement, value: number[] | string[] | boolean[], floatLabelType: FloatLabelType, placeholder: string): void;
/**
 * Function to set the placeholder to the element.
 * @param value - Value of the MultiSelect.
 * @param inputElement - specify the input wrapper.
 * @param placeholder - Specify the PlaceHolder text.
 */
export declare function setPlaceHolder(value: number[] | string[] | boolean[], inputElement: HTMLInputElement, placeholder: string): void;
/**
 * Function for focusing the Float Element.
 * @param overAllWrapper - overall wrapper of multiselect.
 * @param componentWrapper - wrapper element of multiselect.
 */
export declare function floatLabelFocus(overAllWrapper: HTMLDivElement, componentWrapper: HTMLDivElement): void;
/**
 * Function to focus the Float Label element.
 * @param overAllWrapper - overall wrapper of multiselect.
 * @param componentWrapper - wrapper element of multiselect.
 * @param value - Value of the MultiSelect.
 * @param floatLabelType - Specify the FloatLabel Type.
 * @param placeholder - Specify the PlaceHolder text.
 */
export declare function floatLabelBlur(overAllWrapper: HTMLDivElement, componentWrapper: HTMLDivElement, value: number[] | string[] | boolean[], floatLabelType: FloatLabelType, placeholder: string): void;
