import { INVALID_FIELD, REQUIRED_EMPTY } from '../constants/errors'

const hasRequiredEmpty = (dataElements, values) =>
    Object.keys(dataElements).find(
        id => dataElements[id].required && values[id] === ''
    )

const hasError = dataElements =>
    Object.keys(dataElements).find(id => dataElements[id].error)

/**
 * Finds rule error or required data element without value.
 * @param {Object} dataElements
 * @param {Object} values
 * @returns {string} Error.
 */
export const getError = (dataElements, values) => {
    if (hasRequiredEmpty(dataElements, values)) return REQUIRED_EMPTY
    if (hasError(dataElements)) return INVALID_FIELD
    return false
}
