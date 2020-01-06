import { print as printWindow, createElement, detach, classList } from '@syncfusion/ej2-base';
import { getPrintGridModel } from '../base/util';
import { Grid } from '../base/grid';
import * as events from '../base/constant';
import { Deferred } from '@syncfusion/ej2-data';
/**
 * @hidden
 */
export function getCloneProperties() {
    return ['aggregates', 'allowGrouping', 'allowFiltering', 'allowMultiSorting', 'allowReordering', 'allowSorting',
        'allowTextWrap', 'childGrid', 'columns', 'currentViewData', 'dataSource', 'detailTemplate', 'enableAltRow',
        'enableColumnVirtualization', 'filterSettings', 'gridLines',
        'groupSettings', 'height', 'locale', 'pageSettings', 'printMode', 'query', 'queryString', 'enableRtl',
        'rowHeight', 'rowTemplate', 'sortSettings', 'textWrapSettings', 'allowPaging', 'hierarchyPrintMode', 'searchSettings',
        'queryCellInfo', 'beforeDataBound'];
}
/**
 *
 * The `Print` module is used to handle print action.
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for the Grid print module
     * @hidden
     */
    function Print(parent, scrollModule) {
        this.isAsyncPrint = false;
        this.defered = new Deferred();
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.contentReady, this.isContentReady(), this);
        this.parent.addEventListener(events.actionBegin, this.actionBegin.bind(this));
        this.parent.on(events.onEmpty, this.onEmpty.bind(this));
        this.parent.on(events.hierarchyPrint, this.hierarchyPrint, this);
        this.scrollModule = scrollModule;
    }
    Print.prototype.isContentReady = function () {
        var _this = this;
        if (this.isPrintGrid() && (this.parent.hierarchyPrintMode === 'None' || !this.parent.childGrid)) {
            return this.contentReady;
        }
        return function () {
            _this.defered.promise.then(function () {
                _this.contentReady();
            });
            if (_this.isPrintGrid()) {
                _this.hierarchyPrint();
            }
        };
    };
    Print.prototype.hierarchyPrint = function () {
        this.removeColGroup(this.parent);
        var printGridObj = window.printGridObj;
        if (printGridObj && !printGridObj.element.querySelector('[aria-busy=true')) {
            printGridObj.printModule.defered.resolve();
        }
    };
    /**
     * By default, prints all the Grid pages and hides the pager.
     * > You can customize print options using the
     * [`printMode`](grid/#printmode-string/).
     * @return {void}
     */
    Print.prototype.print = function () {
        this.renderPrintGrid();
        this.printWind = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWind.moveTo(0, 0);
        this.printWind.resizeTo(screen.availWidth, screen.availHeight);
    };
    Print.prototype.onEmpty = function () {
        if (this.isPrintGrid()) {
            this.contentReady();
        }
    };
    Print.prototype.actionBegin = function () {
        if (this.isPrintGrid()) {
            this.isAsyncPrint = true;
        }
    };
    Print.prototype.renderPrintGrid = function () {
        var gObj = this.parent;
        var element = createElement('div', {
            id: this.parent.element.id + '_print', className: gObj.element.className + ' e-print-grid'
        });
        document.body.appendChild(element);
        var printGrid = new Grid(getPrintGridModel(gObj, gObj.hierarchyPrintMode));
        /* tslint:disable:no-empty */
        printGrid.load = function () { };
        printGrid.query = gObj.getQuery().clone();
        window.printGridObj = printGrid;
        printGrid.isPrinting = true;
        var modules = printGrid.getInjectedModules();
        var injectedModues = gObj.getInjectedModules();
        if (!modules || modules.length !== injectedModues.length) {
            printGrid.setInjectedModules(injectedModues);
        }
        gObj.notify(events.printGridInit, { element: element, printgrid: printGrid });
        this.parent.log('exporting_begin', this.getModuleName());
        printGrid.appendTo(element);
        printGrid.registeredTemplate = this.parent.registeredTemplate;
        printGrid.trigger = gObj.trigger;
    };
    Print.prototype.contentReady = function () {
        if (this.isPrintGrid()) {
            var gObj = this.parent;
            if (this.isAsyncPrint) {
                this.printGrid();
                return;
            }
            var args = {
                requestType: 'print',
                element: gObj.element,
                selectedRows: gObj.getContentTable().querySelectorAll('tr[aria-selected="true"]'),
                cancel: false,
                hierarchyPrintMode: gObj.hierarchyPrintMode
            };
            if (!this.isAsyncPrint) {
                gObj.trigger(events.beforePrint, args);
            }
            if (args.cancel) {
                detach(gObj.element);
                return;
            }
            if (!this.isAsyncPrint) {
                this.printGrid();
            }
        }
    };
    Print.prototype.printGrid = function () {
        var gObj = this.parent;
        // Height adjustment on print grid
        if (gObj.height !== 'auto') { // if scroller enabled
            var cssProps = this.scrollModule.getCssProperties();
            var contentDiv = gObj.element.querySelector('.e-content');
            var headerDiv = gObj.element.querySelector('.e-gridheader');
            contentDiv.style.height = 'auto';
            contentDiv.style.overflowY = 'auto';
            headerDiv.style[cssProps.padding] = '';
            headerDiv.firstElementChild.style[cssProps.border] = '';
        }
        // Grid alignment adjustment on grouping
        if (gObj.allowGrouping) {
            if (!gObj.groupSettings.columns.length) {
                gObj.element.querySelector('.e-groupdroparea').style.display = 'none';
            }
            else {
                this.removeColGroup(gObj);
            }
        }
        // hide horizontal scroll
        for (var _i = 0, _a = [].slice.call(gObj.element.querySelectorAll('.e-content')); _i < _a.length; _i++) {
            var element = _a[_i];
            element.style.overflowX = 'hidden';
        }
        // Hide the waiting popup
        var waitingPop = gObj.element.querySelectorAll('.e-spin-show');
        for (var _b = 0, _c = [].slice.call(waitingPop); _b < _c.length; _b++) {
            var element = _c[_b];
            classList(element, ['e-spin-hide'], ['e-spin-show']);
        }
        this.printGridElement(gObj);
        gObj.isPrinting = false;
        delete window.printGridObj;
        var args = {
            element: gObj.element
        };
        gObj.trigger(events.printComplete, args);
        this.parent.log('exporting_complete', this.getModuleName());
    };
    Print.prototype.printGridElement = function (gObj) {
        classList(gObj.element, ['e-print-grid-layout'], ['e-print-grid']);
        if (gObj.isPrinting) {
            detach(gObj.element);
        }
        this.printWind = printWindow(gObj.element, this.printWind);
    };
    Print.prototype.removeColGroup = function (gObj) {
        var depth = gObj.groupSettings.columns.length;
        var element = gObj.element;
        var id = '#' + gObj.element.id;
        if (!depth) {
            return;
        }
        var groupCaption = element.querySelectorAll(id + "captioncell.e-groupcaption");
        var colSpan = groupCaption[depth - 1].getAttribute('colspan');
        for (var i = 0; i < groupCaption.length; i++) {
            groupCaption[i].setAttribute('colspan', colSpan);
        }
        var colGroups = element.querySelectorAll("colgroup" + id + "colGroup");
        var contentColGroups = element.querySelector('.e-content').querySelectorAll('colgroup');
        this.hideColGroup(colGroups, depth);
        this.hideColGroup(contentColGroups, depth);
    };
    Print.prototype.hideColGroup = function (colGroups, depth) {
        for (var i = 0; i < colGroups.length; i++) {
            for (var j = 0; j < depth; j++) {
                colGroups[i].childNodes[j].style.display = 'none';
            }
        }
    };
    /**
     * To destroy the print
     * @hidden
     */
    Print.prototype.isPrintGrid = function () {
        return this.parent.element.id.indexOf('_print') > 0 && this.parent.isPrinting;
    };
    /**
     * To destroy the print
     * @return {void}
     * @hidden
     */
    Print.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.contentReady, this.contentReady.bind(this));
        this.parent.removeEventListener(events.actionBegin, this.actionBegin.bind(this));
        this.parent.off(events.onEmpty, this.onEmpty.bind(this));
        this.parent.off(events.hierarchyPrint, this.hierarchyPrint);
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Print.prototype.getModuleName = function () {
        return 'print';
    };
    Print.printGridProp = getCloneProperties().concat([events.beforePrint, events.printComplete, events.load]);
    return Print;
}());
export { Print };
