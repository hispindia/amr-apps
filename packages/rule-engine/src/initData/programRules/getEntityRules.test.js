import { getEntityRules } from './getEntityRules'
import { programRules, programRuleVariables, entityRules } from '../../__test__'

describe('getEntityRules', () => {
    it('returns entity program rules', () => {
        const expected = entityRules
        const actual = getEntityRules(programRules, programRuleVariables)

        return expect(actual).toEqual(expected)
    })
})
