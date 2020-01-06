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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ChildProperty, Property } from '@syncfusion/ej2-base';
/**
 * Represents the cell style.
 */
var CellStyle = /** @class */ (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Calibri')
    ], CellStyle.prototype, "fontFamily", void 0);
    __decorate([
        Property('bottom')
    ], CellStyle.prototype, "verticalAlign", void 0);
    __decorate([
        Property('left')
    ], CellStyle.prototype, "textAlign", void 0);
    __decorate([
        Property('0pt')
    ], CellStyle.prototype, "textIndent", void 0);
    __decorate([
        Property('#000000')
    ], CellStyle.prototype, "color", void 0);
    __decorate([
        Property('#ffffff')
    ], CellStyle.prototype, "backgroundColor", void 0);
    __decorate([
        Property('normal')
    ], CellStyle.prototype, "fontWeight", void 0);
    __decorate([
        Property('normal')
    ], CellStyle.prototype, "fontStyle", void 0);
    __decorate([
        Property('11pt')
    ], CellStyle.prototype, "fontSize", void 0);
    __decorate([
        Property('none')
    ], CellStyle.prototype, "textDecoration", void 0);
    return CellStyle;
}(ChildProperty));
export { CellStyle };
/**
 * Represents the DefineName.
 */
var DefineName = /** @class */ (function (_super) {
    __extends(DefineName, _super);
    function DefineName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], DefineName.prototype, "name", void 0);
    __decorate([
        Property('')
    ], DefineName.prototype, "scope", void 0);
    __decorate([
        Property('')
    ], DefineName.prototype, "comment", void 0);
    __decorate([
        Property('')
    ], DefineName.prototype, "refersTo", void 0);
    return DefineName;
}(ChildProperty));
export { DefineName };
