import { getEventRules } from './getEventRules'
import { programRules, programRuleVariables, eventRules } from '../../__test__'

describe('getEventRules', () => {
    it('returns event program rules', () => {
        const expected = eventRules
        const actual = getEventRules(programRules, programRuleVariables)

        return expect(actual).toEqual(expected)
    })
})
