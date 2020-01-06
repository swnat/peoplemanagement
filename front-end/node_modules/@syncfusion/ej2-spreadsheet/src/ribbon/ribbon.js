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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Property, NotifyPropertyChanges, Event, ChildProperty } from '@syncfusion/ej2-base';
import { getComponent, closest, EventHandler } from '@syncfusion/ej2-base';
import { Collection, Complex } from '@syncfusion/ej2-base';
import { Tab, Toolbar } from '@syncfusion/ej2-navigations';
import { Menu, Header, Item, MenuItem } from '@syncfusion/ej2-navigations';
/**
 * An array of object that is used to configure the Tab.
 */
var RibbonItem = /** @class */ (function (_super) {
    __extends(RibbonItem, _super);
    function RibbonItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, Header)
    ], RibbonItem.prototype, "header", void 0);
    __decorate([
        Collection([], Item)
    ], RibbonItem.prototype, "content", void 0);
    __decorate([
        Property({})
    ], RibbonItem.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], RibbonItem.prototype, "disabled", void 0);
    __decorate([
        Property('Tab')
    ], RibbonItem.prototype, "type", void 0);
    __decorate([
        Collection([], MenuItem)
    ], RibbonItem.prototype, "menuItems", void 0);
    return RibbonItem;
}(ChildProperty));
export { RibbonItem };
/**
 * Represents Ribbon component.
 */
var Ribbon = /** @class */ (function (_super) {
    __extends(Ribbon, _super);
    /**
     * Constructor for creating the widget.
     * @param  {RibbonModel} options?
     * @param  {string|HTMLDivElement} element?
     */
    function Ribbon(options, element) {
        return _super.call(this, options) || this;
    }
    /**
     * For internal use only.
     * @returns void
     * @private
     */
    Ribbon.prototype.preRender = function () {
        /** */
    };
    /**
     * For internal use only.
     * @returns void
     * @private
     */
    Ribbon.prototype.render = function () {
        this.renderRibbon();
    };
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     * @method destroy
     * @return {void}
     */
    Ribbon.prototype.destroy = function () {
        this.destroyComponent(this.element.querySelector('.e-file-menu'), Menu);
        var expandCollapseElem = this.tabObj.element.querySelector('.e-drop-icon');
        if (expandCollapseElem) {
            expandCollapseElem.removeEventListener('click', this.ribbonExpandCollapse.bind(this));
        }
        this.toolbarObj.destroy();
        this.tabObj.destroy();
        _super.prototype.destroy.call(this);
    };
    Ribbon.prototype.getTabItems = function () {
        var _this = this;
        var tabItems = [];
        this.items.forEach(function (item) {
            switch (item.type) {
                case 'Menu':
                    tabItems.push({
                        header: { text: _this.initMenu(item.menuItems) },
                        content: _this.toolbarObj.element
                    });
                    break;
                case 'Tab':
                    tabItems.push({
                        header: item.header,
                        content: _this.toolbarObj.element
                    });
                    break;
            }
        });
        return tabItems;
    };
    Ribbon.prototype.initMenu = function (menuItems) {
        var _this = this;
        var menu = this.createElement('ul');
        this.element.appendChild(menu);
        var menuObj = new Menu({
            cssClass: 'e-file-menu',
            items: menuItems,
            showItemOnClick: true,
            beforeOpen: function (args) {
                if (args.parentItem.text === menuItems[0].text) {
                    menuObj.showItemOnClick = false;
                }
                _this.trigger('beforeOpen', args);
            },
            select: function (args) {
                _this.trigger('fileItemSelect', args);
            },
            beforeClose: function (args) {
                if (args.event.type === 'mouseover' && !closest(args.event.target, '.e-menu-popup')) {
                    args.cancel = true;
                    return;
                }
                _this.trigger('beforeClose', args);
                if (!args.parentItem || args.parentItem.text === menuItems[0].text) {
                    requestAnimationFrame(function () { return menuObj.setProperties({ showItemOnClick: true }, true); });
                }
            },
            beforeItemRender: function (args) {
                _this.trigger('beforeFileItemRender', args);
            }
        });
        menuObj.createElement = this.createElement;
        menuObj.appendTo(menu);
        return menu.parentElement;
    };
    Ribbon.prototype.renderRibbon = function () {
        var _this = this;
        var tabElement = this.createElement('div');
        var tBarElement = this.createElement('div');
        this.toolbarObj = new Toolbar({
            clicked: function (args) {
                _this.trigger('clicked', args);
            }
        });
        this.toolbarObj.createElement = this.createElement;
        this.toolbarObj.appendTo(tBarElement);
        this.tabObj = new Tab({
            selectedItem: 1,
            animation: { next: { duration: 0 }, previous: { duration: 0 } },
            items: this.getTabItems(),
            selecting: function (args) {
                if (_this.items[args.selectingIndex].type === 'Menu') {
                    args.cancel = true;
                }
                else {
                    _this.toolbarObj.items = _this.items[args.selectingIndex].content;
                    _this.toolbarObj.dataBind();
                    if (_this.element.classList.contains('e-collapsed')) {
                        EventHandler.remove(args.selectedItem, 'click', _this.ribbonExpandCollapse);
                    }
                }
                _this.trigger('selecting', args);
            },
            selected: function () {
                if (_this.element.classList.contains('e-collapsed')) {
                    _this.element.classList.remove('e-collapsed');
                    _this.trigger('expandCollapse', { element: _this.toolbarObj.element, expanded: true });
                }
            },
            created: function () {
                var collapseBtn = _this.createElement('span', { className: 'e-drop-icon e-icons' });
                collapseBtn.addEventListener('click', _this.ribbonExpandCollapse.bind(_this));
                _this.tabObj.element.querySelector('.e-tab-header').appendChild(collapseBtn);
                _this.toolbarObj.refreshOverflow();
            }
        });
        this.element.appendChild(tabElement);
        this.tabObj.createElement = this.createElement;
        this.tabObj.appendTo(tabElement);
    };
    Ribbon.prototype.ribbonExpandCollapse = function (e) {
        var eventArgs = { element: this.toolbarObj.element, expanded: true };
        var activeTab;
        if (this.element.classList.contains('e-collapsed')) {
            activeTab = this.tabObj.element.querySelector('.e-tab-header').getElementsByClassName('e-toolbar-item')[this.tabObj.selectedItem];
            this.element.classList.remove('e-collapsed');
            activeTab.classList.add('e-active');
            EventHandler.remove(activeTab, 'click', this.ribbonExpandCollapse);
            this.trigger('expandCollapse', eventArgs);
        }
        else {
            activeTab = this.tabObj.element.querySelector('.e-tab-header .e-toolbar-item.e-active');
            this.element.classList.add('e-collapsed');
            eventArgs.expanded = false;
            activeTab.classList.remove('e-active');
            EventHandler.add(activeTab, 'click', this.ribbonExpandCollapse, this);
            this.trigger('expandCollapse', eventArgs);
        }
    };
    /**
     * Enables or disables the specified Ribbon items or all ribbon items.
     * @param  {boolean} enable  - Boolean value that determines whether the command should be enabled or disabled.
     * @param  {HTMLElement} items - DOM element or an array of items to be enabled or disabled.
     * By default, `isEnable` is set to true.
     * @returns void.
     */
    Ribbon.prototype.enableItems = function (enable, items) {
        if (items) {
            this.toolbarObj.enableItems(items, enable);
        }
        else {
            this.toolbarObj.disable(!enable);
        }
    };
    /**
     * Get component name.
     * @returns string
     * @private
     */
    Ribbon.prototype.getModuleName = function () {
        return 'ribbon';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @returns string
     * @private
     */
    Ribbon.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Called internally if any of the property value changed.
     * @param  {RibbonModel} newProp
     * @param  {RibbonModel} oldProp
     * @returns void
     * @private
     */
    Ribbon.prototype.onPropertyChanged = function (newProp, oldProp) {
        /** code snippets */
    };
    Ribbon.prototype.destroyComponent = function (element, component) {
        if (element) {
            var compObj = getComponent(element, component);
            if (compObj) {
                compObj.destroy();
            }
        }
    };
    __decorate([
        Property('')
    ], Ribbon.prototype, "cssClass", void 0);
    __decorate([
        Collection([], RibbonItem)
    ], Ribbon.prototype, "items", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "selecting", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "fileItemSelect", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "beforeFileItemRender", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "selectFormat", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "clicked", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "created", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "expandCollapse", void 0);
    Ribbon = __decorate([
        NotifyPropertyChanges
    ], Ribbon);
    return Ribbon;
}(Component));
export { Ribbon };
