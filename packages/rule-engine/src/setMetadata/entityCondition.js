/**
 * Replaces 'A{x}' with 'values['id of x']
 * @param {string} condition
 * @returns {string}
 */
export const entityCondition = condition => {
    const variableDuplicated = condition.match(/A\{.*?\}/g)
    const variables = []
    if (!variableDuplicated) return condition
    variableDuplicated.forEach(duplicated => {
        if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
    })

    variables.forEach(variable => {
        const id = attributeIds[variable.substring(2, variable.length - 1)]
        condition = condition.replace(/A\{.*?\}/g, "values['" + id + "']")
    })

    return condition
}
