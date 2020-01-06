import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * ServiceLocator
 * @hidden
 * @deprecated
 */
var ServiceLocator = /** @class */ (function () {
    function ServiceLocator() {
        this.services = {};
    }
    /**
     * register method
     * @hidden
     * @deprecated
     */
    ServiceLocator.prototype.register = function (name, type) {
        if (isNullOrUndefined(this.services[name])) {
            this.services[name] = type;
        }
    };
    /**
     * getService method
     * @hidden
     * @deprecated
     */
    ServiceLocator.prototype.getService = function (name) {
        if (isNullOrUndefined(this.services[name])) {
            throw "The service " + name + " is not registered";
        }
        return this.services[name];
    };
    return ServiceLocator;
}());
export { ServiceLocator };
