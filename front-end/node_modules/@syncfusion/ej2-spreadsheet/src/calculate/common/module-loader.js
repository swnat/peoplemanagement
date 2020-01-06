/**
 * Module loading operations
 */
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
var MODULE_SUFFIX = 'Module';
/**
 * To get nameSpace value from the desired object.
 * @param {string} nameSpace - String value to the get the inner object
 * @param {any} obj - Object to get the inner object value.
 * @return {any}
 * @private
 */
export function getValue(nameSpace, obj) {
    /* tslint:disable no-any */
    var value = obj;
    var splits = nameSpace.replace(/\[/g, '.').replace(/\]/g, '').split('.');
    for (var j = 0; j < splits.length && !isUndefined(value); j++) {
        value = value[splits[j]];
    }
    return value;
}
/**
 * To set value for the nameSpace in desired object.
 * @param {string} nameSpace - String value to get the inner object
 * @param {any} value - Value that you need to set.
 * @param {any} obj - Object to get the inner object value.
 * @return {void}
 * @private
 */
export function setValue(nameSpace, value, obj) {
    var keyValues = nameSpace.replace(/\[/g, '.').replace(/\]/g, '').split('.');
    var start = obj || {};
    var fromObj = start;
    var j;
    var length = keyValues.length;
    var key;
    for (j = 0; j < length; j++) {
        key = keyValues[j];
        if (j + 1 === length) {
            fromObj[key] = value === undefined ? {} : value;
        }
        else if (isNullOrUndefined(fromObj[key])) {
            fromObj[key] = {};
        }
        fromObj = fromObj[key];
    }
    return start;
}
var ModuleLoader = /** @class */ (function () {
    function ModuleLoader(parent) {
        this.loadedModules = [];
        this.parent = parent;
    }
    ;
    /**
     * Inject required modules in component library
     * @hidden
     */
    ModuleLoader.prototype.inject = function (requiredModules, moduleList) {
        var reqLengthVal = requiredModules.length;
        if (reqLengthVal === 0) {
            this.clean();
            return;
        }
        if (this.loadedModules.length) {
            this.clearUnusedModule(requiredModules);
        }
        for (var i = 0; i < reqLengthVal; i++) {
            var modl = requiredModules[i];
            for (var _i = 0, moduleList_1 = moduleList; _i < moduleList_1.length; _i++) {
                var module = moduleList_1[_i];
                var modName = modl.member;
                if (module.prototype.getModuleName() === modl.member && !this.isModuleLoaded(modName)) {
                    var moduleObject = this.createInstance(module, modl.args);
                    var memberName = this.getMemberName(modName);
                    if (modl.isProperty) {
                        setValue(memberName, module, this.parent);
                    }
                    else {
                        setValue(memberName, moduleObject, this.parent);
                    }
                    var loadedModule = modl;
                    loadedModule.member = memberName;
                    this.loadedModules.push(loadedModule);
                }
            }
        }
    };
    /**
     * Create Instance from constructor function with desired parameters.
     * @param {Function} classFunction - Class function to which need to create instance
     * @param {any[]} params - Parameters need to passed while creating instance
     * @return {any}
     * @private
     */
    ModuleLoader.prototype.createInstance = function (classFunction, params) {
        var arrayParam = params;
        arrayParam.unshift(undefined);
        return new (Function.prototype.bind.apply(classFunction, arrayParam));
    };
    /**
     * To remove the created object while control is destroyed
     * @hidden
     */
    ModuleLoader.prototype.clean = function () {
        for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
            var modules = _a[_i];
            if (!modules.isProperty) {
                getValue(modules.member, this.parent).destroy();
            }
        }
        this.loadedModules = [];
    };
    /**
     * Removes all unused modules
     * @param {ModuleDeclaration[]} moduleListName
     * @returns {void}
     */
    ModuleLoader.prototype.clearUnusedModule = function (moduleListName) {
        var _this = this;
        var usedModule = moduleListName.map(function (arg) { return _this.getMemberName(arg.member); });
        var removeModule = this.loadedModules.filter(function (module) {
            return usedModule.indexOf(module.member) === -1;
        });
        for (var _i = 0, removeModule_1 = removeModule; _i < removeModule_1.length; _i++) {
            var moduleName = removeModule_1[_i];
            if (!moduleName.isProperty) {
                getValue(moduleName.member, this.parent).destroy();
            }
            this.loadedModules.splice(this.loadedModules.indexOf(moduleName), 1);
            this.deleteObject(this.parent, moduleName.member);
        }
    };
    /**
     * To get the name of the member.
     * @param {string} name
     * @returns {string}
     */
    ModuleLoader.prototype.getMemberName = function (name) {
        return name[0].toLowerCase() + name.substring(1) + MODULE_SUFFIX;
    };
    /**
     * Delete an item from Object
     * @param {any} obj - Object in which we need to delete an item.
     * @param {string} params - String value to the get the inner object
     * @return {void}
     * @private
     */
    ModuleLoader.prototype.deleteObject = function (obj, key) {
        delete obj[key];
    };
    /**
     * Returns boolean based on whether the module specified is loaded or not
     * @param {string} modName
     * @returns {boolean}
     */
    ModuleLoader.prototype.isModuleLoaded = function (modName) {
        for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
            var mod = _a[_i];
            if (mod.member === this.getMemberName(modName)) {
                return true;
            }
        }
        return false;
    };
    return ModuleLoader;
}());
export { ModuleLoader };
