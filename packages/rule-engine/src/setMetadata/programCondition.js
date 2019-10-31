/**
 * Replaces '#{x}' with 'values['id of x']
 * @param {string} condition
 * @returns {string}
 */
export const programCondition = condition => {
    const original = condition
    try {
        const variableDuplicated = condition.match(/#\{.*?\}/g)
        const variables = []
        if (!variableDuplicated) return condition
        variableDuplicated.forEach(duplicated => {
            if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
        })
        variables.forEach(variable => {
            const name = variable.substring(2, variable.length - 1)
            const id = data.programRuleVariables.find(
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
