/** @private */
export function getTooltipThemeColor(theme) {
    var style;
    switch (theme) {
        case 'Highcontrast':
        case 'HighContrast':
            style = {
                tooltipFill: '#ffffff',
                tooltipBoldLabel: '#000000',
                tooltipLightLabel: '#000000',
                tooltipHeaderLine: '#969696'
            };
            break;
        case 'MaterialDark':
        case 'FabricDark':
        case 'BootstrapDark':
            style = {
                tooltipFill: '#F4F4F4',
                tooltipBoldLabel: '#282727',
                tooltipLightLabel: '#333232',
                tooltipHeaderLine: '#9A9A9A'
            };
            break;
        case 'Bootstrap4':
            style = {
                tooltipFill: 'rgba(0, 0, 0, 0.9)',
                tooltipBoldLabel: 'rgba(255, 255, 255)',
                tooltipLightLabel: 'rgba(255, 255, 255, 0.9)',
                tooltipHeaderLine: 'rgba(255, 255, 255, 0.2)'
            };
            break;
        default:
            style = {
                tooltipFill: 'rgba(0, 8, 22, 0.75)',
                tooltipBoldLabel: '#ffffff',
                tooltipLightLabel: '#dbdbdb',
                tooltipHeaderLine: '#ffffff'
            };
            break;
    }
    return style;
}
