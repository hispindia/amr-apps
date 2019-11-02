import { initProgramStage } from './initProgramStage'
import { programs, programStageOutput, dataElements } from '../__test__'

describe('initProgramStage', () => {
    it('sets the programs', () => {
        const expected = programStageOutput
        const actual = initProgramStage(
            programs[1].programStages[0],
            dataElements
        )

        return expect(actual).toEqual(expected)
    })
})
