import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Selection Module handles the selection for chart.
 * @private
 */
var BaseSelection = /** @class */ (function () {
    function BaseSelection(control) {
        this.control = control;
    }
    /**
     * To create selection styles for series
     */
    BaseSelection.prototype.seriesStyles = function () {
        var seriesclass;
        var style = document.getElementById(this.styleId);
        if (isNullOrUndefined(style)) {
            style = document.createElement('style');
            style.setAttribute('id', this.styleId);
            for (var _i = 0, _a = this.control.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index;
                style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + ' { } ';
            }
            style.innerHTML += '.' + this.unselected + ' { opacity:' + (0.3) + ';} ';
            document.body.appendChild(style);
        }
    };
    /**
     * To concat indexes
     */
    BaseSelection.prototype.concatIndexes = function (userIndexes, localIndexes) {
        return userIndexes.concat(localIndexes);
    };
    /**
     * Selected points series visibility checking on legend click
     */
    BaseSelection.prototype.checkVisibility = function (selectedIndexes) {
        var visible = false;
        var uniqueSeries = [];
        for (var _i = 0, selectedIndexes_1 = selectedIndexes; _i < selectedIndexes_1.length; _i++) {
            var index = selectedIndexes_1[_i];
            if (uniqueSeries.indexOf(index.series) === -1) {
                uniqueSeries.push(index.series);
            }
        }
        for (var _a = 0, uniqueSeries_1 = uniqueSeries; _a < uniqueSeries_1.length; _a++) {
            var index = uniqueSeries_1[_a];
            if (this.control.series[index].visible) {
                visible = true;
                break;
            }
        }
        return visible;
    };
    /**
     * To add svg element style class
     * @private
     */
    BaseSelection.prototype.addSvgClass = function (element, className) {
        var elementClassName = element.getAttribute('class') || '';
        elementClassName += ((elementClassName !== '') ? ' ' : '');
        if (elementClassName.indexOf(className) === -1) {
            element.setAttribute('class', elementClassName + className);
        }
    };
    /**
     * To remove svg element style class
     * @private
     */
    BaseSelection.prototype.removeSvgClass = function (element, className) {
        var elementClassName = element.getAttribute('class') || '';
        if (elementClassName.indexOf(className) > -1) {
            element.setAttribute('class', elementClassName.replace(className, ''));
        }
    };
    /**
     * To get children from parent element
     */
    BaseSelection.prototype.getChildren = function (parent) {
        var children = [];
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].tagName !== 'defs') {
                children.push(parent.childNodes[i]);
            }
        }
        return children;
    };
    return BaseSelection;
}());
export { BaseSelection };
