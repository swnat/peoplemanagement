import { stringToNumber, getLocationFromAngle, getFontStyle } from '../utils/helper';
import { getElement, getTemplateFunction, measureElementRect } from '../utils/helper';
import { annotationRender } from '../model/constants';
import { createElement, updateBlazorTemplate } from '@syncfusion/ej2-base';
/**
 * Annotation Module handles the Annotation of the axis.
 */
var Annotations = /** @class */ (function () {
    /**
     * Constructor for Annotation module.
     * @private.
     */
    function Annotations(gauge) {
        this.gauge = gauge;
        this.elementId = gauge.element.id;
    }
    /**
     * Method to render the annotation for circular gauge.
     */
    //tslint:disable
    Annotations.prototype.renderAnnotation = function (axis, index) {
        var _this = this;
        var width = this.gauge.availableSize.width;
        var element = createElement('div', {
            id: this.elementId + '_Annotations_' + index
        });
        var parentElement = getElement(this.elementId + '_Secondary_Element');
        document.getElementById(this.elementId + '_Secondary_Element').style.width = width + 'px';
        axis.annotations.map(function (annotation, annotationIndex) {
            if (annotation.content !== null) {
                _this.createTemplate(element, annotationIndex, index);
            }
        });
        if (parentElement && element.childElementCount) {
            parentElement.appendChild(element);
            if (this.gauge.isBlazor) {
                for (var i = 0; i < this.gauge.axes[index].annotations.length; i++) {
                    updateBlazorTemplate(this.gauge.element.id + '_Axis' + index + '_ContentTemplate' + i, 'ContentTemplate', this.gauge.axes[index].annotations[i]);
                }
            }
        }
    };
    /**
     * Method to create annotation template for circular gauge.
     */
    Annotations.prototype.createTemplate = function (element, annotationIndex, axisIndex) {
        var _this = this;
        var axis = this.gauge.axes[axisIndex];
        var annotation = axis.annotations[annotationIndex];
        var childElement = createElement('div', {
            id: this.elementId + '_Axis_' + axisIndex + '_Annotation_' + annotationIndex,
            styles: 'position: absolute; z-index:' + annotation.zIndex + ';transform:' +
                (annotation.autoAngle ? 'rotate(' + (annotation.angle - 90) + 'deg)' : 'rotate(0deg)') + ';'
        });
        var argsData = {
            cancel: false, name: annotationRender, content: annotation.content,
            axis: axis, annotation: annotation, textStyle: annotation.textStyle
        };
        if (this.gauge.isBlazor) {
            var cancel = argsData.cancel, name_1 = argsData.name, content = argsData.content, textStyle = argsData.textStyle;
            argsData = { cancel: cancel, name: name_1, content: content, annotation: annotation, textStyle: textStyle };
        }
        this.gauge.trigger('annotationRender', argsData, function (observedArgs) {
            var templateFn;
            var templateElement;
            if (!argsData.cancel) {
                templateFn = getTemplateFunction(argsData.content, _this.gauge);
                if (templateFn && (!_this.gauge.isBlazor ? templateFn(axis, null, null, _this.gauge.element.id + '_Axis' + axisIndex + '_ContentTemplate' + annotationIndex).length : {})) {
                    templateElement = Array.prototype.slice.call(templateFn(!_this.gauge.isBlazor ? axis : {}, null, null, _this.gauge.element.id + '_Axis' + axisIndex + '_ContentTemplate' + annotationIndex));
                    var length_1 = templateElement.length;
                    for (var i = 0; i < length_1; i++) {
                        childElement.appendChild(templateElement[i]);
                    }
                }
                else {
                    childElement.appendChild(createElement('div', {
                        innerHTML: argsData.content,
                        id: 'StringTemplate',
                        styles: getFontStyle(argsData.textStyle)
                    }));
                }
                _this.updateLocation(childElement, axis, annotation);
                element.appendChild(childElement);
            }
        });
    };
    /**
     * Method to update the annotation location for circular gauge.
     */
    Annotations.prototype.updateLocation = function (element, axis, annotation) {
        var location = getLocationFromAngle(annotation.angle - 90, stringToNumber(annotation.radius, axis.currentRadius), this.gauge.midPoint);
        var elementRect = measureElementRect(element);
        element.style.left = (location.x - (elementRect.width / 2)) + 'px';
        element.style.top = (location.y - (elementRect.height / 2)) + 'px';
        element.setAttribute('aria-label', annotation.description || 'Annotation');
    };
    /**
     * Get module name.
     */
    Annotations.prototype.getModuleName = function () {
        // Returns te module name
        return 'Annotations';
    };
    /**
     * To destroy the annotation.
     * @return {void}
     * @private
     */
    Annotations.prototype.destroy = function (gauge) {
        // Destroy method performed here
    };
    return Annotations;
}());
export { Annotations };
