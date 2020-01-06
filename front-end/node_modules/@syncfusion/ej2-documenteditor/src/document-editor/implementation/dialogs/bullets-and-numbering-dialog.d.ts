import { LayoutViewer } from '../index';
import { L10n } from '@syncfusion/ej2-base';
import { WAbstractList } from '../list/abstract-list';
import { WListFormat } from '../../implementation/format/list-format';
/**
 * The Bullets and Numbering dialog is used to apply list format for a paragraph style.
 */
export declare class BulletsAndNumberingDialog {
    private owner;
    private target;
    private isBullet;
    private symbol;
    private fontFamily;
    private numberFormat;
    private listLevelPattern;
    private listFormat;
    private abstractList;
    private tabObj;
    /**
     * @private
     */
    numberListDiv: HTMLElement;
    /**
     * @private
     */
    bulletListDiv: HTMLElement;
    /**
     * @private
     */
    constructor(layoutViewer: LayoutViewer);
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * @private
     */
    initNumberingBulletDialog(locale: L10n): void;
    private onTabSelect;
    private createNumberList;
    private createNumberListTag;
    private createNumberNoneListTag;
    private createBulletListTag;
    private createBulletList;
    /**
     * @private
     */
    showNumberBulletDialog(listFormat: WListFormat, abstractList: WAbstractList): void;
    /**
     * @private
     */
    numberListClick: (args: any) => void;
    private setActiveElement;
    /**
     * @private
     */
    bulletListClick: (args: any) => void;
    /**
     * @private
     */
    loadNumberingBulletDialog: () => void;
    /**
     * @private
     */
    closeNumberingBulletDialog: () => void;
    /**
     * @private
     */
    onCancelButtonClick: () => void;
    /**
     * @private
     */
    onOkButtonClick: () => void;
    /**
     * @private
     */
    unWireEventsAndBindings(): void;
    /**
     * @private
     */
    destroy(): void;
}
