/**
 * public Enum for `PdfLayoutType`.
 * @private
 */
export var PdfLayoutType;
(function (PdfLayoutType) {
    /**
     * Specifies the type of `Paginate`.
     * @private
     */
    PdfLayoutType[PdfLayoutType["Paginate"] = 0] = "Paginate";
    /**
     * Specifies the type of `OnePage`.
     * @private
     */
    PdfLayoutType[PdfLayoutType["OnePage"] = 1] = "OnePage";
})(PdfLayoutType || (PdfLayoutType = {}));
/**
 * public Enum for `PdfLayoutBreakType`.
 * @private
 */
export var PdfLayoutBreakType;
(function (PdfLayoutBreakType) {
    /**
     * Specifies the type of `FitPage`.
     * @private
     */
    PdfLayoutBreakType[PdfLayoutBreakType["FitPage"] = 0] = "FitPage";
    /**
     * Specifies the type of `FitElement`.
     * @private
     */
    PdfLayoutBreakType[PdfLayoutBreakType["FitElement"] = 1] = "FitElement";
    /**
     * Specifies the type of `FitColumnsToPage`.
     * @private
     */
    PdfLayoutBreakType[PdfLayoutBreakType["FitColumnsToPage"] = 2] = "FitColumnsToPage";
})(PdfLayoutBreakType || (PdfLayoutBreakType = {}));
