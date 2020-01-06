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
import { VirtualContentRenderer } from '@syncfusion/ej2-grids';
import { InterSectionObserver } from '@syncfusion/ej2-grids';
import { TreeVirtualRowModelGenerator } from '../renderer/virtual-row-model-generator';
import * as events from '../base/constant';
import { isNullOrUndefined, EventHandler, getValue, setValue } from '@syncfusion/ej2-base';
/**
 * Content renderer for TreeGrid
 */
var VirtualTreeContentRenderer = /** @class */ (function (_super) {
    __extends(VirtualTreeContentRenderer, _super);
    function VirtualTreeContentRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.isExpandCollapse = false;
        _this.translateY = 0;
        _this.maxiPage = 0;
        _this.startIndex = -1;
        _this.endIndex = -1;
        _this.addEventListener();
        return _this;
    }
    VirtualTreeContentRenderer.prototype.getModelGenerator = function () {
        return new TreeVirtualRowModelGenerator(this.parent);
    };
    VirtualTreeContentRenderer.prototype.getRowByIndex = function (index) {
        return this.parent.getDataRows().filter(function (e) { return parseInt(e.getAttribute('aria-rowindex'), 0) === index; })[0];
    };
    VirtualTreeContentRenderer.prototype.addEventListener = function () {
        this.parent.on(events.virtualActionArgs, this.virtualOtherAction, this);
        this.parent.on(events.indexModifier, this.indexModifier, this);
    };
    VirtualTreeContentRenderer.prototype.virtualOtherAction = function (args) {
        if (args.setTop) {
            this.translateY = 0;
            this.startIndex = 0;
            this.endIndex = this.parent.pageSettings.pageSize - 1;
        }
        else if (args.isExpandCollapse) {
            this.isExpandCollapse = true;
        }
    };
    VirtualTreeContentRenderer.prototype.indexModifier = function (args) {
        args.startIndex = this.startIndex;
        args.endIndex = this.endIndex;
    };
    VirtualTreeContentRenderer.prototype.eventListener = function (action) {
        var _this = this;
        this.parent[action]('data-ready', this.onDataReady, this);
        //this.parent[action]('refresh-virtual-block', this.refreshContentRows, this);
        var fn = function () {
            _this.observers.observes(function (scrollArgs) { return _this.scrollListeners(scrollArgs); });
            _this.parent.off('content-ready', fn);
        };
        this.parent.on('content-ready', fn, this);
    };
    VirtualTreeContentRenderer.prototype.onDataReady = function (e) {
        _super.prototype.onDataReady.call(this, e);
        if (!isNullOrUndefined(e.count)) {
            this.totalRecords = e.count;
            getValue('virtualEle', this).setVirtualHeight(this.parent.getRowHeight() * e.count, '100%');
            var outBuffer = 4; // this.parent.pageSettings.pageSize - Math.ceil(this.parent.pageSettings.pageSize / 1.5);
        }
        if (!isNullOrUndefined(e.requestType) && e.requestType.toString() === 'collapseAll') {
            this.contents.scrollTop = 0;
        }
    };
    VirtualTreeContentRenderer.prototype.renderTable = function () {
        _super.prototype.renderTable.call(this);
        getValue('observer', this).options.debounceEvent = false;
        this.observers = new TreeInterSectionObserver(getValue('observer', this).element, getValue('observer', this).options);
        this.contents = this.getPanel().firstChild;
    };
    VirtualTreeContentRenderer.prototype.scrollListeners = function (scrollArgs) {
        var info = scrollArgs.sentinel;
        var outBuffer = 10; //this.parent.pageSettings.pageSize - Math.ceil(this.parent.pageSettings.pageSize / 1.5);
        var content = this.parent.getContent().querySelector('.e-content');
        var scrollHeight = outBuffer * this.parent.getRowHeight();
        var upScroll = (scrollArgs.offset.top - this.translateY) < 0;
        var downScroll = (scrollArgs.offset.top - this.translateY) > scrollHeight;
        if (upScroll) {
            var vHeight = +(this.parent.height.toString().indexOf('%') < 0 ? this.parent.height :
                this.parent.element.getBoundingClientRect().height);
            var index = (~~(content.scrollTop / this.parent.getRowHeight())
                + Math.ceil(vHeight / this.parent.getRowHeight()))
                - this.parent.getRows().length;
            index = (index > 0) ? index : 0;
            this.startIndex = index;
            this.endIndex = index + this.parent.getRows().length;
            if (this.endIndex > this.totalRecords) {
                var lastInx = this.totalRecords - 1;
                var remains = this.endIndex % lastInx;
                this.endIndex = lastInx;
                this.startIndex = this.startIndex - remains;
            }
            //var firsttdinx = parseInt(this.parent.getContent().querySelector('.e-content td').getAttribute('index'), 0);
            var rowPt = Math.ceil(scrollArgs.offset.top / this.parent.getRowHeight());
            rowPt = rowPt % this.parent.pageSettings.pageSize;
            var firsttdinx = 0;
            if (!isNullOrUndefined(this.parent.getRows()[rowPt])) {
                var attr = this.parent.getContent().querySelectorAll('.e-content tr')[rowPt]
                    .querySelector('td').getAttribute('index');
                firsttdinx = +attr; // this.parent.getContent().querySelector('.e-content tr').getAttribute('aria-rowindex');
            }
            if (firsttdinx === 0) {
                this.translateY = scrollArgs.offset.top;
            }
            else {
                var height = this.parent.getRowHeight();
                this.translateY = (scrollArgs.offset.top - (outBuffer * height) > 0) ?
                    scrollArgs.offset.top - (outBuffer * height) + 10 : 0;
            }
        }
        else if (downScroll) {
            var nextSetResIndex = ~~(content.scrollTop / this.parent.getRowHeight());
            var lastIndex = nextSetResIndex + this.parent.getRows().length;
            if (lastIndex > this.totalRecords) {
                lastIndex = nextSetResIndex +
                    (this.totalRecords - nextSetResIndex);
            }
            this.startIndex = lastIndex - this.parent.getRows().length;
            this.endIndex = lastIndex;
            this.translateY = scrollArgs.offset.top;
        }
        if ((downScroll && (scrollArgs.offset.top < (this.parent.getRowHeight() * this.totalRecords)))
            || (upScroll)) {
            var viewInfo = getValue('getInfoFromView', this).apply(this, [scrollArgs.direction, info, scrollArgs.offset]);
            this.parent.notify(viewInfo.event, { requestType: 'virtualscroll', focusElement: scrollArgs.focusElement });
        }
    };
    VirtualTreeContentRenderer.prototype.appendContent = function (target, newChild, e) {
        var info = e.virtualInfo.sentinelInfo && e.virtualInfo.sentinelInfo.axis === 'Y' && getValue('currentInfo', this).page &&
            getValue('currentInfo', this).page !== e.virtualInfo.page ? getValue('currentInfo', this) : e.virtualInfo;
        var cBlock = (info.columnIndexes[0]) - 1;
        var cOffset = this.getColumnOffset(cBlock);
        //this.virtualEle.setWrapperWidth(width, ( Browser.isIE || Browser.info.name === 'edge') as boolean);
        target = this.parent.createElement('tbody');
        target.appendChild(newChild);
        var replace = 'replaceWith';
        this.getTable().querySelector('tbody')[replace](target);
        if (!this.isExpandCollapse || this.translateY === 0) {
            getValue('virtualEle', this).adjustTable(cOffset, this.translateY);
        }
        else {
            this.isExpandCollapse = false;
        }
        setValue('prevInfo', info, this);
    };
    return VirtualTreeContentRenderer;
}(VirtualContentRenderer));
export { VirtualTreeContentRenderer };
var TreeInterSectionObserver = /** @class */ (function (_super) {
    __extends(TreeInterSectionObserver, _super);
    function TreeInterSectionObserver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isWheeling = false;
        _this.newPos = 0;
        _this.lastPos = 0;
        _this.timer = 0;
        return _this;
    }
    TreeInterSectionObserver.prototype.observes = function (callback) {
        setValue('containerRect', getValue('options', this).container.getBoundingClientRect(), this);
        EventHandler.add(getValue('options', this).container, 'scroll', this.virtualScrollHandlers(callback), this);
    };
    TreeInterSectionObserver.prototype.clear = function () {
        this.lastPos = null;
    };
    TreeInterSectionObserver.prototype.virtualScrollHandlers = function (callback) {
        var _this = this;
        var prevTop = 0;
        var prevLeft = 0;
        return function (e) {
            var scrollTop = e.target.scrollTop;
            var scrollLeft = e.target.scrollLeft;
            var direction = prevTop < scrollTop ? 'down' : 'up';
            direction = prevLeft === scrollLeft ? direction : prevLeft < scrollLeft ? 'right' : 'left';
            prevTop = scrollTop;
            prevLeft = scrollLeft;
            var current = getValue('sentinelInfo', _this)[direction];
            var delta = 0;
            _this.newPos = scrollTop;
            if (_this.lastPos != null) { // && newPos < maxScroll 
                delta = _this.newPos - _this.lastPos;
            }
            _this.lastPos = _this.newPos;
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            _this.timer = setTimeout(_this.clear, 0);
            /*if (this.options.axes.indexOf(current.axis) === -1) {
                return;
            }*/
            /*if(delta > 45 || delta < -45){
              this.isWheeling = true;
            }*/
            if ((delta > 100 || delta < -100) && (e && e.preventDefault)) {
                e.returnValue = false;
                e.preventDefault();
            }
            callback({ direction: direction, isWheel: _this.isWheeling,
                sentinel: current, offset: { top: scrollTop, left: scrollLeft },
                focusElement: document.activeElement });
        };
    };
    return TreeInterSectionObserver;
}(InterSectionObserver));
export { TreeInterSectionObserver };
