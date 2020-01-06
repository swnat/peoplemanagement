import { IRenderer } from '../base/interface';
import { RenderType } from '../base/enum';
/**
 * RendererFactory
 * @hidden
 * @deprecated
 */
export declare class RendererFactory {
    rendererMap: {
        [c: string]: IRenderer;
    };
    /**
     * addRenderer method
     * @hidden
     * @deprecated
     */
    addRenderer(name: RenderType, type: IRenderer): void;
    /**
     * getRenderer method
     * @hidden
     * @deprecated
     */
    getRenderer(name: RenderType): IRenderer;
}
