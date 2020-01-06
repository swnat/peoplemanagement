/**
 * Quad helps to maintain a set of objects that are contained within the particular region
 */
/** @private */
var Quad = /** @class */ (function () {
    /** @private */
    function Quad(left, top, width, height, spatialSearching) {
        this.objects = [];
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.spatialSearch = spatialSearching;
    }
    /** @private */
    Quad.prototype.findQuads = function (currentViewPort, quads) {
        if (this.first != null && this.first.isIntersect(currentViewPort)) {
            this.first.findQuads(currentViewPort, quads);
        }
        if (this.second != null && this.second.isIntersect(currentViewPort)) {
            this.second.findQuads(currentViewPort, quads);
        }
        if (this.third != null && this.third.isIntersect(currentViewPort)) {
            this.third.findQuads(currentViewPort, quads);
        }
        if (this.fourth != null && this.fourth.isIntersect(currentViewPort)) {
            this.fourth.findQuads(currentViewPort, quads);
        }
        if (this.objects.length > 0) {
            quads.push(this);
        }
    };
    Quad.prototype.isIntersect = function (t) {
        if (this.left + this.width < t.left || this.top + this.height < t.top || this.left > t.right || this.top > t.bottom) {
            return false;
        }
        return true;
    };
    /** @private */
    Quad.prototype.selectQuad = function () {
        var target = null;
        var current = this;
        var quadSet;
        while (current != null) {
            quadSet = current.getQuad(target);
            current = quadSet.source;
            target = quadSet.target || target;
        }
        return target;
    };
    Quad.prototype.getQuad = function (target) {
        target = null;
        var halfWidth = this.width / 2;
        var halfHeight = this.height / 2;
        if (halfWidth >= 1000 && halfHeight >= 1000) {
            var xCenter = this.left + halfWidth;
            var yCenter = this.top + halfHeight;
            if (this.spatialSearch.childRight <= xCenter) {
                if (this.spatialSearch.childBottom <= yCenter) {
                    if (!this.first) {
                        var newQuad = new Quad(this.left, this.top, halfWidth, halfHeight, this.spatialSearch);
                        newQuad.parent = this;
                        this.first = newQuad;
                    }
                    return { source: this.first };
                }
                if (this.spatialSearch.childTop >= yCenter) {
                    if (!this.third) {
                        var newQuad = new Quad(this.left, yCenter, halfWidth, halfHeight, this.spatialSearch);
                        newQuad.parent = this;
                        this.third = newQuad;
                    }
                    return { source: this.third };
                }
            }
            else if (this.spatialSearch.childLeft >= xCenter) {
                if (this.spatialSearch.childBottom <= yCenter) {
                    if (!this.second) {
                        var newQuad = new Quad(xCenter, this.top, halfWidth, halfHeight, this.spatialSearch);
                        newQuad.parent = this;
                        this.second = newQuad;
                    }
                    return { source: this.second };
                }
                if (this.spatialSearch.childTop >= yCenter) {
                    if (!this.fourth) {
                        var newQuad = new Quad(xCenter, yCenter, halfWidth, halfHeight, this.spatialSearch);
                        newQuad.parent = this;
                        this.fourth = newQuad;
                    }
                    return { source: this.fourth };
                }
            }
        }
        target = this;
        this.objects.push(this.spatialSearch.childNode);
        return { target: this };
    };
    /** @private */
    Quad.prototype.isContained = function () {
        if (this.spatialSearch.childLeft >= this.left && this.spatialSearch.childRight <= this.left + this.width &&
            this.spatialSearch.childTop >= this.top && this.spatialSearch.childBottom <= this.top + this.height) {
            return true;
        }
        return false;
    };
    /** @private */
    Quad.prototype.addIntoAQuad = function (node) {
        var quadAddition = {};
        this.spatialSearch.setCurrentNode(node);
        var quad = null;
        while (!quadAddition.isAdded) {
            quadAddition = this.spatialSearch.parentQuad.add(quad);
            quad = quadAddition.quad;
        }
        return quad;
    };
    Quad.prototype.add = function (quad) {
        quad = null;
        if (this.isContained()) {
            quad = this.selectQuad();
            return { isAdded: true, quad: quad };
        }
        else {
            var newParent = void 0;
            var isempty = this.objects.length === 0 && !this.first && !this.second && !this.third &&
                !this.fourth;
            var newWidth = this.width * 2;
            var newHeight = this.height * 2;
            if (this.spatialSearch.childLeft < this.left) {
                if (this.spatialSearch.childTop < this.top) {
                    newParent = new Quad(this.left - this.width, this.top - this.height, newWidth, newHeight, this.spatialSearch);
                    if (!isempty) {
                        newParent.fourth = this;
                    }
                }
                else {
                    newParent = new Quad(this.left - this.width, this.top, newWidth, newHeight, this.spatialSearch);
                    if (!isempty) {
                        newParent.second = this;
                    }
                }
            }
            else if (this.spatialSearch.childTop < this.top) {
                newParent = new Quad(this.left, this.top - this.height, newWidth, newHeight, this.spatialSearch);
                if (!isempty) {
                    newParent.third = this;
                }
            }
            else {
                newParent = new Quad(this.left, this.top, newWidth, newHeight, this.spatialSearch);
                if (!isempty) {
                    newParent.first = this;
                }
            }
            this.parent = newParent;
            this.spatialSearch.parentQuad = newParent;
            return { isAdded: false, quad: quad };
            //newParent.AddIntoaQuad(node);
        }
    };
    return Quad;
}());
export { Quad };
