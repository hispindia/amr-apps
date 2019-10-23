import { getSection } from './getSection'
import { programStageSections } from '../__test__'

describe('getSection', () => {
    it('returns section when it is not a child section', () => {
        const id = 'FXEa445ynRz'
        return expect(getSection(id, programStageSections).id).toEqual(id)
    })

    it('returns section when it is a child section', () => {
        const id = 'Q2ZP7Rn5vx0'
        return expect(getSection(id, programStageSections).id).toEqual(id)
    })
})
