import { Component, L10n } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, EmitType } from '@syncfusion/ej2-base';
import { RenderingMode, DataMatrixEncoding, DataMatrixSize } from '../barcode/enum/enum';
import { DisplayTextModel } from '../barcode/primitives/displaytext-model';
import { MarginModel } from '../barcode/primitives/margin-model';
import { DataMatrixGeneratorModel } from './datamatrix-model';
/**
 * Represents the Datamatrix control
 * ```
 */
export declare class DataMatrixGenerator extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Defines encoding type of the DataMatrix.
     * @default 'Auto'
     */
    encoding: DataMatrixEncoding;
    /**
     * Defines encoding type of the DataMatrix.
     * @default 'Auto'
     */
    size: DataMatrixSize;
    /**
     * Defines the DataMatrix rendering mode.
     * * SVG - Renders the bar-code objects as SVG elements
     * * Canvas - Renders the bar-code in a canvas
     * @default 'SVG'
     */
    mode: RenderingMode;
    /**
     * Defines the value of the DataMatrix to be rendered.
     * @default undefined
     */
    value: string;
    /**
     * Defines the height of the DataMatrix.
     * @default '100%'
     */
    height: string | number;
    /**
     * Defines the width of the DataMatrix.
     * @default '100%'
     */
    width: string | number;
    /**
     * Defines the text properties for the DataMatrix.
     * @default ''
     */
    displayText: DisplayTextModel;
    /**
     * Defines the margin properties for the DataMatrix.
     * @default ''
     */
    margin: MarginModel;
    /**
     * Defines the background color of the DataMatrix.
     * @default 'white'
     */
    backgroundColor: string;
    /**
     * Triggers if we entered any invalid character
     * @event
     */
    invalid: EmitType<Object>;
    /**
     * Defines the forecolor of the DataMatrix.
     * @default 'black'
     */
    foreColor: string;
    /**
     * Defines the xDimension of the DataMatrix.
     */
    xDimension: number;
    /** @private */
    private barcodeRenderer;
    private barcodeCanvas;
    /** @private */
    localeObj: L10n;
    /** @private */
    private defaultLocale;
    /**
     * Destroys the the data matrix generator
     */
    destroy(): void;
    private initializePrivateVariables;
    /**
     * Constructor for creating the widget
     */
    constructor(options?: DataMatrixGeneratorModel, element?: HTMLElement | string);
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}
     */
    getPersistData(): string;
    /**
     * Returns the module name of the the data matrix generator
     */
    getModuleName(): string;
    private setCulture;
    private getElementSize;
    private initialize;
    private triggerEvent;
    protected preRender(): void;
    onPropertyChanged(newProp: DataMatrixGeneratorModel, oldProp: DataMatrixGeneratorModel): void;
    private checkdata;
    private renderElements;
    /**
     * Renders the barcode control with nodes and connectors
     */
    render(): void;
}
