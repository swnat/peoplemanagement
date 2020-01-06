import { Smithchart } from '../../index';
import { SmithchartExportType } from '../utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * Annotation Module handles the Annotation for Maps
 */
export declare class ExportUtils {
    private control;
    private smithchartPrint;
    /**
     * Constructor for Maps
     * @param control
     */
    constructor(control: Smithchart);
    /**
     * To print the Maps
     * @param elements
     */
    print(elements?: string[] | string | Element): void;
    /**
     * To get the html string of the Maps
     * @param svgElements
     * @private
     */
    getHTMLContent(svgElements?: string[] | string | Element): Element;
    /**
     * To export the file as image/svg format
     * @param type
     * @param fileName
     */
    export(exportType: SmithchartExportType, fileName: string, orientation?: PdfPageOrientation): void;
    /**
     * To trigger the download element
     * @param fileName
     * @param type
     * @param url
     */
    triggerDownload(fileName: string, exportType: SmithchartExportType, url: string, isDownload: boolean): void;
}
