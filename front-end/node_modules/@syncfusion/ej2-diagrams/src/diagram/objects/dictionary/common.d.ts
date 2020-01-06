import { PortShapes, DecoratorShapes } from '../../enum/enum';
import { DecoratorModel } from '../connector-model';
import { IconShapeModel } from '../icon-model';
/**
 * ShapeDictionary defines the shape of the default nodes and ports
 */
/** @private */
export declare function getPortShape(shape: PortShapes): string;
/** @private */
export declare function getDecoratorShape(shape: DecoratorShapes, decorator: DecoratorModel): string;
/**
 * @private
 * @param icon
 * sets the path data for different icon shapes
 */
export declare function getIconShape(icon: IconShapeModel): string;
