/**
 * DOM util
 */
import { createElement } from '@syncfusion/ej2-base';
import { Size } from '../primitives/size';
/** @private */
export function createHtmlElement(elementType, attribute) {
    var element = createElement(elementType);
    if (attribute) {
        setAttribute(element, attribute);
    }
    return element;
}
export function getChildNode(node) {
    return node.children;
}
export function measureText(textContent) {
    var measureElement = 'barcodeMeasureElement';
    window[measureElement].style.visibility = 'visible';
    var svg = window[measureElement].children[1];
    var text = getChildNode(svg)[0];
    text.textContent = textContent.string;
    text.setAttribute('style', 'font-size:' + textContent.stringSize + 'px; font-family:'
        + textContent.fontStyle + ';font-weight:');
    var bBox = new Size(0, 0);
    bBox.width = text.getBBox().width;
    bBox.height = text.getBBox().height;
    window[measureElement].style.visibility = 'hidden';
    return bBox;
}
/** @private */
export function setAttribute(element, attributes) {
    var keys = Object.keys(attributes);
    for (var i = 0; i < keys.length; i++) {
        element.setAttribute(keys[i], attributes[keys[i]]);
    }
}
/** @private */
export function createSvgElement(elementType, attribute) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
    setAttribute(element, attribute);
    return element;
}
/** @private */
export function createMeasureElements() {
    var measureElement = 'barcodeMeasureElement';
    if (!window[measureElement]) {
        var divElement = createHtmlElement('div', {
            id: 'barcodeMeasureElement', class: 'barcodeMeasureElement',
            style: 'visibility:hidden ; height: 0px ; width: 0px; overflow: hidden;'
        });
        var text = createHtmlElement('span', { 'style': 'display:inline-block ; line-height: normal' });
        divElement.appendChild(text);
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
        divElement.appendChild(svg);
        var tSpan = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tSpan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
        svg.appendChild(tSpan);
        window[measureElement] = divElement;
        window[measureElement].usageCount = 1;
        document.body.appendChild(divElement);
    }
    else {
        window[measureElement].usageCount += 1;
    }
}
