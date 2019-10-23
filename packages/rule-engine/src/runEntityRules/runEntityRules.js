import { runEntityAction } from './runEntityAction'

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

export const runEntityRules = (
    values,
    attributes,
    { rules, optionSets, uniques }
) => {
    rules.forEach(rule => {
        rule.programRuleActions.forEach(action => {
            try {
                runEntityAction(
                    values,
                    {
                        ...action,
                        condition: rule.condition,
                    },
                    {
                        attributes,
                        optionSets,
                    }
                )
            } catch (error) {
                console.warn('Failed to evaluate rule:', rule, error)
            }
        })
    })
    return [values, attributes, validate(values, attributes, uniques)]
}
