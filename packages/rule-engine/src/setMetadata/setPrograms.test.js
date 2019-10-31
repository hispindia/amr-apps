import { setPrograms } from './setPrograms'
import { programs, programsOutput, dataElementsOutput } from '../__test__'

describe('setPrograms', () => {
    it('sets the programs', () => {
        const expected = programsOutput
        const actual = setPrograms(programs, dataElementsOutput)

        return expect(actual).toEqual(expected)
    })
})
