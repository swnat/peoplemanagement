import { Rect } from '../primitives/rect';
import { Size } from '../primitives/size';
import { identityMatrix, transformPointByMatrix, rotateMatrix } from '../primitives/matrix';
import { getValue } from '@syncfusion/ej2-base';
import { getChildNode } from './dom-util';
/**
 * Implements the basic functionalities
 */
/** @private */
export function randomId() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var id = '';
    var num;
    for (var i = 0; i < 5; i++) {
        if ('crypto' in window && 'getRandomValues' in crypto) {
            var count = new Uint16Array(1);
            // tslint:disable-next-line:no-any
            var intCrypto = window.msCrypto || window.crypto;
            num = intCrypto.getRandomValues(count)[0] % (chars.length - 1);
        }
        else {
            num = Math.floor(Math.random() * chars.length);
        }
        if (i === 0 && num < 10) {
            i--;
            continue;
        }
        id += chars.substring(num, num + 1);
    }
    return id;
}
/** @private */
export function cornersPointsBeforeRotation(ele) {
    var bounds = new Rect();
    var top = ele.offsetY - ele.actualSize.height * ele.pivot.y;
    var bottom = ele.offsetY + ele.actualSize.height * (1 - ele.pivot.y);
    var left = ele.offsetX - ele.actualSize.width * ele.pivot.x;
    var right = ele.offsetX + ele.actualSize.width * (1 - ele.pivot.x);
    var topLeft = { x: left, y: top };
    var topCenter = { x: (left + right) / 2, y: top };
    var topRight = { x: right, y: top };
    var middleLeft = { x: left, y: (top + bottom) / 2 };
    var middleRight = { x: right, y: (top + bottom) / 2 };
    var bottomLeft = { x: left, y: bottom };
    var bottomCenter = { x: (left + right) / 2, y: bottom };
    var bottomRight = { x: right, y: bottom };
    bounds = Rect.toBounds([topLeft, topRight, bottomLeft, bottomRight]);
    return bounds;
}
/** @private */
export function getBounds(element) {
    var bounds = new Rect();
    var corners;
    corners = cornersPointsBeforeRotation(element);
    var middleLeft = corners.middleLeft;
    var topCenter = corners.topCenter;
    var bottomCenter = corners.bottomCenter;
    var middleRight = corners.middleRight;
    var topLeft = corners.topLeft;
    var topRight = corners.topRight;
    var bottomLeft = corners.bottomLeft;
    var bottomRight = corners.bottomRight;
    element.corners = {
        topLeft: topLeft, topCenter: topCenter, topRight: topRight, middleLeft: middleLeft,
        middleRight: middleRight, bottomLeft: bottomLeft, bottomCenter: bottomCenter, bottomRight: bottomRight
    };
    if (element.rotateAngle !== 0 || element.parentTransform !== 0) {
        var matrix = identityMatrix();
        rotateMatrix(matrix, element.rotateAngle + element.parentTransform, element.offsetX, element.offsetY);
        element.corners.topLeft = topLeft = transformPointByMatrix(matrix, topLeft);
        element.corners.topCenter = topCenter = transformPointByMatrix(matrix, topCenter);
        element.corners.topRight = topRight = transformPointByMatrix(matrix, topRight);
        element.corners.middleLeft = middleLeft = transformPointByMatrix(matrix, middleLeft);
        element.corners.middleRight = middleRight = transformPointByMatrix(matrix, middleRight);
        element.corners.bottomLeft = bottomLeft = transformPointByMatrix(matrix, bottomLeft);
        element.corners.bottomCenter = bottomCenter = transformPointByMatrix(matrix, bottomCenter);
        element.corners.bottomRight = bottomRight = transformPointByMatrix(matrix, bottomRight);
        //Set corners based on rotate angle
    }
    bounds = Rect.toBounds([topLeft, topRight, bottomLeft, bottomRight]);
    element.corners.left = bounds.left;
    element.corners.right = bounds.right;
    element.corners.top = bounds.top;
    element.corners.bottom = bounds.bottom;
    element.corners.center = bounds.center;
    element.corners.width = bounds.width;
    element.corners.height = bounds.height;
    return bounds;
}
/** @private */
export function cloneObject(obj, additionalProp, key) {
    var newObject = {};
    var keys = 'properties';
    var prop = 'propName';
    if (obj) {
        key = obj[prop];
        var sourceObject = obj[keys] || obj;
        var properties = [];
        properties = properties.concat(Object.keys(sourceObject));
        var customProperties = [];
        properties.push('version');
        if (key) {
            var propAdditional = getFunction(additionalProp);
            if (propAdditional) {
                customProperties = propAdditional(key);
            }
            else {
                customProperties = [];
            }
            properties = properties.concat(customProperties);
        }
        var internalProp = getInternalProperties(key);
        properties = properties.concat(internalProp);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            if (property !== 'historyManager') {
                if (property !== 'wrapper') {
                    var constructorId = 'constructor';
                    var name_1 = 'name';
                    var isEventEmmitter = obj[property] && obj.hasOwnProperty('observers') ? true : false;
                    if (!isEventEmmitter) {
                        if (obj[property] instanceof Array) {
                            newObject[property] = cloneArray((internalProp.indexOf(property) === -1 && obj[keys]) ? obj[keys][property] : obj[property], additionalProp, property);
                        }
                        else if (obj[property] instanceof Array === false && obj[property] instanceof HTMLElement) {
                            newObject[property] = obj[property].cloneNode(true).innerHtml;
                        }
                        else if (obj[property] instanceof Array === false && obj[property] instanceof Object) {
                            newObject[property] = cloneObject((internalProp.indexOf(property) === -1 && obj[keys]) ? obj[keys][property] : obj[property]);
                        }
                        else {
                            newObject[property] = obj[property];
                        }
                    }
                }
                else {
                    if (obj[property]) {
                        newObject[property] = {
                            actualSize: {
                                width: obj[property].actualSize.width, height: obj[property].actualSize.height
                            }, offsetX: obj[property].offsetX, offsetY: obj[property].offsetY
                        };
                    }
                }
            }
        }
    }
    return newObject;
}
/** @private */
export function getInternalProperties(propName) {
    switch (propName) {
        case 'nodes':
        case 'children':
            return ['inEdges', 'outEdges', 'parentId', 'processId', 'nodeId', 'umlIndex', 'isPhase', 'isLane'];
        case 'connectors':
            return ['parentId'];
        case 'annotation':
            return ['nodeId'];
        case 'annotations':
            return ['nodeId'];
        case 'shape':
            return ['hasHeader'];
    }
    return [];
}
/** @private */
export function cloneArray(sourceArray, additionalProp, key) {
    var clonedArray;
    if (sourceArray) {
        clonedArray = [];
        for (var i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i] instanceof Array) {
                clonedArray.push(sourceArray[i]);
            }
            else if (sourceArray[i] instanceof Object) {
                clonedArray.push(cloneObject(sourceArray[i], additionalProp, key));
            }
            else {
                clonedArray.push(sourceArray[i]);
            }
        }
    }
    return clonedArray;
}
/** @private */
export function extendObject(options, childObject) {
    var properties = 'properties';
    if (options) {
        if (!childObject) {
            childObject = { properties: {} };
        }
        var target = childObject;
        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
            var property = _a[_i];
            if (options[property] instanceof Array) {
                var extendeArray = extendArray(options[property], childObject[properties][property]);
                if (!childObject[properties][property] || !childObject[properties][property].length) {
                    childObject[property] = extendeArray;
                }
            }
            else if (options[property] instanceof Array === false && options[property] instanceof HTMLElement) {
                childObject[property] = options[property].cloneNode(true).innerHtml;
            }
            else if (options[property] instanceof Array === false && options[property] instanceof Object) {
                var extendedObject = extendObject(options[property], childObject[properties][property]);
                if (extendedObject[properties] && !Object.keys(extendedObject[properties]).length) {
                    delete extendedObject[properties];
                }
                childObject[property] = extendedObject;
            }
            else {
                childObject[property] = childObject[properties][property] !== undefined ?
                    childObject[property] : options[property];
            }
        }
    }
    return childObject;
}
/** @private */
export function extendArray(sourceArray, childArray) {
    var clonedArray = [];
    var reset = false;
    if (!childArray) {
        childArray = [];
    }
    if (!childArray.length) {
        reset = true;
    }
    for (var i = 0; i < sourceArray.length; i++) {
        if (sourceArray[i] instanceof Array) {
            var extendedArray = extendArray(sourceArray[i], childArray[i]);
            if (reset) {
                clonedArray.push(extendArray);
            }
        }
        else if (sourceArray[i] instanceof Object) {
            var extendedObject = extendObject(sourceArray[i], childArray[i]);
            if (reset) {
                clonedArray.push(extendedObject);
            }
        }
        else {
            clonedArray.push(sourceArray[i]);
        }
    }
    return clonedArray;
}
/** @private */
export function textAlignToString(value) {
    var state = '';
    switch (value) {
        case 'Center':
            state = 'center';
            break;
        case 'Left':
            state = 'left';
            break;
        case 'Right':
            state = 'right';
            break;
    }
    return state;
}
/** @private */
export function wordBreakToString(value) {
    var state = '';
    switch (value) {
        case 'Wrap':
            state = 'breakall';
            break;
        case 'NoWrap':
            state = 'keepall';
            break;
        case 'WrapWithOverflow':
            state = 'normal';
            break;
        case 'LineThrough':
            state = 'line-through';
            break;
    }
    return state;
}
export function bBoxText(textContent, options) {
    var measureElement = 'measureElement';
    window[measureElement].style.visibility = 'visible';
    var svg = window[measureElement].children[2];
    var text = getChildNode(svg)[1];
    text.textContent = textContent;
    text.setAttribute('style', 'font-size:' + options.fontSize + 'px; font-family:'
        + options.fontFamily + ';font-weight:' + (options.bold ? 'bold' : 'normal'));
    var bBox = text.getBBox().width;
    window[measureElement].style.visibility = 'hidden';
    return bBox;
}
/** @private */
export function middleElement(i, j) {
    var m = 0;
    m = (i + j) / 2;
    return m;
}
/** @private */
export function overFlow(text, options) {
    var i = 0;
    var j = 0;
    var middle = 0;
    var bounds = 0;
    var temp = '';
    j = text.length;
    var t = 0;
    do {
        if (bounds > 0) {
            i = middle;
        }
        middle = Math.floor(middleElement(i, j));
        temp += text.substr(i, middle);
        bounds = bBoxText(temp, options);
    } while (bounds <= options.width);
    temp = temp.substr(0, i);
    for (t = i; t < j; t++) {
        temp += text[t];
        bounds = bBoxText(temp, options);
        if (bounds >= options.width) {
            text = text.substr(0, temp.length - 1);
            break;
        }
    }
    if (options.textOverflow === 'Ellipsis') {
        text = text.substr(0, text.length - 3);
        text += '...';
    }
    else {
        text = text.substr(0, text.length);
    }
    return text;
}
/** @private */
export function whiteSpaceToString(value, wrap) {
    if (wrap === 'NoWrap' && value === 'PreserveAll') {
        return 'pre';
    }
    var state = '';
    switch (value) {
        case 'CollapseAll':
            state = 'nowrap';
            break;
        case 'CollapseSpace':
            state = 'pre-line';
            break;
        case 'PreserveAll':
            state = 'pre-wrap';
            break;
    }
    return state;
}
/** @private */
export function rotateSize(size, angle) {
    var matrix = identityMatrix();
    rotateMatrix(matrix, angle, 0, 0);
    var topLeft = transformPointByMatrix(matrix, { x: 0, y: 0 });
    var topRight = transformPointByMatrix(matrix, { x: size.width, y: 0 });
    var bottomLeft = transformPointByMatrix(matrix, { x: 0, y: size.height });
    var bottomRight = transformPointByMatrix(matrix, { x: size.width, y: size.height });
    var minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    return new Size(maxX - minX, maxY - minY);
}
/** @private */
export function rotatePoint(angle, pivotX, pivotY, point) {
    if (angle !== 0) {
        var matrix = identityMatrix();
        rotateMatrix(matrix, angle, pivotX, pivotY);
        return transformPointByMatrix(matrix, point);
    }
    return point;
}
/** @private */
export function getOffset(topLeft, obj) {
    var offX = topLeft.x + obj.desiredSize.width * obj.pivot.x;
    var offY = topLeft.y + obj.desiredSize.height * obj.pivot.y;
    return {
        x: offX, y: offY
    };
}
/**
 * Get function
 */
export function getFunction(value) {
    if (value !== undefined) {
        if (typeof value === 'string') {
            value = getValue(value, window);
        }
    }
    return value;
}
