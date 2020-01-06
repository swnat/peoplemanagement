/**
 * PdfNumbersConvertor.ts class for EJ2-PDF
 * @private
 */
import { PdfNumberStyle } from './../../pages/enum';
/**
 * `PdfNumbersConvertor` for convert page number into numbers, roman letters, etc.,
 * @private
 */
var PdfNumbersConvertor = /** @class */ (function () {
    function PdfNumbersConvertor() {
    }
    // Static methods
    /**
     * Convert string value from page number with correct format.
     * @private
     */
    PdfNumbersConvertor.convert = function (intArabic, numberStyle) {
        var result = '';
        switch (numberStyle) {
            case PdfNumberStyle.None:
                result = '';
                break;
            case PdfNumberStyle.Numeric:
                result = intArabic.toString();
                break;
            case PdfNumberStyle.LowerLatin:
                result = this.arabicToLetter(intArabic).toLowerCase();
                break;
            case PdfNumberStyle.LowerRoman:
                result = this.arabicToRoman(intArabic).toLowerCase();
                break;
            case PdfNumberStyle.UpperLatin:
                result = this.arabicToLetter(intArabic);
                break;
            case PdfNumberStyle.UpperRoman:
                result = this.arabicToRoman(intArabic);
                break;
        }
        return result;
    };
    /**
     * Converts `arabic to roman` letters.
     * @private
     */
    PdfNumbersConvertor.arabicToRoman = function (intArabic) {
        var retval = '';
        retval += this.generateNumber(intArabic, 1000, 'M');
        retval += this.generateNumber(intArabic, 900, 'CM');
        retval += this.generateNumber(intArabic, 500, 'D');
        retval += this.generateNumber(intArabic, 400, 'CD');
        retval += this.generateNumber(intArabic, 100, 'C');
        retval += this.generateNumber(intArabic, 90, 'XC');
        retval += this.generateNumber(intArabic, 50, 'L');
        retval += this.generateNumber(intArabic, 40, 'XL');
        retval += this.generateNumber(intArabic, 10, 'X');
        retval += this.generateNumber(intArabic, 9, 'IX');
        retval += this.generateNumber(intArabic, 5, 'V');
        retval += this.generateNumber(intArabic, 4, 'IV');
        retval += this.generateNumber(intArabic, 1, 'I');
        return retval.toString();
    };
    /**
     * Converts `arabic to normal letters`.
     * @private
     */
    PdfNumbersConvertor.arabicToLetter = function (arabic) {
        var stack = this.convertToLetter(arabic);
        var result = '';
        while (stack.length > 0) {
            var num = stack.pop();
            result = this.appendChar(result, num);
        }
        return result.toString();
    };
    /**
     * Generate a string value of an input number.
     * @private
     */
    PdfNumbersConvertor.generateNumber = function (value, magnitude, letter) {
        var numberstring = '';
        while (value >= magnitude) {
            value -= magnitude;
            numberstring += letter;
        }
        return numberstring.toString();
    };
    /**
     * Convert a input number into letters.
     * @private
     */
    PdfNumbersConvertor.convertToLetter = function (arabic) {
        if (arabic <= 0) {
            throw Error('ArgumentOutOfRangeException-arabic, Value can not be less 0');
        }
        var stack = [];
        while (arabic > this.letterLimit) {
            var remainder = arabic % this.letterLimit;
            if (remainder === 0.0) {
                arabic = arabic / this.letterLimit - 1;
                remainder = this.letterLimit;
            }
            else {
                arabic /= this.letterLimit;
            }
            stack.push(remainder);
        }
        stack.push(arabic);
        return stack;
    };
    /**
     * Convert number to actual string value.
     * @private
     */
    PdfNumbersConvertor.appendChar = function (builder, value) {
        var letter = String.fromCharCode(PdfNumbersConvertor.acsiiStartIndex + value);
        builder += letter;
        return builder;
    };
    // Fields
    /**
     * numbers of letters in english [readonly].
     * @default = 26.0
     * @private
     */
    PdfNumbersConvertor.letterLimit = 26.0;
    /**
     * Resturns `acsii start index` value.
     * @default 64
     * @private
     */
    PdfNumbersConvertor.acsiiStartIndex = (65 - 1);
    return PdfNumbersConvertor;
}());
export { PdfNumbersConvertor };
