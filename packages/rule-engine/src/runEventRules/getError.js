import { INVALID_FIELD, REQUIRED_EMPTY } from '../constants/errors'

const hasRequiredEmpty = (dataElements, dataElementProps, values) =>
    dataElements.find(id => dataElementProps[id].required && values[id] === '')

const hasError = (dataElements, dataElementProps) =>
    dataElements.find(id => dataElementProps[id].error)

/**
 * Finds rule error or required data element without value.
 * @param {Object} dataElements
 * @param {Object} values
 * @param {Object[]} sections
 * @returns {string} Error.
 */
export const getError = (elements, values, sections) => {
    //console.log(elements)
    //console.log(values)
    //console.log(sections)
    for (const s of sections) {
        if (s.childSections) {
            const invalid = getError(elements, values, s.childSections)
            if (invalid) return invalid
        }
        if (hasRequiredEmpty(s.dataElements, elements, values))
            return REQUIRED_EMPTY
        if (hasError(s.dataElements, elements)) return INVALID_FIELD
    }
    return false
}
