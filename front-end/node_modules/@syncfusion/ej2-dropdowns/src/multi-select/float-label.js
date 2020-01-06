/**
 * FloatLable Moduel
 * Specifies whether to display the floating label above the input element.
 */
import { removeClass, addClass, detach } from '@syncfusion/ej2-base';
import { attributes, isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
var FLOATLINE = 'e-float-line';
var FLOATTEXT = 'e-float-text';
var LABELTOP = 'e-label-top';
var LABELBOTTOM = 'e-label-bottom';
/**
 * Function to create Float Label element.
 * @param overAllWrapper - overall wrapper of multiselect.
 * @param element - the given html element.
 * @param inputElement - specify the input wrapper.
 * @param value - Value of the MultiSelect.
 * @param floatLabelType - Specify the FloatLabel Type.
 * @param placeholder - Specify the PlaceHolder text.
 */
export function createFloatLabel(overAllWrapper, searchWrapper, element, inputElement, value, floatLabelType, placeholder) {
    var floatLinelement;
    var floatLabelElement;
    floatLinelement = createElement('span', { className: FLOATLINE });
    floatLabelElement = createElement('label', { className: FLOATTEXT });
    if (!isNullOrUndefined(element.id) && element.id !== '') {
        floatLabelElement.id = 'label_' + element.id.replace(/ /g, '_');
        attributes(element, { 'aria-labelledby': floatLabelElement.id });
    }
    if (!isNullOrUndefined(inputElement.placeholder) && inputElement.placeholder !== '') {
        floatLabelElement.innerHTML = inputElement.placeholder;
        inputElement.removeAttribute('placeholder');
    }
    floatLabelElement.innerHTML = placeholder;
    searchWrapper.appendChild(floatLinelement);
    searchWrapper.appendChild(floatLabelElement);
    overAllWrapper.classList.add('e-float-input');
    updateFloatLabelState(value, floatLabelElement);
    if (floatLabelType === 'Always') {
        if (floatLabelElement.classList.contains(LABELBOTTOM)) {
            removeClass([floatLabelElement], LABELBOTTOM);
        }
        addClass([floatLabelElement], LABELTOP);
    }
}
/**
 * Function to update status of the Float Label element.
 * @param value - Value of the MultiSelect.
 * @param label - float label element.
 */
export function updateFloatLabelState(value, label) {
    if (value && value.length > 0) {
        addClass([label], LABELTOP);
        removeClass([label], LABELBOTTOM);
    }
    else {
        removeClass([label], LABELTOP);
        addClass([label], LABELBOTTOM);
    }
}
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
export function removeFloating(overAllWrapper, componentWrapper, searchWrapper, inputElement, value, floatLabelType, placeholder) {
    var placeholderElement = componentWrapper.querySelector('.' + FLOATTEXT);
    var floatLine = componentWrapper.querySelector('.' + FLOATLINE);
    var placeholderText;
    if (!isNullOrUndefined(placeholderElement)) {
        placeholderText = placeholderElement.innerText;
        detach(searchWrapper.querySelector('.' + FLOATTEXT));
        setPlaceHolder(value, inputElement, placeholderText);
        if (!isNullOrUndefined(floatLine)) {
            detach(searchWrapper.querySelector('.' + FLOATLINE));
        }
    }
    else {
        placeholderText = (placeholder !== null) ? placeholder : '';
        setPlaceHolder(value, inputElement, placeholderText);
    }
    overAllWrapper.classList.remove('e-float-input');
}
/**
 * Function to set the placeholder to the element.
 * @param value - Value of the MultiSelect.
 * @param inputElement - specify the input wrapper.
 * @param placeholder - Specify the PlaceHolder text.
 */
export function setPlaceHolder(value, inputElement, placeholder) {
    if (value && value.length) {
        inputElement.placeholder = '';
    }
    else {
        inputElement.placeholder = placeholder;
    }
}
/**
 * Function for focusing the Float Element.
 * @param overAllWrapper - overall wrapper of multiselect.
 * @param componentWrapper - wrapper element of multiselect.
 */
export function floatLabelFocus(overAllWrapper, componentWrapper) {
    overAllWrapper.classList.add('e-input-focus');
    var label = componentWrapper.querySelector('.' + FLOATTEXT);
    if (!isNullOrUndefined(label)) {
        addClass([label], LABELTOP);
        if (label.classList.contains(LABELBOTTOM)) {
            removeClass([label], LABELBOTTOM);
        }
    }
}
/**
 * Function to focus the Float Label element.
 * @param overAllWrapper - overall wrapper of multiselect.
 * @param componentWrapper - wrapper element of multiselect.
 * @param value - Value of the MultiSelect.
 * @param floatLabelType - Specify the FloatLabel Type.
 * @param placeholder - Specify the PlaceHolder text.
 */
export function floatLabelBlur(overAllWrapper, componentWrapper, value, floatLabelType, placeholder) {
    overAllWrapper.classList.remove('e-input-focus');
    var label = componentWrapper.querySelector('.' + FLOATTEXT);
    if (value && value.length <= 0 && floatLabelType === 'Auto' && !isNullOrUndefined(label)) {
        if (label.classList.contains(LABELTOP)) {
            removeClass([label], LABELTOP);
        }
        addClass([label], LABELBOTTOM);
    }
}
