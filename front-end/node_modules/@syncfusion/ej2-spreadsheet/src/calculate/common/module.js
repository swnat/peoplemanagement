/**
 * Represents the getModules function.
 * @param {Calculate} context
 */
export function getModules(context) {
    var modules = [];
    if (context.includeBasicFormulas) {
        modules.push({
            member: 'basic-formulas',
            args: [context]
        });
    }
    return modules;
}
