import { initValues } from './initValues'
import { dataValues, programsOutput, values } from '../__test__'

describe('initValues', () => {
    it('returns data values as an object', () => {
        const dataElements = programsOutput[1].programStages[0].dataElements
        const actual = initValues(dataValues, dataElements)

        return expect(actual).toEqual(values)
    })
})
