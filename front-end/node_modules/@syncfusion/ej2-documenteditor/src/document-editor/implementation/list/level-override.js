import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @private
 */
var WLevelOverride = /** @class */ (function () {
    function WLevelOverride() {
    }
    WLevelOverride.prototype.destroy = function () {
        if (!isNullOrUndefined(this.overrideListLevel)) {
            this.overrideListLevel.destroy();
        }
        this.levelNumber = undefined;
        this.startAt = undefined;
        this.overrideListLevel = undefined;
    };
    return WLevelOverride;
}());
export { WLevelOverride };
