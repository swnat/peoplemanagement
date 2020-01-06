/**
 * ImageDecoder class
 */
import { ByteArray } from './byte-array';
import { PdfStream } from './../../primitives/pdf-stream';
import { DictionaryProperties } from './../../input-output/pdf-dictionary-properties';
import { PdfName } from './../../primitives/pdf-name';
import { PdfNumber } from './../../primitives/pdf-number';
import { PdfBoolean } from './../../primitives/pdf-boolean';
import { PdfDictionary } from './../../primitives/pdf-dictionary';
/**
 * Specifies the image `format`.
 * @private
 */
export var ImageFormat;
(function (ImageFormat) {
    /**
     * Specifies the type of `Unknown`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Unknown"] = 0] = "Unknown";
    /**
     * Specifies the type of `Bmp`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Bmp"] = 1] = "Bmp";
    /**
     * Specifies the type of `Emf`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Emf"] = 2] = "Emf";
    /**
     * Specifies the type of `Gif`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Gif"] = 3] = "Gif";
    /**
     * Specifies the type of `Jpeg`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Jpeg"] = 4] = "Jpeg";
    /**
     * Specifies the type of `Png`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Png"] = 5] = "Png";
    /**
     * Specifies the type of `Wmf`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Wmf"] = 6] = "Wmf";
    /**
     * Specifies the type of `Icon`.
     * @hidden
     * @private
     */
    ImageFormat[ImageFormat["Icon"] = 7] = "Icon";
})(ImageFormat || (ImageFormat = {}));
/**
 * `Decode the image stream`.
 * @private
 */
var ImageDecoder = /** @class */ (function () {
    /**
     * Initialize the new instance for `image-decoder` class.
     * @private
     */
    function ImageDecoder(stream) {
        /**
         * Specifies `format` of image.
         * @hidden
         * @private
         */
        this.mFormat = ImageFormat.Unknown;
        /**
         * `Bits per component`.
         * @default 8
         * @hidden
         * @private
         */
        this.mbitsPerComponent = 8;
        /**
         * Internal variable for accessing fields from `DictionryProperties` class.
         * @hidden
         * @private
         */
        this.dictionaryProperties = new DictionaryProperties();
        this.mStream = stream;
        this.initialize();
    }
    Object.defineProperty(ImageDecoder.prototype, "height", {
        /**
         * Gets the `height` of image.
         * @hidden
         * @private
         */
        get: function () {
            return this.mHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageDecoder.prototype, "width", {
        /**
         * Gets the `width` of image.
         * @hidden
         * @private
         */
        get: function () {
            return this.mWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageDecoder.prototype, "bitsPerComponent", {
        /**
         * Gets `bits per component`.
         * @hidden
         * @private
         */
        get: function () {
            return this.mbitsPerComponent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageDecoder.prototype, "size", {
        /**
         * Gets the `size` of an image data.
         * @hidden
         * @private
         */
        get: function () {
            return this.mImageData.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageDecoder.prototype, "imageData", {
        /**
         * Gets the value of an `image data`.
         * @hidden
         * @private
         */
        get: function () {
            return this.mImageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageDecoder.prototype, "imageDataAsNumberArray", {
        /**
         * Gets the value of an `image data as number array`.
         * @hidden
         * @private
         */
        get: function () {
            return this.mImageData.internalBuffer.buffer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * `Initialize` image data and image stream.
     * @hidden
     * @private
     */
    ImageDecoder.prototype.initialize = function () {
        if (this.mFormat === ImageFormat.Unknown && this.checkIfJpeg()) {
            this.mFormat = ImageFormat.Jpeg;
            this.parseJpegImage();
        }
        this.reset();
        this.mImageData = new ByteArray(this.mStream.count);
        this.mStream.read(this.mImageData, 0, this.mImageData.count);
    };
    /**
     * `Reset` stream position into 0.
     * @hidden
     * @private
     */
    ImageDecoder.prototype.reset = function () {
        this.mStream.position = 0;
    };
    /**
     * `Parse` Jpeg image.
     * @hidden
     * @private
     */
    ImageDecoder.prototype.parseJpegImage = function () {
        this.reset();
        var imgData = new ByteArray(this.mStream.count);
        this.mStream.read(imgData, 0, imgData.count);
        var i = 4;
        /* tslint:disable */
        if (String.fromCharCode(imgData.getBuffer(i + 2)) === 'J' && String.fromCharCode(imgData.getBuffer(i + 3)) === 'F' && String.fromCharCode(imgData.getBuffer(i + 4)) === 'I' && String.fromCharCode(imgData.getBuffer(i + 5)) === 'F' && imgData.getBuffer(i + 6) === 0) {
            var length_1 = imgData.getBuffer(i) * 256 + imgData.getBuffer(i + 1);
            while (i + length_1 < imgData.count) {
                i += length_1;
                if (imgData.getBuffer(i + 1) === 192) {
                    this.mHeight = imgData.getBuffer(i + 5) * 256 + imgData.getBuffer(i + 6);
                    this.mWidth = imgData.getBuffer(i + 7) * 256 + imgData.getBuffer(i + 8);
                    return;
                }
                else {
                    i += 2;
                    length_1 = imgData.getBuffer(i) * 256 + imgData.getBuffer(i + 1);
                }
            }
        }
        /* tslint:enable */
    };
    Object.defineProperty(ImageDecoder.prototype, "format", {
        /**
         * Gets the image `format`.
         * @private
         * @hidden
         */
        get: function () {
            return this.mFormat;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * `Checks if JPG`.
     * @private
     * @hidden
     */
    ImageDecoder.prototype.checkIfJpeg = function () {
        this.reset();
        for (var i = 0; i < ImageDecoder.mJpegHeader.length; i++) {
            if (ImageDecoder.mJpegHeader[i] !== this.mStream.readByte(i)) {
                return false;
            }
            this.mStream.position++;
        }
        return true;
    };
    /**
     * Return image `dictionary`.
     * @hidden
     * @private
     */
    ImageDecoder.prototype.getImageDictionary = function () {
        if (this.mFormat === ImageFormat.Jpeg) {
            var tempArrayBuffer = this.imageData.internalBuffer.length;
            this.imageStream = new PdfStream();
            this.imageStream.isImage = true;
            var tempString = '';
            var decodedString = '';
            for (var i = 0; i < this.imageDataAsNumberArray.byteLength; i++) {
                tempString += String.fromCharCode(null, this.mStream.readByte(i));
            }
            for (var i = 0; i < tempString.length; i++) {
                if (i % 2 !== 0) {
                    decodedString += tempString[i];
                }
            }
            this.imageStream.data = [decodedString];
            this.imageStream.compress = false;
            this.imageStream.items.setValue(this.dictionaryProperties.type, new PdfName(this.dictionaryProperties.xObject));
            this.imageStream.items.setValue(this.dictionaryProperties.subtype, new PdfName(this.dictionaryProperties.image));
            this.imageStream.items.setValue(this.dictionaryProperties.width, new PdfNumber(this.width));
            this.imageStream.items.setValue(this.dictionaryProperties.height, new PdfNumber(this.height));
            this.imageStream.items.setValue(this.dictionaryProperties.bitsPerComponent, new PdfNumber(this.bitsPerComponent));
            this.imageStream.items.setValue(this.dictionaryProperties.filter, new PdfName(this.dictionaryProperties.dctdecode));
            this.imageStream.items.setValue(this.dictionaryProperties.colorSpace, new PdfName(this.getColorSpace()));
            this.imageStream.items.setValue(this.dictionaryProperties.decodeParms, this.getDecodeParams());
            return this.imageStream;
        }
        else {
            return this.imageStream;
        }
    };
    /**
     * Return `colorSpace` of an image.
     * @hidden
     * @private
     */
    ImageDecoder.prototype.getColorSpace = function () {
        return this.dictionaryProperties.deviceRgb;
    };
    /**
     * Return `decode parameters` of an image.
     * @hidden
     * @private
     */
    ImageDecoder.prototype.getDecodeParams = function () {
        var decodeParams = new PdfDictionary();
        decodeParams.items.setValue(this.dictionaryProperties.columns, new PdfNumber(this.width));
        decodeParams.items.setValue(this.dictionaryProperties.blackIs1, new PdfBoolean(true));
        decodeParams.items.setValue(this.dictionaryProperties.k, new PdfNumber(-1));
        decodeParams.items.setValue(this.dictionaryProperties.predictor, new PdfNumber(15));
        decodeParams.items.setValue(this.dictionaryProperties.bitsPerComponent, new PdfNumber(this.bitsPerComponent));
        return decodeParams;
    };
    /**
     * Number array for `png header`.
     * @hidden
     * @private
     */
    ImageDecoder.mPngHeader = [137, 80, 78, 71, 13, 10, 26, 10];
    /**
     * Number Array for `jpeg header`.
     * @hidden
     * @private
     */
    ImageDecoder.mJpegHeader = [255, 216];
    /**
     * Number array for `gif header`.
     * @hidden
     * @private
     */
    ImageDecoder.GIF_HEADER = 'G,I,F,8';
    /**
     * Number array for `bmp header.`
     * @hidden
     * @private
     */
    ImageDecoder.BMP_HEADER = 'B,M';
    return ImageDecoder;
}());
export { ImageDecoder };
