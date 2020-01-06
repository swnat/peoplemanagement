var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { createElement, compile as templateComplier, remove } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Animation } from '@syncfusion/ej2-base';
import { SmithchartSize } from '../../smithchart/utils/utils';
export function createSvg(smithchart) {
    smithchart.renderer = new SvgRenderer(smithchart.element.id);
    calculateSize(smithchart);
    smithchart.svgObject = smithchart.renderer.createSvg({
        id: smithchart.element.id + '_svg',
        width: smithchart.availableSize.width,
        height: smithchart.availableSize.height
    });
}
export function getElement(id) {
    return document.getElementById(id);
}
/**
 * @private
 * Trim the title text
 */
export function textTrim(maxwidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxwidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxwidth || label.length < 4) {
                if (label.length < 4) {
                    label = ' ';
                }
                return label;
            }
        }
    }
    return label;
}
/**
 * Function     to compile the template function for maps.
 * @returns Function
 * @private
 */
export function getTemplateFunction(templateString) {
    var templateFn = null;
    var e;
    try {
        if (document.querySelectorAll(templateString).length) {
            templateFn = templateComplier(document.querySelector(templateString).innerHTML.trim());
        }
    }
    catch (e) {
        templateFn = templateComplier(templateString);
    }
    return templateFn;
}
export function convertElementFromLabel(element, labelId, data, index, smithchart) {
    var labelEle = element[0];
    var templateHtml = labelEle.outerHTML;
    var properties = Object.keys(data);
    for (var i = 0; i < properties.length; i++) {
        templateHtml = templateHtml.replace(new RegExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
    }
    return createElement('div', {
        id: labelId,
        innerHTML: templateHtml,
        styles: 'position: absolute'
    });
}
export function _getEpsilonValue() {
    var e = 1.0;
    while ((1.0 + 0.5 * e) !== 1.0) {
        e *= 0.5;
    }
    return e;
}
/**
 * Method to calculate the width and height of the smithchart
 */
export function calculateSize(smithchart) {
    var containerWidth = smithchart.element.clientWidth;
    var containerHeight = smithchart.element.clientHeight;
    smithchart.availableSize = new SmithchartSize(stringToNumber(smithchart.width, containerWidth) || containerWidth || 600, stringToNumber(smithchart.height, containerHeight) || containerHeight || 450);
}
/**
 * Animation for template
 * @private
 */
export function templateAnimate(smithchart, element, delay, duration, name) {
    var opacity = 0;
    var delta;
    var value;
    new Animation({}).animate(element, {
        duration: duration,
        delay: delay,
        name: name,
        progress: function (args) {
            delta = ((args.timeStamp - args.delay) / args.duration);
            value = opacity + (delta * 1);
            args.element.style.opacity = value.toString();
        },
        end: function (args) {
            var opacity = 1;
            args.element.style.opacity = opacity.toString();
            smithchart.trigger('animationComplete', event);
        },
    });
}
/** @private */
export function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Internal use of path options
 * @private
 */
var PathOption = /** @class */ (function () {
    function PathOption(id, fill, width, color, opacity, dashArray, d) {
        this.id = id;
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
    return PathOption;
}());
export { PathOption };
/**
 * Internal use of rectangle options
 * @private
 */
var RectOption = /** @class */ (function (_super) {
    __extends(RectOption, _super);
    function RectOption(id, fill, border, opacity, rect) {
        var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
        _this.y = rect.y;
        _this.x = rect.x;
        _this.height = rect.height;
        _this.width = rect.width;
        return _this;
    }
    return RectOption;
}(PathOption));
export { RectOption };
/**
 * Internal use of circle options
 * @private
 */
var CircleOption = /** @class */ (function (_super) {
    __extends(CircleOption, _super);
    function CircleOption(id, fill, border, opacity, cx, cy, r, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
        _this.cy = cy;
        _this.cx = cx;
        _this.r = r;
        _this['stroke-dasharray'] = dashArray;
        return _this;
    }
    return CircleOption;
}(PathOption));
export { CircleOption };
export function measureText(text, font) {
    var htmlObject = document.getElementById('smithchartmeasuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'smithchartmeasuretext' });
        document.body.appendChild(htmlObject);
    }
    htmlObject.innerHTML = text;
    htmlObject.style.position = 'absolute';
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.left = '0';
    htmlObject.style.top = '-100';
    htmlObject.style.whiteSpace = 'nowrap';
    htmlObject.style.fontSize = font.size;
    htmlObject.style.fontWeight = font.fontWeight;
    htmlObject.style.fontStyle = font.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily;
    // For bootstrap line height issue
    htmlObject.style.lineHeight = 'normal';
    return new SmithchartSize(htmlObject.clientWidth, htmlObject.clientHeight);
}
/**
 * Internal use of text options
 * @private
 */
var TextOption = /** @class */ (function () {
    function TextOption(id, x, y, anchor, text) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.anchor = anchor;
        this.text = text;
    }
    return TextOption;
}());
export { TextOption };
/**
 * To remove element by id
 */
export function removeElement(id) {
    var element = document.getElementById(id);
    return element ? remove(element) : null;
}
/**
 * Animation Effect Calculation Started Here
 * @param currentTime
 * @param startValue
 * @param endValue
 * @param duration
 * @private
 */
export function linear(currentTime, startValue, endValue, duration) {
    return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
}
export function reverselinear(currentTime, startValue, endValue, duration) {
    return -startValue * Math.sin(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
}
/** @private */
export function getAnimationFunction(effect) {
    var functionName;
    switch (effect) {
        case 'Linear':
            functionName = linear;
            break;
        case 'Reverse':
            functionName = reverselinear;
            break;
    }
    return functionName;
}
/**
 * Internal rendering of text
 * @private
 */
export function renderTextElement(options, font, color, parent) {
    var renderOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'fill': color,
        'font-size': font.size,
        'font-style': font.fontStyle,
        'font-family': font.fontFamily,
        'font-weight': font.fontWeight,
        'text-anchor': options.anchor,
        'opacity': font.opacity
    };
    var text = options.text;
    var renderer = new SvgRenderer('');
    var height;
    var htmlObject = renderer.createText(renderOptions, text);
    parent.appendChild(htmlObject);
    return htmlObject;
}
