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
import { VerticalView } from './vertical-view';
/**
 * work week view
 */
var WorkWeek = /** @class */ (function (_super) {
    __extends(WorkWeek, _super);
    /**
     * Constructor for work week view
     */
    function WorkWeek(par) {
        var _this = _super.call(this, par) || this;
        _this.viewClass = 'e-work-week-view';
        return _this;
    }
    /**
     * Get module name.
     */
    WorkWeek.prototype.getModuleName = function () {
        return 'workWeek';
    };
    return WorkWeek;
}(VerticalView));
export { WorkWeek };
