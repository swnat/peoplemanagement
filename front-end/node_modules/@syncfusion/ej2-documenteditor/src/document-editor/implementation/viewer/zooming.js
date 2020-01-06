import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @private
 */
var Zoom = /** @class */ (function () {
    function Zoom(viewer) {
        var _this = this;
        this.onMouseWheelInternal = function (event) {
            if (event.ctrlKey === true) {
                event.preventDefault();
                var pageX = event.pageX - _this.viewer.viewerContainer.offsetLeft;
                if (pageX < _this.viewer.pageContainer.offsetWidth) {
                    var wheel = navigator.userAgent.match('Firefox') ? event.detail < 0 : event.wheelDelta > 0;
                    var zoomFactor = _this.viewer.zoomFactor;
                    if (wheel) {
                        if (zoomFactor <= 4.90) {
                            zoomFactor += .10;
                        }
                        else {
                            zoomFactor = 5.00;
                        }
                    }
                    else {
                        if (zoomFactor >= .20) {
                            zoomFactor -= .10;
                        }
                        else {
                            zoomFactor = 0.10;
                        }
                    }
                    _this.viewer.zoomFactor = zoomFactor;
                }
            }
        };
        this.viewer = viewer;
    }
    Zoom.prototype.setZoomFactor = function (value) {
        this.onZoomFactorChanged();
        if (!isNullOrUndefined(this.viewer.selection)) {
            this.viewer.selection.updateCaretPosition();
        }
        this.viewer.updateTouchMarkPosition();
        if (!isNullOrUndefined(this.viewer.owner.imageResizerModule)) {
            this.viewer.owner.imageResizerModule.updateImageResizerPosition();
        }
        this.viewer.owner.fireZoomFactorChange();
    };
    //Zoom Implementation Starts
    Zoom.prototype.onZoomFactorChanged = function () {
        if (this.viewer.zoomFactor > 5) {
            this.viewer.zoomFactor = 5;
        }
        else if (this.viewer.zoomFactor < 0.1) {
            this.viewer.zoomFactor = 0.1;
        }
        this.zoom();
    };
    Zoom.prototype.zoom = function () {
        var viewer = this.viewer;
        viewer.clearContent();
        viewer.handleZoom();
        viewer.updateFocus();
    };
    return Zoom;
}());
export { Zoom };
