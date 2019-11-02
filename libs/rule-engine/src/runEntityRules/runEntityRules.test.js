import { runEntityRules } from './runEntityRules'
import { trackedEntityAttributes } from '../__test__/output'

describe('runEntityRules', () => {
    it('does not crash when there is a problem with a rule', () => {
        runEntityRules(trackedEntityAttributes, [
            {
                programRuleActions: [
                    {
                        condition:
                            'trackedEntityAttributes[sddsdsd].value === true',
                        programRuleActionType: 'ASSIGN',
                        trackedEntityAttribute: { id: 'sdfsfsdf' },
                    },
                ],
            },
        ])

        return expect(true).toEqual(true)
    })
})
