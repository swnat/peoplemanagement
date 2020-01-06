import { Container } from '../core/containers/container';
import { DiagramEvent } from '../enum/enum';
import { cloneObject as clone } from '../utility/base-util';
import { cloneBlazorObject } from '../utility/diagram-util';
/**
 * Layout Animation function to enable or disable layout animation
 */
var LayoutAnimation = /** @class */ (function () {
    function LayoutAnimation() {
        this.protectChange = false;
    }
    /**
     * Layout expand function for animation of expand and collapse
     */
    LayoutAnimation.prototype.expand = function (animation, objects, node, diagram) {
        var _this = this;
        var setIntervalObject = {};
        var i = 0;
        var j = 0;
        setIntervalObject[i] = setInterval(function () {
            j++;
            return _this.layoutAnimation(objects, setIntervalObject, j === 6, diagram, node);
        }, 20);
        if (node.isExpanded) {
            var opacity_1 = .2;
            var protect = 'isProtectedOnChange';
            this.protectChange = diagram[protect];
            diagram.protectPropertyChange(false);
            //let objects: ILayout = diagram.doLayout();
            var setIntervalObjects_1 = {};
            var x = 0;
            if (animation) {
                this.updateOpacity(node, opacity_1, diagram);
                var current = this;
                setIntervalObjects_1[x] = setInterval(function () {
                    opacity_1 <= 1 ? _this.updateOpacity(node, opacity_1, diagram) : clearInterval(setIntervalObjects_1[0]);
                    opacity_1 += .2;
                }, 20);
            }
        }
    };
    /**
     * Setinterval and Clear interval for layout animation
     */
    /** @private */
    LayoutAnimation.prototype.layoutAnimation = function (objValue, layoutTimer, stop, diagram, node) {
        if (!stop) {
            for (var k = 0; k < objValue.objects.length; k++) {
                var node_1 = diagram.nameTable[objValue.objects[k].id];
                node_1.offsetX += objValue.objects[k].differenceX / 5;
                node_1.offsetY += objValue.objects[k].differenceY / 5;
            }
        }
        if (stop) {
            clearInterval(layoutTimer[0]);
            diagram.protectPropertyChange(true);
            diagram.triggerEvent(DiagramEvent.animationComplete, undefined);
            diagram.organizationalChartModule.isAnimation = false;
            diagram.layout.fixedNode = '';
            diagram.protectPropertyChange(this.protectChange);
            var arg = {
                element: cloneBlazorObject(clone(node)), state: (node.isExpanded) ? true : false
            };
            diagram.triggerEvent(DiagramEvent.expandStateChange, arg);
        }
    };
    /**
     * update the node opacity for the node and connector once the layout animation starts
     */
    LayoutAnimation.prototype.updateOpacity = function (source, value, diagram) {
        for (var i = 0; i < source.outEdges.length; i++) {
            var connector = diagram.nameTable[source.outEdges[i]];
            var target = diagram.nameTable[connector.targetID];
            connector.style.opacity = value;
            for (var j = 0; j < connector.wrapper.children.length; j++) {
                connector.wrapper.children[j].style.opacity = value;
                target.style.opacity = value;
                if (target.wrapper instanceof Container) {
                    diagram.updateNodeProperty(target.wrapper, undefined, value);
                }
            }
            this.updateOpacity(target, value, diagram);
        }
    };
    /**
     * To destroy the  LayoutAnimate module
     * @return {void}
     * @private
     */
    LayoutAnimation.prototype.destroy = function () {
        /**
         * Destroys the LayoutAnimate module
         */
    };
    /**
     * Get module name.
     */
    LayoutAnimation.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'LayoutAnimate';
    };
    return LayoutAnimation;
}());
export { LayoutAnimation };
