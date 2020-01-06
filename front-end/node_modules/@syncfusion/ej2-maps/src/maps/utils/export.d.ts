import { Maps } from '../../index';
import { ExportType } from '../utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * Annotation Module handles the Annotation for Maps
 */
export declare class ExportUtils {
    private control;
    private printWindow;
    /**
     * Constructor for Maps
     * @param control
     */
    constructor(control: Maps);
    /**
     * To print the Maps
     * @param elements
     */
    print(elements?: string[] | string | Element): void;
    /**
     * To get the html string of the Maps
     * @param elements
     * @private
     */
    getHTMLContent(elements?: string[] | string | Element): Element;
    /**
     * To export the file as image/svg format
     * @param type
     * @param fileName
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation): void;
    /**
     * To trigger the download element
     * @param fileName
     * @param type
     * @param url
     */
    triggerDownload(fileName: string, type: ExportType, url: string, isDownload: boolean): void;
}
