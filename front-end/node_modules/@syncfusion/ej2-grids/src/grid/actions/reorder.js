import { extend, isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
import { closest as closestElement, removeClass, classList, remove } from '@syncfusion/ej2-base';
import { getElementIndex, inArray, parentsUntil, getPosition, isActionPrevent } from '../base/util';
import * as events from '../base/constant';
/**
 *
 * The `Reorder` module is used for reordering columns.
 */
var Reorder = /** @class */ (function () {
    /**
     * Constructor for the Grid reorder module
     * @hidden
     */
    function Reorder(parent) {
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.headerDrop, this.headerDrop, this);
        this.parent.on(events.uiUpdate, this.enableAfterRender, this);
        this.parent.on(events.reorderComplete, this.onActionComplete, this);
        this.parent.on(events.columnDrag, this.drag, this);
        this.parent.on(events.columnDragStart, this.dragStart, this);
        this.parent.on(events.columnDragStop, this.dragStop, this);
        this.parent.on(events.headerDrop, this.headerDrop, this);
        this.parent.on(events.headerRefreshed, this.createReorderElement, this);
        this.parent.on(events.keyPressed, this.keyPressHandler, this);
    }
    Reorder.prototype.chkDropPosition = function (srcElem, destElem) {
        var col = this.parent.getColumnByUid(destElem.firstElementChild.getAttribute('e-mappinguid'));
        var bool = col ? !col.lockColumn : true;
        return (srcElem.parentElement.isEqualNode(destElem.parentElement) || (this.parent.getFrozenColumns()
            && Array.prototype.indexOf.call(closestElement(srcElem, 'thead').children, srcElem.parentElement)
                === Array.prototype.indexOf.call(closestElement(destElem, 'thead').children, destElem.parentElement)))
            && this.targetParentContainerIndex(srcElem, destElem) > -1 && bool;
    };
    Reorder.prototype.chkDropAllCols = function (srcElem, destElem) {
        var isFound;
        var headers = this.getHeaderCells();
        var header;
        while (!isFound && headers.length > 0) {
            header = headers.pop();
            isFound = srcElem !== header && this.targetParentContainerIndex(srcElem, destElem) > -1;
        }
        return isFound;
    };
    Reorder.prototype.findColParent = function (col, cols, parent) {
        parent = parent;
        for (var i = 0, len = cols.length; i < len; i++) {
            if (col === cols[i]) {
                return true;
            }
            else if (cols[i].columns) {
                var cnt = parent.length;
                parent.push(cols[i]);
                if (!this.findColParent(col, cols[i].columns, parent)) {
                    parent.splice(cnt, parent.length - cnt);
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    Reorder.prototype.getColumnsModel = function (cols) {
        var columnModel = [];
        var subCols = [];
        for (var i = 0, len = cols.length; i < len; i++) {
            columnModel.push(cols[i]);
            if (cols[i].columns) {
                subCols = subCols.concat(cols[i].columns);
            }
        }
        if (subCols.length) {
            columnModel = columnModel.concat(this.getColumnsModel(subCols));
        }
        return columnModel;
    };
    Reorder.prototype.headerDrop = function (e) {
        var gObj = this.parent;
        var dropElement = this.element.querySelector('.e-headercelldiv') || this.element.querySelector('.e-stackedheadercelldiv');
        var uId = dropElement.getAttribute('e-mappinguid');
        var column = gObj.getColumnByUid(uId);
        if (!closestElement(e.target, 'th') || (!isNullOrUndefined(column) && (!column.allowReordering || column.lockColumn))) {
            this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), column: column });
            return;
        }
        var destElem = closestElement(e.target, '.e-headercell');
        var destElemDiv = destElem.querySelector('.e-headercelldiv') || destElem.querySelector('.e-stackedheadercelldiv');
        var destElemUid = destElemDiv.getAttribute('e-mappinguid');
        if (!isNullOrUndefined(destElemUid)) {
            var destColumn = gObj.getColumnByUid(destElemUid);
            if (isNullOrUndefined(destColumn) || !destColumn.allowReordering || destColumn.lockColumn) {
                this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), column: column, destColumn: destColumn });
                return;
            }
        }
        if (destElem && !(!this.chkDropPosition(this.element, destElem) || !this.chkDropAllCols(this.element, destElem))) {
            if (this.parent.enableColumnVirtualization) {
                var columns = this.parent.columns;
                var sourceUid_1 = this.element.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
                var col = this.parent.getColumns(true).filter(function (col) { return col.uid === sourceUid_1; });
                var colMatchIndex_1 = null;
                var column_1 = col[0];
                var destUid_1 = destElem.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
                var bool = columns.some(function (col, index) {
                    if (col.uid === destUid_1) {
                        colMatchIndex_1 = index;
                        return col.uid === destUid_1;
                    }
                    return false;
                });
                if (!isNullOrUndefined(colMatchIndex_1)) {
                    this.moveColumns(colMatchIndex_1, column_1);
                }
            }
            else {
                var newIndex = this.targetParentContainerIndex(this.element, destElem);
                var uid = this.element.firstElementChild.getAttribute('e-mappinguid');
                this.destElement = destElem;
                if (uid) {
                    this.moveColumns(newIndex, this.parent.getColumnByUid(uid));
                }
                else {
                    var headers = this.getHeaderCells();
                    var oldIdx = getElementIndex(this.element, headers);
                    var columns = this.getColumnsModel(this.parent.columns);
                    var column_2 = columns[oldIdx];
                    this.moveColumns(newIndex, column_2);
                }
            }
        }
    };
    Reorder.prototype.isActionPrevent = function (gObj) {
        return isActionPrevent(gObj);
    };
    Reorder.prototype.moveColumns = function (destIndex, column, reorderByColumn, preventRefresh) {
        var gObj = this.parent;
        if (this.isActionPrevent(gObj)) {
            gObj.notify(events.preventBatch, { instance: this, handler: this.moveColumns, arg1: destIndex, arg2: column });
            return;
        }
        var parent = this.getColParent(column, this.parent.columns);
        var cols = parent ? parent.columns : this.parent.columns;
        var srcIdx = inArray(column, cols);
        if (((this.parent.getFrozenColumns() && parent) || this.parent.lockcolPositionCount) && !reorderByColumn) {
            for (var i = 0; i < cols.length; i++) {
                if (cols[i].field === column.field) {
                    srcIdx = i;
                    break;
                }
            }
            var col = this.parent.getColumnByUid(this.destElement.firstElementChild.getAttribute('e-mappinguid'));
            if (col) {
                for (var i = 0; i < cols.length; i++) {
                    if (cols[i].field === col.field) {
                        destIndex = i;
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < cols.length; i++) {
                    if (cols[i].headerText === this.destElement.innerText.trim()) {
                        destIndex = i;
                    }
                }
            }
        }
        if (!gObj.allowReordering || srcIdx === destIndex || srcIdx === -1 || destIndex === -1) {
            return;
        }
        cols.splice(destIndex, 0, cols.splice(srcIdx, 1)[0]);
        gObj.getColumns(true);
        gObj.notify(events.columnPositionChanged, { fromIndex: destIndex, toIndex: srcIdx });
        if (preventRefresh !== false) {
            gObj.notify(events.modelChanged, {
                type: events.actionBegin, requestType: 'reorder', fromIndex: destIndex, toIndex: srcIdx, toColumnUid: column.uid
            });
        }
    };
    Reorder.prototype.targetParentContainerIndex = function (srcElem, destElem) {
        var headers = this.getHeaderCells();
        var cols = this.parent.columns;
        var flatColumns = this.getColumnsModel(cols);
        var parent = this.getColParent(flatColumns[getElementIndex(srcElem, headers)], cols);
        cols = parent ? parent.columns : cols;
        return inArray(flatColumns[getElementIndex(destElem, headers)], cols);
    };
    Reorder.prototype.getHeaderCells = function () {
        var frozenColumns = this.parent.getFrozenColumns();
        if (frozenColumns || this.parent.lockcolPositionCount) {
            var fTh = void 0;
            var mTh = void 0;
            var fHeaders = [];
            var fRows = [].slice.call(this.parent.getHeaderTable().querySelectorAll('.e-columnheader'));
            if (frozenColumns) {
                var mRows = [].slice.call(this.parent.getHeaderContent()
                    .querySelector('.e-movableheader').querySelectorAll('.e-columnheader'));
                for (var i = 0; i < fRows.length; i++) {
                    fTh = [].slice.call(fRows[i].getElementsByClassName('e-headercell'));
                    mTh = [].slice.call(mRows[i].getElementsByClassName('e-headercell'));
                    var isAvail = void 0;
                    for (var k = 0; k < fTh.length; k++) {
                        for (var j = 0; j < mTh.length; j++) {
                            if (mTh[j].innerText === fTh[k].innerText) {
                                isAvail = true;
                                break;
                            }
                        }
                        if (!isAvail) {
                            fHeaders = fHeaders.concat([fTh[k]]);
                        }
                    }
                    for (var j = 0; j < mTh.length; j++) {
                        fHeaders.push(mTh[j]);
                    }
                }
            }
            else {
                for (var i = 0; i < fRows.length; i++) {
                    mTh = [].slice.call(fRows[i].getElementsByClassName('e-headercell'));
                    for (var k = 0; k < mTh.length; k++) {
                        var isAvail = void 0;
                        for (var j = k + 1; j < mTh.length; j++) {
                            if (mTh[j].innerText === mTh[k].innerText) {
                                isAvail = true;
                                break;
                            }
                        }
                        if (!isAvail) {
                            fHeaders = fHeaders.concat([mTh[k]]);
                        }
                    }
                }
            }
            return fHeaders;
        }
        else {
            return [].slice.call(this.parent.element.getElementsByClassName('e-headercell'));
        }
    };
    Reorder.prototype.getColParent = function (column, columns) {
        var parents = [];
        this.findColParent(column, columns, parents);
        return parents[parents.length - 1];
    };
    Reorder.prototype.reorderSingleColumn = function (fromFName, toFName) {
        var fColumn = this.parent.getColumnByField(fromFName);
        var toColumn = this.parent.getColumnByField(toFName);
        if ((!isNullOrUndefined(fColumn) && (!fColumn.allowReordering || fColumn.lockColumn)) ||
            (!isNullOrUndefined(toColumn) && (!toColumn.allowReordering || fColumn.lockColumn))) {
            this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), column: fColumn, destColumn: toColumn });
            return;
        }
        var column = this.parent.getColumnByField(toFName);
        var parent = this.getColParent(column, this.parent.columns);
        var columns = parent ? parent.columns : this.parent.columns;
        var destIndex = inArray(column, columns);
        if (destIndex > -1) {
            this.moveColumns(destIndex, this.parent.getColumnByField(fromFName), true);
        }
    };
    Reorder.prototype.reorderMultipleColumns = function (fromFNames, toFName) {
        var toIndex = this.parent.getColumnIndexByField(toFName);
        var toColumn = this.parent.getColumnByField(toFName);
        if (toIndex < 0 || (!isNullOrUndefined(toColumn) && (!toColumn.allowReordering || toColumn.lockColumn))) {
            return;
        }
        for (var i = 0; i < fromFNames.length; i++) {
            var column = this.parent.getColumnByField(fromFNames[i]);
            if (!isNullOrUndefined(column) && (!column.allowReordering || column.lockColumn)) {
                return;
            }
        }
        for (var i = 0; i < fromFNames.length; i++) {
            var column = this.parent.getColumnByIndex(toIndex);
            var parent_1 = this.getColParent(column, this.parent.columns);
            var columns = parent_1 ? parent_1.columns : this.parent.columns;
            var destIndex = inArray(column, columns);
            if (destIndex > -1) {
                this.moveColumns(destIndex, this.parent.getColumnByField(fromFNames[i]), true, !(isBlazor() && !this.parent.isJsComponent));
            }
            if (this.parent.getColumnIndexByField(fromFNames[i + 1]) >= destIndex) {
                toIndex++; //R to L
            }
        }
        if (isBlazor() && !this.parent.isJsComponent) {
            var cols_1 = this.parent.getColumns();
            this.parent.notify(events.modelChanged, {
                fromColumnUid: fromFNames.map(function (name) { return cols_1.filter(function (col) { return col.field === name; })[0].uid; }),
                toColumnUid: toColumn.uid,
                isMultipleReorder: true,
                requestType: 'reorder',
                type: 'actionBegin'
            });
        }
    };
    Reorder.prototype.moveTargetColumn = function (column, toIndex) {
        if (toIndex > -1) {
            this.moveColumns(toIndex, column, true);
        }
    };
    Reorder.prototype.reorderSingleColumnByTarget = function (fieldName, toIndex) {
        var column = this.parent.getColumnByField(fieldName);
        this.moveTargetColumn(column, toIndex);
    };
    Reorder.prototype.reorderMultipleColumnByTarget = function (fieldName, toIndex) {
        for (var i = 0; i < fieldName.length; i++) {
            this.reorderSingleColumnByTarget(fieldName[i], toIndex);
        }
    };
    /**
     * Changes the position of the Grid columns by field names.
     * @param  {string | string[]} fromFName - Defines the origin field names.
     * @param  {string} toFName - Defines the destination field name.
     * @return {void}
     */
    Reorder.prototype.reorderColumns = function (fromFName, toFName) {
        if (typeof fromFName === 'string') {
            this.reorderSingleColumn(fromFName, toFName);
            this.fromCol = fromFName;
        }
        else {
            this.reorderMultipleColumns(fromFName, toFName);
            this.fromCol = fromFName[0];
        }
    };
    /**
     * Changes the position of the Grid columns by field index.
     * @param  {number} fromIndex - Defines the origin field index.
     * @param  {number} toIndex - Defines the destination field index.
     * @return {void}
     */
    Reorder.prototype.reorderColumnByIndex = function (fromIndex, toIndex) {
        var column = this.parent.getColumnByIndex(fromIndex);
        this.moveTargetColumn(column, toIndex);
    };
    /**
     * Changes the position of the Grid columns by field index.
     * @param  {string | string[]} fieldName - Defines the field name.
     * @param  {number} toIndex - Defines the destination field index.
     * @return {void}
     */
    Reorder.prototype.reorderColumnByTargetIndex = function (fieldName, toIndex) {
        typeof fieldName === 'string' ? this.reorderSingleColumnByTarget(fieldName, toIndex) :
            this.reorderMultipleColumnByTarget(fieldName, toIndex);
    };
    Reorder.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.createReorderElement();
        }
    };
    Reorder.prototype.createReorderElement = function () {
        var header = this.parent.element.querySelector('.e-headercontent');
        this.upArrow = header.appendChild(this.parent
            .createElement('div', { className: 'e-icons e-icon-reorderuparrow e-reorderuparrow', attrs: { style: 'display:none' } }));
        this.downArrow = header.appendChild(this.parent
            .createElement('div', { className: 'e-icons e-icon-reorderdownarrow e-reorderdownarrow', attrs: { style: 'display:none' } }));
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    Reorder.prototype.onActionComplete = function (e) {
        if (isBlazor() && !this.parent.isJsComponent) {
            e.rows = null;
        }
        this.parent.trigger(events.actionComplete, extend(e, { type: events.actionComplete }));
        var target = this.fromCol && this.parent.getColumnHeaderByField(this.fromCol);
        if (target) {
            this.parent.focusModule.onClick({ target: target }, true);
        }
    };
    /**
     * To destroy the reorder
     * @return {void}
     * @hidden
     */
    Reorder.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (this.parent.isDestroyed || !gridElement || (!gridElement.querySelector('.e-gridheader') &&
            !gridElement.querySelector('.e-gridcontent'))) {
            return;
        }
        remove(this.upArrow);
        remove(this.downArrow);
        this.parent.off(events.headerDrop, this.headerDrop);
        this.parent.off(events.uiUpdate, this.enableAfterRender);
        this.parent.off(events.reorderComplete, this.onActionComplete);
        this.parent.off(events.columnDrag, this.drag);
        this.parent.off(events.columnDragStart, this.dragStart);
        this.parent.off(events.columnDragStop, this.dragStop);
        this.parent.off(events.headerRefreshed, this.createReorderElement);
        this.parent.off(events.keyPressed, this.keyPressHandler);
        //call ejdrag and drop destroy
    };
    Reorder.prototype.keyPressHandler = function (e) {
        var gObj = this.parent;
        switch (e.action) {
            case 'ctrlLeftArrow':
            case 'ctrlRightArrow':
                var element = gObj.focusModule.currentInfo.element;
                if (element && element.classList.contains('e-headercell')) {
                    var column = gObj.getColumnByUid(element.firstElementChild.getAttribute('e-mappinguid'));
                    var visibleCols = gObj.getVisibleColumns();
                    var index = visibleCols.indexOf(column);
                    var toCol = e.action === 'ctrlLeftArrow' ? visibleCols[index - 1] : visibleCols[index + 1];
                    if (toCol && toCol.field && column.field) {
                        this.reorderColumns(column.field, toCol.field);
                    }
                }
                break;
        }
    };
    Reorder.prototype.drag = function (e) {
        var gObj = this.parent;
        var target = e.target;
        if (!e.column.allowReordering || e.column.lockColumn) {
            return;
        }
        var closest = closestElement(target, '.e-headercell:not(.e-stackedHeaderCell)');
        var cloneElement = gObj.element.querySelector('.e-cloneproperties');
        var isLeft = this.x > getPosition(e.event).x + gObj.getContent().firstElementChild.scrollLeft;
        removeClass(gObj.getHeaderTable().querySelectorAll('.e-reorderindicate'), ['e-reorderindicate']);
        this.setDisplay('none');
        this.stopTimer();
        classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
        this.updateScrollPostion(e.event);
        if (closest && !closest.isEqualNode(this.element)) {
            target = closest;
            //consider stacked, detail header cell 
            if (!(!this.chkDropPosition(this.element, target) || !this.chkDropAllCols(this.element, target))) {
                this.updateArrowPosition(target, isLeft);
                classList(target, ['e-allowDrop', 'e-reorderindicate'], []);
            }
            else if (!(gObj.allowGrouping && parentsUntil(e.target, 'e-groupdroparea'))) {
                classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
            }
        }
        gObj.trigger(events.columnDrag, { target: target, draggableType: 'headercell', column: e.column });
    };
    Reorder.prototype.updateScrollPostion = function (e) {
        var _this = this;
        var frzCols = this.parent.getFrozenColumns();
        var x = getPosition(e).x;
        var cliRect = this.parent.element.getBoundingClientRect();
        var cliRectBaseLeft = frzCols ? this.parent.element.querySelector('.e-movableheader')
            .getBoundingClientRect().left : cliRect.left;
        var cliRectBaseRight = cliRect.right;
        var scrollElem = frzCols ? this.parent.getContent().querySelector('.e-movablecontent')
            : this.parent.getContent().firstElementChild;
        if (x > cliRectBaseLeft && x < cliRectBaseLeft + 35) {
            this.timer = window.setInterval(function () { _this.setScrollLeft(scrollElem, true); }, 50);
        }
        else if (x < cliRectBaseRight && x > cliRectBaseRight - 35) {
            this.timer = window.setInterval(function () { _this.setScrollLeft(scrollElem, false); }, 50);
        }
    };
    Reorder.prototype.setScrollLeft = function (scrollElem, isLeft) {
        var scrollLeft = scrollElem.scrollLeft;
        scrollElem.scrollLeft = scrollElem.scrollLeft + (isLeft ? -5 : 5);
        if (scrollLeft !== scrollElem.scrollLeft) {
            this.setDisplay('none');
        }
    };
    Reorder.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    Reorder.prototype.updateArrowPosition = function (target, isLeft) {
        var cliRect = target.getBoundingClientRect();
        var cliRectBase = this.parent.element.getBoundingClientRect();
        if ((isLeft && cliRect.left < cliRectBase.left) || (!isLeft && cliRect.right > cliRectBase.right)) {
            return;
        }
        this.upArrow.style.top = cliRect.top + cliRect.height - cliRectBase.top + 'px';
        this.downArrow.style.top = cliRect.top - cliRectBase.top - 4 + 'px';
        this.upArrow.style.left = this.downArrow.style.left = (isLeft ? cliRect.left : cliRect.right) - cliRectBase.left - 4 + 'px';
        this.setDisplay('');
    };
    Reorder.prototype.dragStart = function (e) {
        var gObj = this.parent;
        var target = e.target;
        this.element = target.classList.contains('e-headercell') ? target :
            parentsUntil(target, 'e-headercell');
        if (!e.column.allowReordering || e.column.lockColumn) {
            return;
        }
        this.x = getPosition(e.event).x + gObj.getContent().firstElementChild.scrollLeft;
        gObj.trigger(events.columnDragStart, {
            target: target, draggableType: 'headercell', column: e.column
        });
    };
    Reorder.prototype.dragStop = function (e) {
        var gObj = this.parent;
        this.setDisplay('none');
        this.stopTimer();
        if (!e.cancel) {
            gObj.trigger(events.columnDrop, { target: e.target, draggableType: 'headercell', column: e.column });
        }
        removeClass(gObj.getHeaderTable().querySelectorAll('.e-reorderindicate'), ['e-reorderindicate']);
    };
    Reorder.prototype.setDisplay = function (display) {
        this.upArrow.style.display = display;
        this.downArrow.style.display = display;
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Reorder.prototype.getModuleName = function () {
        return 'reorder';
    };
    return Reorder;
}());
export { Reorder };
