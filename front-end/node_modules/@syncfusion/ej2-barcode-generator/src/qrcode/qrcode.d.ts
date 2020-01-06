import { Component, INotifyPropertyChanged, L10n, EmitType } from '@syncfusion/ej2-base';
import { ErrorCorrectionLevel, QRCodeVersion, RenderingMode } from '../barcode/enum/enum';
import { DisplayTextModel } from '../barcode/primitives/displaytext-model';
import { MarginModel } from '../barcode/primitives/margin-model';
import { QRCodeGeneratorModel } from './qrcode-model';
/**
 * Represents the Qrcode control
 * ```
 */
export declare class QRCodeGenerator extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Constructor for creating the widget
     */
    constructor(options?: QRCodeGeneratorModel, element?: HTMLElement | string);
    /**
     * Defines the height of the QR code model.
     * @default '100%'
     */
    height: string | number;
    /**
     * Defines the width of the QR code model.
     * @default '100%'
     */
    width: string | number;
    /**
     * Defines the QR code rendering mode.
     * * SVG - Renders the bar-code objects as SVG elements
     * * Canvas - Renders the bar-code in a canvas
     * @default 'SVG'
     */
    mode: RenderingMode;
    /**
     * Defines the xDimension of the QR code model.
     */
    xDimension: number;
    /**
     * Defines the error correction level of the QR code.
     * @blazorDefaultValueIgnore
     * @aspDefaultValueIgnore
     * @aspNumberEnum
     * @blazorNumberEnum
     * @default undefined
     */
    errorCorrectionLevel: ErrorCorrectionLevel;
    /**
     * Defines the margin properties for the QR code.
     * @default ''
     */
    margin: MarginModel;
    /**
     * Defines the background color of the QR code.
     * @default 'white'
     */
    backgroundColor: string;
    /**
     * Triggers if you enter any invalid character.
     * @event
     */
    invalid: EmitType<Object>;
    /**
     * Defines the forecolor of the QR code.
     * @default 'black'
     */
    foreColor: string;
    /**
     * Defines the text properties for the QR code.
     * @default ''
     */
    displayText: DisplayTextModel;
    /**
     * * Defines the version of the QR code.
     * @aspDefaultValueIgnore
     * @blazorNumberEnum
     * @blazorDefaultValueIgnore
     * @aspNumberEnum
     * @default undefined
     */
    version: QRCodeVersion;
    private widthChange;
    private heightChange;
    private isSvgMode;
    private barcodeRenderer;
    /**
     * Defines the type of barcode to be rendered.
     * @default undefined
     */
    value: string;
    /** @private */
    localeObj: L10n;
    /** @private */
    private defaultLocale;
    private barcodeCanvas;
    /**
     * Renders the barcode control with nodes and connectors
     */
    render(): void;
    private triggerEvent;
    private renderElements;
    private setCulture;
    private getElementSize;
    private initialize;
    protected preRender(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}
     */
    getPersistData(): string;
    /**
     * Returns the module name of the barcode
     */
    getModuleName(): string;
    /**
     * Destroys the barcode control
     */
    destroy(): void;
    private initializePrivateVariables;
    onPropertyChanged(newProp: QRCodeGeneratorModel, oldProp: QRCodeGeneratorModel): void;
}
