/**
 * MarkdownSelection internal module
 * @hidden
 * @deprecated
 */
var MarkdownSelection = /** @class */ (function () {
    function MarkdownSelection() {
    }
    /**
     * markdown getLineNumber method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.getLineNumber = function (textarea, point) {
        return textarea.value.substr(0, point).split('\n').length;
    };
    /**
     * markdown getSelectedText method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.getSelectedText = function (textarea) {
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        return textarea.value.substring(start, end);
    };
    /**
     * markdown getAllParents method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.getAllParents = function (value) {
        return value.split('\n');
    };
    /**
     * markdown getSelectedLine method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.getSelectedLine = function (textarea) {
        var lines = this.getAllParents(textarea.value);
        var index = this.getLineNumber(textarea, textarea.selectionStart);
        return lines[index - 1];
    };
    /**
     * markdown getLine method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.getLine = function (textarea, index) {
        var lines = this.getAllParents(textarea.value);
        return lines[index];
    };
    /**
     * markdown getSelectedParentPoints method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.getSelectedParentPoints = function (textarea) {
        var lines = this.getAllParents(textarea.value);
        var start = this.getLineNumber(textarea, textarea.selectionStart);
        var end = this.getLineNumber(textarea, textarea.selectionEnd);
        var parents = this.getSelectedText(textarea).split('\n');
        var selectedPoints = [];
        var selectedLine = lines[start - 1];
        var startLength = lines.slice(0, start - 1).join('').length;
        var firstPoint = {};
        firstPoint.line = start - 1;
        firstPoint.start = startLength + firstPoint.line;
        firstPoint.end = selectedLine !== '' ? firstPoint.start +
            selectedLine.length + 1 : firstPoint.start + selectedLine.length;
        firstPoint.text = selectedLine;
        selectedPoints.push(firstPoint);
        if (parents.length > 1) {
            for (var i = 1; i < parents.length - 1; i++) {
                var points = {};
                points.line = selectedPoints[i - 1].line + 1;
                points.start = parents[i] !== '' ? selectedPoints[i - 1].end : selectedPoints[i - 1].end;
                points.end = points.start + parents[i].length + 1;
                points.text = parents[i];
                selectedPoints.push(points);
            }
            var lastPoint = {};
            lastPoint.line = selectedPoints[selectedPoints.length - 1].line + 1;
            lastPoint.start = selectedPoints[selectedPoints.length - 1].end;
            lastPoint.end = lastPoint.start + lines[end - 1].length + 1;
            lastPoint.text = lines[end - 1];
            selectedPoints.push(lastPoint);
        }
        return selectedPoints;
    };
    /**
     * markdown setSelection method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.setSelection = function (textarea, start, end) {
        textarea.setSelectionRange(start, end);
        textarea.focus();
    };
    /**
     * markdown save method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.save = function (start, end) {
        this.selectionStart = start;
        this.selectionEnd = end;
    };
    /**
     * markdown restore method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.restore = function (textArea) {
        this.setSelection(textArea, this.selectionStart, this.selectionEnd);
    };
    /**
     * markdown isStartWith method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.isStartWith = function (line, command) {
        var isStart = false;
        if (line) {
            var reg = line.trim() === command.trim() ?
                new RegExp('^(' + this.replaceSpecialChar(command.trim()) + ')', 'gim') :
                new RegExp('^(' + this.replaceSpecialChar(command) + ')', 'gim');
            isStart = reg.test(line.trim());
        }
        return isStart;
    };
    /**
     * markdown replaceSpecialChar method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.replaceSpecialChar = function (value) {
        return value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '\\$&');
    };
    /**
     * markdown isClear method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.isClear = function (parents, regex) {
        var isClear = false;
        for (var i = 0; i < parents.length; i++) {
            if (new RegExp(regex, 'gim').test(parents[i].text)) {
                return true;
            }
        }
        return isClear;
    };
    /**
     * markdown getSelectedInlinePoints method
     * @hidden
     * @deprecated
     */
    MarkdownSelection.prototype.getSelectedInlinePoints = function (textarea) {
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var selection = this.getSelectedText(textarea);
        return { start: start, end: end, text: selection };
    };
    return MarkdownSelection;
}());
export { MarkdownSelection };
