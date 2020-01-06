import { Browser } from '@syncfusion/ej2-base';
import { itemHighlight, itemSelected } from '../model/constants';
import { findHightLightItems, removeClassNames, applyOptions, removeShape, removeLegend, removeSelectionWithHighlight, setColor, getLegendIndex, pushCollection } from '../utils/helper';
/**
 * Performing treemap highlight
 */
var TreeMapHighlight = /** @class */ (function () {
    function TreeMapHighlight(treeMap) {
        this.target = 'highlight';
        this.shapeTarget = 'highlight';
        this.shapeHighlightCollection = [];
        this.legendHighlightCollection = [];
        this.currentElement = [];
        this.treemap = treeMap;
        this.addEventListener();
    }
    /* tslint:disable:no-string-literal */
    //tslint:disable:max-func-body-length
    /* tslint:disable:max-line-length */
    /**
     * Mouse down event in highlight
     */
    TreeMapHighlight.prototype.mouseMove = function (e) {
        var treemap = this.treemap;
        var processHighlight;
        var targetId = e.target.id;
        var eventArgs;
        var items = [];
        var eventBlazorArgs;
        var highlight = this.treemap.highlightSettings;
        var item;
        var highLightElements = [];
        var process;
        var treeMapElement;
        var element;
        var orders;
        var selectionModule = this.treemap.treeMapSelectionModule;
        if (targetId.indexOf('_Item_Index') > -1 && (selectionModule ? selectionModule.selectionId !== targetId : true)) {
            if (this.highLightId !== targetId) {
                treeMapElement = document.getElementById(treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout');
                var selectionElements = document.getElementsByClassName('treeMapSelection');
                item = this.treemap.layout.renderItems[parseFloat(targetId.split('_')[6])];
                var index = void 0;
                if (this.treemap.legendSettings.visible) {
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    var length_1 = this.treemap.treeMapLegendModule.legendCollections.length;
                    index = getLegendIndex(length_1, item, treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById('container_Legend_Shape_Index_' + index) : document.getElementById('container_Legend_Index_' + index);
                    if (this.shapeElement !== null && (selectionModule ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true)) {
                        if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true) {
                            this.currentElement.push({ currentElement: this.shapeElement });
                            removeShape(this.shapeHighlightCollection, 'highlight');
                            this.shapeHighlightCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                                oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                                oldBorderWidth: collection[index]['borderWidth']
                            });
                            setColor(this.shapeElement, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            this.target = 'highlight';
                        }
                        else if (this.currentElement.length > 0 && this.currentElement[this.currentElement.length - 1]['currentElement'] !== this.shapeElement) {
                            removeSelectionWithHighlight(this.shapeHighlightCollection, this.currentElement, treemap);
                            this.highLightId = '';
                        }
                    }
                    else if (this.currentElement.length > 0 && this.currentElement[this.currentElement.length - 1]['currentElement'] !== this.shapeElement) {
                        removeSelectionWithHighlight(this.shapeHighlightCollection, this.currentElement, treemap);
                        this.highLightId = '';
                    }
                }
                orders = findHightLightItems(item, [], highlight.mode, treemap);
                if (this.treemap.legendSettings.visible ? selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true : true) {
                    if (this.treemap.legendSettings.visible ? selectionModule ? this.shapeElement !== selectionModule.shapeElement : true : true) {
                        for (var i = 0; i < treeMapElement.childElementCount; i++) {
                            element = treeMapElement.childNodes[i];
                            process = true;
                            item = treemap.layout.renderItems[element.id.split('_')[6]];
                            for (var j = 0; j < selectionElements.length; j++) {
                                if (element.id === selectionElements[j].id) {
                                    process = false;
                                    break;
                                }
                            }
                            if (orders.indexOf(item['levelOrderName']) > -1 && process) {
                                highLightElements.push(element);
                                items.push(item);
                            }
                        }
                        removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                        for (var k = 0; k < highLightElements.length; k++) {
                            element = highLightElements[k];
                            applyOptions(element.childNodes[0], { border: highlight.border, fill: highlight.fill, opacity: highlight.opacity });
                            element.classList.add('treeMapHighLight');
                            this.highLightId = targetId;
                        }
                        eventArgs = { cancel: false, name: itemHighlight, treemap: treemap, items: items, elements: highLightElements };
                        eventBlazorArgs = { cancel: false, name: itemHighlight, items: items, elements: highLightElements };
                        treemap.trigger(itemHighlight, treemap.isBlazor ? eventBlazorArgs : eventArgs);
                    }
                    else {
                        processHighlight = false;
                    }
                }
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1) {
            if (this.treemap.legendSettings.visible && (selectionModule ? selectionModule.legendSelectId !== targetId : true) && (selectionModule ? selectionModule.shapeSelectId !== targetId : true)) {
                var index = void 0;
                var itemIndex = void 0;
                var groupIndex = void 0;
                var length_2;
                var targetEle = document.getElementById(targetId);
                if (this.shapeTarget === 'highlight') {
                    removeLegend(this.legendHighlightCollection, 'highlight');
                }
                this.shapeTarget = 'highlight';
                index = this.treemap.legendSettings.mode === 'Default' ? parseFloat(targetId.split('_')[4]) : parseFloat(targetId.split('_')[3]);
                var dataLength = this.treemap.treeMapLegendModule.legendCollections[index]['legendData'].length;
                var collection = this.treemap.treeMapLegendModule.legendCollections;
                var legendIndex = parseInt(targetId[targetId.length - 1], 10);
                for (var i = 0; i < dataLength; i++) {
                    for (var j = 0; j < this.treemap.layout.renderItems.length; j++) {
                        if (this.treemap.treeMapLegendModule.legendCollections[index]['legendData'][i]['levelOrderName'] === this.treemap.layout.renderItems[j]['levelOrderName']) {
                            itemIndex = j;
                            groupIndex = this.treemap.layout.renderItems[j]['groupIndex'];
                            var nodeEle = document.getElementById('container_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            if (i === 0) {
                                this.legendHighlightCollection = [];
                                pushCollection(this.legendHighlightCollection, legendIndex, j, targetEle, nodeEle, this.treemap.layout.renderItems, collection);
                                length_2 = this.legendHighlightCollection.length;
                                this.legendHighlightCollection[length_2 - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            setColor(targetEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            setColor(nodeEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            length_2 = this.legendHighlightCollection.length;
                            this.legendHighlightCollection[length_2 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
        }
        else {
            if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && this.treemap.legendSettings.visible) {
                    removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                }
            }
            if ((this.shapeTarget === 'highlight' || this.target === 'highlight') && this.treemap.legendSettings.visible) {
                if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                    if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && selectionModule ? selectionModule.legendSelect : true) {
                        removeShape(this.shapeHighlightCollection, 'highlight');
                        this.shapeHighlightCollection = [];
                    }
                }
            }
            if (this.shapeTarget === 'highlight' && this.treemap.legendSettings.visible) {
                removeLegend(this.legendHighlightCollection, 'highlight');
            }
            this.highLightId = '';
            processHighlight = false;
        }
        return processHighlight;
    };
    /**
     * To bind events for highlight
     */
    TreeMapHighlight.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * To unbind events for highlight
     */
    TreeMapHighlight.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * Get module name.
     */
    TreeMapHighlight.prototype.getModuleName = function () {
        return 'treeMapHighlight';
    };
    /**
     * To destroy the hightlight.
     * @return {void}
     * @private
     */
    TreeMapHighlight.prototype.destroy = function (treeMap) {
        this.removeEventListener();
    };
    return TreeMapHighlight;
}());
export { TreeMapHighlight };
/**
 * Performing treemap selection
 */
var TreeMapSelection = /** @class */ (function () {
    function TreeMapSelection(treeMap) {
        this.shapeSelectionCollection = [];
        this.legendSelectionCollection = [];
        this.shapeSelect = true;
        this.legendSelect = true;
        this.treemap = treeMap;
        this.addEventListener();
    }
    /* tslint:disable:no-string-literal */
    /**
     * Mouse down event in selection
     */
    TreeMapSelection.prototype.mouseDown = function (e) {
        var targetEle = e.target;
        var eventArgs;
        var eventBlazorArgs;
        var treemap = this.treemap;
        var items = [];
        var targetId = targetEle.id;
        var item;
        var selectionElements = [];
        var opacity;
        var treeMapElement;
        var element;
        var orders;
        var selection = treemap.selectionSettings;
        var highlightModule = this.treemap.treeMapHighlightModule;
        var layoutID = treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout';
        if (targetId.indexOf('_Item_Index') > -1) {
            e.preventDefault();
            if (this.selectionId !== targetId && this.legendSelect) {
                treeMapElement = document.getElementById(layoutID);
                item = treemap.layout.renderItems[parseFloat(targetId.split('_')[6])];
                var index = void 0;
                if (this.treemap.legendSettings.visible) {
                    this.shapeSelect = false;
                    var length_3 = this.treemap.treeMapLegendModule.legendCollections.length;
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    this.shapeElement = undefined;
                    removeShape(this.shapeSelectionCollection, 'selection');
                    if (highlightModule) {
                        highlightModule.shapeTarget = 'selection';
                        highlightModule.shapeHighlightCollection = [];
                    }
                    index = getLegendIndex(length_3, item, treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById('container_Legend_Shape_Index_' + index) : document.getElementById('container_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        this.shapeSelectId = this.shapeElement.getAttribute('id');
                        this.shapeSelectionCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                            oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                            oldBorderWidth: collection[index]['borderWidth']
                        });
                        setColor(this.shapeElement, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                    }
                }
                orders = findHightLightItems(item, [], selection.mode, treemap);
                for (var i = 0; i < treeMapElement.childElementCount; i++) {
                    element = treeMapElement.childNodes[i];
                    item = treemap.layout.renderItems[element.id.split('_')[6]];
                    if (orders.indexOf(item['levelOrderName']) > -1) {
                        selectionElements.push(element);
                        items.push(item);
                    }
                }
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                this.selectionId = targetId;
                var highLightElements = document.getElementsByClassName('treeMapHighLight');
                for (var k = 0; k < selectionElements.length; k++) {
                    element = selectionElements[k];
                    if (highLightElements.length > 0) {
                        for (var j = 0; j < highLightElements.length; j++) {
                            if (highLightElements[j].id === element.id) {
                                highLightElements[j].classList.remove('treeMapHighLight');
                            }
                            applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                            element.classList.add('treeMapSelection');
                        }
                    }
                    else {
                        applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                        element.classList.add('treeMapSelection');
                    }
                    eventArgs = { cancel: false, name: itemSelected, treemap: treemap, items: items, elements: selectionElements };
                    eventBlazorArgs = { cancel: false, name: itemSelected, items: items, elements: selectionElements };
                    treemap.trigger(itemSelected, treemap.isBlazor ? eventBlazorArgs : eventArgs);
                }
            }
            else {
                removeShape(this.shapeSelectionCollection, 'selection');
                this.shapeElement = undefined;
                this.shapeSelect = true;
                this.shapeSelectId = '';
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                this.selectionId = '';
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1) {
            var collection = this.treemap.treeMapLegendModule.legendCollections;
            if (this.treemap.legendSettings.visible && this.legendSelectId !== targetId && this.shapeSelect) {
                var index = void 0;
                var itemIndex = void 0;
                var groupIndex = void 0;
                var length_4;
                this.legendSelectId = targetId;
                this.legendSelect = false;
                var legendIndex = parseInt(targetId[targetId.length - 1], 10);
                var targetEle_1 = document.getElementById(targetId);
                removeLegend(this.legendSelectionCollection, 'selection');
                if (highlightModule) {
                    highlightModule.shapeTarget = 'selection';
                }
                index = this.treemap.legendSettings.mode === 'Default' ? parseFloat(targetId.split('_')[4]) : parseFloat(targetId.split('_')[3]);
                var dataLength = this.treemap.treeMapLegendModule.legendCollections[index]['legendData'].length;
                for (var k = 0; k < dataLength; k++) {
                    for (var l = 0; l < this.treemap.layout.renderItems.length; l++) {
                        if (this.treemap.treeMapLegendModule.legendCollections[index]['legendData'][k]['levelOrderName'] === this.treemap.layout.renderItems[l]['levelOrderName']) {
                            itemIndex = l;
                            groupIndex = this.treemap.layout.renderItems[l]['groupIndex'];
                            var nodeEle = document.getElementById('container_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            if (k === 0) {
                                pushCollection(this.legendSelectionCollection, legendIndex, l, targetEle_1, nodeEle, this.treemap.layout.renderItems, collection);
                                length_4 = this.legendSelectionCollection.length;
                                this.legendSelectionCollection[length_4 - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            setColor(targetEle_1, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            setColor(nodeEle, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            length_4 = this.legendSelectionCollection.length;
                            this.legendSelectionCollection[length_4 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
            else {
                removeLegend(this.legendSelectionCollection, 'Selection');
                if (highlightModule) {
                    highlightModule.shapeTarget = 'highlight';
                }
                this.legendSelect = true;
                this.legendSelectId = '';
            }
        }
    };
    /**
     * To bind events for selection
     */
    TreeMapSelection.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchStartEvent, this.mouseDown, this);
    };
    /**
     * To unbind events for selection
     */
    TreeMapSelection.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchStartEvent, this.mouseDown);
    };
    /**
     * Get module name.
     */
    TreeMapSelection.prototype.getModuleName = function () {
        return 'treeMapSelection';
    };
    /**
     * To destroy the selection.
     * @return {void}
     * @private
     */
    TreeMapSelection.prototype.destroy = function (treeMap) {
        this.removeEventListener();
    };
    return TreeMapSelection;
}());
export { TreeMapSelection };
