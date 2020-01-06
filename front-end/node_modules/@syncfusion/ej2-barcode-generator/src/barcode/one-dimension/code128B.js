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
import { Code128 } from './code128';
/**
 * code128B used to calculate the barcode of type 128
 */
var Code128B = /** @class */ (function (_super) {
    __extends(Code128B, _super);
    function Code128B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Validate the given input to check whether the input is valid one or not
     */
    /** @private */
    Code128B.prototype.validateInput = function (char) {
        if ((new RegExp("^" + '[\x20-\x7F\xC8-\xCF]' + "+$")).test(char)) {
            return undefined;
        }
        else {
            return 'Supports only ASCII characters 32 to 127 (0–9, A–Z, a–z), and special characters.';
        }
    };
    /** @private */
    Code128B.prototype.draw = function (canvas) {
        this.code128(canvas);
    };
    return Code128B;
}(Code128));
export { Code128B };
