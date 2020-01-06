/**
 * Used to set the HTML Attributes for RTE container
 */
import { IRichTextEditor } from '../base/interface';
export declare function setAttributes(htmlAttributes: {
    [key: string]: string;
}, rte: IRichTextEditor, isFrame: boolean, initial: boolean): void;
