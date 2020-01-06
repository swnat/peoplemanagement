import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { FieldElementBox } from '../viewer/page';
/**
 * @private
 */
var HelperMethods = /** @class */ (function () {
    function HelperMethods() {
    }
    /**
     * Inserts text at specified index in string.
     * @param {string} spanText
     * @param {number} index
     * @param {string} text
     * @private
     */
    HelperMethods.insert = function (spanText, index, text) {
        if (index >= 0) {
            return [spanText.slice(0, index) + text + spanText.slice(index)].join('');
        }
        else {
            return text + this;
        }
    };
    /**
     * Removes text from specified index in string.
     * @param {string} text
     * @param {number} index
     * @param {number} length
     * @private
     */
    HelperMethods.remove = function (text, index, length) {
        if (index === 0) {
            return text.substring(index + 1, text.length);
        }
        else {
            return text.substring(0, index) + text.substring(index + 1, text.length);
        }
    };
    /**
     * Returns the index of word split character in a string.
     * @param {string} text
     * @param {string[]} wordSplitCharacter
     * @private
     */
    /* tslint:disable:no-any */
    HelperMethods.indexOfAny = function (text, wordSplitCharacter) {
        var index = undefined;
        for (var j = 0; j < wordSplitCharacter.length; j++) {
            var temp = text.indexOf(wordSplitCharacter[j]);
            if (temp !== -1 && isNullOrUndefined(index)) {
                index = temp;
            }
            else if (temp !== -1 && temp < index) {
                index = temp;
            }
        }
        return isNullOrUndefined(index) ? -1 : index;
    };
    /**
     * Returns the last index of word split character in a string.
     * @param {string} text
     * @param {string[]} wordSplitCharacter
     * @private
     */
    HelperMethods.lastIndexOfAny = function (text, wordSplitCharacter) {
        for (var i = text.length - 1; i >= 0; i--) {
            for (var j = 0; j <= wordSplitCharacter.length - 1; j++) {
                if (text[i] === wordSplitCharacter[j]) {
                    return i;
                }
            }
        }
        return -1;
    };
    /**
     * Adds css styles to document header.
     * @param {string} css
     * @private
     */
    HelperMethods.addCssStyle = function (css) {
        var style = document.createElement('style');
        if (style.style.cssText) {
            style.style.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    };
    /**
     * Gets highlight color code.
     * @param {HighlightColor} highlightColor
     * @private
     */
    HelperMethods.getHighlightColorCode = function (highlightColor) {
        var color = '#ffffff';
        switch (highlightColor) {
            case 'Yellow':
                color = '#ffff00';
                break;
            case 'BrightGreen':
                color = '#00ff00';
                break;
            case 'Turquoise':
                color = '#00ffff';
                break;
            case 'Pink':
                color = '#ff00ff';
                break;
            case 'Blue':
                color = '#0000ff';
                break;
            case 'Red':
                color = '#ff0000';
                break;
            case 'DarkBlue':
                color = '#000080';
                break;
            case 'Teal':
                color = '#008080';
                break;
            case 'Green':
                color = '#008000';
                break;
            case 'Violet':
                color = '#800080';
                break;
            case 'DarkRed':
                color = '#800000';
                break;
            case 'DarkYellow':
                color = '#808000';
                break;
            case 'Gray50':
                color = '#808080';
                break;
            case 'Gray25':
                color = '#c0c0c0';
                break;
            case 'Black':
                color = '#000000';
                break;
        }
        return color;
    };
    /**
     * Converts point to pixel.
     * @param {number} point
     * @private
     */
    HelperMethods.convertPointToPixel = function (point) {
        var pixel = HelperMethods.round((point * 96 / 72), 5);
        return pixel;
    };
    /**
     * Converts pixel to point.
     * @param {number} pixel
     * @private
     */
    HelperMethods.convertPixelToPoint = function (pixel) {
        var point = HelperMethods.round((pixel * 72 / 96), 5);
        return point;
    };
    /**
     * Return true if field linked
     * @private
     */
    HelperMethods.isLinkedFieldCharacter = function (inline) {
        if (inline instanceof FieldElementBox && inline.fieldType === 0) {
            return !isNullOrUndefined(inline.fieldEnd);
        }
        else if (inline instanceof FieldElementBox && inline.fieldType === 2) {
            return !isNullOrUndefined(inline.fieldBegin) && !isNullOrUndefined(inline.fieldEnd);
        }
        else {
            return !isNullOrUndefined(inline.fieldBegin);
        }
    };
    /**
     * Removes white space in a string.
     * @param {string} text
     * @private
     */
    HelperMethods.removeSpace = function (text) {
        if (!isNullOrUndefined(text) && text.length !== 0) {
            for (var i = 0; i < text.length; i++) {
                if (text.charAt(i) === ' ') {
                    //replace the space by empty string in string
                    text = text.replace(' ', '');
                }
            }
        }
        return text;
    };
    /**
     * Trims white space at start of the string.
     * @param {string} text
     * @private
     */
    HelperMethods.trimStart = function (text) {
        var i = 0;
        for (i; i < text.length; i++) {
            if (text[i] !== ' ') {
                break;
            }
        }
        return text.substring(i, text.length);
    };
    /**
     * Trims white space at end of the string.
     * @param {string} text
     * @private
     */
    HelperMethods.trimEnd = function (text) {
        var i = text.length - 1;
        for (i; i >= 0; i--) {
            if (text[i] !== ' ') {
                break;
            }
        }
        return text.substring(0, i + 1);
    };
    /**
     * Checks whether string ends with whitespace.
     * @param {string} text
     * @private
     */
    HelperMethods.endsWith = function (text) {
        if (!isNullOrUndefined(text) && text.length !== 0) {
            return text[text.length - 1] === ' ';
        }
        return false;
    };
    /**
     * Return specified number of string count
     * @private
     */
    HelperMethods.addSpace = function (length) {
        var str = '';
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                str += ' ';
            }
        }
        return str;
    };
    /**
     * @private
     * Write Characterformat
     * @param {any} characterFormat
     * @param {boolean} isInline
     * @param {WCharacterFormat} format
     */
    HelperMethods.writeCharacterFormat = function (characterFormat, isInline, format) {
        characterFormat.bold = isInline ? format.bold : format.getValue('bold');
        characterFormat.italic = isInline ? format.italic : format.getValue('italic');
        characterFormat.fontSize = isInline ? format.fontSize : format.getValue('fontSize');
        characterFormat.fontFamily = isInline ? format.fontFamily : format.getValue('fontFamily');
        characterFormat.underline = isInline ? format.underline : format.getValue('underline');
        characterFormat.strikethrough = isInline ? format.strikethrough : format.getValue('strikethrough');
        characterFormat.baselineAlignment = isInline ? format.baselineAlignment : format.getValue('baselineAlignment');
        characterFormat.highlightColor = isInline ? format.highlightColor : format.getValue('highlightColor');
        characterFormat.fontColor = isInline ? format.fontColor : format.getValue('fontColor');
        characterFormat.styleName = !isNullOrUndefined(format.baseCharStyle) ? format.baseCharStyle.name : undefined;
        characterFormat.bidi = isInline ? format.bidi : format.getValue('bidi');
        characterFormat.bdo = isInline ? format.bdo : format.getValue('bdo');
        characterFormat.boldBidi = isInline ? format.boldBidi : format.getValue('boldBidi');
        characterFormat.italicBidi = isInline ? format.italicBidi : format.getValue('italicBidi');
        characterFormat.fontSizeBidi = isInline ? format.fontSizeBidi : format.getValue('fontSizeBidi');
        characterFormat.fontFamilyBidi = isInline ? format.fontFamilyBidi : format.getValue('fontFamilyBidi');
    };
    /* tslint:enable:no-any */
    /**
     * Rounds the values with specified decimal digits.
     * @param {number} value
     * @param {number} decimalDigits
     * @private
     */
    HelperMethods.round = function (value, decimalDigits) {
        var temp = value;
        for (var i = 0; i < decimalDigits; i++) {
            temp = temp * 10;
        }
        temp = Math.round(temp);
        for (var i = 0; i < decimalDigits; i++) {
            temp = temp / 10;
        }
        return temp;
    };
    HelperMethods.ReverseString = function (text) {
        if (!isNullOrUndefined(text) && text !== '') {
            // return a new array
            var splitString = text.split('');
            // reverse the new created array
            var reverseString = splitString.reverse();
            // join all elements of the array into a string
            text = reverseString.join('');
        }
        return text;
    };
    /**
     * @private
     */
    HelperMethods.formatClippedString = function (base64ImageString) {
        var extension = '';
        var formatClippedString = '';
        if (this.startsWith(base64ImageString, 'data:image/bmp;base64,')) {
            extension = '.bmp';
            formatClippedString = base64ImageString.replace('data:image/bmp;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/x-emf;base64,')) {
            extension = '.emf';
            formatClippedString = base64ImageString.replace('data:image/x-emf;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/exif;base64,')) {
            extension = '.exif';
            formatClippedString = base64ImageString.replace('data:image/exif;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/gif;base64,')) {
            extension = '.gif';
            formatClippedString = base64ImageString.replace('data:image/gif;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/icon;base64,')) {
            extension = '.ico';
            formatClippedString = base64ImageString.replace('data:image/icon;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/jpeg;base64,')) {
            extension = '.jpeg';
            formatClippedString = base64ImageString.replace('data:image/jpeg;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/jpg;base64,')) {
            extension = '.jpg';
            formatClippedString = base64ImageString.replace('data:image/jpg;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/png;base64,')) {
            extension = '.png';
            formatClippedString = base64ImageString.replace('data:image/png;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/tiff;base64,')) {
            extension = '.tif';
            formatClippedString = base64ImageString.replace('data:image/tiff;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/x-wmf;base64,')) {
            extension = '.wmf';
            formatClippedString = base64ImageString.replace('data:image/x-wmf;base64,', '');
        }
        else {
            extension = '.jpeg';
        }
        return { 'extension': extension, 'formatClippedString': formatClippedString };
    };
    HelperMethods.startsWith = function (sourceString, startString) {
        return startString.length > 0 && sourceString.substring(0, startString.length) === startString;
    };
    /**
     * @private
     */
    HelperMethods.wordBefore = '\\b';
    /**
     * @private
     */
    HelperMethods.wordAfter = '\\b';
    /**
     * @private
     */
    HelperMethods.wordSplitCharacters = [' ', ',', '.', ':', ';', '<', '>', '=',
        '+', '-', '_', '{', '}', '[', ']', '`', '~', '!', '@', '#', '$', '%', '^', '&',
        '*', '(', ')', '"', '?', '/', '|', '\\', '”', '　', '،', '؟', '؛', '’', '‘'];
    return HelperMethods;
}());
export { HelperMethods };
/**
 * @private
 */
var Point = /** @class */ (function () {
    function Point(xPosition, yPosition) {
        this.xIn = 0;
        this.yIn = 0;
        this.xIn = xPosition;
        this.yIn = yPosition;
    }
    Object.defineProperty(Point.prototype, "x", {
        /**
         * Gets or sets x value.
         * @private
         */
        get: function () {
            return this.xIn;
        },
        set: function (value) {
            this.xIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        /**
         * Gets or sets y value.
         * @private
         */
        get: function () {
            return this.yIn;
        },
        set: function (value) {
            this.yIn = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Point.prototype.copy = function (point) {
        this.xIn = point.xIn;
        this.yIn = point.yIn;
    };
    /**
     * Destroys the internal objects maintained.
     * @returns void
     */
    Point.prototype.destroy = function () {
        this.xIn = undefined;
        this.yIn = undefined;
    };
    return Point;
}());
export { Point };
/**
 * @private
 */
var Base64 = /** @class */ (function () {
    function Base64() {
        this.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }
    // public method for encoding
    Base64.prototype.encodeString = function (input) {
        var output = '';
        var chr1;
        var chr2;
        var chr3;
        var enc1;
        var enc2;
        var enc3;
        var enc4;
        var i = 0;
        input = this.unicodeEncode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
        }
        return output;
    };
    // private method for UTF-8 encoding
    Base64.prototype.unicodeEncode = function (input) {
        var tempInput = input.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < tempInput.length; n++) {
            var c = tempInput.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    /**
     * @private
     */
    Base64.prototype.decodeString = function (input) {
        var chr1;
        var chr2;
        var chr3;
        var enc1;
        var enc2;
        var enc3;
        var enc4;
        var i = 0;
        var resultIndex = 0;
        /*let dataUrlPrefix: string = 'data:';*/
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        var totalLength = input.length * 3 / 4;
        if (input.charAt(input.length - 1) === this.keyStr.charAt(64)) {
            totalLength--;
        }
        if (input.charAt(input.length - 2) === this.keyStr.charAt(64)) {
            totalLength--;
        }
        if (totalLength % 1 !== 0) {
            // totalLength is not an integer, the length does not match a valid
            // base64 content. That can happen if:
            // - the input is not a base64 content
            // - the input is *almost* a base64 content, with a extra chars at the
            // beginning or at the end
            // - the input uses a base64 variant (base64url for example)
            throw new Error('Invalid base64 input, bad content length.');
        }
        var output = new Uint8Array(totalLength | 0);
        while (i < input.length) {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output[resultIndex++] = chr1;
            if (enc3 !== 64) {
                output[resultIndex++] = chr2;
            }
            if (enc4 !== 64) {
                output[resultIndex++] = chr3;
            }
        }
        return output;
    };
    return Base64;
}());
export { Base64 };
