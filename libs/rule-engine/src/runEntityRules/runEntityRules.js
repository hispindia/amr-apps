import { runEntityAction } from './runEntityAction'

const validate = trackedEntityAttributes =>
    !Object.keys(trackedEntityAttributes).find(
        id =>
            trackedEntityAttributes[id].mandatory &&
            trackedEntityAttributes[id].value === ''
    )

export const runEntityRules = (
    trackedEntityAttributes,
    programRules,
    optionSets
) => {
    programRules.forEach(rule => {
        rule.programRuleActions.forEach(action => {
            try {
                runEntityAction(
                    {
                        ...action,
                        condition: rule.condition,
                    },

                    trackedEntityAttributes,
                    optionSets
                )
            } catch (error) {
                console.warn('Failed to evaluate rule:', rule, error)
            }
        })
    })
    return [trackedEntityAttributes, validate(trackedEntityAttributes)]
}
