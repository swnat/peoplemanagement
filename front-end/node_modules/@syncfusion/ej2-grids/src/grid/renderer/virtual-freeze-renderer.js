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
import { remove, extend } from '@syncfusion/ej2-base';
import { FreezeContentRender, FreezeRender } from './freeze-renderer';
import { VirtualContentRenderer, VirtualHeaderRenderer } from './virtual-content-renderer';
import { FreezeRowModelGenerator } from '../services/freeze-row-model-generator';
import * as events from '../base/constant';
/**
 * VirtualFreezeRenderer is used to render the virtual table within the frozen table
 * @hidden
 */
var VirtualFreezeRenderer = /** @class */ (function (_super) {
    __extends(VirtualFreezeRenderer, _super);
    function VirtualFreezeRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.serviceLoc = locator;
        return _this;
    }
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.renderTable = function () {
        this.freezeRowGenerator = new FreezeRowModelGenerator(this.parent);
        this.virtualRenderer = new VirtualContentRenderer(this.parent, this.serviceLoc);
        this.virtualRenderer.setPanel(this.parent.getContent());
        this.virtualRenderer.renderTable();
        var virtualTable = this.parent.getContent().querySelector('.e-virtualtable');
        var virtualTrack = this.parent.getContent().querySelector('.e-virtualtrack');
        virtualTrack.style.position = '';
        this.getFrozenContent().appendChild(virtualTable);
        this.getFrozenContent().appendChild(virtualTrack);
        var mTbl = virtualTable.cloneNode(true);
        var mTblT = virtualTrack.cloneNode(true);
        this.getMovableContent().appendChild(mTbl);
        this.getMovableContent().appendChild(mTblT);
        remove(this.getMovableContent().querySelector('colgroup'));
        var colGroup = this.parent.getMovableVirtualHeader().querySelector('colgroup')
            .cloneNode(true);
        mTbl.firstElementChild.insertBefore(colGroup, mTbl.firstElementChild.querySelector('tbody'));
        this.setTable(this.parent.element.querySelector('.e-frozencontent').querySelector('.e-table'));
    };
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.appendContent = function (target, newChild, e) {
        this.virtualRenderer.appendContent(target, newChild, e);
    };
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.generateRows = function (data, notifyArgs) {
        var isSplit = false;
        var virtualRows = this.virtualRenderer.vgenerator.generateRows(data, notifyArgs);
        var arr = [];
        arr = virtualRows.map(function (row) { return extend({}, row); });
        if (this.parent.enableColumnVirtualization && this.parent.getFrozenColumns() && notifyArgs.renderMovableContent) {
            var left = this.parent.getMovableVirtualContent().scrollLeft;
            isSplit = notifyArgs.requestType === 'virtualscroll' && left > 0 && notifyArgs.virtualInfo.columnIndexes[0] !== 0;
        }
        var rows = this.freezeRowGenerator.generateRows(data, notifyArgs, arr);
        return isSplit ? virtualRows : rows;
    };
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.getRowByIndex = function (index) {
        return this.virtualRenderer.getRowByIndex(index);
    };
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.getMovableRowByIndex = function (index) {
        return this.virtualRenderer.getMovableVirtualRowByIndex(index);
    };
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.getMovableRows = function () {
        return this.virtualRenderer.vgenerator.getRows();
    };
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.getRows = function () {
        return this.getMovableRows();
    };
    /**
     * @hidden
     */
    VirtualFreezeRenderer.prototype.getColGroup = function () {
        var colGroup = this.parent.getMovableVirtualContent().querySelector('colgroup');
        return colGroup;
    };
    return VirtualFreezeRenderer;
}(FreezeContentRender));
export { VirtualFreezeRenderer };
var VirtualFreezeHdrRenderer = /** @class */ (function (_super) {
    __extends(VirtualFreezeHdrRenderer, _super);
    function VirtualFreezeHdrRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.serviceLoc = locator;
        return _this;
    }
    /**
     * @hidden
     */
    VirtualFreezeHdrRenderer.prototype.renderTable = function () {
        this.virtualHdrRenderer = new VirtualHeaderRenderer(this.parent, this.serviceLoc);
        this.virtualEle = this.virtualHdrRenderer.virtualEle;
        this.virtualHdrRenderer.setPanel(this.parent.getHeaderContent());
        this.virtualHdrRenderer.renderTable();
        this.rfhMovable();
        this.updateColgroup();
        this.initializeHeaderDrag();
        this.initializeHeaderDrop();
        this.setTable(this.parent.element.querySelector('.e-frozenheader').querySelector('.e-table'));
        this.parent.notify(events.headerRefreshed, { rows: this.rows, args: { isFrozen: false } });
    };
    VirtualFreezeHdrRenderer.prototype.rfhMovable = function () {
        var fvTbl = this.parent.getHeaderContent().querySelector('.e-virtualtable');
        var fvTck = this.parent.getHeaderContent().querySelector('.e-virtualtrack');
        this.getFrozenHeader().appendChild(fvTbl);
        this.getFrozenHeader().appendChild(fvTck);
        this.virtualHdrRenderer.virtualEle.table = this.createTable();
        this.virtualHdrRenderer.virtualEle.renderWrapper();
        this.virtualHdrRenderer.virtualEle.renderPlaceHolder();
        var mvTbl = [].slice.call(this.parent.getHeaderContent().querySelectorAll('.e-virtualtable'));
        var mvTck = [].slice.call(this.parent.getHeaderContent().querySelectorAll('.e-virtualtrack'));
        this.getMovableHeader().appendChild(mvTbl[1]);
        this.getMovableHeader().appendChild(mvTck[1]);
    };
    /**
     * @hidden
     */
    VirtualFreezeHdrRenderer.prototype.getTable = function () {
        return this.virtualHdrRenderer.getTable();
    };
    return VirtualFreezeHdrRenderer;
}(FreezeRender));
export { VirtualFreezeHdrRenderer };
