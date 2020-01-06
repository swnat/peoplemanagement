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
/**
 * ShapeLayouter.ts class for EJ2-PDF
 * @private
 */
import { ElementLayouter } from './element-layouter';
import { RectangleF } from './../../../drawing/pdf-drawing';
/**
 * ShapeLayouter class.
 * @private
 */
var ShapeLayouter = /** @class */ (function (_super) {
    __extends(ShapeLayouter, _super);
    // Constructors
    /**
     * Initializes a new instance of the `ShapeLayouter` class.
     * @private
     */
    function ShapeLayouter(element) {
        var _this = _super.call(this, element) || this;
        // Fields
        /**
         * Initializes the object to store `older form elements` of previous page.
         * @default 0
         * @private
         */
        _this.olderPdfForm = 0;
        /**
         * The `bounds` of the shape element.
         * * @default new RectangleF()
         * @private
         */
        _this.shapeBounds = new RectangleF();
        /**
         * Total Page size of the web page.
         * * @default 0
         * @private
         */
        _this.totalPageSize = 0;
        return _this;
    }
    Object.defineProperty(ShapeLayouter.prototype, "element", {
        // Properties
        /**
         * Gets shape element.
         * @private
         */
        get: function () {
            return this.elements;
        },
        enumerable: true,
        configurable: true
    });
    // Implementation
    /**
     * Layouts the element.
     * @private
     */
    ShapeLayouter.prototype.layoutInternal = function (param) {
        var currentPage = param.page;
        var currentBounds = param.bounds;
        var shapeLayoutBounds = this.element.getBounds();
        shapeLayoutBounds.x = 0;
        shapeLayoutBounds.y = 0;
        /* tslint:disable */
        var isEmpty = (this.shapeBounds.x === this.shapeBounds.y && this.shapeBounds.y === this.shapeBounds.width && this.shapeBounds.width === this.shapeBounds.height && this.shapeBounds.height === 0) ? true : false;
        /* tslint:enable */
        if ((this.isPdfGrid) && (!(isEmpty))) {
            shapeLayoutBounds = this.shapeBounds;
        }
        var result = null;
        var pageResult = new ShapeLayoutResult();
        pageResult.page = currentPage;
        // while (true) {
        //     // Raise event.
        //     // let cancel : boolean = this.RaiseBeforePageLayout(currentPage, currentBounds);
        //     let endArgs : EndPageLayoutEventArgs = null;
        //     if (!cancel) {
        //         pageResult = this.LayoutOnPage(currentPage, currentBounds, shapeLayoutBounds, param);
        //         // Raise event.
        //         endArgs = this.RaiseEndPageLayout(pageResult);
        //         cancel = (endArgs == null) ? false : endArgs.Cancel;
        //     }
        //     // Tagged PDF
        //     if (pageResult.Page.Document.FileStructure.TaggedPdf && !pageResult.End && !cancel) {
        //         return new PdfLayoutResult(pageResult.Page, pageResult.Bounds);
        //     }
        //     if (!pageResult.End && !cancel) {
        //         currentBounds = this.GetPaginateBounds(param);
        //         shapeLayoutBounds = this.GetNextShapeBounds(shapeLayoutBounds, pageResult);
        //         currentPage = (endArgs == null || endArgs.NextPage == null) ?
        //             this.GetNextPage(currentPage) : endArgs.NextPage;
        //         if (this.isPdfGrid) {
        //             result = this.GetLayoutResult(pageResult);
        //             break;
        //         }
        //     } else {
        //         result = this.GetLayoutResult(pageResult);
        //         break;
        //     }
        // }
        return result;
    };
    /**
     * Initializes the offset `index`.
     * * @default 0
     * @private
     */
    ShapeLayouter.index = 0;
    /**
     * Initializes the `difference in page height`.
     * * @default 0
     * @private
     */
    ShapeLayouter.splitDiff = 0;
    /**
     * Determines the `end of Vertical offset` values.
     * * @default false
     * @private
     */
    ShapeLayouter.last = false;
    /**
     * Determines the document link annotation `border width`.
     * * @default 0
     * @private
     */
    ShapeLayouter.borderWidth = 0;
    return ShapeLayouter;
}(ElementLayouter));
export { ShapeLayouter };
/**
 * Contains lay outing result settings.
 * @private
 */
var ShapeLayoutResult = /** @class */ (function () {
    function ShapeLayoutResult() {
    }
    return ShapeLayoutResult;
}());
