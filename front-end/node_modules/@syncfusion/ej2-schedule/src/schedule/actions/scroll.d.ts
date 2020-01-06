import { Schedule } from '../base/schedule';
/**
 * `Scroll` module
 */
export declare class Scroll {
    private parent;
    /**
     * Constructor for the scrolling.
     * @hidden
     */
    constructor(parent?: Schedule);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * @hidden
     */
    setWidth(): void;
    /**
     * @hidden
     */
    setHeight(): void;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * @hidden
     */
    private setDimensions;
    /**
     * @hidden
     */
    private onPropertyChanged;
    /**
     * @hidden
     */
    destroy(): void;
}
