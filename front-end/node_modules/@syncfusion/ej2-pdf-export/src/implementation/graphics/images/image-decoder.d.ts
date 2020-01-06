/**
 * ImageDecoder class
 */
import { ByteArray } from './byte-array';
import { PdfStream } from './../../primitives/pdf-stream';
/**
 * Specifies the image `format`.
 * @private
 */
export declare enum ImageFormat {
    /**
     * Specifies the type of `Unknown`.
     * @hidden
     * @private
     */
    Unknown = 0,
    /**
     * Specifies the type of `Bmp`.
     * @hidden
     * @private
     */
    Bmp = 1,
    /**
     * Specifies the type of `Emf`.
     * @hidden
     * @private
     */
    Emf = 2,
    /**
     * Specifies the type of `Gif`.
     * @hidden
     * @private
     */
    Gif = 3,
    /**
     * Specifies the type of `Jpeg`.
     * @hidden
     * @private
     */
    Jpeg = 4,
    /**
     * Specifies the type of `Png`.
     * @hidden
     * @private
     */
    Png = 5,
    /**
     * Specifies the type of `Wmf`.
     * @hidden
     * @private
     */
    Wmf = 6,
    /**
     * Specifies the type of `Icon`.
     * @hidden
     * @private
     */
    Icon = 7
}
/**
 * `Decode the image stream`.
 * @private
 */
export declare class ImageDecoder {
    /**
     * Number array for `png header`.
     * @hidden
     * @private
     */
    private static mPngHeader;
    /**
     * Number Array for `jpeg header`.
     * @hidden
     * @private
     */
    private static mJpegHeader;
    /**
     * Number array for `gif header`.
     * @hidden
     * @private
     */
    private static GIF_HEADER;
    /**
     * Number array for `bmp header.`
     * @hidden
     * @private
     */
    private static BMP_HEADER;
    /**
     * `memory stream` to store image data.
     * @hidden
     * @private
     */
    private mStream;
    /**
     * Specifies `format` of image.
     * @hidden
     * @private
     */
    private mFormat;
    /**
     * `Height` of image.
     * @hidden
     * @private
     */
    private mHeight;
    /**
     * `Width` of image.
     * @hidden
     * @private
     */
    private mWidth;
    /**
     * `Bits per component`.
     * @default 8
     * @hidden
     * @private
     */
    private mbitsPerComponent;
    /**
     * ByteArray to store `image data`.
     * @hidden
     * @private
     */
    private mImageData;
    /**
     * Store an instance of `PdfStream` for an image.
     * @hidden
     * @private
     */
    private imageStream;
    /**
     * Internal variable for accessing fields from `DictionryProperties` class.
     * @hidden
     * @private
     */
    private dictionaryProperties;
    /**
     * Initialize the new instance for `image-decoder` class.
     * @private
     */
    constructor(stream: ByteArray);
    /**
     * Gets the `height` of image.
     * @hidden
     * @private
     */
    readonly height: number;
    /**
     * Gets the `width` of image.
     * @hidden
     * @private
     */
    readonly width: number;
    /**
     * Gets `bits per component`.
     * @hidden
     * @private
     */
    readonly bitsPerComponent: number;
    /**
     * Gets the `size` of an image data.
     * @hidden
     * @private
     */
    readonly size: number;
    /**
     * Gets the value of an `image data`.
     * @hidden
     * @private
     */
    readonly imageData: ByteArray;
    /**
     * Gets the value of an `image data as number array`.
     * @hidden
     * @private
     */
    readonly imageDataAsNumberArray: ArrayBuffer;
    /**
     * `Initialize` image data and image stream.
     * @hidden
     * @private
     */
    private initialize;
    /**
     * `Reset` stream position into 0.
     * @hidden
     * @private
     */
    private reset;
    /**
     * `Parse` Jpeg image.
     * @hidden
     * @private
     */
    private parseJpegImage;
    /**
     * Gets the image `format`.
     * @private
     * @hidden
     */
    readonly format: ImageFormat;
    /**
     * `Checks if JPG`.
     * @private
     * @hidden
     */
    private checkIfJpeg;
    /**
     * Return image `dictionary`.
     * @hidden
     * @private
     */
    getImageDictionary(): PdfStream;
    /**
     * Return `colorSpace` of an image.
     * @hidden
     * @private
     */
    private getColorSpace;
    /**
     * Return `decode parameters` of an image.
     * @hidden
     * @private
     */
    private getDecodeParams;
}
