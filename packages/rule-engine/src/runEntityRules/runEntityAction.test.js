import { runEntityAction } from './runEntityAction'
import { attributeValues, attributes } from '../__test__'
import { SHOW_OPTION_GROUP, HIDE_FIELD } from '../constants/actionTypes'

describe('runEntityAction', () => {
    it('sets the option set', () => {
        const expected = 'optionSet2'
        const id = 'tea5'
        const trackedEntityAttribute = attributes.find(
            a => a.trackedEntityAttribute.id === id
        ).trackedEntityAttribute

        runEntityAction(
            attributeValues,
            {
                condition: 'true',
                trackedEntityAttribute,
                programRuleActionType: SHOW_OPTION_GROUP,
                optionGroup: { id: expected },
            },
            {
                attributes,
                optionSets: { [trackedEntityAttribute]: [], [expected]: [] },
            }
        )

        return expect(trackedEntityAttribute.optionSet.id).toEqual(expected)
    })

    it('hides the field', () => {
        const id = 'tea5'
        const attribute = attributes.find(
            a => a.trackedEntityAttribute.id === id
        )

        runEntityAction(
            attributeValues,
            {
                condition: 'true',
                trackedEntityAttribute: attribute.trackedEntityAttribute,
                programRuleActionType: HIDE_FIELD,
            },
            {
                attributes,
            }
        )

        return expect(attribute.hide).toEqual(true)
    })
})
