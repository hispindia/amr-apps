import { SHOW_OPTION_GROUP, HIDE_FIELD } from '../constants/actionTypes'

const findAttribute = (id, attributes) =>
    attributes.find(a => a.trackedEntityAttribute.id == id)

export const runEntityAction = (
    values,
    { condition, trackedEntityAttribute, programRuleActionType, optionGroup },
    { attributes, optionSets }
) => {
    const cond = eval(condition)

    switch (programRuleActionType) {
        case SHOW_OPTION_GROUP:
            if (cond) {
                const affectedAttr = findAttribute(
                    trackedEntityAttribute.id,
                    attributes
                )
                if (
                    affectedAttr.trackedEntityAttribute.optionSet.id !==
                    optionGroup.id
                ) {
                    affectedAttr.trackedEntityAttribute.optionSet = {
                        id: optionGroup.id,
                    }
                    // Only reset selected value if the options do not include current value.
                    if (
                        !optionSets[
                            affectedAttr.trackedEntityAttribute.optionSet.id
                        ].find(
                            o =>
                                o.value ===
                                values[affectedAttr.trackedEntityAttribute.id]
                        )
                    )
                        values[affectedAttr.trackedEntityAttribute.id] = ''
                }
            }
            break
        case HIDE_FIELD:
            const affectedAttr = findAttribute(
                trackedEntityAttribute.id,
                attributes
            )
            if (cond !== affectedAttr.hide) {
                affectedAttr.hide = cond
                if (cond) values[affectedAttr.trackedEntityAttribute.id] = ''
            }
            break
        default:
            break
    }
}
