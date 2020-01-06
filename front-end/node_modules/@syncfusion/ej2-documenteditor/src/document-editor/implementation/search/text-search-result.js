/**
 * @private
 */
var TextSearchResult = /** @class */ (function () {
    function TextSearchResult(owner) {
        this.startIn = undefined;
        this.endIn = undefined;
        this.owner = owner;
    }
    Object.defineProperty(TextSearchResult.prototype, "viewer", {
        get: function () {
            return this.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextSearchResult.prototype, "start", {
        get: function () {
            return this.startIn;
        },
        set: function (value) {
            this.startIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextSearchResult.prototype, "end", {
        get: function () {
            return this.endIn;
        },
        set: function (value) {
            this.endIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextSearchResult.prototype, "text", {
        get: function () {
            return this.viewer.selection.getTextInternal(this.start, this.end, false);
        },
        enumerable: true,
        configurable: true
    });
    TextSearchResult.prototype.destroy = function () {
        this.start = undefined;
        this.end = undefined;
    };
    return TextSearchResult;
}());
export { TextSearchResult };
