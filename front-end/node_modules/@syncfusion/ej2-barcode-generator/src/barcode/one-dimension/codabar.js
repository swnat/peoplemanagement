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
import { OneDimension } from '../one-dimension';
/**
 * codabar used to calculate the barcode of type codabar
 */
var CodaBar = /** @class */ (function (_super) {
    __extends(CodaBar, _super);
    function CodaBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @private */
    CodaBar.prototype.validateInput = function (char) {
        if (char.search(/^[0-9A-D\-\.\$\/\+\%\:]+$/) === -1) {
            return 'Supports 0-9, A-D and symbols (-,$, /, ., +).';
        }
        else {
            return undefined;
        }
    };
    CodaBar.prototype.getCodeValue = function () {
        var codes = {
            '0': '101010011',
            '1': '101011001',
            '2': '101001011',
            '3': '110010101',
            '4': '101101001',
            '5': '110101001',
            '6': '100101011',
            '7': '100101101',
            '8': '100110101',
            '9': '110100101',
            '-': '101001101',
            '$': '101100101',
            ':': '1101011011',
            '/': '1101101011',
            '.': '1101101101',
            '+': '101100110011',
            'A': '1011001001',
            'B': '1001001011',
            'C': '1010010011',
            'D': '1010011001'
        };
        return codes;
    };
    CodaBar.prototype.appendStartStopCharacters = function (char) {
        return 'A' + char + 'A';
    };
    CodaBar.prototype.getPatternCollection = function (givenCharacter, codes) {
        var code = [];
        for (var i = 0; i < givenCharacter.length; i++) {
            var char = givenCharacter[i];
            code.push(codes[char]);
        }
        return code;
    };
    /** @private */
    CodaBar.prototype.draw = function (canvas) {
        var codes = this.getCodeValue();
        var givenCharacter = this.value;
        givenCharacter = this.appendStartStopCharacters(givenCharacter);
        var code = this.getPatternCollection(givenCharacter, codes);
        this.calculateBarCodeAttributes(code, canvas);
    };
    return CodaBar;
}(OneDimension));
export { CodaBar };
