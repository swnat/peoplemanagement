import { EventHandler, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { remove, isBlazor, updateBlazorTemplate } from '@syncfusion/ej2-base';
import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import * as events from '../base/constant';
import { templateCompiler, appendChildren } from '../base/util';
import { SearchBox } from '../services/focus-strategy';
/**
 * The `Toolbar` module is used to handle ToolBar actions.
 * @hidden
 */
var Toolbar = /** @class */ (function () {
    function Toolbar(parent, serviceLocator) {
        this.predefinedItems = {};
        this.items = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Print', 'Search',
            'ColumnChooser', 'PdfExport', 'ExcelExport', 'CsvExport', 'WordExport'];
        this.parent = parent;
        this.gridID = parent.element.id;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    Toolbar.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        var preItems = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Print',
            'PdfExport', 'ExcelExport', 'WordExport', 'CsvExport'];
        for (var _i = 0, preItems_1 = preItems; _i < preItems_1.length; _i++) {
            var item = preItems_1[_i];
            var itemStr = item.toLowerCase();
            var localeName = itemStr[0].toUpperCase() + itemStr.slice(1);
            this.predefinedItems[item] = {
                id: this.gridID + '_' + itemStr, prefixIcon: 'e-' + itemStr,
                text: this.l10n.getConstant(localeName), tooltipText: this.l10n.getConstant(localeName)
            };
        }
        this.predefinedItems.Search = {
            id: this.gridID + '_search',
            template: '<div class="e-input-group e-search" role="search">\
            <input id="' + this.gridID + '_searchbar" class="e-input" name="input" type="search" \
            placeholder= \"' + this.l10n.getConstant('Search') + '\"/>\
            <span id="' + this.gridID + '_searchbutton" class="e-input-group-icon e-search-icon e-icons" \
            tabindex="-1" title="' + this.l10n.getConstant('Search') + '" aria-label= "search"></span> \
            </div>',
            tooltipText: this.l10n.getConstant('Search'), align: 'Right', cssClass: 'e-search-wrapper'
        };
        this.predefinedItems.ColumnChooser = {
            id: this.gridID + '_' + 'columnchooser', cssClass: 'e-cc e-ccdiv e-cc-toolbar', suffixIcon: 'e-' + 'columnchooser-btn',
            text: this.l10n.getConstant('Columnchooser'), tooltipText: this.l10n.getConstant('Columnchooser'), align: 'Right',
        };
        this.createToolbar();
    };
    /**
     * Gets the toolbar of the Grid.
     * @return {Element}
     * @hidden
     */
    Toolbar.prototype.getToolbar = function () {
        return this.toolbar.element;
    };
    /**
     * Destroys the ToolBar.
     * @method destroy
     * @return {void}
     */
    Toolbar.prototype.destroy = function () {
        if (this.toolbar && !this.toolbar.isDestroyed) {
            if (!this.toolbar.element) {
                this.parent.destroyTemplate(['toolbarTemplate']);
            }
            else {
                this.toolbar.destroy();
            }
            this.unWireEvent();
            this.removeEventListener();
            remove(this.element);
        }
    };
    Toolbar.prototype.bindSearchEvents = function () {
        this.searchElement = this.element.querySelector('#' + this.gridID + '_searchbar');
        this.wireEvent();
        this.refreshToolbarItems();
        if (this.parent.searchSettings) {
            this.updateSearchBox();
        }
    };
    Toolbar.prototype.createToolbar = function () {
        var items = this.getItems();
        this.toolbar = new tool({
            items: items,
            clicked: this.toolbarClickHandler.bind(this),
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl,
            created: this.bindSearchEvents.bind(this)
        });
        var isStringTemplate = 'isStringTemplate';
        this.toolbar[isStringTemplate] = true;
        var viewStr = 'viewContainerRef';
        var registerTemp = 'registeredTemplate';
        if (this.parent[viewStr]) {
            this.toolbar[registerTemp] = {};
            this.toolbar[viewStr] = this.parent[viewStr];
        }
        this.element = this.parent.createElement('div', { id: this.gridID + '_toolbarItems' });
        if (this.parent.toolbarTemplate) {
            if (!isBlazor() && typeof (this.parent.toolbarTemplate) === 'string') {
                this.toolbar.appendTo(this.parent.toolbarTemplate);
                this.element = this.toolbar.element;
            }
            else {
                if (isBlazor()) {
                    var tempID = this.parent.element.id + 'toolbarTemplate';
                    var item = appendChildren(this.element, templateCompiler(this.parent.toolbarTemplate)({}, this.parent, 'toolbarTemplate', tempID));
                    var items_1 = this.getItem(item);
                    this.toolbar.items.push(items_1);
                    this.toolbar.appendTo(this.element);
                    updateBlazorTemplate(this.parent.element.id + 'toolbarTemplate', 'ToolbarTemplate', this.parent);
                }
                else {
                    appendChildren(this.element, templateCompiler(this.parent.toolbarTemplate)({}, this.parent, 'toolbarTemplate'));
                }
            }
        }
        else {
            this.toolbar.appendTo(this.element);
        }
        this.parent.element.insertBefore(this.element, this.parent.getHeaderContent());
        this.bindSearchEvents();
    };
    Toolbar.prototype.refreshToolbarItems = function (args) {
        var gObj = this.parent;
        var enableItems = [];
        var disableItems = [];
        var edit = gObj.editSettings;
        var hasData = gObj.currentViewData && gObj.currentViewData.length;
        edit.allowAdding ? enableItems.push(this.gridID + '_add') : disableItems.push(this.gridID + '_add');
        edit.allowEditing && hasData ? enableItems.push(this.gridID + '_edit') : disableItems.push(this.gridID + '_edit');
        edit.allowDeleting && hasData ? enableItems.push(this.gridID + '_delete') : disableItems.push(this.gridID + '_delete');
        if (gObj.editSettings.mode === 'Batch') {
            if (gObj.element.querySelectorAll('.e-updatedtd').length && (edit.allowAdding || edit.allowEditing)) {
                enableItems.push(this.gridID + '_update');
                enableItems.push(this.gridID + '_cancel');
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        else {
            if (gObj.isEdit && (edit.allowAdding || edit.allowEditing)) {
                enableItems = [this.gridID + '_update', this.gridID + '_cancel'];
                disableItems = [this.gridID + '_add', this.gridID + '_edit', this.gridID + '_delete'];
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        this.enableItems(enableItems, true);
        this.enableItems(disableItems, false);
    };
    Toolbar.prototype.getItems = function () {
        var items = [];
        var toolbarItems = this.parent.toolbar || [];
        if (typeof (this.parent.toolbar) === 'string') {
            return [];
        }
        for (var _i = 0, toolbarItems_1 = toolbarItems; _i < toolbarItems_1.length; _i++) {
            var item = toolbarItems_1[_i];
            switch (typeof item) {
                case 'number':
                    items.push(this.getItemObject(this.items[item]));
                    break;
                case 'string':
                    items.push(this.getItemObject(item));
                    break;
                default:
                    items.push(this.getItem(item));
            }
        }
        return items;
    };
    Toolbar.prototype.getItem = function (itemObject) {
        var item = this.predefinedItems[itemObject.text];
        return item ? extend(item, item, itemObject) : itemObject;
    };
    Toolbar.prototype.getItemObject = function (itemName) {
        return this.predefinedItems[itemName] || { text: itemName, id: this.gridID + '_' + itemName };
    };
    /**
     * Enables or disables ToolBar items.
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @return {void}
     * @hidden
     */
    Toolbar.prototype.enableItems = function (items, isEnable) {
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            var element = this.element.querySelector('#' + item);
            if (element) {
                this.toolbar.enableItems(element.parentElement, isEnable);
            }
        }
    };
    Toolbar.prototype.toolbarClickHandler = function (args) {
        var _this = this;
        var gObj = this.parent;
        var gID = this.gridID;
        extend(args, { cancel: false });
        var newArgs = !isBlazor() || this.parent.isJsComponent ? args : { item: args.item, cancel: args.cancel, name: args.name };
        var originalEvent = args.originalEvent;
        gObj.trigger(events.toolbarClick, newArgs, function (toolbarargs) {
            toolbarargs.originalEvent = toolbarargs.originalEvent ? toolbarargs.originalEvent : originalEvent;
            if (!toolbarargs.cancel) {
                switch (!isNullOrUndefined(toolbarargs.item) && toolbarargs.item.id) {
                    case gID + '_print':
                        gObj.print();
                        break;
                    case gID + '_edit':
                        gObj.startEdit();
                        break;
                    case gID + '_update':
                        gObj.endEdit();
                        break;
                    case gID + '_cancel':
                        gObj.closeEdit();
                        break;
                    case gID + '_add':
                        gObj.addRecord();
                        break;
                    case gID + '_delete':
                        gObj.deleteRecord();
                        break;
                    case gID + '_search':
                        if (toolbarargs.originalEvent.target.id === gID + '_searchbutton') {
                            _this.search();
                        }
                        break;
                    case gID + '_columnchooser':
                        var tarElement = _this.parent.element.querySelector('.e-ccdiv');
                        var y = tarElement.getBoundingClientRect().top;
                        var x = tarElement.getBoundingClientRect().left;
                        var targetEle = toolbarargs.originalEvent.target;
                        y = tarElement.getBoundingClientRect().top + tarElement.offsetTop;
                        gObj.createColumnchooser(x, y, targetEle);
                        break;
                }
            }
        });
    };
    Toolbar.prototype.modelChanged = function (e) {
        if (e.module === 'edit') {
            this.refreshToolbarItems();
        }
    };
    Toolbar.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() || !this.parent.toolbar) {
            return;
        }
        if (this.element) {
            remove(this.element);
        }
        this.render();
    };
    Toolbar.prototype.keyUpHandler = function (e) {
        if (e.keyCode === 13) {
            this.search();
        }
    };
    Toolbar.prototype.search = function () {
        this.parent.search(this.searchElement.value);
    };
    Toolbar.prototype.updateSearchBox = function () {
        if (this.searchElement) {
            this.searchElement.value = this.parent.searchSettings.key;
        }
    };
    Toolbar.prototype.wireEvent = function () {
        if (this.searchElement) {
            this.searchBoxObj = new SearchBox(this.searchElement);
            EventHandler.add(this.searchElement, 'keyup', this.keyUpHandler, this);
            this.searchBoxObj.wireEvent();
        }
    };
    Toolbar.prototype.unWireEvent = function () {
        if (this.searchElement) {
            EventHandler.remove(this.searchElement, 'keyup', this.keyUpHandler);
            this.searchBoxObj.unWireEvent();
        }
    };
    Toolbar.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initialEnd, this.render, this);
        this.parent.on(events.uiUpdate, this.onPropertyChanged, this);
        this.parent.on(events.inBoundModelChanged, this.updateSearchBox.bind(this));
        this.parent.on(events.modelChanged, this.refreshToolbarItems, this);
        this.parent.on(events.toolbarRefresh, this.refreshToolbarItems, this);
        this.parent.on(events.inBoundModelChanged, this.modelChanged, this);
        this.parent.on(events.dataBound, this.refreshToolbarItems, this);
    };
    Toolbar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initialEnd, this.render);
        this.parent.off(events.uiUpdate, this.onPropertyChanged);
        this.parent.off(events.inBoundModelChanged, this.updateSearchBox);
        this.parent.off(events.modelChanged, this.refreshToolbarItems);
        this.parent.off(events.toolbarRefresh, this.refreshToolbarItems);
        this.parent.off(events.inBoundModelChanged, this.modelChanged);
        this.parent.off(events.dataBound, this.refreshToolbarItems);
    };
    /**
     * For internal use only - Get the module name.
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    return Toolbar;
}());
export { Toolbar };
