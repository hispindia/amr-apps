/**
 * Replaces '#{x}' with 'values['id of x']
 * @param {string} condition
 * @param {Object[]} programRuleVariables
 * @returns {string}
 */
export const programCondition = (condition, programRuleVariables) => {
    const original = condition
    try {
        const variables = condition.match(/#\{.*?\}/g)
        if (!variables) return condition
        variables
            .filter((item, index) => variables.indexOf(item) === index)
            .forEach(variable => {
                const name = variable.substring(2, variable.length - 1)
                const id = programRuleVariables.find(
                    ruleVariable => ruleVariable.name === name
                ).dataElement.id
                condition = condition.replace(
                    new RegExp('#{' + name + '}', 'g'),
                    "values['" + id + "']"
                )
            })
    } catch (e) {
        console.warn('Improper condition:', original)
    }
    return condition
}
