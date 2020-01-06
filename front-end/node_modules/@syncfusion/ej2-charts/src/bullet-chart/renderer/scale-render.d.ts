import { BulletChart } from '../bullet-chart';
import { IFeatureBarBounds } from '../model/bullet-interface';
/**
 * class for Bullet chart Scale Group
 */
export declare class ScaleGroup {
    private dataSource;
    private labelOffset;
    private location;
    featureBarBounds: IFeatureBarBounds[];
    private labelSize;
    private isHorizontal;
    private isVertical;
    private isTicksInside;
    private isLabelsInside;
    private isTop;
    private majorTickSize;
    private rangeColor;
    bulletChart: BulletChart;
    private isLabelBelow;
    private scaleSettingsGroup;
    private scaleOrientation;
    private comparative;
    private feature;
    private isLeft;
    private isRight;
    constructor(bulletChart: BulletChart);
    /**
     * To render range scale of the bulletChart graph
     * @param scaleGroup
     */
    drawScaleGroup(scaleGroup: Element): number[];
    protected sortRangeCollection(a: number, b: number): number;
    /**
     * To render the feature bar of the bulletChart chart
     * @param dataCount
     */
    renderFeatureBar(dataCount: number): void;
    /**
     * To render the horizontal feature bar of the bulletChart chart
     * @param dataCount
     */
    private renderCommonFeatureBar;
    private featureBar;
    private verticalFeatureBar;
    private drawcategory;
    /**
     * To render comparative symbol of the bulletChart chart
     * @param dataCount
     */
    renderComparativeSymbol(dataCount: number): void;
    private renderCommonComparativeSymbol;
    private getTargetElement;
    private compareMeasure;
    private compareVMeasure;
    /**
     * To calculate the bounds on vertical and horizontal orientation changes
     * @param value
     * @param categoryValue
     */
    private calculateFeatureMeasureBounds;
    /**
     * Animates the feature bar.
     * @param  {FeatureBar} scale - Defines the feature bar to animate.
     * @return {void}
     */
    doValueBarAnimation(scale: Element): void;
    /**
     * Animates the comparative bar.
     * @param  {FeatureBar} scale - Defines the feature bar to animate.
     * @return {void}
     */
    doTargetBarAnimation(index: number): void;
    private animateRect;
}
