import { runEntityRules } from './runEntityRules'
import { attributeValues, attributes } from '../__test__'

describe('runEntityRules', () => {
    it('does not crash when there is a problem with a rule', () => {
        runEntityRules(attributeValues, attributes, {
            rules: [
                {
                    programRuleActions: [
                        {
                            condition: 'values[sddsdsd] === true',
                            programRuleActionType: 'ASSIGN',
                            trackedEntityAttribute: { id: 'sdfsfsdf' },
                        },
                    ],
                },
            ],
        })

        return expect(true).toEqual(true)
    })
})
