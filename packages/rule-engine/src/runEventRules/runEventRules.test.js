import { runEventRules } from './runEventRules'
import { dataElements, programStageSections, values } from '../__test__'

const programStage = {
    dataElements,
    programStageSections,
}

describe('runEventRules', () => {
    it('does not crash when there is a problem with a rule', () => {
        runEventRules(values, programStage, {
            programRules: [
                {
                    programRuleActions: [
                        {
                            condition: 'values[sddsdsd] === true',
                            programRuleActionType: 'ASSIGN',
                            dataElement: { id: 'sdfsfsdf' },
                        },
                    ],
                },
            ],
        })

        return expect(true).toEqual(true)
    })
})
