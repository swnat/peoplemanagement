import { AjaxHandler } from '../index';
import { createElement } from '@syncfusion/ej2-base';
/**
 * The `ThumbnailView` module is used to handle thumbnail view navigation of PDF viewer.
 */
var ThumbnailView = /** @class */ (function () {
    /**
     * @private
     */
    function ThumbnailView(pdfViewer, pdfViewerBase) {
        var _this = this;
        this.thumbnailLimit = 30;
        this.thumbnailThreshold = 50;
        this.thumbnailTopMargin = 10;
        /**
         * @private
         */
        this.isThumbnailClicked = false;
        /**
         * @private
         */
        this.thumbnailClick = function (event) {
            var proxy = _this;
            var pageNumber = proxy.getPageNumberFromID(event.srcElement.id);
            if (proxy.previousElement) {
                proxy.previousElement.classList.remove('e-pv-thumbnail-selection');
                proxy.previousElement.classList.remove('e-pv-thumbnail-focus');
                proxy.previousElement.classList.add('e-pv-thumbnail-selection-ring');
            }
            if (event.srcElement.parentElement.id === proxy.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
                proxy.setSelectionStyle(event.srcElement.parentElement);
                proxy.previousElement = event.srcElement.parentElement;
            }
            else if (event.srcElement.id === proxy.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
                proxy.setSelectionStyle(event.srcElement);
                proxy.previousElement = event.srcElement;
            }
            proxy.pdfViewer.fireThumbnailClick(pageNumber + 1);
            proxy.isThumbnailClicked = true;
            proxy.goToThumbnailPage(pageNumber + 1);
            proxy.pdfViewerBase.focusViewerContainer();
        };
        /**
         * @private
         */
        this.thumbnailMouseOver = function (event) {
            var proxy = _this;
            var pageNumber = proxy.getPageNumberFromID(event.srcElement.id);
            if (event.srcElement.id === proxy.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
                proxy.setMouseOverStyle(event.srcElement);
            }
            else if (event.srcElement.id === proxy.pdfViewer.element.id + '_thumbnail_image_' + pageNumber) {
                proxy.setMouseOverStyle(event.srcElement.parentElement);
            }
        };
        /**
         * @private
         */
        this.thumbnailMouseLeave = function (event) {
            var proxy = _this;
            var pageNumber = proxy.getPageNumberFromID(event.srcElement.id);
            if (event.srcElement.parentElement.id === proxy.pdfViewer.element.id + '_thumbnail_view') {
                proxy.setMouseLeaveStyle(event.srcElement.children[0].children[0]);
            }
            else if (event.srcElement.parentElement.id === proxy.pdfViewer.element.id + '_thumbnail_' + pageNumber) {
                proxy.setMouseLeaveStyle(event.srcElement.parentElement.children[0]);
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     */
    ThumbnailView.prototype.createThumbnailContainer = function () {
        // tslint:disable-next-line:max-line-length
        this.thumbnailView = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_view', className: 'e-pv-thumbnail-view e-pv-thumbnail-row' });
        this.pdfViewerBase.navigationPane.sideBarContent.appendChild(this.thumbnailView);
    };
    /**
     * Open the thumbnail pane of the PdfViewer.
     * @returns void
     */
    ThumbnailView.prototype.openThumbnailPane = function () {
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.openThumbnailPane();
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    ThumbnailView.prototype.createRequestForThumbnails = function () {
        var proxy = this;
        // tslint:disable-next-line
        var isIE = !!document.documentMode;
        if (!isIE) {
            // tslint:disable-next-line
            return new Promise(
            // tslint:disable-next-line
            function (renderThumbnailImage, reject) {
                proxy.requestCreation(proxy);
            });
        }
        else {
            this.requestCreation(proxy);
            return null;
        }
    };
    ThumbnailView.prototype.requestCreation = function (proxy) {
        if (!proxy.isThumbnailCompleted) {
            // tslint:disable-next-line:max-line-length
            proxy.thumbnailLimit = proxy.thumbnailLimit < proxy.pdfViewer.pageCount ? proxy.thumbnailLimit : proxy.pdfViewer.pageCount;
            if (proxy.thumbnailLimit !== proxy.pdfViewer.pageCount) {
                proxy.isThumbnailCompleted = false;
                proxy.startIndex = 0;
            }
        }
        else {
            proxy.startIndex = proxy.thumbnailLimit;
            // tslint:disable-next-line:max-line-length
            proxy.thumbnailLimit = proxy.startIndex + proxy.thumbnailThreshold < proxy.pdfViewer.pageCount ? proxy.startIndex + proxy.thumbnailThreshold : proxy.pdfViewer.pageCount;
        }
        // tslint:disable-next-line:max-line-length
        var jsonObject = { startPage: proxy.startIndex, endPage: proxy.thumbnailLimit, sizeX: 99.7, sizeY: 141, hashId: proxy.pdfViewerBase.hashId, action: 'RenderThumbnailImages', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
        if (this.pdfViewerBase.jsonDocumentId) {
            // tslint:disable-next-line
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        this.thumbnailRequestHandler = new AjaxHandler(this.pdfViewer);
        this.thumbnailRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.renderThumbnail;
        this.thumbnailRequestHandler.responseType = 'json';
        this.thumbnailRequestHandler.send(jsonObject);
        // tslint:disable-next-line
        this.thumbnailRequestHandler.onSuccess = function (result) {
            // tslint:disable-next-line    
            var data = result.data;
            if (data) {
                if (typeof data !== 'object') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (error) {
                        proxy.pdfViewerBase.onControlError(500, data, proxy.pdfViewer.serverActionSettings.renderThumbnail);
                        data = null;
                    }
                }
                if (data && data.uniqueId === proxy.pdfViewerBase.documentId) {
                    proxy.renderThumbnailImage(data);
                    if (!proxy.isThumbnailCompleted) {
                        var index = (data && isNaN(data.endPage)) ? data.endPage : proxy.thumbnailLimit;
                        proxy.startIndex = index;
                        proxy.isThumbnailCompleted = true;
                    }
                }
            }
        };
        // tslint:disable-next-line
        this.thumbnailRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderThumbnail);
        };
        // tslint:disable-next-line
        this.thumbnailRequestHandler.onError = function (result) {
            proxy.pdfViewerBase.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderThumbnail);
        };
    };
    /**
     * @private
     */
    ThumbnailView.prototype.gotoThumbnailImage = function (pageNumber) {
        var shouldScroll = this.checkThumbnailScroll(pageNumber);
        if (this.thumbnailView) {
            var thumbnailChild = this.thumbnailView.children[pageNumber];
            if (thumbnailChild) {
                var thumbnailDiv = thumbnailChild.children[0];
                if (shouldScroll) {
                    var offsetTop = thumbnailDiv.offsetTop + thumbnailDiv.clientTop - this.thumbnailTopMargin;
                    this.pdfViewerBase.navigationPane.sideBarContent.scrollTop = offsetTop;
                }
                if (!this.isThumbnailClicked) {
                    if (this.previousElement) {
                        this.previousElement.classList.remove('e-pv-thumbnail-selection');
                        this.previousElement.classList.remove('e-pv-thumbnail-focus');
                        this.previousElement.classList.remove('e-pv-thumbnail-hover');
                        this.previousElement.classList.add('e-pv-thumbnail-selection-ring');
                    }
                    this.setFocusStyle(thumbnailDiv, pageNumber);
                }
                this.previousElement = thumbnailDiv.children[0];
            }
        }
    };
    ThumbnailView.prototype.checkThumbnailScroll = function (pageNumber) {
        var shouldScroll = false;
        if (this.thumbnailView) {
            var visibleThumbs = this.getVisibleThumbs();
            var numVisibleThumbs = visibleThumbs.views.length;
            // if the thumbnail isn't currently visible, scroll it into view.
            if (numVisibleThumbs > 0) {
                var visibleFirstPageID = this.getPageNumberFromID(visibleThumbs.first.id);
                // account for only one thumbnail being visible.
                // tslint:disable-next-line:max-line-length
                var visibleLastPageID = (numVisibleThumbs > 1 ? this.getPageNumberFromID(visibleThumbs.last.id) : visibleFirstPageID);
                if (pageNumber <= visibleFirstPageID || pageNumber >= visibleLastPageID) {
                    shouldScroll = true;
                }
                else {
                    // tslint:disable-next-line
                    visibleThumbs.views.some(function (view) {
                        var pageID = view.id.split('_');
                        var thumbPageNumber = pageID[pageID.length - 1];
                        // tslint:disable-next-line:radix
                        if (parseInt(thumbPageNumber) !== pageNumber) {
                            return false;
                        }
                        shouldScroll = view.percent < 100;
                        return true;
                    });
                }
            }
        }
        return shouldScroll;
    };
    ThumbnailView.prototype.getPageNumberFromID = function (pageId) {
        var pageID = pageId.split('_');
        var pageNumber = pageID[pageID.length - 1];
        // tslint:disable-next-line:radix
        return parseInt(pageNumber);
    };
    ThumbnailView.prototype.setFocusStyle = function (thumbnail, pageNumber) {
        if (thumbnail.children[0].id === this.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
            this.setMouseFocusStyle(thumbnail.children[0]);
        }
    };
    // tslint:disable-next-line
    ThumbnailView.prototype.renderThumbnailImage = function (data) {
        if (this.thumbnailView) {
            var startPage = (data && isNaN(data.startPage)) ? data.startPage : this.startIndex;
            var endPage = (data && isNaN(data.endPage)) ? data.endPage : this.thumbnailLimit;
            for (var i = startPage; i < endPage; i++) {
                // tslint:disable-next-line:max-line-length
                var pageLink = createElement('a', { id: 'page_' + i, attrs: { 'aria-label': 'Thumbnail of Page' + (i + 1), 'tabindex': '-1', 'role': 'link' } });
                // tslint:disable-next-line:max-line-length
                var thumbnail = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_' + i, className: 'e-pv-thumbnail e-pv-thumbnail-column' });
                // tslint:disable-next-line:max-line-length
                this.thumbnailSelectionRing = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + i, className: 'e-pv-thumbnail-selection-ring' });
                thumbnail.appendChild(this.thumbnailSelectionRing);
                // tslint:disable-next-line:max-line-length
                var thumbnailPageNumber = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_pagenumber_' + i, className: 'e-pv-thumbnail-number' });
                thumbnailPageNumber.textContent = (i + 1).toString();
                thumbnail.appendChild(thumbnailPageNumber);
                // tslint:disable-next-line:max-line-length
                this.thumbnailImage = createElement('img', { id: this.pdfViewer.element.id + '_thumbnail_image_' + i, className: 'e-pv-thumbnail-image' });
                this.thumbnailImage.src = data.thumbnailImage[i];
                this.thumbnailSelectionRing.appendChild(this.thumbnailImage);
                pageLink.appendChild(thumbnail);
                this.thumbnailView.appendChild(pageLink);
                this.wireUpEvents();
                if (i === 0) {
                    this.setMouseFocusToFirstPage();
                }
            }
        }
        this.pdfViewerBase.navigationPane.enableThumbnailButton();
        if (this.thumbnailLimit !== this.pdfViewerBase.pageCount && this.thumbnailView) {
            // tslint:disable-next-line
            var isIE = !!document.documentMode;
            if (!isIE) {
                Promise.all([this.createRequestForThumbnails()]);
            }
            else {
                this.createRequestForThumbnails();
            }
        }
    };
    ThumbnailView.prototype.wireUpEvents = function () {
        if (this.thumbnailSelectionRing) {
            this.thumbnailSelectionRing.addEventListener('click', this.thumbnailClick);
            this.thumbnailSelectionRing.addEventListener('mouseover', this.thumbnailMouseOver);
            this.thumbnailSelectionRing.addEventListener('mouseleave', this.thumbnailMouseLeave);
        }
    };
    ThumbnailView.prototype.unwireUpEvents = function () {
        if (this.thumbnailSelectionRing && this.thumbnailImage) {
            this.thumbnailSelectionRing.removeEventListener('click', this.thumbnailClick);
            this.thumbnailSelectionRing.removeEventListener('mouseover', this.thumbnailMouseOver);
            this.thumbnailSelectionRing.removeEventListener('mouseleave', this.thumbnailMouseLeave);
        }
    };
    ThumbnailView.prototype.goToThumbnailPage = function (pageNumber) {
        if (pageNumber > 0 && pageNumber <= this.pdfViewerBase.pageCount && this.pdfViewerBase.currentPageNumber !== pageNumber) {
            this.pdfViewerBase.updateScrollTop(pageNumber - 1);
        }
        else {
            this.isThumbnailClicked = false;
        }
    };
    ThumbnailView.prototype.setSelectionStyle = function (thumbnailElement) {
        thumbnailElement.classList.remove('e-pv-thumbnail-selection-ring');
        thumbnailElement.classList.remove('e-pv-thumbnail-hover');
        thumbnailElement.classList.remove('e-pv-thumbnail-focus');
        thumbnailElement.classList.add('e-pv-thumbnail-selection');
    };
    ThumbnailView.prototype.setMouseOverStyle = function (thumbnailElement) {
        // tslint:disable-next-line:max-line-length
        if (!thumbnailElement.classList.contains('e-pv-thumbnail-selection')) {
            thumbnailElement.classList.remove('e-pv-thumbnail-selection-ring');
            if (!thumbnailElement.classList.contains('e-pv-thumbnail-focus')) {
                thumbnailElement.classList.add('e-pv-thumbnail-hover');
            }
        }
    };
    ThumbnailView.prototype.setMouseLeaveStyle = function (thumbnailElement) {
        if (!thumbnailElement.classList.contains('e-pv-thumbnail-selection')) {
            if (!thumbnailElement.classList.contains('e-pv-thumbnail-focus')) {
                thumbnailElement.classList.add('e-pv-thumbnail-selection-ring');
            }
            thumbnailElement.classList.remove('e-pv-thumbnail-hover');
        }
        else {
            if (!thumbnailElement.classList.contains('e-pv-thumbnail-selection')) {
                thumbnailElement.classList.remove('e-pv-thumbnail-selection');
                thumbnailElement.classList.add('e-pv-thumbnail-focus');
            }
        }
    };
    ThumbnailView.prototype.setMouseFocusStyle = function (thumbnailElement) {
        thumbnailElement.classList.remove('e-pv-thumbnail-selection');
        thumbnailElement.classList.remove('e-pv-thumbnail-hover');
        thumbnailElement.classList.add('e-pv-thumbnail-focus');
    };
    ThumbnailView.prototype.setMouseFocusToFirstPage = function () {
        var thumbnailChild = this.thumbnailView.children[0];
        if (thumbnailChild) {
            var thumbnailDiv = thumbnailChild.children[0].children[0];
            this.setMouseFocusStyle(thumbnailDiv);
            this.previousElement = thumbnailDiv;
        }
    };
    /**
     * @private
     */
    ThumbnailView.prototype.clear = function () {
        this.startIndex = 0;
        this.thumbnailLimit = 0;
        this.isThumbnailCompleted = false;
        if (this.pdfViewerBase.navigationPane) {
            if (this.pdfViewerBase.navigationPane.sideBarContentContainer) {
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.display = 'block';
                this.pdfViewerBase.navigationPane.sideBarContent.scrollTop = 0;
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.display = 'none';
            }
        }
        if (this.thumbnailView) {
            while (this.thumbnailView.hasChildNodes()) {
                this.thumbnailView.removeChild(this.thumbnailView.lastChild);
            }
        }
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.resetThumbnailView();
        }
        this.unwireUpEvents();
    };
    ThumbnailView.prototype.getVisibleThumbs = function () {
        return this.getVisibleElements(this.pdfViewerBase.navigationPane.sideBarContent, this.thumbnailView.children);
    };
    ThumbnailView.prototype.getVisibleElements = function (scrollElement, thumbnailViewChildren) {
        var top = scrollElement.scrollTop;
        var bottom = top + scrollElement.clientHeight;
        var left = scrollElement.scrollLeft;
        var right = left + scrollElement.clientWidth;
        function isThumbnailElementBottomAfterViewTop(thumbnailViewChildrenElement) {
            var elementBottom = thumbnailViewChildrenElement.offsetTop + thumbnailViewChildrenElement.clientTop + thumbnailViewChildrenElement.clientHeight;
            return elementBottom > top;
        }
        // tslint:disable-next-line
        var visible = [];
        var thumbnailView;
        var element;
        var currentHeight;
        var viewHeight;
        var viewBottom;
        var hiddenHeight;
        var currentWidth;
        var viewWidth;
        var viewRight;
        var hiddenWidth;
        var percentVisible;
        var firstVisibleElementInd = thumbnailViewChildren.length === 0 ? 0 :
            this.binarySearchFirstItem(thumbnailViewChildren, isThumbnailElementBottomAfterViewTop);
        if (thumbnailViewChildren.length > 0) {
            firstVisibleElementInd =
                this.backtrackBeforeAllVisibleElements(firstVisibleElementInd, thumbnailViewChildren, top);
        }
        var lastEdge = -1;
        for (var i = firstVisibleElementInd, ii = thumbnailViewChildren.length; i < ii; i++) {
            thumbnailView = this.getThumbnailElement(i);
            element = thumbnailView;
            currentWidth = element.offsetLeft + element.clientLeft;
            currentHeight = element.offsetTop + element.clientTop;
            viewWidth = element.clientWidth;
            viewHeight = element.clientHeight;
            viewRight = currentWidth + viewWidth;
            viewBottom = currentHeight + viewHeight;
            if (lastEdge === -1) {
                if (viewBottom >= bottom) {
                    lastEdge = viewBottom;
                }
            }
            else if (currentHeight > lastEdge) {
                break;
            }
            if (viewBottom <= top || currentHeight >= bottom ||
                viewRight <= left || currentWidth >= right) {
                continue;
            }
            hiddenHeight = Math.max(0, top - currentHeight) +
                Math.max(0, viewBottom - bottom);
            hiddenWidth = Math.max(0, left - currentWidth) +
                Math.max(0, viewRight - right);
            // tslint:disable-next-line:no-bitwise
            percentVisible = ((viewHeight - hiddenHeight) * (viewWidth - hiddenWidth) * 100 / viewHeight / viewWidth) | 0;
            visible.push({
                id: thumbnailView.id,
                x: currentWidth,
                y: currentHeight,
                view: thumbnailView,
                percent: percentVisible,
            });
        }
        var first = visible[0];
        var last = visible[visible.length - 1];
        return { first: first, last: last, views: visible, };
    };
    // tslint:disable-next-line
    ThumbnailView.prototype.binarySearchFirstItem = function (items, condition) {
        var minIndex = 0;
        var maxIndex = items.length - 1;
        if (items.length === 0 || !condition(this.getThumbnailElement(maxIndex))) {
            return items.length - 1;
        }
        if (condition(this.getThumbnailElement(minIndex))) {
            return minIndex;
        }
        while (minIndex < maxIndex) {
            // tslint:disable-next-line:no-bitwise
            var currentIndex = (minIndex + maxIndex) >> 1;
            if (condition(this.getThumbnailElement(currentIndex))) {
                maxIndex = currentIndex;
            }
            else {
                minIndex = currentIndex + 1;
            }
        }
        return minIndex; /* === maxIndex */
    };
    ThumbnailView.prototype.backtrackBeforeAllVisibleElements = function (index, views, top) {
        if (index < 2) {
            return index;
        }
        var thumbnailElement = this.getThumbnailElement(index);
        var pageTop = thumbnailElement.offsetTop + thumbnailElement.clientTop;
        if (pageTop >= top) {
            thumbnailElement = this.getThumbnailElement(index - 1);
            pageTop = thumbnailElement.offsetTop + thumbnailElement.clientTop;
        }
        for (var i = index - 2; i >= 0; --i) {
            thumbnailElement = this.getThumbnailElement(i);
            if (thumbnailElement.offsetTop + thumbnailElement.clientTop + thumbnailElement.clientHeight <= pageTop) {
                break;
            }
            index = i;
        }
        return index;
    };
    ThumbnailView.prototype.getThumbnailElement = function (index) {
        var thumbnailChild = this.thumbnailView.children[index];
        return thumbnailChild.children[0];
    };
    /**
     * @private
     */
    ThumbnailView.prototype.destroy = function () {
        this.clear();
    };
    /**
     * @private
     */
    ThumbnailView.prototype.getModuleName = function () {
        return 'ThumbnailView';
    };
    return ThumbnailView;
}());
export { ThumbnailView };
