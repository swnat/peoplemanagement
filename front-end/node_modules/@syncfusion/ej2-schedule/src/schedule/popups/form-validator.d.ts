import { FormValidator } from '@syncfusion/ej2-inputs';
/**
 * Appointment window field validation
 */
export declare class FieldValidator {
    formObj: FormValidator;
    private element;
    private ignoreError;
    renderFormValidator(form: HTMLFormElement, rules: {
        [key: string]: Object;
    }, element: HTMLElement): void;
    private focusOut;
    private validationComplete;
    private errorPlacement;
    private createTooltip;
    destroyToolTip(): void;
    /**
     * @hidden
     */
    destroy(): void;
}
