import { runEntityAction } from './runEntityAction'
import { attributeValues, attributes } from '../__test__'
import { trackedEntityAttributes } from '../__test__/output'
import { SHOW_OPTION_GROUP, HIDE_FIELD } from '../constants/actionTypes'

const ID = 'SOVNMvY8TOf'

describe('runEntityAction', () => {
    it('sets the option set', () => {
        const expected = 'optionSet2'
        const trackedEntityAttribute = trackedEntityAttributes[ID]

        runEntityAction(
            {
                condition: 'true',
                trackedEntityAttribute,
                programRuleActionType: SHOW_OPTION_GROUP,
                optionGroup: { id: expected },
            },
            trackedEntityAttributes,
            { [trackedEntityAttribute]: [], [expected]: [] }
        )

        return expect(trackedEntityAttribute.optionSet.id).toEqual(expected)
    })

    it('hides the field', () => {
        const trackedEntityAttribute = trackedEntityAttributes[ID]

        runEntityAction(
            {
                condition: 'true',
                trackedEntityAttribute,
                programRuleActionType: HIDE_FIELD,
            },
            trackedEntityAttributes
        )

        return expect(trackedEntityAttribute.hide).toEqual(true)
    })
})
