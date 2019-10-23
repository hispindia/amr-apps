import { TEST_RESULT_ELEMENT } from '../constants/dataElements'

const getVariables = condition => {
    const variableDuplicated = condition.match(/values\[\'.*?\'\]/g)
    const variables = []
    if (!variableDuplicated) return
    variableDuplicated.forEach(duplicated => {
        if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
    })
    return variables.map(variable => variable.substring(8, variable.length - 2))
}

const getColor = value => {
    switch (value) {
        case 'Resistant':
            return 'red'
        case 'Intermediate':
            return 'yellow'
        case 'Susceptible':
            return 'green'
        default:
            return ''
    }
}

/**
 * Sets the RIS colors if the affected data element is an MIC or DD data element.
 * @param {Object} dataElements
 * @param {Object} values
 * @param {{condition: string, affected: Object, value: string}} rule
 */
export const setColors = (
    dataElements,
    values,
    { condition, affected, value }
) => {
    if (!affected.optionSetValue) return
    if (affected.optionSet !== TEST_RESULT_ELEMENT) return
    const variables = getVariables(condition)
    variables.forEach(id => {
        const dataElement = dataElements[id]
        if (
            values[id] &&
            /\d/.test(dataElement.displayFormName) &&
            variables.find(
                v => v !== dataElement.id && values[v] && values[v] !== ''
            )
        ) {
            dataElement.color = ''
            dataElement.warning = 'MIC is prioritized over DD'
        } else {
            dataElement.color =
                values[id] === '' || !value ? '' : getColor(value)
            if ((dataElement.warning = 'MIC is prioritized over DD'))
                dataElement.warning = ''
        }
    })
}
