import { getError } from './getError'
import { values, programsOutput } from '../__test__'
import { INVALID_FIELD, REQUIRED_EMPTY } from '../constants/errors'

const dataElements = programsOutput[1].programStages[0].dataElements

describe('getError', () => {
    it('returns the proper error message when a required value is missing', () => {
        const withMissingRequired = {
            ...values,
            [Object.keys(dataElements).find(
                id => dataElements[id].required
            )]: '',
        }

        const expected = REQUIRED_EMPTY
        const actual = getError(dataElements, withMissingRequired)

        return expect(actual).toEqual(expected)
    })

    it('returns the proper error message when a data element has an error', () => {
        const id = Object.keys(dataElements)[0]
        const erroredDataElements = {
            ...dataElements,
            [id]: { ...dataElements[id], error: 'Error' },
        }

        const expected = INVALID_FIELD
        const actual = getError(erroredDataElements, values)

        return expect(actual).toEqual(expected)
    })

    it('returns false when there there are no errors', () => {
        const expected = false
        const actual = getError(dataElements, values)

        return expect(actual).toEqual(expected)
    })
})
