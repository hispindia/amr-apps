import { SHOW_OPTION_GROUP, HIDE_FIELD } from '../constants/actionTypes'

/*const findAttribute = (id, trackedEntityAttributes) =>
    trackedEntityAttributes.find(a => a.trackedEntityAttribute.id == id)*/

export const runEntityAction = (
    { condition, trackedEntityAttribute, programRuleActionType, optionGroup },
    trackedEntityAttributes,
    optionSets
) => {
    const cond = eval(condition)

    const affected = trackedEntityAttributes[trackedEntityAttribute.id]

    switch (programRuleActionType) {
        case SHOW_OPTION_GROUP:
            if (cond) {
                if (affected.optionSet.id !== optionGroup.id) {
                    affected.optionSet = {
                        id: optionGroup.id,
                    }
                    // Only reset selected value if the options do not include current value.
                    if (
                        !optionSets[affected.optionSet.id].find(
                            o => o.value === affected.value
                        )
                    )
                        affected.value = ''
                }
            }
            break
        case HIDE_FIELD:
            if (cond !== affected.hide) {
                affected.hide = cond
                if (cond) affected.value = ''
            }
            break
        default:
            break
    }
}
