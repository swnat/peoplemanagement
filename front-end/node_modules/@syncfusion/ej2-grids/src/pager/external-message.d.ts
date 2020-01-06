import { Pager, IRender } from './pager';
/**
 * `ExternalMessage` module is used to display user provided message.
 */
export declare class ExternalMessage implements IRender {
    private element;
    private pagerModule;
    /**
     * Constructor for externalMessage module
     * @param  {Pager} pagerModule?
     * @returns defaultType
     * @hidden
     */
    constructor(pagerModule?: Pager);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * The function is used to render pager externalMessage
     * @hidden
     */
    render(): void;
    /**
     * Refreshes the external message of Pager.
     */
    refresh(): void;
    /**
     * Hides the external message of Pager.
     */
    hideMessage(): void;
    /**
     * Shows the external message of the Pager.
     */
    showMessage(): void;
    /**
     * To destroy the PagerMessage
     * @method destroy
     * @return {void}
     * @hidden
     */
    destroy(): void;
}
