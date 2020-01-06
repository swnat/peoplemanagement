import { Rect } from '../primitives/rect';
import { getPortDirection } from '../utility/connector';
import { canEnableRouting } from '../utility/constraints-util';
/**
 * Line Routing
 */
var LineRouting = /** @class */ (function () {
    /**
     * Constructor for the line routing module
     * @private
     */
    function LineRouting() {
        this.size = 20;
        this.intermediatePoints = [];
        this.gridCollection = [];
        this.startArray = [];
        this.targetGridCollection = [];
        this.sourceGridCollection = [];
        //constructs the line routing module
    }
    /** @private */
    LineRouting.prototype.lineRouting = function (diagram) {
        var length = diagram.connectors.length;
        this.renderVirtualRegion(diagram);
        if (length > 0) {
            for (var k = 0; k < length; k++) {
                var connector = diagram.connectors[k];
                if (connector.type === 'Orthogonal') {
                    this.refreshConnectorSegments(diagram, connector, true);
                }
            }
        }
    };
    /** @private */
    LineRouting.prototype.renderVirtualRegion = function (diagram, isUpdate) {
        /* tslint:disable */
        var right = diagram.spatialSearch['pageRight'] + this.size;
        var bottom = diagram.spatialSearch['pageBottom'] + this.size;
        var left = diagram.spatialSearch['pageLeft'] - this.size;
        var top = diagram.spatialSearch['pageTop'] - this.size;
        left = left < 0 ? left - 20 : 0;
        top = top < 0 ? top - 20 : 0;
        /* tslint:enable */
        if ((isUpdate && (this.width !== (right - left) || this.height !== (bottom - top) ||
            this.diagramStartX !== left || this.diagramStartY !== top)) || isUpdate === undefined) {
            this.width = right - left;
            this.height = bottom - top;
            this.diagramStartX = left;
            this.diagramStartY = top;
            this.gridCollection = [];
            this.noOfRows = this.width / this.size;
            this.noOfCols = this.height / this.size;
            var size = this.size;
            var x = this.diagramStartX < 0 ? this.diagramStartX : 0;
            var y = this.diagramStartY < 0 ? this.diagramStartY : 0;
            for (var i = 0; i < this.noOfCols; i++) {
                for (var j = 0; j < this.noOfRows; j++) {
                    if (i === 0) {
                        // tslint:disable-next-line:no-any
                        this.gridCollection.push([0]);
                    }
                    var grid = {
                        x: x, y: y, width: size, height: size, gridX: j,
                        gridY: i, walkable: true, tested: undefined, nodeId: []
                    };
                    this.gridCollection[j][i] = grid;
                    x += size;
                }
                x = this.diagramStartX < 0 ? this.diagramStartX : 0;
                y += size;
            }
        }
        var nodes = this.findNodes(diagram.nodes);
        this.updateNodesInVirtualRegion(nodes);
    };
    LineRouting.prototype.findNodes = function (nodes) {
        var objects = [];
        var node;
        for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if (node.shape.type !== 'SwimLane' && !node.isLane && !node.isPhase && !node.isHeader) {
                objects.push(node);
            }
        }
        return objects;
    };
    LineRouting.prototype.updateNodesInVirtualRegion = function (diagramNodes) {
        var size = this.size;
        var x = this.diagramStartX < 0 ? this.diagramStartX : 0;
        var y = this.diagramStartY < 0 ? this.diagramStartY : 0;
        for (var i = 0; i < this.noOfCols; i++) {
            for (var j = 0; j < this.noOfRows; j++) {
                var grid = this.gridCollection[j][i];
                var rectangle = new Rect(x, y, this.size, this.size);
                var isContains = void 0;
                var k = void 0;
                grid.walkable = true;
                grid.tested = undefined;
                grid.nodeId = [];
                for (k = 0; k < diagramNodes.length; k++) {
                    isContains = this.intersectRect(rectangle, diagramNodes[k].wrapper.outerBounds);
                    if (isContains) {
                        grid.nodeId.push(diagramNodes[k].id);
                        grid.walkable = false;
                    }
                }
                x += size;
            }
            x = this.diagramStartX < 0 ? this.diagramStartX : 0;
            y += size;
        }
    };
    LineRouting.prototype.intersectRect = function (r1, r2) {
        return !(r2.left >= r1.right || r2.right <= r1.left ||
            r2.top >= r1.bottom || r2.bottom <= r1.top);
    };
    LineRouting.prototype.findEndPoint = function (connector, isSource) {
        var endPoint;
        var portDirection;
        if ((isSource && connector.sourcePortID !== '') || (!isSource && connector.targetPortID !== '')) {
            endPoint = (isSource) ? { x: connector.sourcePortWrapper.offsetX, y: connector.sourcePortWrapper.offsetY } :
                { x: connector.targetPortWrapper.offsetX, y: connector.targetPortWrapper.offsetY };
            portDirection = getPortDirection(endPoint, undefined, (isSource) ? connector.sourceWrapper.bounds : connector.targetWrapper.bounds, false);
            var bounds = (isSource) ? connector.sourcePortWrapper.bounds : connector.targetPortWrapper.bounds;
            if (portDirection === 'Top') {
                endPoint = { x: bounds.topCenter.x, y: bounds.topCenter.y };
            }
            else if (portDirection === 'Left') {
                endPoint = { x: bounds.middleLeft.x, y: bounds.middleLeft.y };
            }
            else if (portDirection === 'Right') {
                endPoint = { x: bounds.middleRight.x, y: bounds.middleRight.y };
            }
            else {
                endPoint = { x: bounds.bottomCenter.x, y: bounds.bottomCenter.y };
            }
        }
        else {
            if ((isSource && this.startNode) || (!isSource && this.targetNode)) {
                endPoint = (isSource) ? { x: this.startNode.wrapper.offsetX, y: this.startNode.wrapper.offsetY } :
                    { x: this.targetNode.wrapper.offsetX, y: this.targetNode.wrapper.offsetY };
            }
            else {
                endPoint = (isSource) ? { x: connector.sourcePoint.x, y: connector.sourcePoint.y } :
                    { x: connector.targetPoint.x, y: connector.targetPoint.y };
            }
        }
        return endPoint;
    };
    /** @private */
    LineRouting.prototype.refreshConnectorSegments = function (diagram, connector, isUpdate) {
        var sourceId = connector.sourceID;
        var targetId = connector.targetID;
        var sourcePortID = connector.sourcePortID;
        var targetPortID = connector.targetPortID;
        var startPoint;
        var targetPoint;
        var sourcePortDirection;
        var targetPortDirection;
        var grid;
        var sourceTop;
        var sourceBottom;
        var isBreak;
        var sourceLeft;
        var sourceRight;
        var targetRight;
        var targetTop;
        var targetBottom;
        var targetLeft;
        if (canEnableRouting(connector, diagram)) {
            this.startNode = diagram.nameTable[sourceId];
            this.targetNode = diagram.nameTable[targetId];
            this.intermediatePoints = [];
            this.startArray = [];
            this.targetGridCollection = [];
            this.sourceGridCollection = [];
            this.startGrid = undefined;
            this.targetGrid = undefined;
            for (var i = 0; i < this.noOfCols; i++) {
                for (var j = 0; j < this.noOfRows; j++) {
                    this.gridCollection[j][i].tested = this.gridCollection[j][i].parent = undefined;
                    this.gridCollection[j][i].previousDistance = this.gridCollection[j][i].afterDistance = undefined;
                    this.gridCollection[j][i].totalDistance = undefined;
                }
            }
            // Set the source point and target point
            startPoint = this.findEndPoint(connector, true);
            targetPoint = this.findEndPoint(connector, false);
            // Find the start grid and target grid
            for (var i = 0; i < this.noOfRows; i++) {
                for (var j = 0; j < this.noOfCols; j++) {
                    grid = this.gridCollection[i][j];
                    var rectangle = new Rect(grid.x, grid.y, grid.width, grid.height);
                    if (rectangle.containsPoint(startPoint) && !this.startGrid &&
                        (grid.nodeId.indexOf(sourceId) !== -1 || sourceId === '')) {
                        this.startGrid = (sourcePortID && this.startGrid &&
                            (sourcePortDirection === 'Left' || sourcePortDirection === 'Top')) ? this.startGrid : grid;
                    }
                    if (rectangle.containsPoint(targetPoint) && !this.targetGrid &&
                        (grid.nodeId.indexOf(targetId) !== -1 || targetId === '')) {
                        this.targetGrid = (targetPortID && this.targetGrid &&
                            (targetPortDirection === 'Left' || targetPortDirection === 'Top')) ? this.targetGrid : grid;
                    }
                    if (!sourcePortID && this.startNode) {
                        var bounds = this.startNode.wrapper.outerBounds;
                        if (rectangle.containsPoint(bounds.topCenter) && !sourceTop) {
                            sourceTop = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleLeft) && !sourceLeft) {
                            sourceLeft = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleRight) && !sourceRight) {
                            sourceRight = grid;
                        }
                        if (rectangle.containsPoint(bounds.bottomCenter) && !sourceBottom) {
                            sourceBottom = grid;
                        }
                    }
                    if (!targetPortID && this.targetNode) {
                        var bounds = this.targetNode.wrapper.outerBounds;
                        if (rectangle.containsPoint(bounds.topCenter) && !targetTop) {
                            targetTop = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleLeft) && !targetLeft) {
                            targetLeft = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleRight) && !targetRight) {
                            targetRight = grid;
                        }
                        if (rectangle.containsPoint({ x: bounds.bottomCenter.x, y: bounds.bottomCenter.y }) && !targetBottom) {
                            targetBottom = grid;
                        }
                    }
                }
            }
            this.findEdgeBoundary(sourcePortID, sourceLeft, sourceRight, sourceTop, sourceBottom, true);
            this.findEdgeBoundary(targetPortID, targetLeft, targetRight, targetTop, targetBottom, false);
            this.startGrid.totalDistance = 0;
            this.startGrid.previousDistance = 0;
            this.intermediatePoints.push({ x: this.startGrid.gridX, y: this.startGrid.gridY });
            this.startArray.push(this.startGrid);
            this.checkObstacles(connector);
            renderPathElement: while (this.startArray.length > 0) {
                var startGridNode = this.startArray.pop();
                for (var i = 0; i < this.targetGridCollection.length; i++) {
                    var target = this.targetGridCollection[i];
                    if (startGridNode.gridX === target.gridX && startGridNode.gridY === target.gridY) {
                        this.getIntermediatePoints(startGridNode);
                        isBreak = this.updateConnectorSegments(diagram, this.intermediatePoints, this.gridCollection, connector, isUpdate);
                        if (!isBreak) {
                            this.targetGridCollection.splice(this.targetGridCollection.indexOf(target), 1);
                            startGridNode = this.startArray.pop();
                        }
                        else {
                            break renderPathElement;
                        }
                    }
                }
                this.findPath(startGridNode);
            }
        }
    };
    LineRouting.prototype.findEdgeBoundary = function (portID, left, right, top, bottom, isSource) {
        var grid;
        var collection = (isSource) ? this.sourceGridCollection : this.targetGridCollection;
        if (!portID && ((isSource) ? this.startNode : this.targetNode)) {
            for (var i = left.gridX; i <= right.gridX; i++) {
                grid = this.gridCollection[i][left.gridY];
                if ((grid.nodeId.length === 1 && (i === left.gridX || i === right.gridX)) ||
                    (i !== left.gridX && i !== right.gridX)) {
                    collection.push(grid);
                }
            }
            for (var i = top.gridY; i <= bottom.gridY; i++) {
                grid = this.gridCollection[top.gridX][i];
                if (((grid.nodeId.length === 1 && (i === top.gridY || i === bottom.gridY)) ||
                    (i !== top.gridY && i !== bottom.gridY)) && collection.indexOf(grid) === -1) {
                    collection.push(grid);
                }
            }
        }
        else {
            collection.push((isSource) ? this.startGrid : this.targetGrid);
        }
    };
    LineRouting.prototype.checkObstacles = function (connector) {
        var neigbours = this.findNearestNeigbours(this.startGrid, this.gridCollection, true);
        if (neigbours.length === 0) {
            if (connector.sourcePortID !== '') {
                var endPoint = { x: connector.sourcePortWrapper.offsetX, y: connector.sourcePortWrapper.offsetY };
                var portDirection = getPortDirection(endPoint, undefined, connector.sourceWrapper.bounds, false);
                if (portDirection === 'Top') {
                    this.resetGridColl(this.startGrid, 'top', true);
                }
                else if (portDirection === 'Right') {
                    this.resetGridColl(this.startGrid, 'right', true);
                }
                else if (portDirection === 'Bottom') {
                    this.resetGridColl(this.startGrid, 'bottom', true);
                }
                else {
                    this.resetGridColl(this.startGrid, 'left', true);
                }
            }
            else {
                this.resetGridColl(this.startGrid, 'top', true);
                this.resetGridColl(this.startGrid, 'right', true);
                this.resetGridColl(this.startGrid, 'bottom', true);
                this.resetGridColl(this.startGrid, 'left', true);
            }
        }
        neigbours = this.findNearestNeigbours(this.targetGrid, this.gridCollection, false);
        if (neigbours.length === 0) {
            if (connector.targetPortID !== '') {
                var endPoint = { x: connector.targetPortWrapper.offsetX, y: connector.targetPortWrapper.offsetY };
                var portDirection = getPortDirection(endPoint, undefined, connector.targetWrapper.bounds, false);
                if (portDirection === 'Top') {
                    this.resetGridColl(this.targetGrid, 'top', true);
                }
                else if (portDirection === 'Right') {
                    this.resetGridColl(this.targetGrid, 'right', true);
                }
                else if (portDirection === 'Bottom') {
                    this.resetGridColl(this.targetGrid, 'bottom', true);
                }
                else {
                    this.resetGridColl(this.targetGrid, 'left', true);
                }
            }
            else {
                this.resetGridColl(this.targetGrid, 'top', false);
                this.resetGridColl(this.targetGrid, 'right', false);
                this.resetGridColl(this.targetGrid, 'bottom', false);
                this.resetGridColl(this.targetGrid, 'left', false);
            }
        }
    };
    // Get all the intermediated points from target grid
    LineRouting.prototype.getIntermediatePoints = function (target) {
        var distance;
        this.intermediatePoints = [];
        while (target) {
            this.intermediatePoints.push({ x: target.gridX, y: target.gridY });
            target = target.parent;
        }
        this.intermediatePoints.reverse();
        if (this.intermediatePoints[0].x === this.intermediatePoints[1].x) {
            if (this.intermediatePoints[0].y < this.intermediatePoints[1].y) {
                distance = this.neigbour(this.startGrid, 'bottom', undefined, true);
                this.intermediatePoints[0].y += distance - 1;
            }
            else {
                distance = this.neigbour(this.startGrid, 'top', undefined, true);
                this.intermediatePoints[0].y -= distance - 1;
            }
        }
        else {
            if (this.intermediatePoints[0].x < this.intermediatePoints[1].x) {
                distance = this.neigbour(this.startGrid, 'right', undefined, true);
                this.intermediatePoints[0].x += distance - 1;
            }
            else {
                distance = this.neigbour(this.startGrid, 'left', undefined, true);
                this.intermediatePoints[0].x -= distance - 1;
            }
        }
    };
    // Connector rendering
    LineRouting.prototype.updateConnectorSegments = function (diagram, intermediatePoints, gridCollection, connector, isUpdate) {
        var segments = [];
        var seg;
        var targetPoint;
        var pointX;
        var pointY;
        var node;
        var points = [];
        var direction;
        var length;
        var currentdirection;
        var prevDirection;
        var targetWrapper = connector.targetWrapper;
        var sourceWrapper = connector.sourceWrapper;
        var sourcePoint = this.findEndPoint(connector, true);
        if (connector.targetPortID !== '' || !connector.targetWrapper) {
            targetPoint = this.findEndPoint(connector, false);
        }
        for (var i = 0; i < intermediatePoints.length; i++) {
            node = gridCollection[intermediatePoints[i].x][intermediatePoints[i].y];
            pointX = node.x + node.width / 2;
            pointY = node.y + node.height / 2;
            points.push({ x: pointX, y: pointY });
            if (i >= 1) {
                if (points[points.length - 2].x !== points[points.length - 1].x) {
                    currentdirection = (points[points.length - 2].x > points[points.length - 1].x) ? 'Left' : 'Right';
                }
                else {
                    currentdirection = (points[points.length - 2].y > points[points.length - 1].y) ? 'Top' : 'Bottom';
                }
            }
            if (i >= 2 && prevDirection === currentdirection) {
                points.splice(points.length - 2, 1);
            }
            prevDirection = currentdirection;
        }
        for (var j = 0; j < points.length - 1; j++) {
            if (points[j].x !== points[j + 1].x) {
                if (j === 0 && sourceWrapper) {
                    sourcePoint = (points[j].x > points[j + 1].x) ? sourceWrapper.bounds.middleLeft : sourceWrapper.bounds.middleRight;
                }
                if (j === points.length - 2 && connector.targetPortID === '' && targetWrapper) {
                    targetPoint = (points[j].x > points[j + 1].x) ? targetWrapper.bounds.middleRight : targetWrapper.bounds.middleLeft;
                }
                if (j === 0 && sourcePoint) {
                    points[j].x = sourcePoint.x;
                    points[j].y = points[j + 1].y = sourcePoint.y;
                }
                if (j === points.length - 2 && targetPoint) {
                    points[j + 1].x = targetPoint.x;
                    points[j].y = points[j + 1].y = targetPoint.y;
                }
            }
            else {
                if (j === 0 && sourceWrapper) {
                    sourcePoint = (points[j].y > points[j + 1].y) ? sourceWrapper.bounds.topCenter : sourceWrapper.bounds.bottomCenter;
                }
                if (j === points.length - 2 && connector.targetPortID === '' && targetWrapper) {
                    targetPoint = (points[j].y > points[j + 1].y) ? targetWrapper.bounds.bottomCenter : targetWrapper.bounds.topCenter;
                }
                if (j === 0 && sourcePoint) {
                    points[j].y = sourcePoint.y;
                    points[j].x = points[j + 1].x = sourcePoint.x;
                }
                if (j === points.length - 2 && targetPoint) {
                    points[j + 1].y = targetPoint.y;
                    points[j].x = points[j + 1].x = targetPoint.x;
                }
            }
        }
        for (var j = 0; j < points.length - 1; j++) {
            if (points[j].x !== points[j + 1].x) {
                if (points[j].x > points[j + 1].x) {
                    direction = 'Left';
                    length = points[j].x - points[j + 1].x;
                }
                else {
                    direction = 'Right';
                    length = points[j + 1].x - points[j].x;
                }
            }
            else {
                if (points[j].y > points[j + 1].y) {
                    direction = 'Top';
                    length = points[j].y - points[j + 1].y;
                }
                else {
                    direction = 'Bottom';
                    length = points[j + 1].y - points[j].y;
                }
            }
            seg = { type: 'Orthogonal', length: length, direction: direction };
            segments.push(seg);
        }
        var lastSeg = segments[segments.length - 1];
        if (segments.length === 1) {
            lastSeg.length -= 20;
        }
        if (lastSeg.length < 10 && segments.length === 2) {
            segments.pop();
            segments[0].length -= 20;
            lastSeg = segments[0];
        }
        if (((lastSeg.direction === 'Top' || lastSeg.direction === 'Bottom') && lastSeg.length > connector.targetDecorator.height + 1) ||
            ((lastSeg.direction === 'Right' || lastSeg.direction === 'Left') && lastSeg.length > connector.targetDecorator.width + 1)) {
            connector.segments = segments;
            if (isUpdate) {
                diagram.connectorPropertyChange(connector, {}, { type: 'Orthogonal', segments: segments });
            }
            return true;
        }
        return false;
    };
    // Shortest path
    LineRouting.prototype.findPath = function (startGrid) {
        var intermediatePoint;
        var collection = [];
        var neigbours = this.findNearestNeigbours(startGrid, this.gridCollection, true);
        for (var i = 0; i < neigbours.length; i++) {
            intermediatePoint = this.findIntermediatePoints(neigbours[i].gridX, neigbours[i].gridY, startGrid.gridX, startGrid.gridY, this.targetGrid.gridX, this.targetGrid.gridY);
            if (intermediatePoint !== null) {
                var grid = this.gridCollection[intermediatePoint.x][intermediatePoint.y];
                var h = this.octile(Math.abs(intermediatePoint.x - startGrid.gridX), Math.abs(intermediatePoint.y - startGrid.gridY));
                var l = startGrid.previousDistance + h;
                if ((!grid.previousDistance || grid.previousDistance > l) &&
                    (!(intermediatePoint.x === startGrid.gridX && intermediatePoint.y === startGrid.gridY))) {
                    collection.push(intermediatePoint);
                    grid.previousDistance = l;
                    grid.afterDistance = grid.afterDistance || this.manhattan(Math.abs(intermediatePoint.x - this.targetGrid.gridX), Math.abs(intermediatePoint.y - this.targetGrid.gridY));
                    grid.totalDistance = grid.previousDistance + grid.afterDistance;
                    grid.parent = startGrid;
                }
            }
        }
        if (collection.length > 0) {
            for (var i = 0; i < collection.length; i++) {
                var grid = this.gridCollection[collection[i].x][collection[i].y];
                if (this.startArray.indexOf(grid) === -1) {
                    this.startArray.push(grid);
                }
            }
        }
        this.sorting(this.startArray);
    };
    // sorting the array based on total distance between source and target node
    LineRouting.prototype.sorting = function (array) {
        var done = false;
        while (!done) {
            done = true;
            for (var i = 1; i < array.length; i += 1) {
                if (array[i - 1].totalDistance < array[i].totalDistance) {
                    done = false;
                    var tmp = array[i - 1];
                    array[i - 1] = array[i];
                    array[i] = tmp;
                }
            }
        }
        return array;
    };
    LineRouting.prototype.octile = function (t, e) {
        var r = Math.SQRT2 - 1;
        return e > t ? r * t + e : r * e + t;
    };
    LineRouting.prototype.manhattan = function (t, e) {
        return t + e;
    };
    // Find the nearest neigbour from the current boundaries, the neigbour is use to find next intermdiate point.
    LineRouting.prototype.findNearestNeigbours = function (startGrid, gridCollection, isSource) {
        var neigbours = [];
        var parent = startGrid.parent;
        if (parent) {
            var dx = (startGrid.gridX - parent.gridX) / Math.max(Math.abs(startGrid.gridX - parent.gridX), 1);
            var dy = (startGrid.gridY - parent.gridY) / Math.max(Math.abs(startGrid.gridY - parent.gridY), 1);
            if (dx !== 0) {
                if (this.isWalkable(startGrid.gridX, startGrid.gridY - 1, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX][startGrid.gridY - 1]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX][startGrid.gridY - 1]);
                }
                if (this.isWalkable(startGrid.gridX, startGrid.gridY + 1, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX][startGrid.gridY + 1])) {
                    neigbours.push(gridCollection[startGrid.gridX][startGrid.gridY + 1]);
                }
                if (this.isWalkable(startGrid.gridX + dx, startGrid.gridY, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX + dx][startGrid.gridY]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX + dx][startGrid.gridY]);
                }
            }
            else if (dy !== 0) {
                if (this.isWalkable(startGrid.gridX - 1, startGrid.gridY, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX - 1][startGrid.gridY]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX - 1][startGrid.gridY]);
                }
                if (this.isWalkable(startGrid.gridX + 1, startGrid.gridY, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX + 1][startGrid.gridY]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX + 1][startGrid.gridY]);
                }
                if (this.isWalkable(startGrid.gridX, startGrid.gridY + dy, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX][startGrid.gridY + dy]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX][startGrid.gridY + dy]);
                }
            }
        }
        else {
            this.neigbour(startGrid, 'top', neigbours, isSource);
            this.neigbour(startGrid, 'right', neigbours, isSource);
            this.neigbour(startGrid, 'bottom', neigbours, isSource);
            this.neigbour(startGrid, 'left', neigbours, isSource);
        }
        return neigbours;
    };
    LineRouting.prototype.neigbour = function (startGrid, direction, neigbours, isSource) {
        var i = 1;
        var nearGrid;
        while (i > 0) {
            var x = (direction === 'top' || direction === 'bottom') ?
                (startGrid.gridX) : ((direction === 'left') ? startGrid.gridX - i : startGrid.gridX + i);
            var y = (direction === 'right' || direction === 'left') ?
                (startGrid.gridY) : ((direction === 'top') ? startGrid.gridY - i : startGrid.gridY + i);
            nearGrid = this.gridCollection[x][y];
            if (nearGrid && ((isSource && this.sourceGridCollection.indexOf(nearGrid) === -1)
                || (!isSource && this.targetGridCollection.indexOf(nearGrid) === -1))) {
                if (neigbours && this.isWalkable(x, y)) {
                    neigbours.push(nearGrid);
                }
                return i;
            }
            if (x > 0 && y > 0) {
                i++;
            }
            else {
                break;
            }
        }
        return null;
    };
    LineRouting.prototype.resetGridColl = function (grid, direction, isSource) {
        var i = 1;
        var nearGrid;
        while (i > 0) {
            var x = (direction === 'top' || direction === 'bottom') ?
                (grid.gridX) : ((direction === 'left') ? grid.gridX - i : grid.gridX + i);
            var y = (direction === 'right' || direction === 'left') ?
                (grid.gridY) : ((direction === 'top') ? grid.gridY - i : grid.gridY + i);
            nearGrid = this.gridCollection[x][y];
            if (nearGrid && ((isSource && this.sourceGridCollection.indexOf(nearGrid) === -1) ||
                (!isSource && this.targetGridCollection.indexOf(nearGrid) === -1))) {
                if (this.isWalkable(x, y)) {
                    break;
                }
                else {
                    var grid_1 = this.gridCollection[x][y];
                    grid_1.nodeId = [];
                    grid_1.walkable = true;
                }
            }
            if (x > 0 && y > 0) {
                i++;
            }
            else {
                break;
            }
        }
        return null;
    };
    LineRouting.prototype.isWalkable = function (x, y, isparent) {
        if (x >= 0 && x < this.noOfRows && y >= 0 && y < this.noOfCols) {
            var grid = this.gridCollection[x][y];
            if (grid && (grid.walkable || (grid.nodeId.length === 1 &&
                (this.sourceGridCollection.indexOf(grid) !== -1 || this.targetGridCollection.indexOf(grid) !== -1)))) {
                if ((isparent && !grid.parent) || !isparent) {
                    return true;
                }
            }
        }
        return false;
    };
    LineRouting.prototype.findIntermediatePoints = function (neigbourGridX, neigbourGridY, startGridX, startGridY, endGridX, endGridY) {
        var dx = neigbourGridX - startGridX;
        var dy = neigbourGridY - startGridY;
        var gridX = neigbourGridX;
        var gridY = neigbourGridY;
        for (var i = 0; i < this.targetGridCollection.length; i++) {
            if (neigbourGridX === this.targetGridCollection[i].gridX && neigbourGridY === this.targetGridCollection[i].gridY) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
        }
        if (!this.isWalkable(neigbourGridX, neigbourGridY)) {
            return null;
        }
        var neigbourGrid = this.gridCollection[neigbourGridX][neigbourGridY];
        if (neigbourGrid.tested) {
            return { x: neigbourGridX, y: neigbourGridY };
        }
        neigbourGrid.tested = true;
        if (dx !== 0) {
            dx = (dx > 0) ? 1 : -1;
            if ((this.isWalkable(gridX, gridY - 1) && !this.isWalkable(gridX - dx, gridY - 1)) ||
                (this.isWalkable(gridX, gridY + 1) && !this.isWalkable(gridX - dx, gridY + 1))) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
        }
        if (dy !== 0) {
            dy = (dy > 0) ? 1 : -1;
            if ((this.isWalkable(gridX - 1, gridY) && !this.isWalkable(gridX - 1, gridY - dy)) ||
                (this.isWalkable(gridX + 1, gridY) && !this.isWalkable(gridX + 1, gridY - dy))) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
            if (this.findIntermediatePoints(gridX + 1, gridY, gridX, gridY, endGridX, endGridY) ||
                this.findIntermediatePoints(gridX - 1, gridY, gridX, gridY, endGridX, endGridY)) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
        }
        return this.findIntermediatePoints(gridX + dx, gridY + dy, gridX, gridY, endGridX, endGridY);
    };
    /**
     * To destroy the line routing module
     * @return {void}
     * @private
     */
    LineRouting.prototype.destroy = function () {
        /**
         * Destroys the line routing module
         */
    };
    /**
     * Get module name.
     */
    LineRouting.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'LineRouting';
    };
    return LineRouting;
}());
export { LineRouting };
