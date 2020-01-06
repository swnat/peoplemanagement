import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import * as cls from '../base/css-constants';
/**
 * File for handling taskbar editing tooltip in Gantt.
 */
var EditTooltip = /** @class */ (function () {
    function EditTooltip(gantt, taskbarEdit) {
        this.parent = gantt;
        this.taskbarEdit = taskbarEdit;
    }
    /**
     * To create tooltip.
     * @return {void}
     * @private
     */
    EditTooltip.prototype.createTooltip = function (opensOn, mouseTrail, target) {
        var _this = this;
        this.toolTipObj = new Tooltip({
            opensOn: opensOn,
            content: this.getTooltipText(),
            position: 'TopRight',
            mouseTrail: mouseTrail,
            cssClass: cls.ganttTooltip,
            target: target ? target : null,
            animation: { open: { effect: 'None' }, close: { effect: 'None' } }
        });
        this.toolTipObj.beforeRender = function (args) {
            var argsData = {
                data: _this.taskbarEdit.taskBarEditRecord,
                args: args,
                content: _this.toolTipObj.content
            };
            _this.parent.trigger('beforeTooltipRender', argsData);
        };
        this.toolTipObj.isStringTemplate = true;
        this.toolTipObj.appendTo(this.parent.chartPane);
    };
    /**
     * To show/hide taskbar edit tooltip.
     * @return {void}
     * @private
     */
    EditTooltip.prototype.showHideTaskbarEditTooltip = function (bool) {
        if (bool) {
            this.createTooltip('Custom', false);
            this.parent.tooltipModule.toolTipObj.close();
            this.updateTooltip();
            if (this.taskbarEdit.connectorSecondAction === 'ConnectorPointLeftDrag') {
                this.toolTipObj.open(this.taskbarEdit.connectorSecondElement.querySelector('.' + cls.connectorPointLeft));
            }
            else if (this.taskbarEdit.connectorSecondAction === 'ConnectorPointRightDrag') {
                this.toolTipObj.open(this.taskbarEdit.connectorSecondElement.querySelector('.' + cls.connectorPointRight));
            }
            else {
                this.toolTipObj.open(this.taskbarEdit.taskBarEditElement);
            }
        }
        else if (!isNullOrUndefined(this.toolTipObj)) {
            this.toolTipObj.destroy();
            this.toolTipObj = null;
        }
    };
    /**
     * To update tooltip content and position.
     * @return {void}
     * @private
     */
    EditTooltip.prototype.updateTooltip = function () {
        if (!isNullOrUndefined(this.toolTipObj)) {
            if (this.taskbarEdit.taskBarEditAction === 'ConnectorPointLeftDrag' ||
                this.taskbarEdit.taskBarEditAction === 'ConnectorPointRightDrag') {
                this.toolTipObj.content = this.getTooltipText();
                this.toolTipObj.offsetY = -3;
            }
            else {
                this.toolTipObj.content = this.getTooltipText();
                this.toolTipObj.refresh(this.taskbarEdit.taskBarEditElement);
                if (this.taskbarEdit.taskBarEditAction === 'LeftResizing') {
                    this.toolTipObj.offsetX = -this.taskbarEdit.taskBarEditRecord.ganttProperties.width;
                }
                else if (this.taskbarEdit.taskBarEditAction === 'RightResizing') {
                    this.toolTipObj.offsetX = 0;
                }
                else if (this.taskbarEdit.taskBarEditAction === 'ProgressResizing') {
                    this.toolTipObj.offsetX = -(this.taskbarEdit.taskBarEditRecord.ganttProperties.width -
                        this.taskbarEdit.taskBarEditRecord.ganttProperties.progressWidth);
                }
                else if (this.taskbarEdit.taskBarEditAction === 'MilestoneDrag') {
                    this.toolTipObj.offsetX = -(this.parent.chartRowsModule.milestoneHeight / 2);
                }
                else if (this.taskbarEdit.taskBarEditRecord.ganttProperties.width > 5) {
                    this.toolTipObj.offsetX = -(this.taskbarEdit.taskBarEditRecord.ganttProperties.width +
                        this.taskbarEdit.taskBarEditRecord.ganttProperties.left -
                        this.taskbarEdit.tooltipPositionX);
                }
            }
        }
    };
    /**
     * To get updated tooltip text.
     * @return {void}
     * @private
     */
    EditTooltip.prototype.getTooltipText = function () {
        var tooltipString = '';
        var instance = this.parent.globalize;
        var editRecord = this.taskbarEdit.taskBarEditRecord.ganttProperties;
        if (this.parent.tooltipSettings.editing) {
            var templateNode = this.parent.tooltipModule.templateCompiler(this.parent.tooltipSettings.editing, this.parent, editRecord, 'TooltipEditingTemplate');
            tooltipString = templateNode[0];
        }
        else {
            switch (this.taskbarEdit.taskBarEditAction) {
                case 'ProgressResizing':
                    tooltipString = this.parent.localeObj.getConstant('progress') + ' : ' + editRecord.progress;
                    break;
                case 'LeftResizing':
                    tooltipString = this.parent.localeObj.getConstant('startDate') + ' : ';
                    tooltipString += instance.formatDate(editRecord.startDate, { format: this.parent.dateFormat });
                    tooltipString += '<br/>' + this.parent.localeObj.getConstant('duration') + ' : ' +
                        this.parent.getDurationString(editRecord.duration, editRecord.durationUnit);
                    break;
                case 'RightResizing':
                    tooltipString = this.parent.localeObj.getConstant('endDate') + ' : ';
                    tooltipString += instance.formatDate(editRecord.endDate, { format: this.parent.dateFormat });
                    tooltipString += '<br/>' + this.parent.localeObj.getConstant('duration') + ' : ' +
                        this.parent.getDurationString(editRecord.duration, editRecord.durationUnit);
                    break;
                case 'ChildDrag':
                case 'ParentDrag':
                case 'MilestoneDrag':
                    if (!isNullOrUndefined(this.taskbarEdit.taskBarEditRecord.ganttProperties.startDate)) {
                        tooltipString = this.parent.localeObj.getConstant('startDate') + ' : ';
                        tooltipString += instance.formatDate(editRecord.startDate, { format: this.parent.dateFormat });
                    }
                    if (!isNullOrUndefined(this.taskbarEdit.taskBarEditRecord.ganttProperties.endDate)) {
                        tooltipString += tooltipString === '' ? '' : '<br/>';
                        tooltipString += this.parent.localeObj.getConstant('endDate') + ' : ' + instance.formatDate(editRecord.endDate, { format: this.parent.dateFormat });
                    }
                    break;
                case 'ConnectorPointLeftDrag':
                case 'ConnectorPointRightDrag':
                    tooltipString = this.parent.connectorLineModule.tooltipTable;
                    if (isNullOrUndefined(this.toolTipObj)) {
                        this.parent.connectorLineModule.tooltipTable.innerHTML =
                            this.parent.connectorLineModule.getConnectorLineTooltipInnerTd(this.parent.editModule.taskbarEditModule.taskBarEditRecord.ganttProperties.taskName, this.parent.editModule.taskbarEditModule.fromPredecessorText, '', '');
                    }
                    break;
            }
        }
        return tooltipString;
    };
    return EditTooltip;
}());
export { EditTooltip };
