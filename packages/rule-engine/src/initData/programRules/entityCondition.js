/**
 * Replaces 'A{x}' with 'values['id of x']
 * @param {string} condition
 * @returns {string}
 */
export const entityCondition = (condition, programRuleVariables) => {
    const variables = condition.match(/A\{.*?\}/g)
    if (!variables) return condition

    variables
        .filter((item, index) => variables.indexOf(item) === index)
        .map(variable => variable.substring(2, variable.length - 1))
        .forEach(variable => {
            const id = programRuleVariables.find(
                ruleVariable => ruleVariable.name === variable
            ).trackedEntityAttribute.id
            condition = condition.replace(
                /A\{.*?\}/g,
                `trackedEntityAttributes['${id}'].value`
            )
        })

    return condition
}
