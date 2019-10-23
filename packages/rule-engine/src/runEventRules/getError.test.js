import { getError } from './getError'
import { dataElements, programStageSections, values } from '../__test__'
import { INVALID_FIELD, REQUIRED_EMPTY } from '../constants/errors'

const withRequiredValues = () => {
    const withValues = { ...values }
    Object.keys(dataElements)
        .filter(key => dataElements[key].required)
        .forEach(key => (withValues[key] = 'value'))
    return withValues
}

describe('getError', () => {
    it('returns the proper error message when a required value is missing', () =>
        expect(getError(dataElements, values, programStageSections)).toEqual(
            REQUIRED_EMPTY
        ))

    it('returns the proper error message when a data element has an error', () => {
        const id = 'B7XuDaXPv10'
        const erroredDataElements = {
            ...dataElements,
            [id]: { ...dataElements[id], error: 'Error' },
        }

        return expect(
            getError(
                erroredDataElements,
                withRequiredValues(),
                programStageSections
            )
        ).toEqual(INVALID_FIELD)
    })

    it('returns false when there there are no errors', () => {
        return expect(
            getError(dataElements, withRequiredValues(), programStageSections)
        ).toEqual(false)
    })
})
