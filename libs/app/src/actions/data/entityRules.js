export const entityRules = (values, attr, { rules, optionSets, uniques }) => {
    rules.forEach(rule => {
        rule.programRuleActions.forEach(r => {
            try {
                switch (r.programRuleActionType) {
                    case 'SHOWOPTIONGROUP':
                        if (eval(rule.condition)) {
                            const affectedAttr = findAttribute(
                                r.trackedEntityAttribute.id,
                                attr
                            )
                            if (
                                affectedAttr.trackedEntityAttribute.optionSet
                                    .id !== r.optionGroup.id
                            ) {
                                affectedAttr.trackedEntityAttribute.optionSet = {
                                    id: r.optionGroup.id,
                                }
                                // Only reset selected value if the options do not include current value.
                                if (
                                    !optionSets[
                                        affectedAttr.trackedEntityAttribute
                                            .optionSet.id
                                    ].find(
                                        o =>
                                            o.value ===
                                            values[
                                                affectedAttr
                                                    .trackedEntityAttribute.id
                                            ]
                                    )
                                )
                                    values[
                                        affectedAttr.trackedEntityAttribute.id
                                    ] = ''
                            }
                        }
                        break
                    case 'HIDEFIELD':
                        const hide = eval(rule.condition)
                        const affectedAttr = findAttribute(
                            r.trackedEntityAttribute.id,
                            attr
                        )
                        if (hide !== affectedAttr.hide) {
                            affectedAttr.hide = hide
                            if (hide)
                                values[affectedAttr.trackedEntityAttribute.id] =
                                    ''
                        }
                        break
                    default:
                        break
                }
            } catch (error) {
                console.warn('Failed to evaluate rule:', rule, error)
            }
        })
    })
    return [values, attr, validate(values, attr, uniques)]
}

const findAttribute = (id, attributes) =>
    attributes.find(a => a.trackedEntityAttribute.id == id)

const validate = (values, attributes, uniques) => {
    if (
        attributes.find(
            a => a.mandatory && values[a.trackedEntityAttribute.id] === ''
        )
    )
        return false
    for (const key in uniques) if (!uniques[key]) return false
    return true
}
